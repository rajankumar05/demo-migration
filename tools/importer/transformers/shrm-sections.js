/* eslint-disable */
/* global WebImporter */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element };
    const doc = document || element.ownerDocument;
    const sections = payload?.template?.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    const reversedSections = [...sections].reverse();

    for (const section of reversedSections) {
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;

      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.parentElement.insertBefore(sectionMetadata, sectionEl.nextSibling);
      }

      // Add section break (hr) before section if it's not the first and has content before it
      if (section.id !== 'section-1' && sectionEl.previousElementSibling) {
        const hr = doc.createElement('hr');
        sectionEl.parentElement.insertBefore(hr, sectionEl);
      }
    }
  }
}
