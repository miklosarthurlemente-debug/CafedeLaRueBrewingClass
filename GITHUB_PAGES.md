# Student access through GitHub Pages

Target repository: `miklosarthurlemente-debug/CafedeLaRueBrewingClass`.

This project is ready for GitHub Pages, including repository subpaths such as `https://USERNAME.github.io/REPOSITORY/`. No backend is needed. The local copy remains available offline through the Windows launcher.

## Publish

1. Create or choose a GitHub repository.
2. Upload `.github`, `src`, `public`, `scripts/build-sw.mjs`, `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`, `index.html`, `vite.config.ts` and `tsconfig.json`. Keep their directory structure. Include `.gitignore`.
3. In repository **Settings → Pages**, set **Source** to **GitHub Actions**.
4. Push to `main`, or run **Publish student course to GitHub Pages** from the **Actions** tab. If the default branch has another name, update the workflow's branch setting.
5. Wait for the deployment job to succeed. GitHub displays the actual student URL in the deployment environment and Pages settings.

The workflow builds and publishes `dist/` only. There is no need to upload the original PowerPoint, `source/`, node_modules or debug files. The source repository's visibility and GitHub Pages access depend on your GitHub account settings; the student site is intended to be shareable. No public URL has been created by preparing these files.

## Offline for students

Students first open the published URL while connected. The service worker caches the complete course, including its original-color photos, fonts and logo. Let the first load finish before disconnecting. The same browser can then reload and use the site offline. Browser storage must remain available; clearing site data removes the offline copy. A new visit or reload always starts at the landing page.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
