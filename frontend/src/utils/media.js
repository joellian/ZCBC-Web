const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

/**
 * Resolve a Strapi media object to an absolute URL.
 *
 * Strapi returns relative paths ("/uploads/foo.jpg") for local storage but
 * absolute ones for cloud providers, so we only prepend the host when needed.
 *
 * @param {{ url?: string } | null | undefined} file
 * @returns {string | null} absolute URL, or null when there is no file
 */
export function mediaUrl(file) {
  if (!file?.url) return null;
  return file.url.startsWith('http') ? file.url : `${STRAPI_URL}${file.url}`;
}
