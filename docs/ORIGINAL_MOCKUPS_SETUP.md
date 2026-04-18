# Bare-X Original Mockups Setup

This file is the exact path from CSS prototypes to original product mockups and a more premium motion system.

## What is already done in code

- The site can now use real generated product images automatically.
- If a generated image exists, the homepage and result page will show it.
- If an image does not exist yet, the site falls back to the code-based packaging mockup.
- A Gemini image-generation script now exists at `scripts/generate-product-mockups.mjs`.
- The project is prepared for optional React Three Fiber usage later.

## Folder structure you will use

- `public/mockups/reference/`
  Put your visual reference image here.
- `public/mockups/generated/`
  Generated product images will be written here.
- `lib/generated-product-assets.ts`
  This file is updated automatically by the generation script.

## Recommended route

Use this order:

1. Generate original static product renders with Gemini.
2. Review and regenerate until the three master products look right.
3. Use those renders across homepage and AI recommendations.
4. Only after that, decide whether to move to true 3D in Blender or Spline.

## Step-by-step for Gemini image generation

1. Put your reference image into:
   `public/mockups/reference/barex-style.png`

2. Add this to `.env`:
   `GEMINI_API_KEY="your_key_here"`

3. Run:

   ```bash
   npm run generate:mockups -- --reference public/mockups/reference/barex-style.png
   ```

4. The script will generate:
   - acne face wash render
   - oil-free moisturizer render
   - sunscreen render

5. The script will also update:
   `lib/generated-product-assets.ts`

6. Start the app:

   ```bash
   npm run dev
   ```

7. Check:
   - homepage hero
   - explore products section
   - quiz result page

## If the generated images are not good enough

Regenerate after changing the prompt in:
- `scripts/generate-product-mockups.mjs`

Tweak:
- camera angle
- text amount
- lighting
- gloss vs matte finish
- blue glow strength

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

This project is already prepared for:
- `three`
- `@react-three/fiber`
- `@react-three/drei`

If you later add `.glb` files, we can plug them in without changing the whole project structure.

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

- Gemini image generation for fast branded product renders
- Blender for final packaging models
- React Three Fiber for in-browser 3D
- GSAP for cinematic scroll
- Framer Motion for UI transitions
- Rive for ultra-polished interface motion if needed later
