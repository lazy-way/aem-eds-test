/* eslint-disable */
export const fetchPlaceholders = async () => {
  // Placeholders utility function for carousel component.
  const response = await fetch('/placeholders.json');
  return response.ok ? response.json() : {};
};
