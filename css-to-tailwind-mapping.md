# CSS to Tailwind Class Mapping

## Main Theme CSS (`themes/my-high-contrast-theme/assets/css/main.css`)

**Status: ✅ COMPLETED** - All CSS classes have been mapped to Tailwind equivalents and applied to HTML templates.

## Custom CSS (`assets/custom.css`)

**Status: ✅ COMPLETED** - All CSS classes have been mapped to Tailwind equivalents.

### Tag and Category Styles
**Original CSS:**
```css
.tag-item {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: 0.9em;
    white-space: nowrap;
    background-color: #f0f0f0;
    color: #555;
    border: 1px solid #ddd;
}

.category-item {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    margin-right: 5px;
    margin-bottom: 5px;
    font-size: 0.9em;
    white-space: nowrap;
    background-color: #2196F3;
    color: white;
}
```

**Tailwind Classes:**
- tag-item: `inline-block px-2 py-1 rounded mr-1.5 mb-1.5 text-sm whitespace-nowrap bg-gray-100 text-gray-700 border border-gray-300`
- category-item: `inline-block px-2 py-1 rounded mr-1.5 mb-1.5 text-sm whitespace-nowrap bg-blue-500 text-white`

### Translation Note
**Original CSS:**
```css
.translation-note {
    margin-top: 1em;
    padding: 0.5em 1em;
    border-left: 4px solid #ccc;
    background-color: #f8f8f8;
    color: #666;
    font-size: 0.9em;
}
```

**Tailwind Classes:**
`mt-4 px-4 py-2 border-l-4 border-gray-300 bg-gray-50 text-gray-600 text-sm`

## Main Theme CSS (`themes/my-high-contrast-theme/assets/css/main.css`)

### CSS Variables & Theme System
**Original CSS:**
```css
:root {
  --bg-color: #1a1a1a;
  --text-color: #e0e0e0;
  --link-color: #61dafb;
  --link-hover-color: #4dff58;
  --accent-bg: #282c34;
  --border-color: #444;
  --button-bg: #333;
  --button-color: #e0e0e0;
}

html[data-theme='light'] {
  --bg-color: #ffffff;
  --text-color: #222222;
  --link-color: #007acc;
  --link-hover-color: #005599;
  --accent-bg: #f8f9fa;
  --border-color: #dee2e6;
  --button-bg: #e9ecef;
  --button-color: #222222;
}
```

**Tailwind Equivalent:**
- Use `dark:` prefix for dark mode classes
- Custom colors already defined in tailwind.config.js
- Apply classes: `bg-bg-dark dark:bg-bg-light text-text-dark dark:text-text-light`

### Typography & Base Styles

#### Body Styles
**Original CSS:**
```css
body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
  line-height: 1.7;
  margin: 0;
  padding: 0;
}
```

**Tailwind Classes:**
`bg-bg-dark dark:bg-bg-light text-text-dark dark:text-text-light font-sans leading-relaxed m-0 p-0`

#### Link Styles
**Original CSS:**
```css
a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: var(--link-hover-color);
  text-decoration: underline;
}
```

**Tailwind Classes:**
`text-link-dark dark:text-link-light no-underline transition-colors duration-200 ease-in-out hover:text-link-hover-dark dark:hover:text-link-hover-light hover:underline`

#### Heading Styles
**Original CSS:**
```css
h1, h2, h3, h4, h5, h6 {
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.4em;
  margin-top: 1.5em;
  margin-bottom: 1em;
  position: relative;
}
```

**Tailwind Classes:**
`text-text-dark dark:text-text-light border-b border-border-dark dark:border-border-light pb-2 mt-6 mb-4 relative`

### Layout Components

#### Container
**Original CSS:**
```css
.container {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
```

**Tailwind Classes:**
`max-w-container mx-auto px-6`

#### Main Content
**Original CSS:**
```css
main[role="main"] {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
```

**Tailwind Classes:**
`py-8`

#### Header & Footer
**Original CSS:**
```css
header[role="banner"], footer[role="contentinfo"] {
  background-color: var(--accent-bg);
  color: var(--text-color);
  padding-top: 1.5em;
  padding-bottom: 1.5em;
}

header[role="banner"] {
  border-bottom: 1px solid var(--border-color);
}

footer[role="contentinfo"] {
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
  font-size: 0.9em;
  text-align: center;
}
```

**Tailwind Classes:**
- Header: `bg-accent-dark dark:bg-accent-light text-text-dark dark:text-text-light py-6 border-b border-border-dark dark:border-border-light`
- Footer: `bg-accent-dark dark:bg-accent-light text-text-dark dark:text-text-light py-6 border-t border-border-dark dark:border-border-light mt-8 text-sm text-center`

### Navigation

#### Navigation Container
**Original CSS:**
```css
nav {
  margin-left: auto;
  margin-right: 1rem;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}
```

**Tailwind Classes:**
- nav: `ml-auto mr-4`
- nav ul: `list-none p-0 m-0 flex justify-start gap-4`

#### Navigation Links
**Original CSS:**
```css
nav li a {
  display: block;
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: var(--text-color);
  background-color: var(--accent-bg);
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

nav li a:hover {
  background-color: var(--link-color);
  color: var(--accent-bg);
}
```

**Tailwind Classes:**
`block px-4 py-2 no-underline text-text-dark dark:text-text-light bg-accent-dark dark:bg-accent-light rounded transition-colors duration-300 ease-in-out hover:bg-link-dark dark:hover:bg-link-light hover:text-accent-dark dark:hover:text-accent-light`

#### Theme Toggle Button
**Original CSS:**
```css
button#theme-toggle {
  background-color: var(--button-bg);
  color: var(--button-color);
  border: 1px solid var(--border-color);
  padding: 0.6em 1.2em;
  cursor: pointer;
  font-size: 0.9em;
  border-radius: 8px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  white-space: nowrap;
}

button#theme-toggle:hover {
  background-color: var(--link-color);
  color: var(--accent-bg);
}
```

**Tailwind Classes:**
`bg-button-dark dark:bg-button-light text-button-dark dark:text-button-light border border-border-dark dark:border-border-light px-5 py-2.5 cursor-pointer text-sm rounded-lg transition-all duration-200 ease-in-out whitespace-nowrap hover:bg-link-dark dark:hover:bg-link-light hover:text-accent-dark dark:hover:text-accent-light`

### Content Styles

#### Article & Images
**Original CSS:**
```css
article {
  margin-bottom: 2.5rem;
}

article img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.5rem 0;
  border-radius: 8px;
}
```

**Tailwind Classes:**
- article: `mb-10`
- article img: `max-w-full h-auto block my-6 rounded-lg`

#### Code Styles
**Original CSS:**
```css
code {
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
}

pre {
  white-space: pre-wrap;
  overflow-x: auto;
}
```

**Tailwind Classes:**
- code: `break-all overflow-wrap-break-word whitespace-normal`
- pre: `whitespace-pre-wrap overflow-x-auto`

### Responsive Design (Mobile)

#### Mobile Header
**Original CSS:**
```css
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  nav {
    margin-left: 0;
    margin-right: 0;
    margin-top: 1rem;
    width: 100%;
  }
  
  nav ul {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
}
```

**Tailwind Classes:**
- .header-container: `md:flex-row flex-col md:items-center items-start`
- nav: `md:ml-auto md:mr-4 ml-0 mr-0 md:mt-0 mt-4 md:w-auto w-full`
- nav ul: `md:flex-row flex-col md:justify-start items-center md:gap-4 gap-2`

### Modal System

#### Modal Container
**Original CSS:**
```css
.image-preview-modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
}

.image-preview-modal.active {
  display: flex;
}
```

**Tailwind Classes:**
`hidden fixed z-[1000] left-0 top-0 w-full h-full overflow-auto bg-black/50 justify-center items-center active:flex`

#### Modal Content
**Original CSS:**
```css
.image-preview-content {
  margin: auto;
  display: block;
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}
```

**Tailwind Classes:**
`m-auto block max-w-[90%] max-h-[90%] object-contain`
