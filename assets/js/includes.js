/**
 * Shared header/footer injection + {{key}} templating.
 *
 * Usage in HTML:
 *   <div data-include="header"></div>   loads components/header.html
 *   <div data-include="footer"></div>   loads components/footer.html
 *
 * Any {{key}} in text or attributes (across all pages, including injected
 * components) is replaced with window.RCVC_CONFIG[key].
 *
 * Requires a local server. fetch() does not work from file://. Use
 *   npx serve
 * from the project root.
 */
(function () {
  const CONFIG = window.RCVC_CONFIG || {};

  async function loadIncludes() {
    const targets = document.querySelectorAll('[data-include]');
    await Promise.all(
      Array.from(targets).map(async (el) => {
        const name = el.getAttribute('data-include');
        try {
          const res = await fetch(`components/${name}.html`);
          if (!res.ok) throw new Error(`${res.status} loading ${name}`);
          el.innerHTML = await res.text();
        } catch (err) {
          console.error(`[includes] Failed to load ${name}:`, err);
        }
      })
    );
  }

  function templateNode(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue && node.nodeValue.includes('{{')) {
          node.nodeValue = replace(node.nodeValue);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        for (const attr of Array.from(node.attributes)) {
          if (attr.value.includes('{{')) {
            attr.value = replace(attr.value);
          }
        }
      }
    }
  }

  function replace(str) {
    return str.replace(/\{\{\s*([\w]+)\s*\}\}/g, (_, key) =>
      CONFIG[key] !== undefined ? String(CONFIG[key]) : `{{${key}}}`
    );
  }

  function markActiveNav() {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('[data-nav]').forEach((el) => {
      if (el.getAttribute('data-nav').toLowerCase() === path) {
        el.classList.add('is-active');
      }
    });
  }

  function applyRegisterState() {
    document.querySelectorAll('[data-register]').forEach((el) => {
      if (!CONFIG.registerOpen) {
        el.classList.add('is-pending');
        if (el.tagName === 'A') {
          el.setAttribute('aria-disabled', 'true');
          el.removeAttribute('href');
        }
      } else if (CONFIG.registerUrl && CONFIG.registerUrl !== '#') {
        if (el.tagName === 'A') {
          el.setAttribute('href', CONFIG.registerUrl);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener');
        }
      }
    });
  }

  function setupRevealObserver() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );

    targets.forEach((el) => io.observe(el));
  }

  /* Scroll-triggered bloom for the section 2 pull-quote.
     Once the quote's center crosses near the viewport center, it scales
     to 2x and translates horizontally to land at viewport-center, AND
     stays bloomed (no retract). The sticky logo dims out so the bloomed
     quote doesn't overlap it. */
  function setupPullQuoteBloom() {
    const quote = document.querySelector('.pull-quote--scroll-bloom');
    if (!quote) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mark = document.querySelector('.section--why__mark');
    let bloomed = false;
    let ticking = false;

    function pageOffsets(el) {
      let x = 0, y = 0, n = el;
      while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
      return { x, y };
    }

    const update = () => {
      if (bloomed) { ticking = false; return; }

      const off = pageOffsets(quote);
      const h = quote.offsetHeight;
      const cy = off.y - window.scrollY + h / 2;
      const vh = window.innerHeight;
      const distance = Math.abs(vh / 2 - cy);

      // Trigger bloom when quote center is within 18% of viewport center
      if (distance < vh * 0.18) {
        const w = quote.offsetWidth;
        const cx = off.x - window.scrollX + w / 2;
        const xOffset = window.innerWidth / 2 - cx;
        quote.style.setProperty('--bloom-x', `${xOffset}px`);
        quote.classList.add('is-bloomed');
        if (mark) mark.classList.add('is-dimmed');
        bloomed = true;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await loadIncludes();
    templateNode(document.body);
    markActiveNav();
    applyRegisterState();
    document.body.classList.add('is-ready');
    setupRevealObserver();
    setupPullQuoteBloom();
  });
})();
