# Developer Portfolio Implementation Plan

> For Hermes: use the subagent-driven-development skill if this plan is later extended into parallel feature work.

Goal: Build a dark-mode developer homepage that uses TypeScript by default, keeps profile/project copy in Markdown, uses an avatar instead of a real photo, can re-sync GitHub data on demand, and separates the public visitor experience from the admin/operator experience.

Architecture: The UI is a Vite + React + TypeScript portfolio with route separation for a public visitor page (`/`) and an admin/operator page (`/admin`), styled with Tailwind CSS and shadcn/ui-style components. Content is sourced from Markdown files under src/content, while repository metadata and recent commits are fetched by a Node sync script and saved into generated JSON consumed by both pages.

Tech Stack: TypeScript, React 19, Vite 8, Tailwind CSS v4, shadcn/ui-style component primitives, Lucide icons, GitHub REST API.

---

## Files
- Modify: package.json
- Modify: vite.config.ts
- Modify: tsconfig.app.json
- Modify: tsconfig.node.json
- Create: components.json
- Create: src/lib/utils.ts
- Create: src/components/ui/button.tsx
- Create: src/components/ui/badge.tsx
- Create: src/components/ui/card.tsx
- Create: src/components/ui/separator.tsx
- Create: src/lib/content.ts
- Create: src/content/site/profile.md
- Create: src/content/projects/*.md
- Create: src/data/generated/github-data.json
- Create: scripts/sync-github.mjs
- Modify: src/App.tsx
- Modify: src/main.tsx
- Modify: src/index.css
- Create: README.md

## Implementation Outline
1. Scaffold Vite React TypeScript project with pnpm.
2. Install Tailwind v4 and shadcn/ui supporting utilities.
3. Configure alias `@/*` and add shadcn components.json.
4. Build content parser for Markdown + generated GitHub JSON.
5. Create profile.md for bio/about/workflow content.
6. Create project Markdown files with repo mapping metadata.
7. Implement dark-mode portfolio UI with avatar-first hero and project detail sections.
8. Add GitHub sync script that reads Markdown metadata and writes generated JSON.
9. Document the edit workflow in README.
10. Verify via sync script, lint, and production build.

## Verification Commands
- pnpm sync:github
- pnpm lint
- pnpm build
- pnpm dev
