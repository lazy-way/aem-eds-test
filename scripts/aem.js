/* eslint-disable */
/* eslint-env browser */
/**
 * Converts a string to camelCase.
 * @param {string} name The unsanitized string
 * @returns {string} The camelCased name
 */
function toCamelCase(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
/**
 * Loads a CSS file into the document.
 * @param {string} href URL to the CSS file
 */
async function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.append(link);
  });
}
/**
 * Loads a non-module JavaScript file into the document.
 * @param {string} src URL to the JS file
 */
async function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    } else {
      resolve();
    }
  });
}
/**
 * Wraps inline text content within a <p> tag.
 * @param {HTMLElement} element Container element
 */
function wrapTextNodes(element) {
  element.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
      const paragraph = document.createElement('p');
      paragraph.textContent = node.textContent;
      node.replaceWith(paragraph);
    }
  });
}
/**
 * Decodes metadata from an DOM element.
 * @param {HTMLElement} element DOM element containing metadata
 * @returns {Object} Parsed metadata
 */
function readBlockConfig(element) {
  const config = {};
  element.querySelectorAll(':scope > div').forEach((row) => {
    const name = row.children[0]?.textContent.trim();
    const valueEl = row.children[1];
    if (valueEl?.querySelector('a')) {
      const links = valueEl.querySelectorAll('a');
      config[name] = links.length === 1 ? links[0].href : Array.from(links).map(link => link.href);
    } else {
      config[name] = valueEl?.textContent.trim();
    }
  });
  return config;
}
export {
  toCamelCase,
  loadCSS,
  loadScript,
  wrapTextNodes,
  readBlockConfig,
};
