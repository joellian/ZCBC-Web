/**
 * Convert a Strapi field to plain text.
 *
 * Accepts either a `blocks` rich-text array or a plain string, because the
 * same field can be either depending on how the content type was defined.
 * Callers used to branch on `typeof value === 'string'` themselves.
 *
 * @param {Array | string | null | undefined} value
 * @returns {string}
 */
export const extractText = (value) => {
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';
  return value
    .map((block) => block.children?.map((child) => child.text).join('') || '')
    .join(' ');
};

/**
 * Shorten text for previews, cutting on a word boundary rather than mid-word.
 *
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text || '';
  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
};

/**
 * Format an ISO date string for display.
 *
 * @param {string | null | undefined} dateString
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
