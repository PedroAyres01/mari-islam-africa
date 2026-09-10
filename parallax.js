// parallax.js — Osmo-style layered parallax on the main scroll container.
// Uses rAF loop for reliable performance on iOS touch inertia + fallback listeners.
// Multiplies element displacement by viewport height for dramatic, visible effect.

export function initParallax(mainEl) {
  if (!mainEl) return () => {};
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const q = (sel) => Array.from(mainEl.querySelectorAll(sel));
  let bg = q('.landing-hero, .journey-backdrop');
  let scene = mainEl.querySelector('.scene');
  let copy = mainEl.querySelector('.copy');
  let silhouettes = mainEl.querySelector('.cinema-silhouette');
  let stageEl = mainEl.querySelector('.stage');
  let sceneCaption = mainEl.querySelector('.scene-caption');
  let stageFoot = mainEl.querySelector('.stage-foot');

  let lastScroll = -1;
  let lastStageH = 0;
  let running = true;

  function apply() {
    if (!stageEl) return;
    const scrolled = mainEl.scrollTop;
    const stageHeight = stageEl.offsetHeight || 1;
    const vh = window.innerHeight;

    if (scrolled === lastScroll && stageHeight === lastStageH) return;
    lastScroll = scrolled;
    lastStageH = stageHeight;

    // Progress: 0 at top of stage, 1 when stage has fully scrolled past
    const progress = Math.max(0, Math.min(1, scrolled / stageHeight));
    // Extended progress that keeps growing past stage end (for reading section reveal)
    const p2 = Math.max(0, Math.min(1.5, scrolled / (stageHeight * 0.85)));

    // BACKGROUND (deepest layer): drifts down a lot + zooms in
    // Uses full viewport height as base — Osmo-style dramatic depth
    const bgY = progress * vh * 0.5;   // up to half viewport down
    const bgScale = 1 + progress * 0.15;
    for (const el of bg) {
      el.style.transform = `translate3d(0, ${bgY}px, 0) scale(${bgScale})`;
      el.style.willChange = 'transform';
    }

    // SCENE (globe): mid layer, drifts up slower
    if (scene) {
      const sceneY = -progress * vh * 0.25;
      scene.style.transform = `translate3d(0, ${sceneY}px, 0)`;
      scene.style.willChange = 'transform';
    }

    // COPY (title+text+button): foreground, moves up faster + fades
    if (copy) {
      const copyY = -progress * vh * 0.55;
      const copyOp = 1 - Math.min(1, progress * 1.4);
      copy.style.transform = `translate3d(0, ${copyY}px, 0)`;
      copy.style.opacity = String(Math.max(0, copyOp));
      copy.style.willChange = 'transform, opacity';
    }

    // SILHOUETTES: fastest foreground — dives out fast
    if (silhouettes) {
      const silY = -progress * vh * 0.6;
      silhouettes.style.transform = `translate3d(0, ${silY}px, 0)`;
      silhouettes.style.willChange = 'transform';
    }

    // STAGE CAPTION + FOOT: also drift up so they don't linger
    if (sceneCaption) {
      const capY = -progress * vh * 0.4;
      sceneCaption.style.transform = `translate3d(0, ${capY}px, 0)`;
      sceneCaption.style.opacity = String(Math.max(0, 1 - progress * 1.8));
    }
    if (stageFoot) {
      const footY = -progress * vh * 0.3;
      stageFoot.style.transform = `translate3d(0, ${footY}px, 0)`;
      stageFoot.style.opacity = String(Math.max(0, 1 - progress * 1.6));
    }
  }

  // Continuous rAF loop — reliable on iOS touch inertia
  let raf = 0;
  function loop() {
    if (!running) return;
    apply();
    raf = requestAnimationFrame(loop);
  }

  function nudge() { apply(); }
  mainEl.addEventListener('scroll', nudge, {passive: true});
  window.addEventListener('scroll', nudge, {passive: true});
  document.addEventListener('scroll', nudge, {passive: true, capture: true});
  window.addEventListener('resize', () => { lastStageH = 0; nudge(); });
  window.addEventListener('touchmove', nudge, {passive: true});

  // Refresh cached targets when DOM changes
  let refreshTimer = 0;
  function refreshTargets() {
    bg = q('.landing-hero, .journey-backdrop');
    scene = mainEl.querySelector('.scene');
    copy = mainEl.querySelector('.copy');
    silhouettes = mainEl.querySelector('.cinema-silhouette');
    stageEl = mainEl.querySelector('.stage');
    sceneCaption = mainEl.querySelector('.scene-caption');
    stageFoot = mainEl.querySelector('.stage-foot');
    lastScroll = -1;
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
    window.removeEventListener('touchmove', nudge);
  };
}
