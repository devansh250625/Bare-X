# Bare-X Original Mockups Setup

This file explains the current exact-label product packaging workflow.

## What is already done in code

- The site uses static packaging assets from `public/mockups/generated`.
- Labels are deterministic, so product names, ingredients, and sizes stay exact.
- AI image-generation scripts were removed because free APIs produced poor labels and inconsistent packaging.
- If you later want true 3D, add React Three Fiber only when real `.glb` assets are ready.

## Folder structure you will use

- `public/mockups/generated/`
  Product packaging assets are written here.
- `lib/generated-product-assets.ts`
  This file maps product keys to asset paths.

## Recommended route

Use this order:

1. Generate exact-label packaging assets locally.
2. Review them in the website.
3. Commit the assets to GitHub.
4. Vercel deploys the committed static files.
5. Only later, if needed, move to true 3D in Blender or Spline.

## Step-by-step for exact-label packaging assets

The default starter path now generates deterministic packaging assets. This avoids the biggest problem with AI image generators: misspelled labels and unstable product shapes.

1. Run:

   ```bash
   npm run generate:mockups
   ```

2. The script will generate exact-label SVG product assets:
   - acne face wash
   - hydrating face wash
   - oil-free moisturizer
   - sunscreen
   - body wash
   - body lotion

3. The script will update:
   `lib/generated-product-assets.ts`

4. Start the app:

   ```bash
   npm run dev
   ```

5. Check:
   - homepage hero
   - explore products section
   - quiz result page

6. If the assets look good, commit them:

   ```bash
   git add public/mockups/generated lib/generated-product-assets.ts
   git commit -m "Add exact Bare-X packaging assets"
   git push
   ```

7. Vercel will deploy those committed static images automatically.

Important:
- Do not generate product images during Vercel build.
- Generate locally, review quality, commit the images, then deploy.

## If the packaging assets are not good enough

Regenerate after changing the SVG template in:
- `scripts/generate-packaging-assets.mjs`

Tweak:
- exact label text
- bottle or tube shape
- lighting and glow
- typography sizing
- matte/gloss feel

## When to use Blender or Spline

Use Blender or Spline only if you need:
- true 3D interaction
- camera orbit
- rotating bottles/tubes
- label swapping on a real mesh
- premium launch-film style motion

## Local 3D route

Install Blender from:
- https://www.blender.org/download/get-blender/

Then create:
- one tube model
- one pump bottle model
- one short sunscreen tube model

Export final web assets as `.glb`.

## Web 3D route

If you later add `.glb` files, install `three`, `@react-three/fiber`, and `@react-three/drei`, then we can plug real models into the existing product visual system.

## Motion direction for a more premium site

The right motion system should be:

1. Hero stage motion
2. Scroll-linked parallax
3. Section reveal choreography
4. Product stage drift and glow movement
5. Clean page transitions

Avoid:
- random floating everywhere
- too many competing animations
- constant motion on mobile

## Best-quality stack for the future

- Blender for final packaging models
- React Three Fiber for in-browser 3D when real models exist
- GSAP for cinematic scroll
- Framer Motion for UI transitions
- Rive for ultra-polished interface motion if needed later
