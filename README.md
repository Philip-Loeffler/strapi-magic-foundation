# Magic Foundation

Monorepo for the Magic Foundation site: Strapi CMS backend and Next.js frontend.

## Structure

| Folder | Description |
|--------|-------------|
| **magic-foundation/** | Strapi CMS backend (content types, components, API) |
| **frontend/** | Next.js frontend (pages, components, styling) |

## Quick start

**Backend (Strapi)**  
```bash
cd magic-foundation
cp .env.example .env   # edit with your values
npm install
npm run develop
```

**Frontend**  
```bash
cd frontend
npm install
npm run dev
```

See `STRAPI_CONTENT_GUIDE.md` for content setup and `magic-foundation/README.md` / `frontend/README.md` for project-specific docs.
