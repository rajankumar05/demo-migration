/* eslint-disable */
/* global WebImporter */

// Parser: cards-news
// Source: https://www.shrm.org/home
// Base block: cards
// Generated: 2026-04-05

export default function parse(element, { document }) {
  // Cards block: 2 columns per row — col 1 = image, col 2 = title + description
  // Source HTML: .storycard elements with .storycard__media (image) and .storycard__content (text)

  const storyCards = element.querySelectorAll('.storycard');
  const cells = [];

  storyCards.forEach((card) => {
    // Column 1: image
    const img = card.querySelector('.storycard__media img.cmp-image__image, .cmp-image__image');
    const imgEl = document.createElement('div');
    if (img) {
      const picture = document.createElement('img');
      picture.src = img.src;
      picture.alt = img.alt || '';
      imgEl.append(picture);
    }

    // Column 2: text content (category, title, date, description)
    const textEl = document.createElement('div');

    const category = card.querySelector('.storycard__type-text');
    if (category) {
      const catP = document.createElement('p');
      catP.textContent = category.textContent.trim();
      textEl.append(catP);
    }

    const title = card.querySelector('.storycard__title-text');
    if (title) {
      const titleLink = title.querySelector('a');
      const h = document.createElement('p');
      const strong = document.createElement('strong');
      if (titleLink) {
        const link = document.createElement('a');
        link.href = titleLink.href;
        link.textContent = titleLink.textContent.trim();
        strong.append(link);
      } else {
        strong.textContent = title.textContent.trim();
      }
      h.append(strong);
      textEl.append(h);
    }

    const date = card.querySelector('.storycard__date');
    if (date) {
      const dateP = document.createElement('p');
      dateP.textContent = date.textContent.trim();
      textEl.append(dateP);
    }

    const desc = card.querySelector('.storycard__description-text');
    if (desc) {
      const descP = document.createElement('p');
      descP.textContent = desc.textContent.trim();
      textEl.append(descP);
    }

    if (imgEl.children.length > 0 || textEl.children.length > 0) {
      cells.push([imgEl, textEl]);
    }
  });

  // Fallback: if no storycards found, try generic card pattern
  if (cells.length === 0) {
    const cardItems = element.querySelectorAll('.card, .cmp-tabscard');
    cardItems.forEach((card) => {
      const img = card.querySelector('img.cmp-image__image');
      const imgEl = document.createElement('div');
      if (img) {
        const picture = document.createElement('img');
        picture.src = img.src;
        picture.alt = img.alt || '';
        imgEl.append(picture);
      }

      const textEl = document.createElement('div');
      const heading = card.querySelector('h3, h4, h5');
      if (heading) {
        const h = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        h.append(strong);
        textEl.append(h);
      }
      const body = card.querySelector('.card__body p, .card__content p');
      if (body) textEl.append(body.cloneNode(true));

      const link = card.querySelector('.card__button-wrapper a, .button__bdl');
      if (link) {
        const linkText = link.querySelector('.button__text, .cmp-button__text');
        if (linkText) {
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = linkText.textContent.trim();
          const p = document.createElement('p');
          p.append(a);
          textEl.append(p);
        }
      }

      if (textEl.children.length > 0) {
        cells.push([imgEl, textEl]);
      }
    });
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'cards-news',
    cells,
  });

  element.replaceWith(block);
}
