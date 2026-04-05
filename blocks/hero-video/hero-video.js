export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  // Identify content row and optional image row
  let contentRow = rows[0];
  let imageRow = null;

  // If first row has only an image, it's the background; content is second row
  if (rows.length > 1 && contentRow.querySelector('picture, img') && !contentRow.querySelector('h1, h2, p')) {
    imageRow = contentRow;
    [, contentRow] = rows;
  }

  // Build two-column layout
  block.innerHTML = '';

  const textCol = document.createElement('div');
  textCol.classList.add('hero-video-text');

  const imgCol = document.createElement('div');
  imgCol.classList.add('hero-video-image');

  // Move content into text column
  const contentDiv = contentRow.querySelector(':scope > div') || contentRow;
  while (contentDiv.firstChild) {
    textCol.append(contentDiv.firstChild);
  }

  // Wrap CTA links in a container
  const links = textCol.querySelectorAll('a');
  if (links.length > 0) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('hero-video-cta');
    links.forEach((link) => {
      const p = link.closest('p');
      if (p) ctaWrapper.append(p);
    });
    textCol.append(ctaWrapper);
  }

  // If there's a background image row, use it as the illustration
  if (imageRow) {
    const pic = imageRow.querySelector('picture') || imageRow.querySelector('img');
    if (pic) imgCol.append(pic);
  }

  const wrapper = document.createElement('div');
  wrapper.classList.add('hero-video-content');
  wrapper.append(textCol);
  wrapper.append(imgCol);
  block.append(wrapper);
}
