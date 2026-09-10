// parallax.js — smooth scroll + parallax layers on the main scroll container.
// Uses Lenis for buttery scroll and GSAP ScrollTrigger for scroll-driven transforms.
// Preserves all existing images/elements — only applies transform on scroll.
import Lenis from 'lenis';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

export function initParallax(mainEl) {
  if (!mainEl) return () => {};

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  gsap.registerPlugin(ScrollTrigger);

  // -----------------------------
  // Lenis on the main scroll container
  // -----------------------------
  const lenis = new Lenis({
    wrapper: mainEl,
    content: mainEl.firstElementChild || mainEl,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false, // native touch on mobile stays fast
    syncTouch: false,
    infinite: false,
  });

  // Bridge Lenis into ScrollTrigger's clock
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Make ScrollTrigger use main as the scroller
  ScrollTrigger.scrollerProxy(mainEl, {
    scrollTop(value) {
      if (arguments.length) mainEl.scrollTop = value;
      return mainEl.scrollTop;
    },
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
  });
  ScrollTrigger.defaults({scroller: mainEl});

  // -----------------------------
  // Parallax layers
  // Each defines: selector, yPercent target at end of scroll, ease
  // -----------------------------
  if (reduced) {
    // Reduced motion: don't animate on scroll
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }

  // Setup once fonts/scene are ready
  const setup = () => {
    // 1) Landing hero + journey backdrop — deepest layer, slowest (moves down a bit as you scroll)
    ['.landing-hero', '.journey-backdrop'].forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.to(el, {
        yPercent: 25,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.stage',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    // 2) The 3D globe scene — mid layer, slower than copy
    const scene = document.querySelector('.scene');
    if (scene) {
      gsap.to(scene, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.stage',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    }

    // 3) Copy (title + text + button) — foreground, moves up faster to exit sooner
    const copy = document.querySelector('.copy');
    if (copy) {
      gsap.to(copy, {
        yPercent: -30,
        opacity: 0.4,
        ease: 'none',
        scrollTrigger: {
          trigger: '.stage',
          start: 'top top',
          end: 'bottom 30%',
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    }

    // 4) Silhouettes at bottom — parallax up faster than backdrop
    const silhouettes = document.querySelector('.cinema-silhouette');
    if (silhouettes) {
      gsap.to(silhouettes, {
        yPercent: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.stage',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }

    // 5) Chapter card in reading section — subtle parallax as it enters
    const chapter = document.querySelector('.reading-chapter');
    if (chapter) {
      gsap.from(chapter, {
        yPercent: 12,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chapter,
          start: 'top 90%',
          end: 'top 40%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      // Year floats up slightly slower than the rest (depth effect)
      const year = chapter.querySelector('.reading-chapter-year');
      if (year) {
        gsap.to(year, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: chapter,
            start: 'top center',
            end: 'bottom top',
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });
      }
    }

    // 6) Documentary figures — fade + rise into view
    document.querySelectorAll('.reading-doc').forEach(fig => {
      gsap.from(fig, {
        y: 60,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: fig,
          start: 'top 90%',
          end: 'top 55%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    ScrollTrigger.refresh();
  };

  // Initial + refresh on window/resize
  setup();
  window.addEventListener('load', () => ScrollTrigger.refresh());

  // Also refresh when the DOM changes (chapter card injected, docs injected later)
  const mo = new MutationObserver(() => ScrollTrigger.refresh());
  mo.observe(mainEl, {childList: true, subtree: true});

  return function destroy() {
    mo.disconnect();
    ScrollTrigger.getAll().forEach(t => t.kill());
    lenis.destroy();
  };
}
