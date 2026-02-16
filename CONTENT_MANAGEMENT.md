# Content Management System

This portfolio website now supports **content management via JSON**, allowing you to update all website content without directly editing HTML files.

## 📋 Files

- **`content.json`** - Contains all website content (text, images, links, etc.)
- **`js/content-loader.js`** - JavaScript file that loads content from JSON and updates the HTML
- **`index.html`** - Your main HTML file (can be updated manually or via JSON loader)

---

## 🚀 Quick Start

### Option 1: Manual Content Management (Current Setup)
Currently, your website loads content directly from `index.html`. All content is hardcoded in the HTML file.

**To update content:**
1. Edit `content.json` with your new content
2. Manually update the corresponding sections in `index.html`

### Option 2: Dynamic Content Loading (Recommended)
This approach loads all content from `content.json` automatically using JavaScript.

**Setup Steps:**

1. **Add the content loader script to your HTML**
   
   Open `index.html` and add this script tag before the closing `</body>` tag:
   ```html
   <script src="js/content-loader.js"></script>
   <script>
       document.addEventListener('DOMContentLoaded', loadContent);
   </script>
   ```

2. **Update content**
   
   Simply edit `content.json` and refresh your browser. All changes will be reflected automatically!

---

## 📝 How to Update Content

### Example: Adding a New Project

Open `content.json` and find the `"projects"` section:

```json
"projects": {
  "items": [
    {
      "image": "images/your-new-project.jpg",
      "category": "Mobile App",
      "title": "Your New Project",
      "description": "Description of your new project",
      "tags": ["Swift", "iOS", "SwiftUI"],
      "lightboxTitle": "Your New Project"
    }
  ]
}
```

Just add a new object to the `items` array with your project details!

### Example: Adding a New Blog Post

```json
"blog": {
  "posts": [
    {
      "url": "./blog/your-new-post.html",
      "image": "./images/blog-new.jpg",
      "category": "AI",
      "date": "Feb 20, 2026",
      "readTime": "5 min read",
      "title": "Your New Blog Post",
      "excerpt": "Brief description of your post..."
    }
  ]
}
```

### Example: Updating Contact Information

```json
"personalInfo": {
  "email": "newemail@example.com",
  "phone": "+91 1234567890",
  "location": {
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India"
  }
}
```

---

## 🎯 Content Structure

The `content.json` file is organized into these main sections:

### 1. **metadata** - Page meta information
- Page title, description, keywords
- Open Graph data for social sharing

### 2. **personalInfo** - Your personal details
- Name, email, phone, location
- Social media links
- Profile image, CV file

### 3. **navigation** - Menu items
- Navigation menu links

### 4. **hero** - Hero section
- Greeting, name, subtitle
- Tech tags, stats
- Call-to-action buttons

### 5. **about** - About section
- Journey cards with your story

### 6. **expertise** - Expertise section
- Your main service offerings

### 7. **certifications** - Certifications
- List of your certifications

### 8. **skills** - Skills section
- Technical skills
- Industries you work in

### 9. **experience** - Work experience
- Timeline of your career

### 10. **projects** - Portfolio projects
- All your projects with images, descriptions, tags

### 11. **blog** - Blog posts
- Blog post links, images, excerpts

### 12. **contact** - Contact section
- Contact cards (location, phone, email)

### 13. **cta** - Call-to-action banner
- CTA heading, buttons

### 14. **footer** - Footer content
- Footer links, contact info, copyright

---

## ✨ Benefits of Using JSON Content Management

1. **Separation of Concerns** - Keep content separate from code
2. **Easy Updates** - Edit JSON instead of HTML
3. **CMS Ready** - Can be integrated with a headless CMS
4. **Version Control** - Track content changes easily
5. **Future-Proof** - Easy to migrate to a database or CMS later

---

## 🔄 Migration Path

### Current State
Your website currently has content hardcoded in `index.html`.

### To Enable Dynamic Loading

**Step 1:** Add the script to your HTML
```html
<!-- Add before closing </body> tag -->
<script src="js/content-loader.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', loadContent);
</script>
```

**Step 2:** Test it
- Open your website in a browser
- Open browser console (F12)
- You should see: `✅ Content loaded successfully!`

**Step 3:** Update content
- Edit `content.json`
- Refresh the page
- See changes instantly!

---

## 🛠️ Advanced Usage

### Custom Content Loading

You can also load content programmatically:

```javascript
// Custom loading with callback
async function myCustomLoader() {
    await loadContent();
    console.log('Content loaded! Now doing custom stuff...');
    // Your custom code here
}

myCustomLoader();
```

### Partial Updates

The content loader is modular. You can update individual sections:

```javascript
// Update only the blog section
async function updateBlogOnly() {
    const response = await fetch('./content.json');
    const content = await response.json();
    updateBlog(content.blog);
}
```

---

## 📚 JSON Schema Reference

### Project Object
```json
{
  "image": "string - path to project image",
  "category": "string - Mobile App | Web App | AI",
  "title": "string - project title",
  "description": "string - project description",
  "tags": ["array", "of", "strings"],
  "lightboxTitle": "string - title for lightbox"
}
```

### Blog Post Object
```json
{
  "url": "string - link to blog post",
  "image": "string - path to blog image",
  "category": "string - category name",
  "date": "string - publish date",
  "readTime": "string - estimated read time",
  "title": "string - post title",
  "excerpt": "string - post excerpt"
}
```

### Experience Object
```json
{
  "period": "string - date range",
  "title": "string - job title",
  "company": "string - company name",
  "responsibilities": ["array", "of", "responsibility", "strings"]
}
```

---

## 🐛 Troubleshooting

### Content not loading?
1. Check browser console for errors (F12)
2. Ensure `content.json` is in the root directory
3. Verify JSON syntax is valid (use [JSONLint](https://jsonlint.com/))

### Images not showing?
1. Check image paths in `content.json`
2. Ensure images exist in the specified directory
3. Verify image file names match exactly (case-sensitive)

### Changes not reflecting?
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check if you're editing the correct `content.json` file

---

## 💡 Tips

1. **Always backup** - Keep a copy of your original `index.html` before switching to dynamic loading
2. **Validate JSON** - Use [JSONLint](https://jsonlint.com/) to check for syntax errors
3. **Test locally** - Test changes on localhost before deploying
4. **Image optimization** - Compress images before adding to reduce load time
5. **Consistent formatting** - Keep JSON formatting consistent for readability

---

## 🎨 Next Steps

1. **Add more content** - Expand your projects, blog posts, certifications
2. **Customize styling** - Update CSS to match your brand
3. **Integrate CMS** - Connect to headless CMS like Contentful or Strapi
4. **Add features** - Implement search, filtering, dark mode
5. **Analytics** - Track which projects get most views

---

## 📞 Support

If you need help with content management:
1. Check the browser console for error messages
2. Validate your JSON syntax
3. Review this documentation
4. Check `js/content-loader.js` comments for implementation details

---

**Last Updated:** February 16, 2026
**Version:** 1.0.0
