# Indra Surya Adinata — Portfolio

A production-oriented personal portfolio built with Next.js App Router, strict TypeScript, and Tailwind CSS. The site is designed for quick recruiter scanning while giving each selected project a deeper, reusable case-study page.

## Before deploying

The email, GitHub username, LinkedIn username, timezone, and canonical domain are placeholders. Replace every item marked `TODO: replace before launch` in [`src/data/portfolio.ts`](src/data/portfolio.ts), then follow [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md).

## Local development

Requires Node.js 20.9 or newer (Node.js 24 LTS is recommended) and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # development server
npm run lint         # ESLint
npm run typecheck    # strict TypeScript check
npm run test:smoke   # Playwright Chromium smoke tests
npm run build        # production build
npm start            # serve the production build
```

Playwright may require a browser installation on a new machine:

```bash
npx playwright install chromium
```

## Structure

- `src/app` — App Router pages, metadata routes, OG image, and global design system
- `src/components/sections` — homepage sections
- `src/components/projects` — reusable project cards and code-built previews
- `src/components/ui` — focused client interactions and shared UI
- `src/data/portfolio.ts` — central source of personal, project, skills, timeline, and SEO content
- `tests` — route, interaction, accessibility-surface, and responsive smoke tests

Project detail routes are statically generated from the `projects` array. Unknown slugs render the custom 404 page. Optional live/source actions render only when their URL is non-null.

## Deployment

1. Complete the pre-launch replacements in `src/data/portfolio.ts`.
2. Run `npm run lint && npm run typecheck && npm run test:smoke && npm run build`.
3. Push the repository to your Git provider and import it into Vercel, or deploy to any platform that supports Next.js Node deployments.
4. Set the production domain in `seo.url`, rebuild, and verify `/sitemap.xml`, `/robots.txt`, and social previews.

## Local CMS with MySQL

1. Copy `.env.example` to `.env.local` and set the MySQL URL, admin email, and a random `AUTH_SECRET` of at least 32 characters.
2. Create the database and content table:

```bash
mysql -u root -p < database/schema.sql
```

3. Generate the admin password hash using the same `AUTH_SECRET`:

```bash
npm run auth:hash -- "your-password" "your-auth-secret"
```

4. Put the output in `ADMIN_PASSWORD_HASH`, run `npm run dev`, then open [http://localhost:3000/admin](http://localhost:3000/admin).

CMS content is stored as JSON documents in MySQL. Until a section is saved in CMS, the site uses its existing value from `src/data/portfolio.ts`. Keep `.env.local` private; only `.env.example` belongs in Git.
