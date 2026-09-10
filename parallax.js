// parallax.js — lightweight scroll-driven parallax on the main scroll container.
// No smooth-scroll library (avoids ScrollTrigger scrollerProxy + custom scroller conflicts).
// Just a scroll listener + requestAnimationFrame that writes transform on a few layers.
// Preserves every existing element — only writes `transform` on layers we own.

export function initParallax(mainEl) {
  if (!mainEl) return () => {};
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  // Resolve targets once; if any is missing at init time, we look again later
  const q = (sel) => Array.from(mainEl.querySelectorAll(sel));

  let bg = q('.landing-hero, .journey-backdrop');
  let scene = mainEl.querySelector('.scene');
  let copy = mainEl.querySelector('.copy');
  let silhouettes = mainEl.querySelector('.cinema-silhouette');
  let stageEl = mainEl.querySelector('.stage');

  let raf = 0;
  let queued = false;

  function apply() {
    queued = false;
    if (!stageEl) return;

    const scrolled = mainEl.scrollTop;
    const stageHeight = stageEl.offsetHeight || 1;
    // Progress: 0 at top of stage, 1 at bottom of stage (clamped)
    const progress = Math.max(0, Math.min(1, scrolled / stageHeight));

    // Background: gentle downward drift + slight zoom
    const bgY = progress * 80;   // px
    const bgScale = 1 + progress * 0.06;
    for (const el of bg) {
      el.style.transform = `translate3d(0, ${bgY}px, 0) scale(${bgScale})`;
    }

    // Scene (globe): moves up slightly, fades a touch
    if (scene) {
      const sceneY = -progress * 60;
      scene.style.transform = `translate3d(0, ${sceneY}px, 0)`;
    }

    // Copy (title+text+button): moves up faster and fades out
    if (copy) {
      const copyY = -progress * 160;
      const copyOp = 1 - progress * 0.85;
      copy.style.transform = `translate3d(0, ${copyY}px, 0)`;
      copy.style.opacity = String(Math.max(0, copyOp));
    }

    // Silhouettes: parallax up faster than background
    if (silhouettes) {
      const silY = -progress * 120;
      silhouettes.style.transform = `translate3d(0, ${silY}px, 0)`;
    }
  }

  function onScroll() {
    if (queued) return;
    queued = true;
    raf = requestAnimationFrame(apply);
  }

  // Re-resolve targets when the DOM changes (chapter card, doc figures, etc.)
  // — but never trigger recomputation on mutations we cause ourselves.
  let refreshTimer = 0;
  function refreshTargets() {
    bg = q('.landing-hero, .journey-backdrop');
    scene = mainEl.querySelector('.scene');
    copy = mainEl.querySelector('.copy');
    silhouettes = mainEl.querySelector('.cinema-silhouette');
    stageEl = mainEl.querySelector('.stage');
    apply();
  }
  function scheduleRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshTargets, 200);
  }

  mainEl.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onScroll);

  // Refresh on marco changes (they modify layout without adding DOM nodes)
  const observer = new MutationObserver((mutations) => {
    // Only refresh if the mutation added/removed nodes we care about
    for (const m of mutations) {
      if (m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)) {
        scheduleRefresh();
        return;
      }
    }
  });
  // Watch only stage-level containers, not every subtree (avoids feedback loop)
  const watchTargets = [stageEl, mainEl.querySelector('#reading')].filter(Boolean);
  watchTargets.forEach(t => observer.observe(t, {childList: true}));

  // Kick once so initial position is set
  apply();

  return function destroy() {
    observer.disconnect();
    clearTimeout(refreshTimer);
    cancelAnimationFrame(raf);
    mainEl.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}
