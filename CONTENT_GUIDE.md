# Portfolio content guide

All personal copy lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). Keeping content there prevents details from drifting across components.

## Required before launch

| Field | Current value | Where to update |
| --- | --- | --- |
| Email | `indra.portfolio@example.com` | `profile.email` |
| GitHub | `https://github.com/USERNAME` | `socialLinks` |
| LinkedIn | `https://www.linkedin.com/in/USERNAME` | `socialLinks` |
| Canonical domain | `https://example.com` | `seo.url` |
| Timezone wording | `Western Indonesia Time (UTC+7)` | `profile.timezone` |
| Project status/details | Starter academic-project content | Each object in `projects` |

Search for `TODO: replace before launch` to find launch-blocking placeholders. Do not publish until the placeholder domain and usernames are replaced.

## Common edits

| Content | Data location |
| --- | --- |
| Hero positioning and availability | `profile` |
| About biography and education | `profile.about`, `profile.education` |
| Email and social links | `profile.email`, `socialLinks` |
| Project cards and case studies | `projects` |
| Skills matrix | `skills` |
| Learning/experience timeline | `timeline` |
| Site title, description, and domain | `seo` |

## Add a project

1. Duplicate one object in `projects`.
2. Give it a unique URL-safe `slug`.
3. Fill every required field defined by `Project` in `src/types/portfolio.ts`.
4. Use `null` for unavailable `liveUrl` or `sourceUrl`; the interface will hide that action.
5. Select an existing `accent` and `preview`, or add a new visual variant in `src/components/projects/project-visual.tsx` and its styles in `src/app/globals.css`.
6. Run the quality-gate commands in the README. The route is generated automatically.

## Add project images

Place optimized WebP or AVIF files in `public/projects/<project-slug>/`. Add an optional typed image field to the project data, then render it with `next/image` using explicit dimensions or a stable `fill` container. Write meaningful alt text for informative screenshots; use an empty alt for purely decorative images.

The starter portfolio intentionally uses lightweight, code-built UI compositions because real screenshots were not provided.

## Replace the monogram with a portrait

1. Add an optimized portrait under `public/profile/`.
2. In `src/components/sections/about.tsx`, replace the `.avatar` content with `next/image`.
3. Keep the container aspect ratio, provide an accurate alt description, and set `sizes` for the responsive layout.
4. Remove the no-longer-used abstract avatar styles after checking mobile and desktop crops.

Do not use a generated or stock face as a substitute for Indra’s portrait.

## Update the résumé

The résumé reads from the same `profile`, `projects`, `skills`, and `socialLinks` data as the main site. Update those values first. Adjust the curated résumé layout in `src/app/resume/page.tsx` only when adding a new section such as verified professional experience. Use the browser’s **Print / Save as PDF** action and review both A4 and Letter previews before sharing.
