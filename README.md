# Portfolio Scroll

An independent scroll-driven portfolio for Demiralp Demirel. React / Vite / GSAP / ScrollTrigger. Native scrolling with art-directed CSS 3D layers; this is not a WebGL character or an actual 3D model viewer.

Hero dolly / artwork fragments; editorial About and portrait depth; kinetic Profile; approaching cinema screen; perspective catalog; expanding modal presentation; education timeline; fifteen verified software workflow studies; cinematic contact.

20 unique canonical works, 9 project records and 11 production records. All verified descriptions, software, credits, passes, geometry statistics, references, external links and education/profile information are retained. Unknown roles remain unknown. Source: original portfolio at `db0b7c3f76be50e25017ad7ed178c3b01b6dfb3e`.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
```

Dev port 5180. Production preview port 4181. Vite base `/portfolio-scroll/`.

## Motion and accessibility

One `useScrollWorld` owner manages responsive GSAP timelines and cleanup. No animation-frame React state, pin spacers or scroll hijacking. Reverse scroll reverses timelines. Base markup remains visible if animation never initializes. System reduced motion returns a stable layout; `?reduced-motion=1` is an explicit QA fallback branch, not a hidden performance shortcut. Native dialogs preserve Escape, keyboard focus and scroll position. Video playback lifecycle and localized Ambient Light are reused.

Tools are lightweight illustrative workflow diagrams, not embedded software or invented proficiency claims. Open/click or keyboard focus works without hover; CSS playback suspends offscreen/hidden.

## Media and independence boundary

Images, responsive thumbnails and full-resolution stills are independent local copies. XpoMatch's verified faststart MP4 is independently copied into this repository. Other videos deliberately use existing stable **read-only original portfolio Pages / Release URLs**, permitted by the brief. The original site is therefore a video-delivery dependency, not a shared source/build/deployment dependency. Do not remove those original public media assets without updating this project's delivery mapping. No video source depends on portfolio-motion or portfolio-universe.

Language preferences and Ambient preferences use this project's own storage keys. Dark is the default; scrolling does not change theme. The existing manual Liquid Glass theme renderer is independently copied.

`?qa=1` exposes a finite eight-second RAF/long-task probe. Results are RAF cadence, **not GPU-rendered FPS**. No 60/120 FPS guarantee is asserted without hardware-level measurements.

The original repository remains read-only and untouched. See `docs/QA.md` for browser evidence and limitations.
