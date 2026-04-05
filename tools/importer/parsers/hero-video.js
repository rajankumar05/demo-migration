/* eslint-disable */
/* global WebImporter */

// Parser: hero-video
// Source: https://www.shrm.org/home
// Base block: hero
// Generated: 2026-04-05

export default function parse(element, { document }) {
  // Extract heading (h1) from the hero embed area
  const heading = element.querySelector('.cmp-embed h1, h1');

  // Extract description text from the hero text component
  const descText = element.querySelector('#container-dfb94e53a7 .cmp-text p, .body-xl .cmp-text p');

  // Extract only the first 2 CTA buttons (Become a Member + Why Join) within the hero content area
  const heroContentArea = element.querySelector('#container-dfb94e53a7, .make-2-cols');
  const buttons = heroContentArea
    ? heroContentArea.querySelectorAll('.button__bdl')
    : [];

  const ctaElements = [];
  const maxButtons = 2;
  let count = 0;
  buttons.forEach((btn) => {
    if (count >= maxButtons) return;
    const btnText = btn.querySelector('.cmp-button__text, .button__text');
    if (btnText) {
      const link = document.createElement('a');
      link.href = btn.href;
      link.textContent = btnText.textContent.trim();
      ctaElements.push(link);
      count += 1;
    }
  });

  // Build cells matching hero block structure:
  // Row 1: background image (optional) - skip for this video hero
  // Row 2: heading + text + CTAs (all in single cell)
  const contentCell = document.createElement('div');
  if (heading) contentCell.append(heading.cloneNode(true));
  if (descText) contentCell.append(descText.cloneNode(true));
  ctaElements.forEach((cta) => {
    const p = document.createElement('p');
    p.append(cta);
    contentCell.append(p);
  });

  const cells = [
    [contentCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-video',
    cells,
  });

  element.replaceWith(block);
}
