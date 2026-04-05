/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroVideoParser from './parsers/hero-video.js';
import columnsPromoParser from './parsers/columns-promo.js';
import cardsNewsParser from './parsers/cards-news.js';
import carouselLogosParser from './parsers/carousel-logos.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/shrm-cleanup.js';
import sectionsTransformer from './transformers/shrm-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-video': heroVideoParser,
  'columns-promo': columnsPromoParser,
  'cards-news': cardsNewsParser,
  'carousel-logos': carouselLogosParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'SHRM homepage with hero, featured content, and resource sections',
  urls: [
    'https://www.shrm.org/home',
  ],
  blocks: [
    {
      name: 'hero-video',
      instances: ['#homehero'],
    },
    {
      name: 'columns-promo',
      instances: [
        '#container-36e3c1215c .carousel.panelcontainer',
        '#container-cf1b58063b',
        '#container-33f3af7e09',
        '#container-eb06d2e4c7',
        '#container-2d53f1980e',
      ],
    },
    {
      name: 'cards-news',
      instances: [
        '.newsfeed-container.four-cards-single-row',
        '.newsfeed.list.withImage',
        '.storycard.storycard-1',
        '.storycard.storycard-3',
      ],
    },
    {
      name: 'carousel-logos',
      instances: ['.ticker-container'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '#homehero',
      style: null,
      blocks: ['hero-video'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Annual Conference Promo',
      selector: '#container-36e3c1215c',
      style: null,
      blocks: ['columns-promo'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'SHRM Certification',
      selector: '#container-cf1b58063b',
      style: 'light-blue',
      blocks: ['columns-promo'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Top Workplace News',
      selector: '#container-e8b2f0146a',
      style: null,
      blocks: ['cards-news'],
      defaultContent: ['#title-5b9fc5d4e3'],
    },
    {
      id: 'section-5',
      name: 'Impact Statistics',
      selector: '.row.counter',
      style: 'dark-blue',
      blocks: ['columns-promo'],
      defaultContent: ['.counter-title-box'],
    },
    {
      id: 'section-6',
      name: 'Membership Benefits',
      selector: '.verticalTabs.tabs',
      style: null,
      blocks: ['cards-news'],
      defaultContent: ['#title-c94e2ba5b1'],
    },
    {
      id: 'section-7',
      name: 'Executive Orders CTA',
      selector: '#container-33f3af7e09',
      style: 'blue',
      blocks: ['columns-promo'],
      defaultContent: [],
    },
    {
      id: 'section-8',
      name: 'Top Tools Programs',
      selector: '#container-eb06d2e4c7',
      style: null,
      blocks: ['cards-news'],
      defaultContent: [],
    },
    {
      id: 'section-9',
      name: 'Certification CTA',
      selector: '#container-2d53f1980e',
      style: 'blue',
      blocks: ['columns-promo'],
      defaultContent: [],
    },
    {
      id: 'section-10',
      name: 'Premier Events',
      selector: '#container-901329c209',
      style: null,
      blocks: ['cards-news'],
      defaultContent: [],
    },
    {
      id: 'section-11',
      name: 'SHRM Business',
      selector: ['#container-901329c209 ~ div', '.cmp-experiencefragment--home-carousel'],
      style: 'blue',
      blocks: [],
      defaultContent: [],
    },
    {
      id: 'section-12',
      name: 'Trusted By',
      selector: '.ticker-container',
      style: null,
      blocks: ['carousel-logos'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Remove tracking pixels and problematic URLs before built-in rules
    main.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src') || '';
      if (src.includes('usbrowserspeed.com')
        || src.includes('dpmsrv.com')
        || src.includes('everesttech.net')
        || src.includes('demdex.net')
        || src.includes('doubleclick.net')
        || src.includes('facebook.com/tr')
        || src.includes('linkedin.com/collect')
        || src.startsWith('data:image/gif')) {
        img.remove();
      }
    });

    // Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    try {
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
    } catch (e) {
      console.warn('adjustImageUrls failed:', e.message);
    }

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
