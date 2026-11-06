## Active PDF course

The active lessons now follow the uploaded 36-page student training manual: seven modules, 127 interactive slides, 81 practice prompts and 16 sample hot and iced recipes. The PDF replaces the earlier PowerPoint as the instructional source. View Manual and Download PDF links are provided after the course grid, at the end of the last module, on the final presentation slide and on the Thank You screen. The unmodified PDF is bundled in public/manuals and precached for offline use.

Edit src/data/manualModules.json and src/data/manualRecipes.json to change the active lessons. src/data/modules.ts and recipes.ts provide typed exports of those JSON files. Source numbers now identify PDF pages, not PowerPoint slides. The optional scripts/import-manual.py regenerates the lesson data with pypdf. See INSTRUCTOR_REVIEW.md for source scope and missing appendices.

# Cafe de la Rue — Basic Barista Training Course

The course is branded **Basic Barista Training Course**. Header and completion logos use the supplied `Logo.png` unchanged. Each new browser load, reload, and offline-launcher visit starts on the landing page; **Start Course** opens the course dashboard. Internal lesson navigation continues to work during the visit. The former floating “From bean to cup” promotional box has been removed.

GitHub Pages publishing is configured in `.github/workflows/deploy-pages.yml` for the student repository `miklosarthurlemente-debug/CafedeLaRueBrewingClass`. See [GITHUB_PAGES.md](GITHUB_PAGES.md). Preparation alone does not publish the site. The local copy remains available offline, and the hosted copy also works offline after the initial cache finishes downloading in the student's browser.

## Reference landing page and instructor introduction

The landing page follows `reference landing page.mp4`: a rounded poster frame, a bold central headline with an offset shadow, objects around the edges, compact navigation and gentle floating motion. Coffee illustrations adapt the reference's space-themed composition to the academy. Reduced-motion preferences disable the floating effect.

The supplied `color pallete .png` contains four dominant colors: sage `#658861`, sand `#E5C192`, taupe `#7A6A54` and ivory `#FDFAF3`. These colors apply to the interface only. All photos and illustrations use the original source colors and original file bytes, without recoloring, resizing or recompression.

Every presentation launch first opens **Hi, I’m Miklos**. Select **LET’S BEGIN** to continue to the selected lesson or saved slide. The introduction has its own fullscreen control. Edit the name and introduction in `src/components/InstructorIntroduction.tsx`; edit the reference landing in `src/components/ReferenceLanding.tsx` and `src/reference-landing.css`.

The private launcher opens the landing page at `http://127.0.0.1:4317/#landing`. Updated production builds replace the offline cache automatically. Existing browser tabs may need a refresh once to load the latest design.

A local-first interactive Basic Barista Training Course, rebuilt from the supplied PowerPoint. React, TypeScript, Vite, Tailwind CSS, Lucide and Motion. No account, database, backend or runtime API is needed.

## Private offline use on this computer

Double-click **Open Barista Academy.cmd** in the project folder. It opens your default browser at `http://127.0.0.1:4317/` using the already-built local files. Internet is not required. The launcher reuses an existing academy server if it is running and starts it in the background otherwise. It requires Node.js, either installed normally or available from this computer's Codex runtime.

The server binds only to `127.0.0.1`, so it is accessible on this computer, not on your Wi-Fi network or the public internet. The app sends no course content, progress or analytics to an external service. Nothing is published. Browser progress is stored in your local browser profile. Other people using the same computer/profile may access the local files and progress.

Keep the project folder in place. After a computer restart, double-click the launcher again. No development server or dependency installation is needed to use the existing production build. Use the normal browser profile if you want to keep your progress. Closing the browser leaves the small local server running until the computer shuts down; no internet connection is used by the server.

## Run locally

Install Node.js 20.19+ or 22.12+ and run in this directory:

```sh
npm install
npm run dev
```

Open the local address printed by Vite (normally http://127.0.0.1:5173). For a production build:

```sh
npm run build
npm run preview
```

The preview normally runs at http://127.0.0.1:4173. This workspace also includes a `pnpm-lock.yaml`; `pnpm install` is supported. If pnpm asks about build scripts, approve only the dependency scripts you trust (Vite uses esbuild). Type checking is included in `npm run build`.

## Teach with the app

- Dashboard: browse seven modules; Explore Lesson opens a module overview. Select any lesson slide to present it.
- Presentation Mode resumes the last slide stored in this browser. Starting a specific lesson opens its selected slide.
- Next / Previous and the sidebar support unrestricted navigation. Click a module heading to expand or collapse its slide list.
- Arrow Right / Space advances, Arrow Left goes back, Home jumps to the first slide, End to the last. Shortcuts ignore inputs, selects and editable text. Space activates a focused button normally.
- The fullscreen icon uses the browser Fullscreen API. Escape exits fullscreen while keeping the slide. Browser fullscreen availability varies by environment.
- The grid icon opens a slide overview. The note icon reveals source references, missing details and instructor-review notes. Keep notes closed during projection if you do not want them visible.
- Finish on the last slide opens the Thank You screen, with dashboard and restart controls.
- Quick reference provides recipes, a filter-brewing ratio calculator, bean comparisons, espresso references and a list of instructor-review notes.
- Mobile presentation content scrolls inside the slide canvas. Navigation stays visible. Wide reference tables scroll horizontally within their own panel.
- Progress means **modules visited**, not assessed mastery or accreditation. Progress and the last slide stay in this browser's local storage, when supported. Clearing site data resets both. Private browsing may not retain them.

## Content and source fidelity

The supplied 36-page PDF is the current source of truth. Seven modules cover fundamentals; beans, origins and roasting; equipment; espresso calibration; milk; 16 hot and iced recipes; and operations. The app preserves all core lessons and practice prompts, with PDF page references on each slide. Recipe measurements, preparation, quality standards and mistakes come from pp. 18–34. Ingredients and preparation/service are split into separate classroom slides for legibility.

Edit src/data/manualModules.json, src/data/manualRecipes.json, and src/data/references.ts. The modules.ts and recipes.ts files export typed JSON data. The optional scripts/import-manual.py uses pypdf to regenerate the lesson data from the PDF.

The unmodified PDF is stored in public/manuals/Cafe_de_La_Rue_Basic_Barista_Training_Manual_36_pages.pdf. ManualLinks.tsx supplies local View Manual and Download PDF anchors. All photographs and illustrations retain their original colors and source file quality. Existing course images are supporting illustrations; no iced-drink photographs or missing manual appendices have been invented. Original PowerPoint text and extracted source media remain in the ignored source archive for reference only.

The UI palette remains sage #658861, sand #E5C192, taupe #7A6A54 and ivory #FDFAF3. DM Serif Display and Lato are bundled locally through Fontsource, with Georgia and Arial fallbacks. The supplied PNG logo is unchanged and has no square backdrop.

See INSTRUCTOR_REVIEW.md for the source scope, sample-recipe caveats and contents entries missing from the supplied PDF.

## Offline operation

All required code, styles, fonts, photos and illustrations are local. With dependencies installed, the development server needs no internet but **must remain running**. It does not install an offline service worker.

`npm run build` produces `dist/`, including a generated, versioned `sw.js`. Serve this directory over HTTPS (or localhost), load the app online and let the initial service worker finish caching. After that, the production app supports offline reload and presentation in the same browser. It caches all local production assets, so visiting each lesson first is unnecessary. Initial loading, cache availability and browser storage policies still matter. The service worker is not supported by opening `index.html` through `file://`.

For a reliable disconnected classroom setup, keep `npm run preview` running locally and open its localhost URL. A production build contains everything needed to serve without internet. For a hosted cached copy, avoid clearing browser site data before class. Browser storage eviction can remove offline copies. New versions activate automatically after their assets finish caching. Refresh an older tab once if its previous version is still visible. Cache cleanup only removes caches prefixed `cafe-academy-`.

## Deployment

No deployment has been performed. All three options publish the contents of `dist/`. Hash-based navigation and Vite's relative base avoid SPA rewrite requirements and support GitHub Pages subdirectories.

### Vercel

Import this folder/repository, select Vite, use `npm run build` as the build command and `dist` as output. Deploy. A static deployment is sufficient; there are no environment variables or server functions.

### Netlify

Connect the repository, set build command `npm run build`, publish directory `dist`, then deploy. Alternatively, build locally and drag the complete `dist` directory into Netlify's manual deploy UI.

### GitHub Pages

Run `npm run build`. In repository Settings → Pages choose GitHub Actions. Use `actions/checkout`, `actions/setup-node`, `npm install`, `npm run build`, `actions/upload-pages-artifact` with `path: dist`, then `actions/deploy-pages`. Give the workflow `pages: write` and `id-token: write` permissions and set its environment to `github-pages`. Use the address returned by GitHub. No domain or repository name needs to be hardcoded.

Do not upload the PowerPoint, source image archive, node_modules or QA files as the website: publish `dist/` only.

## Project structure

```text
├── index.html
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── vite.config.ts
├── README.md
├── INSTRUCTOR_REVIEW.md
├── public/
│   └── images/                      # 36 original PNG/JPG assets
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── reference-landing.css
│   ├── vite-env.d.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ReferenceLanding.tsx
│   │   ├── InstructorIntroduction.tsx
│   │   ├── Icon.tsx
│   │   ├── CourseDashboard.tsx
│   │   ├── ModuleCard.tsx
│   │   ├── ModuleOverview.tsx
│   │   ├── PresentationViewer.tsx
│   │   ├── SlideRenderer.tsx
│   │   ├── SlideSidebar.tsx
│   │   ├── SlideControls.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── BrewingCalculator.tsx
│   │   ├── Comparisons.tsx
│   │   ├── BeverageRecipeCard.tsx
│   │   └── QuickReference.tsx
│   ├── data/
│   │   ├── course.ts
│   │   ├── modules.ts
│   │   ├── recipes.ts
│   │   └── references.ts
│   ├── hooks/
│   │   ├── usePresentation.ts
│   │   └── useLocalProgress.ts
│   └── types/course.ts
├── scripts/
│   ├── build-sw.mjs
│   ├── browser-check.mjs
│   ├── layout-check.mjs
│   ├── extract.ps1
│   ├── contact.py
│   └── optimize.py
├── source/
│   ├── slides.json
│   ├── assets.json
│   ├── contact.jpg
│   ├── extracted-images/
│   └── qa/                          # browser screenshots and results
└── dist/                            # generated production website
```

## Verification

`npm run build` checks TypeScript, bundles the production app and generates the offline manifest. `node scripts/manual-course-qa.mjs` runs the classroom navigation checks in Playwright, using a local production preview. Set BARISTA_CHROMIUM_PATH to a Chromium executable on another machine, or install Playwright Chromium with npx playwright install chromium. Run node scripts/layout-check.mjs for projector, tablet and mobile checks. The browser must support service workers and fullscreen. QA screenshots and the final results are saved in `source/qa/`.

## Known limits

The course provides reference recipes, not universal café standards. Added guidance needs instructor approval. Historical and medical source assertions are not independently verified. Progress records visits only. Offline access depends on successful initial caching and browser storage. Fullscreen may be restricted by an embedding browser. The app provides no grading, authentication, certificate or cloud synchronization.





