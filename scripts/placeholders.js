/* eslint-disable */
import { toCamelCase } from './aem.js';

/**
 * Fetches placeholders object from server.
 * @param {string} [prefix='default'] Location or prefix for placeholders
 * @returns {Promise<object>} Promise resolving to placeholders object
 */
export async function fetchPlaceholders(prefix = 'default') {
  window.placeholders = window.placeholders || {};
  if (!window.placeholders[prefix]) {
    window.placeholders[prefix] = new Promise((resolve) => {
      fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return {};
        })
        .then((json) => {
          const placeholders = {};
          json.data
            .filter((placeholder) => placeholder.Key)
            .forEach((placeholder) => {
              placeholders[toCamelCase(placeholder.Key)] = placeholder.Text;
            });
          window.placeholders[prefix] = placeholders;
          resolve(placeholders);
        })
        .catch(() => {
          window.placeholders[prefix] = {};
          resolve({});
        });
    });
  }
  return window.placeholders[prefix];
}
