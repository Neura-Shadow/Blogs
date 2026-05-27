BEGIN;

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

GRANT SELECT ON public.posts TO anon;
GRANT SELECT ON public.posts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.posts TO service_role;

GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.projects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO service_role;

GRANT SELECT ON public.media_assets TO anon;
GRANT SELECT ON public.media_assets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO service_role;

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS select_published_posts ON public.posts;
DROP POLICY IF EXISTS admin_all_posts ON public.posts;
DROP POLICY IF EXISTS posts_select_published_anon ON public.posts;
DROP POLICY IF EXISTS posts_select_published_authenticated ON public.posts;
DROP POLICY IF EXISTS posts_service_role_all ON public.posts;

CREATE POLICY posts_select_published_anon
ON public.posts
FOR SELECT
TO anon
USING (status = 'published');

CREATE POLICY posts_select_published_authenticated
ON public.posts
FOR SELECT
TO authenticated
USING (status = 'published');

CREATE POLICY posts_service_role_all
ON public.posts
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS select_all_projects ON public.projects;
DROP POLICY IF EXISTS admin_all_projects ON public.projects;
DROP POLICY IF EXISTS projects_select_anon ON public.projects;
DROP POLICY IF EXISTS projects_select_authenticated ON public.projects;
DROP POLICY IF EXISTS projects_service_role_all ON public.projects;

CREATE POLICY projects_select_anon
ON public.projects
FOR SELECT
TO anon
USING (true);

CREATE POLICY projects_select_authenticated
ON public.projects
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY projects_service_role_all
ON public.projects
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS select_all_media ON public.media_assets;
DROP POLICY IF EXISTS admin_all_media ON public.media_assets;
DROP POLICY IF EXISTS media_assets_select_anon ON public.media_assets;
DROP POLICY IF EXISTS media_assets_select_authenticated ON public.media_assets;
DROP POLICY IF EXISTS media_assets_service_role_all ON public.media_assets;

CREATE POLICY media_assets_select_anon
ON public.media_assets
FOR SELECT
TO anon
USING (true);

CREATE POLICY media_assets_select_authenticated
ON public.media_assets
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY media_assets_service_role_all
ON public.media_assets
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

COMMIT;
