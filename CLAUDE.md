# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                # Start dev server (port 3000)
pnpm devsafe            # Clean .next cache then start dev
pnpm build              # Production build
pnpm lint               # ESLint via Next.js
pnpm test:int           # Vitest integration tests (tests/int/)
pnpm test:e2e           # Playwright e2e tests (tests/e2e/)
pnpm seed               # Seed products/categories from scripts/seed.ts
pnpm seed:deals         # Seed deals from scripts/seed-deals.ts

# After schema changes:
pnpm generate:types     # Regenerate src/payload-types.ts
pnpm generate:importmap # Regenerate app/(payload)/admin/importMap.js

# TypeScript validation:
pnpm tsc --noEmit
```

Use `pnpm` — the project requires it (see `engines` in package.json).

## Architecture

This is a **Next.js 15 + Payload CMS 3.x** monorepo where Payload runs embedded inside Next.js (no separate backend process).

### Route Groups

- `src/app/(frontend)/` — Public-facing menu UI. Single page (`/`) that fetches all data server-side and passes it to client components.
- `src/app/(payload)/` — Payload admin panel at `/admin` and REST/GraphQL APIs at `/api`.

### Payload Collections

Defined in `src/collections/`. All collections call `revalidateFrontendAfterChange` / `revalidateFrontendAfterDelete` hooks to trigger Next.js ISR revalidation of the frontend route.

| Collection | Purpose |
|---|---|
| `Users` | Admin auth (email/password) |
| `Categories` | Menu categories; sorted by `_order` on frontend |
| `Products` | Menu items — `basePrice`, `sizeOptions[]`, `addOns[]`, `isAvailable`, `isFeatured` |
| `Deals` | Bundled deals — auto-calculates `originalTotalPrice` and `discountPercentage` via `beforeValidate` hooks; `isActive` auto-set from `validFrom`/`validUntil` dates |
| `Media` | Uploads stored in S3 (`@payloadcms/storage-s3`) |
| `Settings` | Single-document config: restaurant name, branding colors, currency symbol, social links, WhatsApp number. Read by the frontend layout on every request. |

### Frontend Data Flow

```
RootLayout (server)
  └── fetches Settings → injects CSS color vars + passes to SettingsProvider
      └── page.tsx (server)
            └── fetches Categories, Products (isAvailable), Deals (isActive), Settings
                └── ProductDisplayClient (client) — category filter state, cart glance
                    └── ProductDisplayShell (server RSC) — groups products by category, renders cards
```

`page.tsx` uses `export const revalidate = 60` (ISR). All collection hooks also call `revalidatePath('/')` on mutation.

### State Management

- **Cart**: Zustand store (`src/store/cartStore.ts`) persisted to `localStorage` with `skipHydration: true`. Rehydrated client-side via `CartRehydrator` in `RootProvider` to prevent hydration mismatches.
- **Settings**: React context via `SettingsProvider` — provides the `Setting` document to any client component via `useSettings()`.
- **Theme**: `next-themes` with `attribute="class"`, wrapped in `ThemeProvider`.

### Media Handling

S3 storage is configured via `@payloadcms/storage-s3`. `NEXT_PUBLIC_MEDIA_URL` and `S3_ENDPOINT` are added to `next.config.mjs` `remotePatterns` dynamically. Use the `getVersionedMediaUrl` helper from `src/lib/media.ts` when resolving image URLs (handles both `url` and `thumbnailURL` fields).

### Admin Customization

`src/components/admin/color-picker-field.tsx` is a custom Payload field component registered via file path (`@/components/admin/color-picker-field#ColorPickerField`) in the Settings collection. After modifying any component referenced this way, run `pnpm generate:importmap`.

## Key Environment Variables

```
DATABASE_URL           # Vercel Postgres connection string
PAYLOAD_SECRET         # Payload JWT secret
S3_BUCKET              # S3 bucket name
S3_ACCESS_KEY_ID       # S3 credentials
S3_SECRET_ACCESS_KEY
S3_REGION
S3_ENDPOINT            # e.g. https://... for custom S3-compatible endpoint
NEXT_PUBLIC_MEDIA_URL  # Public URL for media (used in Next.js image remotePatterns)
```

## Critical Patterns (from project rules)

**Local API access control**: Payload's Local API bypasses access control by default. Always set `overrideAccess: false` when passing a `user` object to enforce permissions.

**Hook transaction safety**: Always pass `req` to nested Local API calls inside hooks to keep operations in the same transaction and prevent data corruption.

**Hook loops**: Use `context` flags (e.g. `context.skipHooks`) to prevent afterChange hooks from triggering themselves recursively.

**Type generation**: `src/payload-types.ts` is auto-generated — run `pnpm generate:types` after any schema change. Import types from there, not from Payload directly.

**Defaults**: `src/lib/defaults.ts` exports `DEFAULTS` — the fallback values used both as `defaultValue` in Payload admin fields and as runtime fallbacks when no Settings document exists yet.
