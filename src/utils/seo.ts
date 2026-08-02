/**
 * Utility function to dynamically update document title and meta tags for SEO
 */
export function updateMetaTags(options: {
  title: string;
  description: string;
  url?: string;
  image?: string;
}) {
  const { title, description, url = "https://ashwinshenoy.me", image = "https://ashwinshenoy.me/ashwin-shenoy.jpg" } = options;

  // Update document title
  document.title = title;

  // Helper to update or create meta tag
  const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  // Standard Meta
  setMeta('meta[name="description"]', 'name', 'description', description);

  // Open Graph
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', url);
  setMeta('meta[property="og:image"]', 'property', 'og:image', image);

  // Twitter
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
}
