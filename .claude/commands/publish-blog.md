# Publish Blog Post

You are helping the user publish a new blog post end-to-end. The argument $ARGUMENTS may contain the post slug name (e.g. "work-slop") or be empty, in which case detect the new/modified post.

## Site details
- Domain: bharatbheesetti.com
- Posts dir: public/posts/ (HTML files with no extension)
- Images dir: public/posts/blogpostpics/
- Blog index: public/blog
- Sitemap: public/sitemap.xml
- Styles: public/posts/styles.css
- Author: Bharat Bheesetti
- Twitter: @MisterFigs
- Firebase project: bharatbheesetti-28996

## Step 1: Identify the post

If $ARGUMENTS is provided, the post is at `public/posts/$ARGUMENTS`.
Otherwise, check `git status` and `git diff` to find new or modified files under `public/posts/`.
Read the full post file. Confirm with the user which post is being published.

## Step 2: SEO Audit

Read the post file and verify ALL of these are present and correct. Fix any that are missing:

### Required HTML head elements:
- `<html lang="en">`
- `<meta charset="UTF-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- `<link rel="stylesheet" href="styles.css">`
- `<title>[Post Title] | Bharat Bheesetti</title>`
- `<meta name="description" content="[compelling summary, under 160 chars]">`
- `<meta name="author" content="Bharat Bheesetti">`
- `<meta name="robots" content="index, follow">`
- `<link rel="canonical" href="https://bharatbheesetti.com/posts/[slug]">`

### Open Graph tags:
- `og:type` = "article"
- `og:title` = "[Post Title] | Bharat Bheesetti"
- `og:description` = same as meta description
- `og:url` = canonical URL
- `og:site_name` = "Bharat Bheesetti"

### Twitter Card tags:
- `twitter:card` = "summary"
- `twitter:site` = "@MisterFigs"
- `twitter:title` = same as og:title
- `twitter:description` = same as og:description

### Schema.org structured data (JSON-LD):
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Post Title]",
  "author": {
    "@type": "Person",
    "name": "Bharat Bheesetti",
    "url": "https://bharatbheesetti.com"
  },
  "datePublished": "YYYY-MM-DD",
  "description": "[summary]",
  "url": "https://bharatbheesetti.com/posts/[slug]"
}
```

### Post structure:
- Navigation menu with relative URLs (/, /blog, /bookshelf, /projects)
- Content in `<div id="content">`
- Images use classes: `imageresponsive`, `responsive`, or `halfresponsive`
- Images have descriptive `alt` text
- Post ends with `<a href="/blog">← Back to Blog</a>`
- Firebase analytics: `<script src="firebase-config.js"></script>` before `</body>`

Print a checklist showing pass/fail for each item. Fix any failures automatically.

## Step 3: Update blog index

Read `public/blog`. Check if the post is already listed. If not, add it at the correct chronological position in the `<ul>` list, following this format:
```html
<li> Mon YYYY&emsp;<a href="posts/[slug]"><b>[Post Title]</b></a></li><br>
```

## Step 4: Update sitemap

Read `public/sitemap.xml`. Check if the post URL is already present. If not, add it in chronological order (newest first, after the static pages), following this format:
```xml
<url>
    <loc>https://bharatbheesetti.com/posts/[slug]</loc>
    <lastmod>YYYY-MM-DD</lastmod>
</url>
```

## Step 5: Git commit and push

Stage all relevant files (post, images, blog index, sitemap) and commit:
```
feat: add blog post - [Post Title]
```
Then `git push`.

## Step 6: Firebase deploy

Run `firebase deploy` and confirm success.

## Step 7: Generate social media posts

After deployment, generate both of these for the user to copy:

### LinkedIn Post
Write a LinkedIn post that:
- Opens with a hook related to the post's core argument (NOT "I just published...")
- Is written in the author's voice (direct, opinionated, conversational - match the blog post tone)
- Keeps it to 3-5 short paragraphs
- Ends with the link to the post: https://bharatbheesetti.com/posts/[slug]
- No hashtags, no emojis, no "What do you think?" engagement bait
- Should feel like a natural LinkedIn post, not a blog summary

### Twitter/X Thread
Write a thread (3-5 tweets) that:
- First tweet is a punchy hook with no link
- Middle tweets distill the key arguments (one idea per tweet)
- Final tweet has the link: https://bharatbheesetti.com/posts/[slug]
- Matches the author's voice - direct, slightly irreverent
- Each tweet under 280 characters
- Format as 1/, 2/, 3/ etc.

Present both clearly formatted so the user can copy-paste directly.
