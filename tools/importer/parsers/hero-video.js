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

  // Extract only the first 2 CTA buttons within the hero content area
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

  // Build heading with animated text styled as <em> (rendered blue italic by CSS)
  const h1 = document.createElement('h1');
  if (heading) {
    const animatedSpan = heading.querySelector('.animated-text');
    if (animatedSpan) {
      const staticText = heading.childNodes[0]?.textContent?.trim() || 'We Believe Work Can';
      h1.append(document.createTextNode(staticText + ' '));
      const em = document.createElement('em');
      em.textContent = 'Drive Success';
      h1.append(em);
    } else {
      h1.textContent = heading.textContent.trim();
    }
  }

  // Row 1: Background image (the hero illustration)
  const bgImg = document.createElement('img');
  bgImg.src = 'https://www.shrm.org/content/dam/en/shrm/home/shrm-home-hero-2026.png';
  bgImg.alt = 'SHRM Home Hero';

  // Row 2: Content (heading + description + CTAs)
  const contentCell = document.createElement('div');
  contentCell.append(h1);
  if (descText) contentCell.append(descText.cloneNode(true));
  ctaElements.forEach((cta) => {
    const p = document.createElement('p');
    p.append(cta);
    contentCell.append(p);
  });

  const cells = [
    [bgImg],
    [contentCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-video',
    cells,
  });

  element.replaceWith(block);
}
