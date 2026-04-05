function updateActiveSlide(block, index) {
  const slides = block.querySelectorAll('.hero-video-slide');
  const indicators = block.querySelectorAll('.hero-video-indicator');

  slides.forEach((slide, i) => {
    slide.setAttribute('aria-hidden', i !== index);
  });

  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === index);
  });

  block.dataset.activeSlide = index;
}

function showSlide(block, index) {
  const slides = block.querySelectorAll('.hero-video-slide');
  let idx = index;
  if (idx < 0) idx = slides.length - 1;
  if (idx >= slides.length) idx = 0;

  const slidesContainer = block.querySelector('.hero-video-slides');
  const target = slides[idx];
  slidesContainer.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
}

function autoPlay(block) {
  setInterval(() => {
    const current = parseInt(block.dataset.activeSlide || '0', 10);
    showSlide(block, current + 1);
  }, 6000);
}

export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 1) return;

  block.innerHTML = '';

  const slidesContainer = document.createElement('div');
  slidesContainer.classList.add('hero-video-slides');

  rows.forEach((row, idx) => {
    const slide = document.createElement('div');
    slide.classList.add('hero-video-slide');
    slide.dataset.slideIndex = idx;
    slide.setAttribute('aria-hidden', idx !== 0);

    const cols = [...row.children];

    // Col 1: image
    if (cols[0]) {
      const imgCol = document.createElement('div');
      imgCol.classList.add('hero-video-slide-image');
      while (cols[0].firstChild) imgCol.append(cols[0].firstChild);
      slide.append(imgCol);
    }

    // Col 2: content
    if (cols[1]) {
      const contentCol = document.createElement('div');
      contentCol.classList.add('hero-video-slide-content');
      while (cols[1].firstChild) contentCol.append(cols[1].firstChild);

      // Wrap CTA links
      const links = contentCol.querySelectorAll('a');
      if (links.length > 0) {
        const ctaWrapper = document.createElement('div');
        ctaWrapper.classList.add('hero-video-cta');
        links.forEach((link) => {
          const p = link.closest('p');
          if (p) ctaWrapper.append(p);
        });
        contentCol.append(ctaWrapper);
      }

      slide.append(contentCol);
    }

    slidesContainer.append(slide);
  });

  block.append(slidesContainer);

  // Navigation arrows
  if (rows.length > 1) {
    const nav = document.createElement('div');
    nav.classList.add('hero-video-nav');
    nav.innerHTML = `
      <button type="button" class="hero-video-prev" aria-label="Previous Slide"></button>
      <button type="button" class="hero-video-next" aria-label="Next Slide"></button>
    `;
    block.append(nav);

    // Indicators
    const indicators = document.createElement('div');
    indicators.classList.add('hero-video-indicators');
    rows.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('hero-video-indicator');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Show Slide ${idx + 1}`);
      dot.addEventListener('click', () => showSlide(block, idx));
      indicators.append(dot);
    });
    block.append(indicators);

    // Bind events
    block.querySelector('.hero-video-prev').addEventListener('click', () => {
      showSlide(block, parseInt(block.dataset.activeSlide || '0', 10) - 1);
    });
    block.querySelector('.hero-video-next').addEventListener('click', () => {
      showSlide(block, parseInt(block.dataset.activeSlide || '0', 10) + 1);
    });

    // Observe slides for active state
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveSlide(block, parseInt(entry.target.dataset.slideIndex, 10));
        }
      });
    }, { root: slidesContainer, threshold: 0.5 });

    block.querySelectorAll('.hero-video-slide').forEach((slide) => observer.observe(slide));

    block.dataset.activeSlide = 0;
    autoPlay(block);
  }
}
