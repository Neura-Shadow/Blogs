# Markdown / Local Data to Supabase Migration

This guide explains how to migrate local Phase 2 content into the live Supabase CMS tables without overwriting production data by accident.

## Safety Rules

- Run `supabase/migrations/001_create_cms_schema.sql` first.
- Run `supabase/migrations/002_fix_grants_and_admin_policies.sql` second.
- Keep `.env` local and private. Never commit real Supabase keys.
- Use `SUPABASE_SECRET_KEY` only from the server or local migration script.
- Start with dry-run mode and review every slug before inserting.
- The helper script inserts new rows only. Duplicate slugs should fail instead of silently overwriting production data.

## Blog Markdown Mapping

Source files: `content/blog/*.md`

| Markdown/frontmatter | Supabase `posts` column | Notes |
| --- | --- | --- |
| filename | `slug` | Filename without `.md`. |
| `title` | `title_en`, `title_zh` | Manually split later if bilingual text differs. |
| `description` | `excerpt_en`, `excerpt_zh` | Manually refine Chinese/English copy later. |
| body | `content_en`, `content_zh` | Markdown body is copied to both fields by default. |
| `image` | `cover_url` | Replace with Supabase Storage URL later if needed. |
| `category` | `category` | Defaults to `Development`. |
| `tags` | `tags` | Comma-separated frontmatter becomes `text[]`. |
| `draft` | `status` | `draft: true` becomes `draft`; otherwise `published`. |
| `language` | `language` | Defaults to `bilingual`. |
| `date` | `published_at` | Used when available. |

Fields to manually review after import:

- `title_zh`
- `excerpt_zh`
- `content_zh`
- `cover_url`
- `tags`
- `status`

## Projects Data Mapping

Source file: `data/projects.ts`

The helper maps each `Project` object into the flat `projects` table:

- multilingual fields become `*_en` and `*_zh`
- `links.repo/demo/paper` become `repo_url`, `demo_url`, `paper_url`
- `tags`, `stack`, `highlights`, `challenges`, and `results` stay as `text[]`
- `featured` and `sort_order` are preserved

Fields to manually review after import:

- `cover_url`
- external links
- bilingual long descriptions
- sort order
- featured flags

## Helper Script

Dry-run:

```bash
npx tsx scripts/migrate-content-to-supabase.ts --dry-run
```

Insert posts only:

```bash
npx tsx scripts/migrate-content-to-supabase.ts --execute --posts
```

Insert projects only:

```bash
npx tsx scripts/migrate-content-to-supabase.ts --execute --projects
```

Insert both:

```bash
npx tsx scripts/migrate-content-to-supabase.ts --execute --posts --projects
```

The script requires:

```bash
NUXT_PUBLIC_SUPABASE_URL
SUPABASE_SECRET_KEY
```

It does not use the public publishable key because migrations are administrative server-side work.
