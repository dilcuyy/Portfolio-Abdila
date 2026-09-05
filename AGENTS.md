# Instructions for AI Agents in Abdila-Porto-v7

This project strictly adheres to the **design-taste-frontend** anti-slop frontend directives.

## Primary Skill Location
- Skill definition: `.agents/skills/design-taste-frontend/SKILL.md`

## Key Directives to Enforce
1. **Design Read & Dials**:
   - Page type: Student / Developer Portfolio (Abdila Asy Syafiq, Sarjana Sistem Informasi).
   - Baseline Dials: `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 4`.
   - Vibe: Editorial Dark, Asymmetrical, High-Contrast Typography, Glassmorphism approximations with strict fallbacks.

2. **Typography & Layout Discipline**:
   - No generic AI defaults (no Inter + slate-900 default, no AI-purple gradients).
   - Display fonts: Bebas Neue (`font-bebas`) / Sans Display with proper line-height and descender clearance.
   - Hero height cap: Use `min-h-[100dvh]` (never static `h-screen`). Hero headline max 2 lines. Hero text elements max 4.
   - Eyebrow restraint: Max 1 eyebrow label (`01 — ABOUT ME`, uppercase tracking mono) per 3 sections across the page.

3. **Performance & Motion Rules**:
   - NEVER use `useState` for tracking continuous user inputs (mousemove, scroll position, pointer coordinates). Use `useRef` direct DOM updates or Motion's `useMotionValue` / `useTransform`.
   - Banned: raw `window.addEventListener('scroll')` without passive listeners or IntersectionObserver.
   - Always check `prefers-reduced-motion` before firing GSAP or Framer Motion animations.

4. **Interactive UI & Accessibility**:
   - Contrast check: WCAG AA minimum for all CTAs, text, and inputs against background `#0B0B09`.
   - CTAs must not wrap text on desktop.
   - Single accent color locked across the page (`#D8D0BF` / `#F2EEE5`).

5. **Strict No-Hover-Scale Rule**:
   - NEVER apply hover scale effects (`scale-105`, `group-hover:scale-*`, `hover:scale-*`) on any images across the portfolio.
