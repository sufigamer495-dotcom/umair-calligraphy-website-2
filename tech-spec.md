# Umair Calligraphy — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| react-router-dom | ^7.0 | Multi-page routing (Home, Gallery, About, Contact) |
| gsap | ^3.12 | Core animation engine, ScrollTrigger plugin |
| imagesloaded | ^5.0 | Gallery masonry layout image load detection |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| typescript | ^5.7 | Type safety |
| @types/react | ^19.0 | React type definitions |
| @types/react-dom | ^19.0 | React DOM type definitions |
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.0 | React Fast Refresh for Vite |

**Fonts**: Playfair Display (400, 500, 600 + italic) and Inter (300, 400, 500) loaded via Google Fonts `<link>` in `index.html`. No npm font packages.

---

## Component Inventory

### Layout (shared across pages)

| Component | Source | Notes |
|-----------|--------|-------|
| Navbar | Custom | Transparent→solid scroll transition. Different visual state on hero vs non-hero pages. |
| Footer | Custom | Dark background, two-column link layout. |
| PageLayout | Custom | Wraps Navbar + Footer + page content. Manages navbar mode (hero/white) per route. |

### Sections (page-specific, used once)

**Home:**
| Component | Notes |
|-----------|-------|
| HeroSection | Full-viewport dark bg, centered content overlay, Ken Burns bg, scroll chevron |
| SelectedWorksSection | 3-col grid, 6 artwork cards |
| ArtistIntroSection | 2-col (portrait + text), entrance slide from sides |
| ArchiveSection | 4-col grid, 8 images, light bg |
| TestimonialsSection | 2-col grid, 4 testimonial cards |
| CTASection | Centered heading + 2 buttons |

**Gallery:**
| Component | Notes |
|-----------|-------|
| GalleryHeader | Heading + filter tabs |
| GalleryGrid | 4-col responsive grid, click opens lightbox |
| Lightbox | Full-screen overlay, prev/next navigation, keyboard/click-outside close |

**About:**
| Component | Notes |
|-----------|-------|
| AboutHero | Centered heading group |
| BioSection | 2-col (portrait + extended bio text) |
| StatsSection | 3-col stats with count-up animation |
| DisciplinesSection | 2x2 grid of text-only discipline cards |

**Contact:**
| Component | Notes |
|-----------|-------|
| ContactHero | Centered heading group |
| ContactContent | 2-col (contact info left, form right) |

### Reusable Components

| Component | Used By | Source |
|-----------|---------|--------|
| SectionHeading | SelectedWorks, Archive, Testimonials, Disciplines | Custom — eyebrow + heading + decorative line pattern |
| ArtworkCard | SelectedWorks, GalleryGrid | Custom — image with hover scale, optional caption |
| TestimonialCard | TestimonialsSection | Custom — quote + attribution |
| Button | All pages/sections | Custom — 3 variants (primary, secondary, dark) |
| Lightbox | GalleryGrid | Custom — portal-based full-screen image viewer |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollReveal | GSAP ScrollTrigger wrapper for the unified fade-up pattern (opacity 0→1, y 24→0). Configurable stagger, trigger position. |
| useNavbarMode | Determines if current route has a hero section (transparent navbar) or not (white navbar). |
| useCountUp | Animate number counting from 0 to target value over duration. Triggered by IntersectionObserver. |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load sequence (navbar + hero stagger) | GSAP timeline | Single timeline: navbar fade (600ms), then hero elements stagger (200ms each, 800ms). Plays on mount. | Medium |
| Hero Ken Burns drift | CSS animation | `transform: scale(1.02)` with 20s alternate infinite keyframe. Pure CSS, no JS. | Low |
| Scroll chevron bounce | CSS animation | `translateY(0→8px)` 2s ease-in-out infinite. Pure CSS. | Low |
| Navbar scroll transition | CSS + scroll listener | Toggle class at 80vh scroll. CSS transitions handle background/border/shadow changes (300ms). | Low |
| Scroll-triggered fade-up (unified) | GSAP ScrollTrigger | Reusable hook: `gsap.fromTo` with ScrollTrigger (start: "top 85%", once: true). Applied to all below-hero sections. | Low |
| Artist intro slide-in | GSAP ScrollTrigger | Left col: `x: -30→0`, right col: `x: 30→0`, opacity 0→1, 800ms power2.out. Trigger: "top 75%". | Low |
| Gallery/archive grid stagger | GSAP ScrollTrigger | Staggered fade-up with 80-100ms delay between items. Single ScrollTrigger per section. | Low |
| Stats count-up | GSAP + ScrollTrigger | `gsap.to` on proxy object, update DOM on each tick. ScrollTrigger with `once: true`. 1.5s duration. | Medium |
| Image hover scale | CSS transition | `transform: scale(1.03)` 400ms ease-out. Pure CSS `:hover`. | Low |
| Button/link hover | CSS transition | Color/border transitions 200ms. Underline pseudo-element `scaleX` transform. Pure CSS. | Low |
| Lightbox entrance | CSS transition | Overlay: opacity 0→1 (300ms). Image: scale 0.95→1 (300ms). | Low |
| Reduced motion | Conditional | Wrap all GSAP calls in `prefers-reduced-motion` check. Skip animations, show content immediately. | Low |

---

## State & Logic

### Gallery Filtering

Client-side filter state on Gallery page. Filter tabs update active category; GalleryGrid filters visible items accordingly. No API calls.

### Lightbox Navigation

Lightbox maintains current image index in state. Prev/next arrows and keyboard (Left/Right) cycle through the filtered image array. Close on Escape, click outside, or X button. Rendered via React portal to `document.body` to avoid z-index stacking issues.

### Contact Form

No backend. Frontend-only form with validation (required fields, email format). On submit: display success message. No actual HTTP request sent.

### Navbar Mode Detection

Each route declares whether it has a hero section. `useNavbarMode` reads current route and returns mode. Navbar applies transparent class when at top of hero-route pages; switches to white on scroll past 80vh or immediately on non-hero routes.

---

## Routing

| Route | Page Component | Has Hero |
|-------|---------------|----------|
| `/` | Home | Yes |
| `/gallery` | Gallery | No |
| `/about` | About | No |
| `/contact` | Contact | No |

React Router v7 with `BrowserRouter`. All routes render the same `PageLayout` shell. Scroll to top on route change.

---

## Other Key Decisions

### No shadcn/ui Components
This is a bespoke portfolio with a fully custom design language. No standard UI primitives (dialogs, forms, tables) are needed in their shadcn form. All components are custom-built with Tailwind to match the precise visual spec.

### No Lenis / Custom Smooth Scroll
The design calls for native `scroll-behavior: smooth`. The scroll-triggered animations are simple fade-ups that work well with native scroll. No smooth-scroll library needed.

### Gallery Grid: CSS Grid, Not Masonry
The gallery and archive sections use regular CSS Grid with consistent aspect ratios. No true masonry (variable heights) is required — all artwork images share the same 3:4 portrait ratio.

### Image Strategy
All artwork and portrait images are static assets in `/public/images/`. They are optimized JPEGs. Below-fold images use `loading="lazy"`. Gallery thumbnails load directly; lightbox displays the same image at full resolution (no separate thumbnail/full-size pair needed given the manageable image count).
