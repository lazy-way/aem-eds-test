/* eslint-disable */
/**
 * Converts a string to camelCase format.
 * @param {string} name - The string to convert.
 * @returns {string} - The camelCased string.
 */
export function toCamelCase(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}
/**
 * Loads a CSS file asynchronously.
 * @param {string} href - The href of the CSS file.
 */
export async function loadCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}
/**
 * Loads a script file asynchronously.
 * @param {string} src - The source URL of the script.
 * @param {object} [attrs] - Optional attributes to set on the script tag.
 */
export async function loadScript(src, attrs = {}) {
  if (!document.querySelector(`script[src="${src}"]`)) {
    const script = document.createElement('script');
    script.src = src;
    Object.entries(attrs).forEach(([key, value]) => script.setAttribute(key, value));
    document.head.appendChild(script);
  }
}
