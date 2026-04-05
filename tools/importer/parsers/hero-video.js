/* eslint-disable */
/* global WebImporter */

// Parser: hero-video (now renders as carousel with all hero slides)
// Source: https://www.shrm.org/home
// Base block: carousel
// Generated: 2026-04-05

export default function parse(element, { document }) {
  const cells = [];

  // --- Slide 1: Main Hero ---
  const heroImg = document.createElement('img');
  heroImg.src = 'https://www.shrm.org/content/dam/en/shrm/home/shrm-home-hero-2026.png';
  heroImg.alt = 'SHRM Home Hero';

  const heroContent = document.createElement('div');
  const h1 = document.createElement('h1');
  const heading = element.querySelector('.cmp-embed h1, h1');
  if (heading) {
    const staticText = heading.childNodes[0]?.textContent?.trim() || 'We Believe Work Can';
    h1.append(document.createTextNode(staticText + ' '));
    const em = document.createElement('em');
    em.textContent = 'Unlock Potential';
    h1.append(em);
  } else {
    h1.innerHTML = 'We Believe Work Can <em>Unlock Potential</em>';
  }
  heroContent.append(h1);

  const descText = element.querySelector('#container-dfb94e53a7 .cmp-text p, .body-xl .cmp-text p');
  if (descText) heroContent.append(descText.cloneNode(true));

  const heroArea = element.querySelector('#container-dfb94e53a7, .make-2-cols');
  if (heroArea) {
    const btns = heroArea.querySelectorAll('.button__bdl');
    let btnCount = 0;
    btns.forEach((btn) => {
      if (btnCount >= 2) return;
      const btnText = btn.querySelector('.cmp-button__text, .button__text');
      if (btnText) {
        const a = document.createElement('a');
        a.href = btn.href;
        a.textContent = btnText.textContent.trim();
        const p = document.createElement('p');
        p.append(a);
        heroContent.append(p);
        btnCount += 1;
      }
    });
  }
  cells.push([heroImg, heroContent]);

  // --- Slide 2: Aguilera / Annual Conference ---
  const slide1 = element.querySelector('#carousel-6016e49ff8-item-a0d8eb58ea-tabpanel, .cmp-carousel__item.previous-slide, .cmp-carousel__item:first-child');
  if (slide1) {
    const agImg = document.createElement('img');
    agImg.src = 'https://s7d9.scene7.com/is/image/shrm/annual-speaker-aguilera?ts=1775152237754&dpr=off&fmt=png-alpha&bfc=on';
    agImg.alt = 'Christina Aguilera at SHRM Annual Conference';

    const agContent = document.createElement('div');
    const agLogo = document.createElement('img');
    agLogo.src = 'https://s7d9.scene7.com/is/content/shrm/logo-shrm-26-wide-white?ts=1775152237652&dpr=off&fmt=png-alpha&bfc=on';
    agLogo.alt = 'SHRM Annual Conference 2026';
    const logoP = document.createElement('p');
    logoP.append(agLogo);
    agContent.append(logoP);

    const agH2 = document.createElement('h2');
    agH2.textContent = 'Opening Night at Annual Conference: Christina Aguilera Performs Live';
    agContent.append(agH2);

    const agBtn = document.createElement('p');
    const agLink = document.createElement('a');
    agLink.href = 'https://annual.shrm.org/';
    agLink.textContent = 'Register Today';
    agBtn.append(agLink);
    agContent.append(agBtn);

    cells.push([agImg, agContent]);
  }

  // --- Slide 3: Disney After Hours ---
  const slide2 = element.querySelector('#carousel-6016e49ff8-item-d794387189-tabpanel, #disney-banner');
  if (slide2) {
    const diImg = document.createElement('img');
    diImg.src = 'https://s7d9.scene7.com/is/image/shrm/disney-paycom-text-hollwood-studios?ts=1775152237781&dpr=off&fmt=png-alpha&bfc=on';
    diImg.alt = 'SHRM After Hours at Walt Disney World';

    const diContent = document.createElement('div');
    const diH2 = document.createElement('h2');
    diH2.textContent = 'One Night. Private Access.';
    diContent.append(diH2);

    const diBtn = document.createElement('p');
    const diLink = document.createElement('a');
    diLink.href = 'https://annual.shrm.org/after-hours';
    diLink.textContent = 'Join Us';
    diBtn.append(diLink);
    diContent.append(diBtn);

    cells.push([diImg, diContent]);
  }

  // --- Slide 4: SHRM Certification ---
  const slide3 = element.querySelector('#carousel-6016e49ff8-item-cb3ae40dab-tabpanel, .cmp-carousel__item:last-child');
  if (slide3) {
    const certImg = document.createElement('img');
    certImg.src = 'https://s7d9.scene7.com/is/image/shrm/shrm_cp_rgb_updated?ts=1775152237864&dpr=off&fmt=png-alpha&bfc=on';
    certImg.alt = 'SHRM Certification';

    const certContent = document.createElement('div');
    const certH2 = document.createElement('h2');
    certH2.textContent = 'SHRM Certification';
    certContent.append(certH2);

    const certP = document.createElement('p');
    certP.textContent = "It's time to prove you're prepared for the pivotal role an HR leader plays in transforming the workplace. The SHRM-CP and SHRM-SCP certifications measure your ability to apply HR principles to real-life situations. No other HR certification compares.";
    certContent.append(certP);

    const certBtn1 = document.createElement('p');
    const certLink1 = document.createElement('a');
    certLink1.href = 'https://www.shrm.org/shop/certification';
    certLink1.textContent = 'Apply Now';
    certBtn1.append(certLink1);
    certContent.append(certBtn1);

    const certBtn2 = document.createElement('p');
    const certLink2 = document.createElement('a');
    certLink2.href = '/credentials/certification/recertification';
    certLink2.textContent = 'Recertify Now';
    certBtn2.append(certLink2);
    certContent.append(certBtn2);

    cells.push([certImg, certContent]);
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-video',
    cells,
  });

  element.replaceWith(block);
}
