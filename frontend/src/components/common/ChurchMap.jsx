import { church } from '../../config/church';

/**
 * The Google Maps embed for the church location.
 *
 * The same iframe (and the same 400-character embed URL) was pasted into
 * HomePage, ContactUs and VisitInfo. Pass `height` to match the surrounding
 * layout; everything else is fixed.
 */
const ChurchMap = ({ height = 350, rounded = false }) => (
  <iframe
    src={church.maps.embedUrl}
    width="100%"
    height={height}
    style={{ border: 0, borderRadius: rounded ? 'var(--radius-md)' : undefined }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title={`Map showing the location of ${church.name}`}
  />
);

export default ChurchMap;
