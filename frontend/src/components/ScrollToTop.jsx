import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position on navigation.
 *
 * A plain route change goes to the top of the page. A link carrying a hash
 * (`/about-us#leadership`, which the mega-menu now uses) scrolls to that
 * section instead — without this, ScrollToTop would jump to the top and
 * silently defeat every anchor link.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    // The target may belong to a lazily-loaded route that has not painted
    // yet, so wait a frame before looking for it.
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
