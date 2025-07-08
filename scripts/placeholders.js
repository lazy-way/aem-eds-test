// eslint-disable-next-line import/prefer-default-export
/* Auxiliary script migrated from source */
// eslint-disable-next-line import/prefer-default-export

import { toCamelCase } from './aem.js';

// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
export async function fetchPlaceholders(prefix = 'default') {
// eslint-disable-next-line import/prefer-default-export
  window.placeholders = window.placeholders || {};
// eslint-disable-next-line import/prefer-default-export
  if (!window.placeholders[prefix]) {
// eslint-disable-next-line import/prefer-default-export
    window.placeholders[prefix] = new Promise((resolve) => {
// eslint-disable-next-line import/prefer-default-export
      fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`)
// eslint-disable-next-line import/prefer-default-export
        .then((resp) => {
// eslint-disable-next-line import/prefer-default-export
          if (resp.ok) {
// eslint-disable-next-line import/prefer-default-export
            return resp.json();
// eslint-disable-next-line import/prefer-default-export
          }
// eslint-disable-next-line import/prefer-default-export
          return {};
// eslint-disable-next-line import/prefer-default-export
        }).then((json) => {
// eslint-disable-next-line import/prefer-default-export
          const placeholders = {};
// eslint-disable-next-line import/prefer-default-export
          json.data
// eslint-disable-next-line import/prefer-default-export
            .filter((placeholder) => placeholder.Key)
// eslint-disable-next-line import/prefer-default-export
            .forEach((placeholder) => {
// eslint-disable-next-line import/prefer-default-export
              placeholders[toCamelCase(placeholder.Key)] = placeholder.Text;
// eslint-disable-next-line import/prefer-default-export
            });
// eslint-disable-next-line import/prefer-default-export
          window.placeholders[prefix] = placeholders;
// eslint-disable-next-line import/prefer-default-export
          resolve(window.placeholders[prefix]);
// eslint-disable-next-line import/prefer-default-export
        }).catch(() => {
// eslint-disable-next-line import/prefer-default-export
          window.placeholders[prefix] = {};
// eslint-disable-next-line import/prefer-default-export
          resolve(window.placeholders[prefix]);
// eslint-disable-next-line import/prefer-default-export
        });
// eslint-disable-next-line import/prefer-default-export
    });
// eslint-disable-next-line import/prefer-default-export
  }
// eslint-disable-next-line import/prefer-default-export
  return window.placeholders[`${prefix}`];
// eslint-disable-next-line import/prefer-default-export
}
