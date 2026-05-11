# Droppeek AI Coding Assistant Instructions

## Project Overview
**Droppeek** is a Next.js-based mystery box review and comparison platform. It helps users discover, evaluate, and compare legitimate mystery box platforms while providing community-driven insights and scam protection.

**Tech Stack:** Next.js 15 (Pages Router), TypeScript, Chakra UI, Tailwind CSS, React Icons, gray-matter for Markdown parsing

---

## Architecture & Data Flow

### Content Structure
- **Blog Posts:** Markdown files in `/content/blog/` with frontmatter (title, date, category, readTime, imageUrl)
- **Detailed Reviews:** Folder-based structure in `/content/posts/` with `index.md` per platform review
- **Platform Data:** Hardcoded site metadata in `/src/data/sites.tsx` (ID, name, rating, URL, pros/cons, promo codes)
- **Static Post Generation:** `utils/posts.ts` reads markdown files at build time using `gray-matter` for YAML parsing

### Key Data Objects
```tsx
// Platform site object (sites.tsx)
{ id, name, logo, rating, rank, category, image, promoCodes, promoText, 
  pros, cons, alternatives, url, description, reviewPoints[] }

// Post object (posts.ts)
{ slug, title, thumbnail, content, date, category, readTime, imageUrl }
```

### API Integration Pattern
- **CMS API:** `/src/lib/api.ts` fetches reviews from external CMS (Strapi-like structure)
- **External Platform APIs:** `/pages/api/fetchBoxes.ts` calls live platform APIs (e.g., HypeDrop GraphQL) with **fallback static data** on failure
- **Image Handling:** `fixImagePath()` normalizes image URLs to `/media/` directory (handles both relative and absolute URLs)

---

## Component Architecture

### UI Layer (Chakra UI Primary)
- **Core Components:** Located in `/src/components/ui/` with Chakra as the primary design system
- **Custom Components:** 
  - `Navbar.tsx` - Sticky header with responsive drawer navigation
  - `DisqusThread.tsx` - Community comments (manages Disqus script injection via window.DISQUS)
  - `SiteCard.tsx` / `CustomCard.tsx` - Reusable platform cards
  - `AlternativesList.tsx` - Grid-based platform recommendations with hover effects
  - `RatingStars.tsx` / `EmojiReactions.tsx` - User feedback mechanisms

### Headless UI Components
- **Radix UI + Tailwind:** `accordion.tsx`, `separator.tsx`, `card.tsx` use Radix primitives + Tailwind CSS
- **Chakra UI Wrappers:** `checkbox.tsx`, `radio.tsx` wrap Chakra components with custom props

### Page Components
- **Home (`pages/index.tsx`):** FAQ accordion, site carousel, review list, rankings grid, Disqus comments
- **Site Detail (`pages/site/[id].tsx`):** Dynamic routing per platform with promo codes, ratings, alternatives
- **Blog/Reviews:** Static generation with markdown rendering via `react-markdown`

---

## Critical Developer Workflows

### Building & Running
```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build (generates static props)
npm run start        # Run production server
npm run lint         # ESLint check
```

### Content Creation
**Blog Posts:** Create `.md` file in `/content/blog/` with frontmatter
```markdown
---
title: "Post Title"
date: "2025-01-15"
category: "Reviews"
readTime: "5 min read"
imageUrl: "filename.jpg"  # stored in /public/media/
---
```

**Platform Reviews:** Add folder to `/content/posts/{date-slug}/index.md`

**Update Site Data:** Edit `/src/data/sites.tsx` - changes require rebuild for static generation

### Image Management
- Store images in `/public/media/` or `/public/images/`
- Use `fixImagePath()` utility for path normalization
- Favicon URLs use Google S2 service: `https://www.google.com/s2/favicons?sz=64&domain={domain}`

---

## Project-Specific Patterns

### Path Aliases (tsconfig.json)
```
@/*           → ./src/*
@components/* → ./src/components/*
@data/*       → ./src/data/*
@posts        → ./utils/posts
```
Always use aliases for imports, never relative paths beyond current directory.

### Styling Approach
- **Chakra UI preferred** for semantic components (Box, Flex, VStack, etc.)
- **Tailwind CSS** for custom layouts in Radix-based components (`accordion.tsx`, `card.tsx`)
- **JSX Styles:** CSS-in-JS for animations (e.g., `<style jsx>` for float keyframes)
- **Color Mode:** Chakra's `useColorModeValue()` supports light/dark themes

### Markdown Rendering
- Posts use `gray-matter` to extract frontmatter YAML
- Content is rendered as plain React (JSX) or via `react-markdown`
- Always extract thumbnail from first image: `content.match(/!\[[^\]]*\]\((.*?)\)/)`

### Static Generation (getStaticProps)
- Use `getStaticProps()` for build-time data fetching (pages with `_staticSiteProps`)
- `getAllPostSlugs()` reads filesystem—runs only during build, not runtime
- Avoid runtime file I/O; fetch from API or use pre-built static exports

### Third-Party Integrations
- **Disqus:** Managed in `DisqusThread.tsx`—ensure script loads once via `window.DISQUS` check
- **Next-SEO:** Configured in `_app.tsx` with dynamic Open Graph URLs
- **External APIs:** Always include try-catch with **fallback static data** (see `fetchBoxes.ts`)

---

## Common Patterns & Anti-Patterns

### ✅ DO:
- Use Chakra UI `Box`, `Flex`, `VStack`, `HStack` for layout
- Leverage `useColorModeValue()` for theme-aware styling
- Store platform metadata in `/src/data/sites.tsx`, not hardcoded in pages
- Use `Link` from Next.js for internal navigation
- Handle missing images gracefully (gray placeholder boxes)
- Implement API fallbacks for external data sources

### ❌ DON'T:
- Mix Chakra UI and Tailwind class names on same element (use `cn()` helper if needed)
- Use relative paths for imports beyond parent directory (use `@/` aliases)
- Call `getStaticProps` with dynamic data that changes frequently
- Forget to set `passHref` on Next.js `Link` wrapping custom components
- Hardcode image paths without `/media/` or `/images/` prefix

---

## Key Files Reference
| File | Purpose |
|------|---------|
| `src/lib/api.ts` | CMS API client (getReviews, getTopReviews) |
| `src/data/sites.tsx` | Platform metadata & review content |
| `utils/posts.ts` | Markdown file parsing & slugification |
| `src/components/ui/Navbar.tsx` | Main navigation with mobile drawer |
| `pages/index.tsx` | Homepage (hero, site carousel, reviews, FAQ) |
| `pages/site/[id].tsx` | Platform detail page template |
| `pages/_app.tsx` | App wrapper (Chakra, DefaultSeo, Navbar) |
| `tailwind.config.js` | Tailwind theme with CSS variables |
| `next.config.ts` | Next.js config (Chakra import optimization) |

---

## Performance & Build Notes
- **Next.js Config:** `optimizePackageImports` enabled for `@chakra-ui/react` to reduce bundle size
- **Images:** Use Next.js `Image` component with `width/height` for optimization
- **Disqus Script:** Loaded via `useEffect` to avoid blocking initial page load
- **Markdown Parsing:** Happens at build time; use `console.log()` in `getAllPostSlugs()` to debug slug generation

---

## Quick Checklist for New Features
- [ ] Update type definitions if adding new data fields
- [ ] Use path aliases (`@/`) for all imports
- [ ] Style with Chakra UI for consistency; use `useColorModeValue()` for themes
- [ ] Add fallback images/data for external API calls
- [ ] Test responsive behavior (mobile drawer, grid layouts)
- [ ] Rebuild (`npm run build`) if modifying static content in `/content/` or `sites.tsx`
