-- Create custom types or check constraints
-- Ensure extensions are loaded
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Posts Table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_zh TEXT,
    excerpt_en TEXT,
    excerpt_zh TEXT,
    content_en TEXT,
    content_zh TEXT,
    cover_url TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    language TEXT DEFAULT 'bilingual' CHECK (language IN ('en', 'zh-TW', 'bilingual')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_zh TEXT,
    subtitle_en TEXT,
    subtitle_zh TEXT,
    description_en TEXT,
    description_zh TEXT,
    long_description_en TEXT,
    long_description_zh TEXT,
    category TEXT,
    role_en TEXT,
    role_zh TEXT,
    status_en TEXT,
    status_zh TEXT,
    tags TEXT[] DEFAULT '{}',
    stack TEXT[] DEFAULT '{}',
    repo_url TEXT,
    demo_url TEXT,
    paper_url TEXT,
    cover_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    highlights_en TEXT[] DEFAULT '{}',
    highlights_zh TEXT[] DEFAULT '{}',
    challenges_en TEXT[] DEFAULT '{}',
    challenges_zh TEXT[] DEFAULT '{}',
    results_en TEXT[] DEFAULT '{}',
    results_zh TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Media Assets Table
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bucket TEXT NOT NULL,
    path TEXT NOT NULL,
    public_url TEXT,
    alt_en TEXT,
    alt_zh TEXT,
    type TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- 4. Set Up Policies for Posts
-- Public can SELECT published posts
CREATE POLICY select_published_posts ON posts
    FOR SELECT
    USING (status = 'published');

-- Authenticated admins can do everything
CREATE POLICY admin_all_posts ON posts
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Set Up Policies for Projects
-- Public can SELECT all projects
CREATE POLICY select_all_projects ON projects
    FOR SELECT
    USING (true);

-- Authenticated admins can do everything
CREATE POLICY admin_all_projects ON projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Set Up Policies for Media Assets
-- Public can SELECT all media assets
CREATE POLICY select_all_media ON media_assets
    FOR SELECT
    USING (true);

-- Authenticated admins can do everything
CREATE POLICY admin_all_media ON media_assets
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Note: Storage buckets themselves will be created via Supabase Console in Phase 3.
-- This schema establishes the relational metadata storage.
