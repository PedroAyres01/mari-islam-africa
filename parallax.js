// parallax.js — scroll-driven parallax on the main scroll container.
// Uses BOTH scroll listeners AND a continuous rAF poll — iOS Safari touch
// inertia often skips scroll events during coasting, so polling ensures
// the transform stays glued to the finger.

export function initParallax(mainEl) {
  if (!mainEl) return () => {};
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const q = (sel) => Array.from(mainEl.querySelectorAll(sel));
  let bg = q('.landing-hero, .journey-backdrop');
  let scene = mainEl.querySelector('.scene');
  let copy = mainEl.querySelector('.copy');
  let silhouettes = mainEl.querySelector('.cinema-silhouette');
  let stageEl = mainEl.querySelector('.stage');

  let lastScroll = -1;
  let lastStageH = 0;
  let running = true;

  function apply() {
    if (!stageEl) return;
    const scrolled = mainEl.scrollTop;
    const stageHeight = stageEl.offsetHeight || 1;

    // Skip work if nothing changed since last frame
    if (scrolled === lastScroll && stageHeight === lastStageH) return;
    lastScroll = scrolled;
    lastStageH = stageHeight;

    // Progress: 0 at top of stage, 1 when the stage has fully scrolled out
    const progress = Math.max(0, Math.min(1, scrolled / stageHeight));

    // Background: gentle downward drift + slight zoom (deepest layer)
    const bgY = progress * 80;
    const bgScale = 1 + progress * 0.06;
    for (const el of bg) {
      el.style.transform = `translate3d(0, ${bgY}px, 0) scale(${bgScale})`;
    }

    // Scene (globe): moves up slightly (mid layer)
    if (scene) {
      scene.style.transform = `translate3d(0, ${-progress * 60}px, 0)`;
    }

    // Copy (title+text+button): moves up faster and fades out (foreground)
    if (copy) {
      copy.style.transform = `translate3d(0, ${-progress * 160}px, 0)`;
      copy.style.opacity = String(Math.max(0, 1 - progress * 0.85));
    }

    // Silhouettes: parallax up fast
    if (silhouettes) {
      silhouettes.style.transform = `translate3d(0, ${-progress * 120}px, 0)`;
    }
  }

  // Continuous rAF loop — the reliable signal on mobile (iOS Safari fires
  // scroll events sparsely during touch inertia).
  let raf = 0;
  function loop() {
    if (!running) return;
    apply();
    raf = requestAnimationFrame(loop);
  }

  // Also listen for scroll events on multiple candidate containers so the
  // page is responsive to *some* signal even before the first rAF settles.
  function nudge() { apply(); }
  mainEl.addEventListener('scroll', nudge, {passive: true});
  window.addEventListener('scroll', nudge, {passive: true});
  document.addEventListener('scroll', nudge, {passive: true, capture: true});
  window.addEventListener('resize', nudge);
  window.addEventListener('touchmove', nudge, {passive: true});

  // Refresh cached targets when DOM changes (chapter card injected, docs, etc.)
  let refreshTimer = 0;
  function refreshTargets() {
    bg = q('.landing-hero, .journey-backdrop');
    scene = mainEl.querySelector('.scene');
    copy = mainEl.querySelector('.copy');
    silhouettes = mainEl.querySelector('.cinema-silhouette');
    stageEl = mainEl.querySelector('.stage');
    lastScroll = -1;  // force re-apply
    lastStageH = 0;
  }
  function scheduleRefresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshTargets, 200);
  }
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'childList' && (m.addedNodes.length || m.removedNodes.length)) {
        scheduleRefresh();
        return;
      }
    }
  });
  const watchTargets = [stageEl, mainEl.querySelector('#reading')].filter(Boolean);
  watchTargets.forEach(t => observer.observe(t, {childList: true}));

  // Start
  apply();
  raf = requestAnimationFrame(loop);

  return function destroy() {
    running = false;
    cancelAnimationFrame(raf);
    observer.disconnect();
    clearTimeout(refreshTimer);
    mainEl.removeEventListener('scroll', nudge);
    window.removeEventListener('scroll', nudge);
    document.removeEventListener('scroll', nudge, true);
    window.removeEventListener('resize', nudge);
    window.removeEventListener('touchmove', nudge);
  };
}
