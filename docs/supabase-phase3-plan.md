# Supabase Phase 3 Integration & Setup Guide

This document outlines the step-by-step instructions to transition the CMS backend from **Local Mock Mode** to a live **Supabase Production Environment**.

---

## 1. Project Initialization on Supabase

1. **Create Account / Project:**
   * Go to [Supabase Console](https://database.new) and sign in.
   * Click **New Project** and select your organization.
   * Provide a project name (e.g. `neura-shadow-portfolio`), database password, and choose a region closest to your hosting target (e.g., East Asia / Tokyo).

2. **Collect API Credentials:**
   * In the Supabase project dashboard, navigate to **Project Settings** &rarr; **API**.
   * Retrieve the following keys:
     * **Project URL**
     * **anon public** publishable key
     * **service_role** secret key (DO NOT share or expose to frontend)

---

## 2. Execute Database Schema Migrations

1. Navigate to **SQL Editor** in the left sidebar of the Supabase dashboard.
2. Click **New Query**.
3. Copy the contents of your local migration scripts:
   [`supabase/migrations/001_create_cms_schema.sql`](file:///c:/Users/zongx/Documents/Blogs/supabase/migrations/001_create_cms_schema.sql)
4. Paste it into the editor and click **Run**.
5. Then run:
   [`supabase/migrations/002_fix_grants_and_admin_policies.sql`](file:///c:/Users/zongx/Documents/Blogs/supabase/migrations/002_fix_grants_and_admin_policies.sql)
5. This will create:
   * Tables: `posts`, `projects`, `media_assets`
   * Check constraints and defaults
   * Row Level Security (RLS) policies for anonymous reads and authenticated admin writes.

---

## 3. Storage Bucket Configuration

1. In the Supabase dashboard, click on **Storage** in the sidebar.
2. Click **Create a new bucket**.
3. Create these public buckets:
   * `blog-covers`
   * `project-covers`
   * `resume`
   * `gallery`
4. Set each bucket to **Public** (so CMS assets are accessible via public URLs).
5. (Optional) Set up RLS Policies for Storage under **Policies**:
   * **SELECT (Read):** Allowed for `public` (anyone).
   * **INSERT / UPDATE / DELETE (Write):** Restricted to `authenticated` users (Admin).

---

## 4. Auth & Admin Account Configuration

1. In the Supabase dashboard, click on **Authentication** in the sidebar.
2. Click **Add User** &rarr; **Create User**.
3. Input your administrator credentials:
   * **Email:** Use your personal/admin email (e.g., `admin@yourdomain.com`).
   * **Password:** Specify a strong, secure password.
4. Uncheck "Send email confirmation" if you want to activate it immediately.
5. In your frontend configuration, this email/password will replace the mock credentials.

---

## 5. Configure Hosting Environment Variables

In your deployment hosting panel (Vercel, Netlify, or local `.env` file), configure the following environment keys:

```bash
# Supabase credentials (copied from API settings)
NUXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NUXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
SUPABASE_SECRET_KEY=your-service-role-secret-key
NUXT_ADMIN_EMAILS=admin@example.com
```

> [!WARNING]
> **Secret Key Safety:**
> The `SUPABASE_SECRET_KEY` bypasses RLS and has full administrative database privileges. It must **only** be declared as a private server environment variable. Never put it under `NUXT_PUBLIC_*` or expose it in client-side code.

---

## 6. Switch from Mock Mode to Production

The application automatically checks for the presence of these environment variables during runtime:
* If keys are missing, the Nuxt engine prints console warnings and triggers **Mock Local Dev Mode**.
* Once keys are declared in your production environment, the server-side clients and frontend composables automatically establish connection and route CRUD commands directly to your live Supabase database.
* To verify, ensure that the connection card on the Admin Dashboard displays:
  **"SUPABASE BACKEND ONLINE"** (green badge).

---

## 7. Testing Production CRUD

To verify that your CRUD operations are communicating with the live database:

1. **Check Live Dashboard Indicator:**
   * Log into `/admin` with your newly created Supabase Auth credentials.
   * Verify that the banner says **"Supabase Production Online"** (instead of "Mock Local Dev Mode").

2. **Verify Blog Post CRUD:**
   * Go to **Manage Posts** and click **New Post**.
   * Fill out the fields and click **Save Changes**.
   * Check your Supabase console under **Table Editor** &rarr; `posts` to verify that the row was written.
   * On the public `/blog` page, verify that the new post shows up in the list (or is accessible via its slug if published).
   * Edit the post in `/admin` and confirm the changes are reflected on the database table.
   * Delete the post and verify it is removed from the database.

3. **Verify Project Showcase CRUD:**
   * Perform the same steps for projects under **Manage Projects** and check the `projects` table on Supabase.
   * Confirm that bilingual lists (highlights, challenges, results) parse correctly into SQL array format.
