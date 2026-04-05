/* eslint-disable */
/* global WebImporter */

// Parser: carousel-logos
// Source: https://www.shrm.org/home
// Base block: carousel
// Generated: 2026-04-05

export default function parse(element, { document }) {
  // Carousel block: 2 columns per row — col 1 = image, col 2 = text (optional)
  // Source HTML: .ticker-item elements containing logo images
  // For logos, we only need the image column (no text content)

  const tickerItems = element.querySelectorAll('.ticker-item');
  const cells = [];
  const seenSrcs = new Set();

  tickerItems.forEach((item) => {
    const img = item.querySelector('img') || (item.tagName === 'IMG' ? item : null);
    if (!img) return;

    const src = img.src || img.getAttribute('src') || '';
    // Deduplicate logos (ticker often repeats items for infinite scroll)
    if (seenSrcs.has(src)) return;
    seenSrcs.add(src);

    const imgEl = document.createElement('img');
    imgEl.src = src;
    imgEl.alt = img.alt || 'Partner logo';

    // Carousel: row = [image, optional text]
    cells.push([imgEl]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'carousel-logos',
    cells,
  });

  element.replaceWith(block);
}
