# Eleni Tadese — Portfolio

Rebuilt in Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, with your
locked lime/near-black palette and the effects you specced: floating pill
navbar with wavy-underline hover, particle hero, rotating gradient avatar
ring, gradient-border glow project cards, an alternating editorial layout for
featured projects, and a draggable/autoplaying carousel for the rest.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Restore Google Fonts

This was built in a sandbox with no access to fonts.googleapis.com, so
Space Grotesk / Inter currently load via system-font fallback stacks. On your
machine (with normal internet), switch back to `next/font/google` for crisper
typography:

1. In `src/app/layout.tsx`, uncomment the `next/font/google` import and the
   two font consts (see the comment block at the top of the file), and add
   `${spaceGrotesk.variable} ${inter.variable}` back onto the `<html>`
   className.
2. In `src/app/globals.css`, swap the `--font-display` / `--font-body` lines
   back to `var(--font-space-grotesk)` / `var(--font-inter)` (also noted in a
   comment right above them).

## Add real project screenshots

`Projects.tsx` currently renders an empty placeholder tile
(`.glow-card aspect-[4/3]`) for each featured project. You mentioned you
already have image assets in `/public` (`f/f1–f4`, `e/e1–e4`, `a/a1–a3`, plus
a profile photo). Drop them into `public/` here and swap each placeholder
`<div>` for a Next.js `<Image>` pointing at the matching file — the `image`
field is already present on each entry in `src/lib/data.ts` for this.

## Add your profile photo

`Hero.tsx` currently renders "ET" inside the avatar ring. Replace the initials
`<div>` with an `<Image>` of your headshot once you add it to `public/`.

## Deploy

Push to GitHub and import into Vercel, or run `vercel` from this folder — no
special config needed.

## Structure

```
src/
  app/            # layout, global styles, page assembly
  components/      # Navbar, Hero, About, Skills, Projects, ProjectCarousel,
                    # Contact, Footer, icons (inline GitHub/LinkedIn SVGs)
  lib/data.ts      # all content — experience, education, skills, projects,
                    # social links — edit here to update copy without
                    # touching component code
```
