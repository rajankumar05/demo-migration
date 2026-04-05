var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-video.js
  function parse(element, { document }) {
    var _a, _b;
    const heading = element.querySelector(".cmp-embed h1, h1");
    const descText = element.querySelector("#container-dfb94e53a7 .cmp-text p, .body-xl .cmp-text p");
    const heroContentArea = element.querySelector("#container-dfb94e53a7, .make-2-cols");
    const buttons = heroContentArea ? heroContentArea.querySelectorAll(".button__bdl") : [];
    const ctaElements = [];
    const maxButtons = 2;
    let count = 0;
    buttons.forEach((btn) => {
      if (count >= maxButtons) return;
      const btnText = btn.querySelector(".cmp-button__text, .button__text");
      if (btnText) {
        const link = document.createElement("a");
        link.href = btn.href;
        link.textContent = btnText.textContent.trim();
        ctaElements.push(link);
        count += 1;
      }
    });
    const h1 = document.createElement("h1");
    if (heading) {
      const animatedSpan = heading.querySelector(".animated-text");
      if (animatedSpan) {
        const staticText = ((_b = (_a = heading.childNodes[0]) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim()) || "We Believe Work Can";
        h1.append(document.createTextNode(staticText + " "));
        const em = document.createElement("em");
        em.textContent = "Drive Success";
        h1.append(em);
      } else {
        h1.textContent = heading.textContent.trim();
      }
    }
    const bgImg = document.createElement("img");
    bgImg.src = "https://www.shrm.org/content/dam/en/shrm/home/shrm-home-hero-2026.png";
    bgImg.alt = "SHRM Home Hero";
    const contentCell = document.createElement("div");
    contentCell.append(h1);
    if (descText) contentCell.append(descText.cloneNode(true));
    ctaElements.forEach((cta) => {
      const p = document.createElement("p");
      p.append(cta);
      contentCell.append(p);
    });
    const cells = [
      [bgImg],
      [contentCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "hero-video",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse2(element, { document }) {
    const colContainer = element.querySelector(".make-2-cols, .make-3-cols");
    const headings = element.querySelectorAll(".cmp-title__text, .cmp-embed h2, h2");
    const texts = element.querySelectorAll(".cmp-text p");
    const buttons = element.querySelectorAll(".button__bdl");
    const images = element.querySelectorAll(".cmp-image__image");
    const textCol = document.createElement("div");
    headings.forEach((h) => {
      const heading = document.createElement("h2");
      heading.textContent = h.textContent.trim();
      textCol.append(heading);
    });
    texts.forEach((p) => {
      textCol.append(p.cloneNode(true));
    });
    buttons.forEach((btn) => {
      const btnText = btn.querySelector(".cmp-button__text, .button__text");
      if (btnText) {
        const link = document.createElement("a");
        link.href = btn.href;
        link.textContent = btnText.textContent.trim();
        const p = document.createElement("p");
        p.append(link);
        textCol.append(p);
      }
    });
    const imgCol = document.createElement("div");
    if (images.length > 0) {
      const img = images[0];
      const picture = document.createElement("img");
      picture.src = img.src;
      picture.alt = img.alt || "";
      imgCol.append(picture);
    }
    const cells = [];
    if (imgCol.children.length > 0 && textCol.children.length > 0) {
      cells.push([textCol, imgCol]);
    } else if (textCol.children.length > 0) {
      cells.push([textCol]);
    }
    const block = WebImporter.Blocks.createBlock(document, {
      name: "columns-promo",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse3(element, { document }) {
    const storyCards = element.querySelectorAll(".storycard");
    const cells = [];
    storyCards.forEach((card) => {
      const img = card.querySelector(".storycard__media img.cmp-image__image, .cmp-image__image");
      const imgEl = document.createElement("div");
      if (img) {
        const picture = document.createElement("img");
        picture.src = img.src;
        picture.alt = img.alt || "";
        imgEl.append(picture);
      }
      const textEl = document.createElement("div");
      const category = card.querySelector(".storycard__type-text");
      if (category) {
        const catP = document.createElement("p");
        catP.textContent = category.textContent.trim();
        textEl.append(catP);
      }
      const title = card.querySelector(".storycard__title-text");
      if (title) {
        const titleLink = title.querySelector("a");
        const h = document.createElement("p");
        const strong = document.createElement("strong");
        if (titleLink) {
          const link = document.createElement("a");
          link.href = titleLink.href;
          link.textContent = titleLink.textContent.trim();
          strong.append(link);
        } else {
          strong.textContent = title.textContent.trim();
        }
        h.append(strong);
        textEl.append(h);
      }
      const date = card.querySelector(".storycard__date");
      if (date) {
        const dateP = document.createElement("p");
        dateP.textContent = date.textContent.trim();
        textEl.append(dateP);
      }
      const desc = card.querySelector(".storycard__description-text");
      if (desc) {
        const descP = document.createElement("p");
        descP.textContent = desc.textContent.trim();
        textEl.append(descP);
      }
      if (imgEl.children.length > 0 || textEl.children.length > 0) {
        cells.push([imgEl, textEl]);
      }
    });
    if (cells.length === 0) {
      const cardItems = element.querySelectorAll(".card, .cmp-tabscard");
      cardItems.forEach((card) => {
        const img = card.querySelector("img.cmp-image__image");
        const imgEl = document.createElement("div");
        if (img) {
          const picture = document.createElement("img");
          picture.src = img.src;
          picture.alt = img.alt || "";
          imgEl.append(picture);
        }
        const textEl = document.createElement("div");
        const heading = card.querySelector("h3, h4, h5");
        if (heading) {
          const h = document.createElement("p");
          const strong = document.createElement("strong");
          strong.textContent = heading.textContent.trim();
          h.append(strong);
          textEl.append(h);
        }
        const body = card.querySelector(".card__body p, .card__content p");
        if (body) textEl.append(body.cloneNode(true));
        const link = card.querySelector(".card__button-wrapper a, .button__bdl");
        if (link) {
          const linkText = link.querySelector(".button__text, .cmp-button__text");
          if (linkText) {
            const a = document.createElement("a");
            a.href = link.href;
            a.textContent = linkText.textContent.trim();
            const p = document.createElement("p");
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
      name: "cards-news",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-logos.js
  function parse4(element, { document }) {
    const tickerItems = element.querySelectorAll(".ticker-item");
    const cells = [];
    const seenSrcs = /* @__PURE__ */ new Set();
    tickerItems.forEach((item) => {
      const img = item.querySelector("img") || (item.tagName === "IMG" ? item : null);
      if (!img) return;
      const src = img.src || img.getAttribute("src") || "";
      if (seenSrcs.has(src)) return;
      seenSrcs.add(src);
      const imgEl = document.createElement("img");
      imgEl.src = src;
      imgEl.alt = img.alt || "Partner logo";
      cells.push([imgEl]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "carousel-logos",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/transformers/shrm-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "access-widget-ui",
        ".cmp-page__skiptomaincontent",
        ".infonotificationbar",
        ".content-metering-card",
        ".pop-over",
        "noscript",
        "link"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        ".nav-wrapper",
        ".mobilemenubar",
        ".globalheader",
        ".layout-container__wave-wrapper",
        ".cmp-separator",
        "iframe",
        "source"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        if (el.hasAttribute("onclick")) el.removeAttribute("onclick");
        if (el.hasAttribute("data-cmp-data-layer-enabled")) el.removeAttribute("data-cmp-data-layer-enabled");
        if (el.hasAttribute("data-cmp-link-accessibility-enabled")) el.removeAttribute("data-cmp-link-accessibility-enabled");
      });
    }
  }

  // tools/importer/transformers/shrm-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    var _a;
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element };
      const doc = document || element.ownerDocument;
      const sections = (_a = payload == null ? void 0 : payload.template) == null ? void 0 : _a.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.parentElement.insertBefore(sectionMetadata, sectionEl.nextSibling);
        }
        if (section.id !== "section-1" && sectionEl.previousElementSibling) {
          const hr = doc.createElement("hr");
          sectionEl.parentElement.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-video": parse,
    "columns-promo": parse2,
    "cards-news": parse3,
    "carousel-logos": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "SHRM homepage with hero, featured content, and resource sections",
    urls: [
      "https://www.shrm.org/home"
    ],
    blocks: [
      {
        name: "hero-video",
        instances: ["#homehero"]
      },
      {
        name: "columns-promo",
        instances: [
          "#container-36e3c1215c .carousel.panelcontainer",
          "#container-cf1b58063b",
          "#container-33f3af7e09",
          "#container-eb06d2e4c7",
          "#container-2d53f1980e"
        ]
      },
      {
        name: "cards-news",
        instances: [
          ".newsfeed-container.four-cards-single-row",
          ".newsfeed.list.withImage",
          ".storycard.storycard-1",
          ".storycard.storycard-3"
        ]
      },
      {
        name: "carousel-logos",
        instances: [".ticker-container"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "#homehero",
        style: null,
        blocks: ["hero-video"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Annual Conference Promo",
        selector: "#container-36e3c1215c",
        style: null,
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "SHRM Certification",
        selector: "#container-cf1b58063b",
        style: "light-blue",
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Top Workplace News",
        selector: "#container-e8b2f0146a",
        style: null,
        blocks: ["cards-news"],
        defaultContent: ["#title-5b9fc5d4e3"]
      },
      {
        id: "section-5",
        name: "Impact Statistics",
        selector: ".row.counter",
        style: "dark-blue",
        blocks: ["columns-promo"],
        defaultContent: [".counter-title-box"]
      },
      {
        id: "section-6",
        name: "Membership Benefits",
        selector: ".verticalTabs.tabs",
        style: null,
        blocks: ["cards-news"],
        defaultContent: ["#title-c94e2ba5b1"]
      },
      {
        id: "section-7",
        name: "Executive Orders CTA",
        selector: "#container-33f3af7e09",
        style: "blue",
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Top Tools Programs",
        selector: "#container-eb06d2e4c7",
        style: null,
        blocks: ["cards-news"],
        defaultContent: []
      },
      {
        id: "section-9",
        name: "Certification CTA",
        selector: "#container-2d53f1980e",
        style: "blue",
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-10",
        name: "Premier Events",
        selector: "#container-901329c209",
        style: null,
        blocks: ["cards-news"],
        defaultContent: []
      },
      {
        id: "section-11",
        name: "SHRM Business",
        selector: ["#container-901329c209 ~ div", ".cmp-experiencefragment--home-carousel"],
        style: "blue",
        blocks: [],
        defaultContent: []
      },
      {
        id: "section-12",
        name: "Trusted By",
        selector: ".ticker-container",
        style: null,
        blocks: ["carousel-logos"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      main.querySelectorAll("img").forEach((img) => {
        const src = img.getAttribute("src") || "";
        if (src.includes("usbrowserspeed.com") || src.includes("dpmsrv.com") || src.includes("everesttech.net") || src.includes("demdex.net") || src.includes("doubleclick.net") || src.includes("facebook.com/tr") || src.includes("linkedin.com/collect") || src.startsWith("data:image/gif")) {
          img.remove();
        }
      });
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      try {
        WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      } catch (e) {
        console.warn("adjustImageUrls failed:", e.message);
      }
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
