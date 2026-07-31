# GitHub Project Sync

This workflow keeps `data/projects.ts` as the reviewed source for project-card content and compares it with the Supabase `projects` table. It is deliberately separate from GitHub inventory collection: repository facts are reviewed and sanitized before they enter portfolio data.

The npm command uses the committed `jiti` development dependency to execute the TypeScript sync source across supported project Node versions.

## Safety model

- Dry-run is the default and performs a read-only Supabase query.
- Apply requires both `--apply` and the exact confirmation `--confirm=SYNC_PROJECTS`.
- Apply additionally requires the server-only `SUPABASE_SECRET_KEY`.
- The script logs actions and field names, never environment-variable values.
- Remote-only rows are reported as `REMOVE-CANDIDATE` and are never deleted.
- Private repository links must remain `null` in `data/projects.ts`.
- No production apply belongs in an automated portfolio refresh or deployment pipeline.

## Environment

The script loads `.env` if present and otherwise uses the current process environment.

```text
NUXT_PUBLIC_SUPABASE_URL=...
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SECRET_KEY=... # apply only; server-side
```

For deterministic UI testing without changing or renaming `.env`, start Nuxt with the server-only override `NUXT_CMS_MODE=mock`. The default `auto` mode continues to select Supabase when the required configuration is present.

The public URL and publishable key are sufficient for dry-run when the table's read policy permits public project reads. Do not move `SUPABASE_SECRET_KEY` into Nuxt public runtime config or browser code.

## Dry-run

```bash
npm run sync:projects
```

The explicit equivalent is:

```bash
npm run sync:projects -- --dry-run
```

Possible actions:

- `ADD slug`
- `UPDATE slug: field_a, field_b`
- `UNCHANGED slug`
- `REMOVE-CANDIDATE slug (reported only; no deletion)`

## Apply

Review the dry-run output first. When a production write is intentionally authorized, run:

```bash
npm run sync:projects -- --apply --confirm=SYNC_PROJECTS
```

The apply path upserts only local additions and updates by `slug`. It does not delete or archive rows. Any removal remains a separate, manually reviewed CMS operation.

## Refresh procedure

1. Inventory repositories through an authenticated GitHub session.
2. Inspect public README, docs, releases, tags, languages, and recent commits.
3. Treat forks, profile/config repositories, private repositories, and legacy projects separately.
4. Update `data/projects.ts` with evidence-backed scope and explicit limitations.
5. Run the claim audit, build, and browser checks.
6. Run the Supabase dry-run and inspect every proposed change.
7. Apply only after explicit production confirmation.

The current inventory and editorial decisions are recorded in [github-portfolio-sync-report.md](./github-portfolio-sync-report.md).
