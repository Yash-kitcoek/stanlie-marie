# Stanley / Marie — AI Copilot Explainer (Remotion Recreation)

A pixel-accuracy recreation of a 36.48s (912 frames @ 25fps) product explainer
video, built in Remotion + React + TypeScript.

## Structure

- `src/index.ts` — Remotion entry point (registers the root)
- `src/Root.tsx` — Composition registration (`MainVideo`, 1280x720, 25fps, 912 frames)
- `src/MainVideo.tsx` — Top-level scene composition/timeline
- `src/constants.ts` — Canvas size, color palette, and the full frame-accurate timeline
- `src/data.ts` — Copilot content (Stanley / Marie names, taglines, captions, node data)
- `src/fonts.tsx` — Self-hosted Poppins `@font-face` (no network calls at render time)
- `src/utils.ts` — Typewriter / easing helpers
- `src/components/`
  - `Background.tsx` — dark gradient + animated orange glow
  - `IntroText.tsx` — "operations" → "agentic AI copilots" word reveal
  - `ParticleField.tsx` — constellation of particles converging to center
  - `FrameReveal.tsx` — nested rectangle frame with typewriter phrases + 3D tilt/collapse
  - `CopilotOrbit.tsx` — the central circle logo + radiating feature nodes (reused for both Stanley and Marie)
  - `icons.tsx` — hand-drawn line-art SVG icons (chart, people, boxes, clipboard, warning)
- `public/narration.mp3` — audio track extracted from the reference video
- `public/fonts/` — self-hosted Poppins woff2 files

## Timeline overview (912 frames / 25fps)

| Frames | Time | Scene |
|---|---|---|
| 0–195 | 0–7.8s | Intro text: "operations" → "agentic AI copilots" |
| 150–245 | 6–9.8s | Particle constellation converges to center |
| 232–400 | 9.3–16s | Nested rectangle frame, typewriter tagline, 3D tilt & collapse into a circle |
| 400–600 | 16–24s | "Stanley" logo reveal + 3 feature nodes (operations co-pilot) |
| 600–636 | 24–25.4s | Crossfade morph: Stanley → Marie |
| 600–912 | 24–36.5s | "Marie" logo + 3 feature nodes (quality co-pilot) |

## Running it

```bash
npm install
npm start        # opens Remotion Studio
npm run build     # renders out/video.mp4
```

### Note on the headless browser in sandboxed/offline environments

This project was built in a network-restricted sandbox where Remotion's
default Chrome Headless Shell download (from Google's CDN) was blocked. It
was rendered using `@sparticuz/chromium` (an npm-distributed headless Chromium
build) as a drop-in browser executable, configured in `remotion.config.ts`:

```ts
Config.setBrowserExecutable('/tmp/chromium'); // path from @sparticuz/chromium
```

On a normal machine with full internet access, Remotion will download its own
Chrome Headless Shell automatically and this override can be removed.

## Output

`out/video.mp4` — 1280x720, h264, 25fps, 912 frames, with the original audio
track muxed in.
