# Legacy Codebase Migration Notes

This document provides a technical audit of the legacy Vue 2 codebase, its Firebase dependencies, media asset configurations, and lists the items migrated, deprecated, or pending user input.

---

## 1. Legacy Codebase Analysis

The legacy application was a single-page application (SPA) built using the following stack:
* **Framework:** Vue 2, Vue CLI, Vue Router (SPA routing)
* **State Management:** Vuex
* **Styles:** Sass / SCSS
* **Backend:** Google Firebase:
  * **Firebase Authentication:** Member sign-in.
  * **Cloud Firestore:** Database for blog posts.
  * **Firebase Storage:** Upload/retrieval of cover photos.
  * **Firebase Hosting:** Static page deployment.
  * **Cloud Functions:** Server-side custom functions.

---

## 2. Legacy Firebase Configurations

* **Project ID:** Found in `.firebaserc` as `vueandfb-1c39f`.
* **API Credentials:** The actual credentials block in `src-legacy/firebase/firebaseInit.js` was omitted (`/* here is private key*/`). Thus, the legacy Firebase server connection cannot be restored without these credentials.
* **Cloud Functions (`functions/index.js`):**
  A single HTTPS callable function `addAdminRole` was used to getUserByEmail and set a custom user claim `{ admin: true }` on Firebase Auth. This is replaced by Supabase Auth policies where admin authorization is mapped to SQL Row Level Security or a designated auth profile in Phase 3.

---

## 3. Media Assets Mapping & Migration

The legacy codebase stored default card and cover photos under assets directories. These have been successfully migrated to Nuxt public static assets:

| Legacy Source Path | Nuxt Destination Path | Description |
| :--- | :--- | :--- |
| `src-legacy/assets/blogCards/algo.jpg` | `public/images/blog/algo.jpg` | Algorithms article cover |
| `src-legacy/assets/blogCards/anime.jpg` | `public/images/blog/anime.jpg` | Anime/Illustration post cover |
| `src-legacy/assets/blogCards/coding.jpg` | `public/images/blog/coding.jpg` | Software engineering post cover |
| `src-legacy/assets/blogCards/life.jpg` | `public/images/blog/life.jpg` | General thoughts cover |
| `src-legacy/assets/blogPhotos/chatgpt.jpg` | `public/images/blog/chatgpt.jpg` | AI / LLM post cover |
| `src-legacy/assets/blogPhotos/code.jpg` | `public/images/blog/code.jpg` | Programming detail cover |
| `src-legacy/assets/blogCards/life.jpg` | `public/images/placeholders/placeholder.jpg` | Default upload placeholder |

---

## 4. Migrated vs. Pending Items

### Migrated Items (Nuxt 3 Framework)
- **Static Pages:** Main landing page, About page, Projects list, Project Details, Contact form.
- **Warm Light Design System:** Styled using Tailwind CSS on a custom ivory/teal/charcoal layout.
- **i18n Translation:** English and Traditional Chinese localization mapping with LocalStorage persistence.
- **Wording Guard:** All pages and templates verified to refer to the IEEE Transactions on Multimedia paper only with the approved submission wording.
- **Admin CMS Layout & Forms:** Fully implemented warm-themed editing layouts for blog posts, projects, and media management, with full validation.
- **Server API Skeletons:** CRUD REST routes under `server/api/` managing mock operations or routing payloads to Supabase tables.

### Pending Backend Migration (Phase 3 Targets)
- **Supabase Setup:** Provisioning database instance, executing the SQL schema migrations, and configuring storage buckets.
- **Env Integration:** Binding URL and auth keys to remove warning banners and exit Mock Mode.
- **Production Credentials:** Transitioning mock authentication (`admin@local.dev` / `local-admin-demo`) to a production Supabase Auth administrator account.

---

## 5. Action Items for the User

1. **Verify Legacy Media Files:** Confirm if any additional images or attachments are required from `src-legacy/assets/` and copy them to `public/images/`.
2. **Review DB Schema:** Inspect the columns defined in `supabase/migrations/001_create_cms_schema.sql` to ensure they accommodate all fields you wish to use.
3. **Provision Supabase Instance:** Set up the database project following the guidelines in `docs/supabase-phase3-plan.md` to establish the final production CMS backend.
