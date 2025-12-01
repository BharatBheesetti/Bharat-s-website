# Project Guidelines for Claude Code

## Git Workflow Best Practices

### ALWAYS Follow This Workflow

When working on ANY task in this project, Claude Code MUST:

1. **Check git status first**
   ```bash
   git status
   ```

2. **Commit or stash current changes** (if any)
   - If changes are work-in-progress from previous session:
     - Either commit them with a clear WIP message
     - Or stash them: `git stash save "WIP: description"`
   - NEVER leave uncommitted changes when switching branches

3. **Create a feature branch** (NEVER work directly on main)
   ```bash
   git checkout -b feature/descriptive-name
   ```

   Branch naming conventions:
   - `feature/seo-fixes` - New features or enhancements
   - `fix/bug-description` - Bug fixes
   - `refactor/component-name` - Code refactoring
   - `content/new-blog-post` - Content updates

4. **Make changes on the feature branch**
   - Work on the task
   - Commit frequently with clear messages
   - Follow conventional commits format:
     - `feat: add meta tags to blog posts`
     - `fix: correct firebase.json rewrite rules`
     - `docs: update README with deployment steps`
     - `style: improve CSS formatting`
     - `refactor: reorganize sitemap structure`

5. **Before deployment or PR**
   - Run any tests (if applicable)
   - Verify changes locally
   - Check `firebase deploy --only hosting:bharatbheesetti-28996` works

6. **Merge back to main** (after user approval)
   ```bash
   git checkout main
   git merge feature/branch-name
   git push origin main
   ```

---

## Project-Specific Rules

### Firebase Deployment
- **NEVER** deploy directly without testing
- Always use: `firebase deploy --only hosting:bharatbheesetti-28996`
- Preview before deploying: `firebase hosting:channel:deploy preview`

### File Structure
- Blog posts: `public/posts/[post-name]` (no .html extension)
- Images: `public/posts/blogpostpics/[image-name]`
- Pages: `public/[page-name]` (no .html extension)
- Styles: `public/styles.css` (global) and `public/posts/styles.css` (blog-specific)

### SEO Requirements
Every HTML page MUST have:
- `<meta name="description">` (150-160 chars)
- `<link rel="canonical">`
- Open Graph tags (og:title, og:description, og:url, og:image)
- Twitter Card tags
- JSON-LD structured data (for blog posts)

### Content Guidelines
- Blog post titles: Use sentence case
- Images: Optimize before committing (use WebP when possible)
- Links: Use HTTPS and absolute URLs for external links
- Internal links: Use relative paths starting with `/`

---

## Common Commands

Use the `/start-feature` command to automatically create a feature branch and commit current work.

Use the `/deploy-preview` command to create a preview deployment before going live.

---

## Quick Reference

| Task | Command |
|------|---------|
| Start new feature | `git checkout -b feature/name` |
| Commit changes | `git add . && git commit -m "feat: description"` |
| Deploy to production | `firebase deploy --only hosting:bharatbheesetti-28996` |
| Create preview | `firebase hosting:channel:deploy preview` |
| Check SEO | Use Google Search Console + Lighthouse |

---

**Last Updated:** 2025-12-02
**Maintained by:** Bharat Bheesetti + Claude Code
