# Rulebook: design-taste-frontend Anti-Slop Directives

This repository enforces high-taste frontend rules for landing pages and portfolios.

## Rule 1: Performance & Continuous Inputs
- Do NOT call `useState` or `useReducer` inside high-frequency event handlers such as `mousemove`, `touchmove`, or `scroll`.
- Use direct DOM references (`useRef`), CSS Custom Properties (`--mouse-x`, `--mouse-y`), or motion values (`useMotionValue`).

## Rule 2: Layout & Viewport Stability
- Use `min-h-[100dvh]` for hero sections (never `h-screen` which jumps on mobile address bar collapse).
- Hero section must have maximum 4 text components (eyebrow/strip, headline, subtext, CTAs).
- Navigation header must fit on 1 single line on desktop. Max height: 80px.

## Rule 3: Eyebrow Restraint
- Limit eyebrow labels (small uppercase mono tracking text above section titles like `01 — ABOUT ME`) to max 1 instance per 3 sections.

## Rule 4: Accessibility & Contrast
- Text contrast must pass WCAG AA (4.5:1 for body text, 3:1 for display headers).
- Interactive buttons and CTAs must be readable against section backgrounds and must not wrap into multiple lines on desktop.
- Respect `prefers-reduced-motion` and `prefers-reduced-transparency`.
