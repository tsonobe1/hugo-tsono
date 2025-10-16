# Repository Guidelines

This repository hosts a Hugo‑powered, multilingual blog (ja/en) using the custom theme in `themes/my-high-contrast-theme`.

## Project Structure & Module Organization
- `hugo.toml` — site config, languages, taxonomies.
- `content/` — posts as bundles: `posts/YYYY/MM/slug/index.md` (ja) and `index.en.md` (en).
- `layouts/` — template overrides and shortcodes.
- `assets/` — custom CSS/JS processed by Hugo.
- `static/` — files copied verbatim.
- `themes/my-high-contrast-theme/` — theme source.
- `public/` — generated build output.

Example (new post bundle): `hugo new posts/2025/10/my-post/index.md` then add `index.en.md` if translating.

## Build, Test, and Development Commands
- `git submodule update --init --recursive` — ensure any theme submodules are present.
- `hugo server -D` — run local preview with drafts at http://localhost:1313.
- `hugo --gc --minify` — production build to `public/`.
- `hugo --printI18nWarnings --printUnusedTemplates` — surface i18n/template issues.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for HTML/Go templates and Markdown.
- Slugs: kebab‑case (`my-post`). Keep `draft: true` until ready; set to `false` on publish.
- Place post‑specific media inside the post bundle directory.

Shortcodes you can use: `{{< linkcard url="https://example.com" >}}`, `{{< video src="/path.mp4" >}}`, `{{< mermaid >}}…{{< /mermaid >}}`.

## Testing Guidelines
- No unit tests; treat a clean build as the gate. Ensure console shows no `WARN`/`ERROR`.
- Verify both locales render (canonical + alternate links) and navigation works.
- Check sitemap/RSS generation after changes to posts or taxonomies.

## Commit & Pull Request Guidelines
- Follow Conventional Commits where practical: `feat(post): …`, `fix(theme): …`, `refactor(layouts): …`.
- PRs should include: purpose, scope (content/theme/config), and screenshots/GIFs for UI/CSS changes; link related issues.
- For content updates, include both `ja` and `en` files when applicable.

## Agent‑Specific Notes
- These rules apply repo‑wide. Minimize diffs and avoid unrelated reformatting.
- When changing structure or commands, update this file and relevant docs.

