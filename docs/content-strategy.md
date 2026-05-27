# Content Strategy: Markdown Backup & Database Migration

This document outlines the content strategy for transitioning from a file-based Markdown CMS (Nuxt Content) to the **Supabase-first relational database CMS**.

---

## 1. Role of Nuxt Content in Phase 2 & 3

Nuxt Content serves as:
* **Local Markdown Backup:** A revision-controlled version of blog articles stored inside the code repository.
* **Fallback Data Source:** If the Supabase database connection is offline or keys are not provided, the API route fallbacks read, parse, and serve these local Markdown files.
* **Migration Source:** Historically written articles remain in `content/blog/` as a source of truth that can be imported/uploaded directly into the Supabase database.

---

## 2. Content Schema Comparison

Here is how the frontmatter fields of Nuxt Content files map to the Supabase SQL database schema:

| Markdown Frontmatter | Supabase SQL Column | Data Type | Description |
| :--- | :--- | :--- | :--- |
| `slug` (filename) | `slug` | `TEXT` | Unique URL identifier |
| `title` | `title_en` / `title_zh` | `TEXT` | English and Chinese title fields |
| `description` | `excerpt_en` / `excerpt_zh` | `TEXT` | Short teaser text |
| - (Markdown body) | `content_en` / `content_zh` | `TEXT` | Full body text supporting Markdown |
| `image` | `cover_url` | `TEXT` | Banner cover image path / URL |
| `category` | `category` | `TEXT` | Classification group |
| `tags` | `tags` | `TEXT[]` | Tags array |
| `draft` | `status` | `TEXT` | Checked value (`'draft'` or `'published'`) |
| `language` | `language` | `TEXT` | Checked value (`'en'`, `'zh-TW'`, or `'bilingual'`) |
| `date` | `published_at` | `TIMESTAMPTZ` | Publication timestamp |

---

## 3. Migration Process (Markdown to Database)

To migrate local Markdown files into the Supabase database:

1. **Extraction:**
   A script reads all `.md` files under `content/blog/`.
2. **Parsing:**
   Extracts the YAML frontmatter and isolates the Markdown body.
3. **Database Insertion:**
   Runs an `INSERT` statement to populate the `posts` table on Supabase.

### Migration Script Prototype
A standard Node.js script can be executed locally to batch upload:

```javascript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; // parses frontmatter
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY');

async function migrate() {
  const blogDir = './content/blog';
  const files = fs.readdirSync(blogDir);

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    const slug = file.replace(/\.md$/, '');

    const { error } = await supabase.from('posts').insert({
      slug,
      title_en: frontmatter.title || 'Untitled',
      title_zh: frontmatter.title_zh || frontmatter.title || '未命名',
      excerpt_en: frontmatter.description || '',
      excerpt_zh: frontmatter.description_zh || frontmatter.description || '',
      content_en: body,
      content_zh: frontmatter.content_zh || body,
      cover_url: frontmatter.image || '/images/blog/coding.jpg',
      category: frontmatter.category || 'Development',
      tags: frontmatter.tags || [],
      status: frontmatter.draft ? 'draft' : 'published',
      language: frontmatter.language || 'bilingual',
      published_at: frontmatter.date ? new Date(frontmatter.date).toISOString() : new Date().toISOString()
    });

    if (error) {
      console.error(`Failed to migrate ${file}:`, error.message);
    } else {
      console.log(`Successfully migrated ${file}`);
    }
  }
}
```

---

## 4. IEEE Transactions on Multimedia Wording Guard

> [!WARNING]
> **Important Wording Constraint:**
> All migration sources and future blog articles must conform to the project wording policy:
> * **NO** claims that the research has appeared as an accepted IEEE Transactions on Multimedia publication.
> * **Correct English:** "Research submitted to IEEE Transactions on Multimedia"
> * **Correct Chinese:** "研究成果投稿於 IEEE Transactions on Multimedia"
