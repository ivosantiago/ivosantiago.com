# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint
npm run start    # Start production server
```

## Architecture

### Routing (App Router)

All pages in `src/app/` using Next.js App Router:
- `layout.tsx` - Root layout with metadata, providers, and Layout component
- `providers.tsx` - Client component wrapping ThemeProvider and AppContext
- Pages: `/`, `/about`, `/uses`, `/now`, `/not-found`

### Component Patterns

**Server vs Client Components:**
- Pages are Server Components by default
- `providers.tsx` and `Header.tsx` are Client Components (`'use client'`)
- Header uses client hooks: `usePathname()`, `useTheme()`, scroll listeners

**Layout System:**
- `Container.tsx` - Responsive container with `ContainerOuter` and `ContainerInner`
- `SimpleLayout.tsx` - Reusable page template with title/intro
- `Layout.tsx` - Main wrapper with Header and Footer

**Button Component:**
- Polymorphic - renders as `<button>` or `<Link>` based on props
- Variants: `primary`, `secondary`

### Styling

- Tailwind CSS 4 with `@tailwindcss/postcss`
- Dark mode via `next-themes`
- `clsx` for conditional classes
- Custom font size tokens in `src/styles/tailwind.css`
- Prettier plugin auto-sorts Tailwind classes

### Path Aliases

`@/*` maps to `src/*` (configured in tsconfig.json)

## Deployment

Push to main branch for automatic deployment.
