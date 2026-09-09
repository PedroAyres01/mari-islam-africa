// cinema.js — camadas cinematográficas sobre a experiência principal
// Letterbox 2.35:1 sutil, timecode HUD, crédito de marco (título de filme),
// silhuetas de caravana/dhow, vignette e film grain.
// + Reading cinema: chapter card, ambient particle canvas, drop cap, ornaments.
import events from './events.json';
import {gsap} from 'gsap';
import {paletteForMarco} from './backdrops.js';

const regionShort = {north: 'NORTE DA ÁFRICA', sahel: 'SAHEL', east: 'COSTA SUAÍLI'};

// Camel caravan silhouette — SVG path. Made from real silhouette proportions.
const CAMEL_SVG = `<svg viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="duneFade" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="0.55" stop-color="#000" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.6"/>
    </linearGradient>
  </defs>
  <path d="M0,220 L0,150 C120,132 240,140 360,130 C500,120 620,138 760,132 C900,126 1040,140 1180,138 C1320,136 1440,128 1600,142 L1600,220 Z" fill="url(#duneFade)"/>
  <g fill="#1a2530" opacity="0.72">
    <!-- Camel 1 (leader) -->
    <path d="M310,150 L308,120 L316,116 L318,108 L326,106 L328,114 L334,116 L332,124 L338,132 L342,146 L346,150 L344,156 L340,158 L338,150 L332,150 L328,158 L322,158 L320,150 L316,150 L314,158 L308,158 Z"/>
    <path d="M298,158 L302,150 L306,158 Z"/>
    <path d="M348,158 L352,150 L356,158 Z"/>
    <!-- rider suggestion -->
    <ellipse cx="320" cy="112" rx="4" ry="6"/>
    <!-- Camel 2 -->
    <path d="M420,153 L418,124 L426,120 L428,112 L436,110 L438,118 L444,120 L442,128 L448,136 L452,150 L456,153 L454,159 L450,161 L448,153 L442,153 L438,161 L432,161 L430,153 L426,153 L424,161 L418,161 Z" opacity="0.9"/>
    <ellipse cx="430" cy="116" rx="4" ry="6" opacity="0.9"/>
    <!-- Camel 3 -->
    <path d="M510,156 L508,130 L516,126 L518,118 L526,116 L528,124 L534,126 L532,134 L538,142 L542,153 L546,156 L544,162 L540,164 L538,156 L532,156 L528,164 L522,164 L520,156 L516,156 L514,164 L508,164 Z" opacity="0.75"/>
    <!-- Camel 4 (small, far) -->
    <path d="M610,161 L608,142 L613,140 L614,134 L619,132 L620,140 L624,142 L622,148 L626,154 L630,161 L633,163 L631,167 L629,168 L627,161 L623,161 L621,167 L617,167 L615,161 L613,161 L611,167 L608,167 Z" opacity="0.55"/>
    <!-- Camel 5 (very small, farthest) -->
    <path d="M700,166 L699,152 L703,150 L704,146 L708,145 L709,151 L712,152 L710,157 L713,161 L715,166 L717,168 L715,171 L714,171 L713,166 L710,166 L708,171 L706,171 L705,166 L703,166 L702,166 L700,171 L699,171 Z" opacity="0.4"/>
  </g>
</svg>`;

// Dhow (Suaíli sailboat) silhouette
const DHOW_SVG = `<svg viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="waveFade" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#000" stop-opacity="0"/>
      <stop offset="0.55" stop-color="#0d1e2a" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0a1620" stop-opacity="0.72"/>
    </linearGradient>
  </defs>
  <path d="M0,220 L0,170 Q160,160 320,168 T640,164 T960,168 T1280,166 T1600,170 L1600,220 Z" fill="url(#waveFade)"/>
  <g fill="#0f2130" opacity="0.75">
    <!-- Dhow 1 (main) with lateen sail -->
    <path d="M840,168 Q900,168 950,170 Q970,170 980,168 Q970,166 950,166 Q900,164 840,166 Z"/>
    <path d="M910,168 L906,120 L960,164 Z"/>
    <path d="M905,160 L906,122 L906,160 Z" stroke="#0f2130" stroke-width="1"/>
    <!-- Dhow 2 (smaller, farther) -->
    <path d="M1180,171 Q1220,171 1250,172 Q1265,172 1270,171 Q1265,170 1250,170 Q1220,169 1180,170 Z" opacity="0.7"/>
    <path d="M1215,170 L1213,138 L1250,168 Z" opacity="0.7"/>
    <!-- Dhow 3 (distant) -->
    <path d="M350,173 Q380,173 400,174 Q408,174 411,173 Q408,172 400,172 Q380,172 350,172 Z" opacity="0.5"/>
    <path d="M375,173 L374,152 L400,171 Z" opacity="0.5"/>
  </g>
</svg>`;

// Constellation lines relevant to Islamic astronomy (schematic, not real coordinates)
const CONSTELLATION_SVG = `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="#e8c584" stroke-width="0.5" fill="none" opacity="0.32">
    <!-- Al-Sufra / Cassiopeia-like -->
    <path d="M40,60 L70,40 L110,55 L150,42 L190,58"/>
    <circle cx="40" cy="60" r="1.6" fill="#f4d69b"/>
    <circle cx="70" cy="40" r="2" fill="#f4d69b"/>
    <circle cx="110" cy="55" r="1.8" fill="#f4d69b"/>
    <circle cx="150" cy="42" r="1.6" fill="#f4d69b"/>
    <circle cx="190" cy="58" r="2.2" fill="#f4d69b"/>
    <!-- Al-Nasr al-Ta'ir / Aquila-like -->
    <path d="M260,90 L285,70 L310,85 L330,110"/>
    <circle cx="260" cy="90" r="1.6" fill="#f4d69b"/>
    <circle cx="285" cy="70" r="2.4" fill="#fff2c8"/>
    <circle cx="310" cy="85" r="1.7" fill="#f4d69b"/>
    <circle cx="330" cy="110" r="1.5" fill="#f4d69b"/>
  </g>
</svg>`;

// Ornament: 8-point star with radiating lines (arabesque-inspired)
const ORNAMENT_SVG = `<svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="currentColor" fill="none" stroke-width="0.8">
    <line x1="0" y1="20" x2="76" y2="20" opacity="0.4"/>
    <line x1="124" y1="20" x2="200" y2="20" opacity="0.4"/>
    <g transform="translate(100 20)">
      <path d="M 0 -10 L 3 -3 L 10 0 L 3 3 L 0 10 L -3 3 L -10 0 L -3 -3 Z" fill="currentColor" opacity="0.6"/>
      <path d="M 0 -14 L 0 -8 M 0 8 L 0 14 M -14 0 L -8 0 M 8 0 L 14 0" opacity="0.5"/>
      <path d="M -9.9 -9.9 L -6 -6 M 9.9 -9.9 L 6 -6 M -9.9 9.9 L -6 6 M 9.9 9.9 L 6 6" opacity="0.35"/>
    </g>
  </g>
</svg>`;

// Chapter card ornament — arabesque medallion
const MEDALLION_SVG = `<svg viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <g stroke="currentColor" fill="none" stroke-width="0.6">
    <line x1="0" y1="20" x2="88" y2="20" opacity="0.3"/>
    <line x1="152" y1="20" x2="240" y2="20" opacity="0.3"/>
    <g transform="translate(120 20)">
      <circle r="12" opacity="0.32"/>
      <circle r="6" opacity="0.55"/>
      <path d="M 0 -12 L 0 12 M -12 0 L 12 0 M -8.5 -8.5 L 8.5 8.5 M 8.5 -8.5 L -8.5 8.5" opacity="0.4"/>
      <path d="M 0 -20 L 0 -14 M 0 14 L 0 20 M -20 0 L -14 0 M 14 0 L 20 0" opacity="0.6"/>
    </g>
  </g>
</svg>`;

export function createCinema({stageHost, sceneEl}) {
  // 1. Silhouette layer (caravan/dhow) at bottom of stage
  const silhouettes = document.createElement('div');
  silhouettes.className = 'cinema-silhouette';
  silhouettes.dataset.kind = 'caravan';
  silhouettes.innerHTML = CAMEL_SVG;
  stageHost.append(silhouettes);

  // 2. Constellations layer behind globe (subtle, ambient)
  const constellations = document.createElement('div');
  constellations.className = 'cinema-constellations';
  constellations.innerHTML = CONSTELLATION_SVG;
  sceneEl.append(constellations);

  // 3. Letterbox bars (top + bottom)
  const letterTop = document.createElement('div');
  letterTop.className = 'cinema-letter cinema-letter-top';
  const letterBot = document.createElement('div');
  letterBot.className = 'cinema-letter cinema-letter-bot';
  stageHost.append(letterTop, letterBot);

  // 4. Timecode HUD (persistent, top-right of stage)
  const timecode = document.createElement('div');
  timecode.className = 'cinema-timecode';
  timecode.innerHTML = `
    <span class="cinema-timecode-year"></span>
    <span class="cinema-timecode-sep"></span>
    <span class="cinema-timecode-region"></span>
    <span class="cinema-timecode-marco"></span>
  `;
  timecode.hidden = true;
  stageHost.append(timecode);

  // 5. Marco credit (huge year + title, film-credit style fade)
  const credit = document.createElement('div');
  credit.className = 'cinema-credit';
  credit.innerHTML = `
    <div class="cinema-credit-inner">
      <span class="cinema-credit-year"></span>
      <span class="cinema-credit-line"></span>
      <span class="cinema-credit-title"></span>
    </div>
  `;
  credit.hidden = true;
  stageHost.append(credit);

  // 6. Vignette (subtle, always on when in journey)
  const vignette = document.createElement('div');
  vignette.className = 'cinema-vignette';
  vignette.setAttribute('aria-hidden', 'true');
  stageHost.append(vignette);

  // 7. Film grain overlay (persistent, subtle)
  const grain = document.createElement('div');
  grain.className = 'cinema-grain';
  grain.setAttribute('aria-hidden', 'true');
  stageHost.append(grain);

  // 8. Reticle (subtle instrument-style cursor helper for globe)
  const reticle = document.createElement('div');
  reticle.className = 'cinema-reticle';
  reticle.setAttribute('aria-hidden', 'true');
  reticle.innerHTML = `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="0.5"/><path d="M20 4 v6 M20 30 v6 M4 20 h6 M30 20 h6" stroke="currentColor" stroke-width="0.6"/></svg>`;
  sceneEl.append(reticle);
  sceneEl.addEventListener('pointermove', e => {
    const r = sceneEl.getBoundingClientRect();
    reticle.style.setProperty('--rx', (e.clientX - r.left) + 'px');
    reticle.style.setProperty('--ry', (e.clientY - r.top) + 'px');
    reticle.classList.add('on');
  });
  sceneEl.addEventListener('pointerleave', () => reticle.classList.remove('on'));

  let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let creditTL = null;

  function romanCentury(year) {
    const c = Math.floor((year - 1) / 100) + 1;
    return ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII'][c-1] || String(c);
  }

  function extractYear(dateStr) {
    // "639–642" → 639, "1324–1325" → 1324, "c. 1235" → 1235, "sécs. XIII–XIV" → keep
    const m = dateStr.match(/(\d{3,4})/);
    return m ? m[1] : dateStr;
  }

  function updateSilhouetteKind(idx) {
    const e = events[idx];
    const kind = e && e.region === 'east' ? 'dhow' : 'caravan';
    if (silhouettes.dataset.kind !== kind) {
      silhouettes.dataset.kind = kind;
      silhouettes.innerHTML = kind === 'dhow' ? DHOW_SVG : CAMEL_SVG;
    }
  }

  function onMarco(idx, reducedMotion) {
    reduced = reducedMotion;
    const e = events[idx];
    if (!e) return;
    // Big credit shows the canonical year (numeric, always present).
    // Timecode HUD shows the human-readable date range (639–642, sécs. XIII–XIV, etc.)
    const yearShort = String(e.year);
    const century = romanCentury(e.year);

    // Update timecode (persistent HUD)
    timecode.hidden = false;
    timecode.querySelector('.cinema-timecode-year').textContent = e.date;
    timecode.querySelector('.cinema-timecode-sep').textContent = '·';
    timecode.querySelector('.cinema-timecode-region').textContent = regionShort[e.region] || '';
    timecode.querySelector('.cinema-timecode-marco').textContent = 'MARCO ' + String(idx + 1).padStart(2, '0');
    gsap.killTweensOf(timecode);
    gsap.fromTo(timecode, {opacity: 0, y: -6}, {opacity: 1, y: 0, duration: reduced ? 0 : 0.5, ease: 'power2.out', overwrite: true});

    // Update silhouettes for region
    updateSilhouetteKind(idx);
    if (!reduced) {
      gsap.fromTo(silhouettes, {opacity: 0}, {opacity: 1, duration: 1.2, ease: 'power2.out', overwrite: true});
    } else {
      silhouettes.style.opacity = 1;
    }

    // Letterbox pulse — bars slide in ~120px then retract to a thin permanent band ~28px
    if (reduced) {
      letterTop.style.height = '18px';
      letterBot.style.height = '18px';
    } else {
      gsap.killTweensOf([letterTop, letterBot]);
      const tl = gsap.timeline();
      tl.to([letterTop, letterBot], {height: 96, duration: 0.42, ease: 'expo.out'})
        .to([letterTop, letterBot], {height: 22, duration: 0.9, ease: 'expo.inOut'}, '+=0.18');
    }

    // Marco credit — year huge + title small (fade + tracking)
    credit.hidden = false;
    credit.querySelector('.cinema-credit-year').textContent = yearShort;
    credit.querySelector('.cinema-credit-line').textContent = century;
    credit.querySelector('.cinema-credit-title').textContent = e.title;
    if (creditTL) creditTL.kill();
    if (reduced) {
      gsap.set(credit, {opacity: 1});
      gsap.delayedCall(2.4, () => gsap.to(credit, {opacity: 0, duration: 0.6, onComplete: () => credit.hidden = true}));
    } else {
      creditTL = gsap.timeline();
      creditTL
        .fromTo(credit, {opacity: 0}, {opacity: 1, duration: 0.5, ease: 'power2.out'})
        .fromTo(credit.querySelector('.cinema-credit-year'),
          {opacity: 0, y: 40, letterSpacing: '0.4em'},
          {opacity: 1, y: 0, letterSpacing: '-0.02em', duration: 1.2, ease: 'expo.out'}, 0)
        .fromTo(credit.querySelector('.cinema-credit-line'),
          {opacity: 0, y: 20},
          {opacity: 1, y: 0, duration: 0.9, ease: 'expo.out'}, 0.2)
        .fromTo(credit.querySelector('.cinema-credit-title'),
          {opacity: 0, y: 24, letterSpacing: '0.5em'},
          {opacity: 1, y: 0, letterSpacing: '0.14em', duration: 1.2, ease: 'expo.out'}, 0.28)
        .to(credit, {opacity: 0, duration: 0.7, ease: 'power2.in', delay: 1.7, onComplete: () => credit.hidden = true});
    }
  }

  function onReset() {
    timecode.hidden = true;
    credit.hidden = true;
    gsap.to([letterTop, letterBot], {height: 0, duration: 0.35, ease: 'expo.out'});
    gsap.to(silhouettes, {opacity: 0, duration: 0.4});
  }

  function onDesignChange(designKey) {
    // Constellations visible mainly on globe/night/split/table variants
    const showStars = ['globe', 'night', 'split', 'table'].includes(designKey);
    constellations.classList.toggle('on', showStars);
  }

  // ==============================
  // READING SECTION CINEMA
  // Chapter card, ambient canvas, drop cap, ornaments
  // ==============================
  let readingCanvas, readingCtx, readingRAF = null, readingPalette = null;
  let readingHost = null, chapterCard = null;

  function initReading(host) {
    readingHost = host;
    host.classList.add('reading-cinema');

    // Ambient canvas — particles matching marco palette
    readingCanvas = document.createElement('canvas');
    readingCanvas.className = 'reading-cinema-canvas';
    readingCanvas.setAttribute('aria-hidden', 'true');
    host.prepend(readingCanvas);
    readingCtx = readingCanvas.getContext('2d');

    // Chapter card — inserted just after canvas, before existing heading
    chapterCard = document.createElement('div');
    chapterCard.className = 'reading-chapter';
    chapterCard.innerHTML = `
      <div class="reading-chapter-inner">
        <span class="reading-chapter-marco"></span>
        <span class="reading-chapter-year"></span>
        <h2 class="reading-chapter-title"></h2>
        <span class="reading-chapter-place"></span>
        <div class="reading-chapter-ornament">${MEDALLION_SVG}</div>
      </div>
    `;
    // Insert before .reading-heading
    const heading = host.querySelector('.reading-heading');
    if (heading) host.insertBefore(chapterCard, heading);
    else host.append(chapterCard);

    // Ornaments between existing evidence sections
    // Wait for #evidence to exist and inject dividers before its h3 nodes
    const evidence = host.querySelector('#evidence');
    if (evidence) {
      const nodes = Array.from(evidence.children);
      nodes.forEach((n, i) => {
        if (n.tagName === 'H3' && i > 0) {
          const div = document.createElement('div');
          div.className = 'reading-ornament';
          div.innerHTML = ORNAMENT_SVG;
          evidence.insertBefore(div, n);
        }
      });
      // Also add ornament above sources link at bottom
      const link = evidence.querySelector('#source-link');
      if (link) {
        const div = document.createElement('div');
        div.className = 'reading-ornament reading-ornament-close';
        div.innerHTML = ORNAMENT_SVG;
        evidence.insertBefore(div, link);
      }
    }

    // Documentary figure — historical materials that contrast with the cinematic backdrops
    // Inserted between paragraph and evidence. Only visible for marcos with a doc.
    const docFig = document.createElement('figure');
    docFig.className = 'reading-doc';
    docFig.hidden = true;
    docFig.innerHTML = `
      <div class="reading-doc-frame">
        <img class="reading-doc-image" alt="" loading="lazy">
      </div>
      <figcaption>
        <span class="reading-doc-kicker">EVIDÊNCIA DOCUMENTAL</span>
        <span class="reading-doc-title"></span>
        <span class="reading-doc-source"></span>
      </figcaption>
    `;
    const readingBody = host.querySelector('.reading-body');
    const evidenceEl = host.querySelector('#evidence');
    if (readingBody && evidenceEl) readingBody.insertBefore(docFig, evidenceEl);

    // Chapter close — "Próximo marco" CTA at the end of reading section
    const closer = document.createElement('div');
    closer.className = 'reading-closer';
    closer.innerHTML = `
      <div class="reading-closer-ornament">${MEDALLION_SVG}</div>
      <button class="reading-closer-cta" id="next-chapter" type="button">
        <span class="reading-closer-label">Próximo marco</span>
        <span class="reading-closer-title"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
      </button>
    `;
    // Insert closer at end of reading section
    host.append(closer);

    resizeReadingCanvas();
    new ResizeObserver(resizeReadingCanvas).observe(host);

    startReadingLoop();

    // Fade chapter card in on scroll into view
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        chapterCard.classList.toggle('in-view', entry.isIntersecting);
      });
    }, {threshold: 0.35});
    io.observe(chapterCard);
  }

  function resizeReadingCanvas() {
    if (!readingCanvas || !readingHost) return;
    const r = readingHost.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    readingCanvas.width = r.width * dpr;
    readingCanvas.height = r.height * dpr;
    readingCanvas.style.width = r.width + 'px';
    readingCanvas.style.height = r.height + 'px';
    readingCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Ambient particles state
  const readingParticles = [];
  function initReadingParticles() {
    readingParticles.length = 0;
    const w = readingCanvas.clientWidth, h = readingCanvas.clientHeight;
    for (let i = 0; i < 80; i++) {
      readingParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.08 - 0.06,
        size: 0.6 + Math.random() * 2.2,
        seed: Math.random() * 100,
        life: Math.random(),
      });
    }
  }

  let lastRT = 0;
  function readingTick(t) {
    if (!readingCanvas || !readingCtx) return;
    const dt = Math.min(60, t - lastRT);
    lastRT = t;
    const w = readingCanvas.clientWidth, h = readingCanvas.clientHeight;
    readingCtx.clearRect(0, 0, w, h);

    // Gradient wash matching palette
    if (readingPalette) {
      const grd = readingCtx.createRadialGradient(w * 0.35, h * 0.3, 0, w * 0.35, h * 0.3, Math.max(w, h) * 0.85);
      grd.addColorStop(0, readingPalette.accent + '22');
      grd.addColorStop(0.5, readingPalette.top + '18');
      grd.addColorStop(1, 'transparent');
      readingCtx.fillStyle = grd;
      readingCtx.fillRect(0, 0, w, h);

      const grd2 = readingCtx.createRadialGradient(w * 0.85, h * 0.75, 0, w * 0.85, h * 0.75, w * 0.7);
      grd2.addColorStop(0, readingPalette.highlight + '18');
      grd2.addColorStop(1, 'transparent');
      readingCtx.fillStyle = grd2;
      readingCtx.fillRect(0, 0, w, h);
    }

    // Particles
    const color = readingPalette ? readingPalette.highlight : '#e0c88a';
    readingCtx.globalCompositeOperation = 'lighter';
    for (const p of readingParticles) {
      p.x += p.vx * dt * 0.06;
      p.y += p.vy * dt * 0.06;
      p.life += 0.005;
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
      const alpha = (0.10 + 0.18 * Math.sin(p.life + p.seed)) * 0.5;
      readingCtx.fillStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      readingCtx.beginPath();
      readingCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      readingCtx.fill();
    }
    readingCtx.globalCompositeOperation = 'source-over';

    readingRAF = requestAnimationFrame(readingTick);
  }

  function startReadingLoop() {
    if (readingRAF) cancelAnimationFrame(readingRAF);
    initReadingParticles();
    if (reduced) {
      // draw once static
      readingTick(0);
      return;
    }
    readingRAF = requestAnimationFrame(readingTick);
  }

  function onReadingMarco(idx, reducedMotion) {
    reduced = reducedMotion;
    const e = events[idx];
    if (!e || !chapterCard) return;

    readingPalette = paletteForMarco(idx);
    if (readingHost) readingHost.dataset.palette = readingPalette.name;
    if (!readingRAF && !reduced) startReadingLoop();

    const marcoNum = String(idx + 1).padStart(2, '0');
    chapterCard.querySelector('.reading-chapter-marco').textContent = 'MARCO ' + marcoNum + ' DE 10';
    chapterCard.querySelector('.reading-chapter-year').textContent = e.date;
    chapterCard.querySelector('.reading-chapter-title').textContent = e.title;
    chapterCard.querySelector('.reading-chapter-place').textContent = e.place;

    // Ensure visible immediately — no fromTo animation to avoid stall issues
    const items = chapterCard.querySelectorAll('.reading-chapter-inner > *');
    gsap.killTweensOf(items);
    for (const el of items) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }

    // Update documentary figure per marco
    // idx is 0-based (marco 1 = idx 0)
    const DOCS = {
      3: {src:'./assets/doc-fatimid-dinar.jpg', title:'Dinar fatímida de ouro (al-Mustansir, 1035–1094)', source:'Fonte: Wikimedia Commons · domínio público'},
      4: {src:'./assets/doc-al-idrisi.jpg', title:'Mapa-múndi de al-Idrisi (Tabula Rogeriana, 1154)', source:'Contemporâneo aproximado dos relatos sobre Gana · Wikimedia Commons · domínio público'},
      5: {src:'./assets/doc-djenne.jpg', title:'Grande Mesquita de Djenné (reconstrução do século XX sobre modelo mande)', source:'Fotografia contemporânea · Wikimedia Commons'},
      7: {src:'./assets/doc-mansa-musa.jpg', title:'Mansa Musa no Atlas Catalão de Abraham Cresques (1375)', source:'Detalhe de fólio original · Biblioteca Nacional da França · domínio público'},
      9: {src:'./assets/doc-timbuktu-mss.jpg', title:'Manuscrito de astronomia e matemática — Timbuctu (séc. XVI)', source:'Instituto Ahmed Baba · Wikimedia Commons'},
    };
    const doc = DOCS[idx];
    const docEl = readingHost && readingHost.querySelector('.reading-doc');
    if (doc && docEl) {
      docEl.hidden = false;
      docEl.querySelector('.reading-doc-image').src = doc.src;
      docEl.querySelector('.reading-doc-image').alt = doc.title;
      docEl.querySelector('.reading-doc-title').textContent = doc.title;
      docEl.querySelector('.reading-doc-source').textContent = doc.source;
    } else if (docEl) {
      docEl.hidden = true;
    }

    // Update chapter closer CTA
    const closerBtn = readingHost && readingHost.querySelector('#next-chapter');
    const closerLabel = readingHost && readingHost.querySelector('.reading-closer-label');
    const closerTitle = readingHost && readingHost.querySelector('.reading-closer-title');
    if (closerBtn && closerLabel && closerTitle) {
      if (idx >= 9) {
        closerLabel.textContent = 'Concluir o argumento';
        closerTitle.textContent = 'Bibliografia e fontes';
      } else {
        const next = events[idx + 1];
        closerLabel.textContent = 'Próximo marco · ' + next.date;
        closerTitle.textContent = next.title;
      }
    }
  }

  function setReduced(next) {
    reduced = next;
    document.documentElement.dataset.reducedMotion = next ? 'on' : 'off';
    // Freeze/unfreeze CSS animations by adding a marker class
    document.body.classList.toggle('cinema-reduced', next);
    // Kill any in-flight GSAP animations for the cinema elements
    if (next) {
      gsap.killTweensOf([letterTop, letterBot, timecode, credit, silhouettes, constellations]);
      // Snap letterbox to permanent state
      gsap.set([letterTop, letterBot], {height: 18});
      // Ensure credit is hidden and silhouettes visible
      gsap.set(credit, {opacity: 0});
      if (credit) credit.hidden = true;
      gsap.set(silhouettes, {opacity: 0.6});
      // Stop reading-canvas particle loop
      if (readingRAF) { cancelAnimationFrame(readingRAF); readingRAF = null; }
      // Draw one static frame
      if (readingCanvas) readingTick(0);
    } else if (readingCanvas && !readingRAF) {
      startReadingLoop();
    }
  }

  return {onMarco, onReset, onDesignChange, initReading, onReadingMarco, setReduced};
}
