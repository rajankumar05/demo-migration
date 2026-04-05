/* eslint-disable */
/* global WebImporter */

// Parser: columns-promo
// Source: https://www.shrm.org/home
// Base block: columns
// Generated: 2026-04-05

export default function parse(element, { document }) {
  // Columns block: each row has N columns, each cell = text/images/content
  // For promo sections: typically 2 columns (text+CTA | image) or (image | text+CTA)

  // Find all direct content areas - look for the 2-col layout containers
  const colContainer = element.querySelector('.make-2-cols, .make-3-cols');

  // Strategy: find text content and image content to build 2-column row
  // Text side: headings, paragraphs, buttons
  const headings = element.querySelectorAll('.cmp-title__text, .cmp-embed h2, h2');
  const texts = element.querySelectorAll('.cmp-text p');
  const buttons = element.querySelectorAll('.button__bdl');
  const images = element.querySelectorAll('.cmp-image__image');

  // Build text column content
  const textCol = document.createElement('div');

  headings.forEach((h) => {
    const heading = document.createElement('h2');
    heading.textContent = h.textContent.trim();
    textCol.append(heading);
  });

  texts.forEach((p) => {
    textCol.append(p.cloneNode(true));
  });

  buttons.forEach((btn) => {
    const btnText = btn.querySelector('.cmp-button__text, .button__text');
    if (btnText) {
      const link = document.createElement('a');
      link.href = btn.href;
      link.textContent = btnText.textContent.trim();
      const p = document.createElement('p');
      p.append(link);
      textCol.append(p);
    }
  });

  // Build image column content
  const imgCol = document.createElement('div');
  if (images.length > 0) {
    const img = images[0];
    const picture = document.createElement('img');
    picture.src = img.src;
    picture.alt = img.alt || '';
    imgCol.append(picture);
  }

  // Build cells: [textCol, imgCol] — columns block expects N columns per row
  const cells = [];
  if (imgCol.children.length > 0 && textCol.children.length > 0) {
    cells.push([textCol, imgCol]);
  } else if (textCol.children.length > 0) {
    cells.push([textCol]);
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'columns-promo',
    cells,
  });

  element.replaceWith(block);
}
