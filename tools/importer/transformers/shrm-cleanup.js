/* eslint-disable */
/* global WebImporter */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie/consent banners, accessibility widgets, metering/paywall cards, info notification bars
    WebImporter.DOMUtils.remove(element, [
      'access-widget-ui',
      '.cmp-page__skiptomaincontent',
      '.infonotificationbar',
      '.content-metering-card',
      '.pop-over',
      'noscript',
      'link',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome: header, footer, nav, breadcrumbs
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      '.nav-wrapper',
      '.mobilemenubar',
      '.globalheader',
      '.layout-container__wave-wrapper',
      '.cmp-separator',
      'iframe',
      'source',
    ]);

    // Clean data attributes from all elements
    element.querySelectorAll('*').forEach((el) => {
      if (el.hasAttribute('onclick')) el.removeAttribute('onclick');
      if (el.hasAttribute('data-cmp-data-layer-enabled')) el.removeAttribute('data-cmp-data-layer-enabled');
      if (el.hasAttribute('data-cmp-link-accessibility-enabled')) el.removeAttribute('data-cmp-link-accessibility-enabled');
    });
  }
}
