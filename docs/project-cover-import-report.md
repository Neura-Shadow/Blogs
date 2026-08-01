# Project Cover Import Report

Import date: 2026-08-01

Source directory: `src-legacy/assets/ProjectCard`

The importer matched filenames by explicit aliases after case-folding and removing spaces, punctuation, and slash/hyphen differences. It never used directory ordering. All six legacy source PNG SHA-256 hashes were identical before and after import.

## Source inventory and mapping

| Source filename | Extension | Width | Height | Source size | Project title | Project slug | Destination path | Status |
| --- | --- | ---: | ---: | ---: | --- | --- | --- | --- |
| `Scalable Railway Ticketing Platform.png` | `.png` | 1672 | 941 | 1,994,670 bytes | Scalable Railway Ticketing Platform | `scalable-railway-ticketing-platform` | `public/images/projects/scalable-railway-ticketing-platform.webp` | `CONVERTED_WEBP` |
| `World-Model-Guided Digital-Twin UAV Navigation Research Framework.png` | `.png` | 1672 | 941 | 2,301,442 bytes | World-Model-Guided Digital-Twin UAV Navigation Research Framework | `gwm-uav-navigation-sparse-rewards` | `public/images/projects/gwm-uav-navigation-sparse-rewards.webp` | `CONVERTED_WEBP` |
| `Scalable E-Commerce Backend Platform.png` | `.png` | 1672 | 941 | 1,632,518 bytes | Scalable E-Commerce Backend Platform | `scalable-ecommerce-platform` | `public/images/projects/scalable-ecommerce-platform.webp` | `CONVERTED_WEBP` |
| `Heterogeneous UAV-USV-UGV Swarm Collaborative System.png` | `.png` | 1672 | 941 | 2,269,436 bytes | Heterogeneous UAV-USV-UGV Swarm Collaborative System | `heterogeneous-uav-swarm-system` | `public/images/projects/heterogeneous-uav-swarm-system.webp` | `CONVERTED_WEBP` |
| `diffusion-transformer-video-anomaly-detection.png` from `public/images/blog` | `.png` | 1672 | 941 | 1,840,739 bytes | Diffusion Transformer Video Anomaly Detection | `thesis-code` | `public/images/projects/thesis-code.webp` | `MISSING_SOURCE_IMAGE` in legacy; `CONVERTED_VERIFIED_FALLBACK` |
| `Data Analysis Website Archive.png` | `.png` | 1672 | 941 | 2,707,603 bytes | Data Analysis Website Archive | `analysis-website` | `public/images/projects/analysis-website.webp` | `CONVERTED_WEBP` |
| `Face Detect Realtime Prototype.png` | `.png` | 1672 | 941 | 1,892,276 bytes | Face Detect Realtime Prototype | `face-detect-realtime` | `public/images/projects/face-detect-realtime.webp` | `CONVERTED_WEBP` |

All seven project outputs are high-quality WebP files resized without upscaling to 1600×900 using `cwebp` quality 90. The source ratio is already effectively 16:9, so no content crop was needed.

## Import summary

- Missing legacy source: `thesis-code` only; resolved with the verified existing project-specific blog cover.
- Missing final project covers: none.
- Unmatched files in `src-legacy/assets/ProjectCard`: none.
- Private repository assets imported: none.
- Source files modified or deleted: none.
- Generic placeholder used as a catalog cover: none. `project-placeholder.webp` is reserved solely for runtime image-load failures.
