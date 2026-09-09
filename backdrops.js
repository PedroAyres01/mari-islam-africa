// backdrops.js — procedural region-specific backdrops for each marco.
// Generated once at load via canvas 2D, cached as data URIs.
// Prevents the same 3 photos from repeating across 10 marcos.

import events from './events.json';

// Palette per region (background color + accent + highlight)
const PALETTES = {
  1:  {name: 'nile-dawn',      base: '#2a2020', top: '#7a3830', accent: '#e2a870', highlight: '#f5d69a', mode: 'dawn'},
  2:  {name: 'sahara-ocre',    base: '#3a2818', top: '#7a5432', accent: '#c88a4a', highlight: '#e6c088', mode: 'sandstorm'},
  3:  {name: 'coastal-dawn',   base: '#122028', top: '#204048', accent: '#5c8a92', highlight: '#a8c8c8', mode: 'coast'},
  4:  {name: 'cairo-night',    base: '#0e1420', top: '#1c2a44', accent: '#7a92c0', highlight: '#e8d090', mode: 'lantern'},
  5:  {name: 'ghana-gold',     base: '#2a1c10', top: '#5a3c1c', accent: '#c8a048', highlight: '#f4d878', mode: 'goldsand'},
  6:  {name: 'sahel-dusk',     base: '#2a1810', top: '#6a2828', accent: '#c86040', highlight: '#f0a668', mode: 'dusk'},
  7:  {name: 'indico-twilight', base: '#0a1620', top: '#1a3040', accent: '#3a708a', highlight: '#88bcc8', mode: 'ocean'},
  8:  {name: 'mansa-regal',    base: '#1a0e1a', top: '#4a1a3a', accent: '#c88a48', highlight: '#f4d69a', mode: 'regal'},
  9:  {name: 'niger-sunset',   base: '#2a1408', top: '#7a3020', accent: '#d87848', highlight: '#f8b878', mode: 'sunset'},
  10: {name: 'sankore-clay',   base: '#1a1408', top: '#4a3818', accent: '#a88848', highlight: '#e8c888', mode: 'parchment'},
};

// Simple pseudo-random with seed
function mulberry32(seed) {
  return function () {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawBackdrop(w, h, palette, seed) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const rng = mulberry32(seed);

  // Base radial gradient — sky above, ground below
  const grd = ctx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, palette.top);
  grd.addColorStop(0.55, palette.base);
  grd.addColorStop(1, palette.base);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Mode-specific atmosphere
  switch (palette.mode) {
    case 'dawn':
    case 'sunset':
    case 'sahel-dusk': {
      // Warm sun glow low on horizon
      const rg = ctx.createRadialGradient(w * 0.72, h * 0.62, 0, w * 0.72, h * 0.62, w * 0.55);
      rg.addColorStop(0, palette.highlight + 'cc');
      rg.addColorStop(0.35, palette.accent + '55');
      rg.addColorStop(1, 'transparent');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'sandstorm': {
      // Diffuse sand haze
      const rg = ctx.createRadialGradient(w * 0.35, h * 0.55, 0, w * 0.35, h * 0.55, w * 0.7);
      rg.addColorStop(0, palette.accent + '77');
      rg.addColorStop(1, 'transparent');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'coast':
    case 'ocean': {
      // Deep water rim glow
      const rg = ctx.createRadialGradient(w * 0.55, h * 0.4, 0, w * 0.55, h * 0.4, w * 0.6);
      rg.addColorStop(0, palette.highlight + '55');
      rg.addColorStop(1, 'transparent');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
      // Horizontal water bands
      ctx.fillStyle = palette.accent + '22';
      for (let i = 0; i < 6; i++) {
        const y = h * (0.55 + i * 0.06);
        ctx.fillRect(0, y, w, 1);
      }
      break;
    }
    case 'lantern': {
      // Multiple soft lantern-like glows
      for (let i = 0; i < 5; i++) {
        const x = rng() * w, y = h * (0.3 + rng() * 0.5), r = 90 + rng() * 180;
        const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
        rg.addColorStop(0, palette.highlight + '55');
        rg.addColorStop(1, 'transparent');
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, w, h);
      }
      break;
    }
    case 'goldsand': {
      // Radial gold burst
      const rg = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, w * 0.6);
      rg.addColorStop(0, palette.highlight + '77');
      rg.addColorStop(0.4, palette.accent + '33');
      rg.addColorStop(1, 'transparent');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'regal': {
      // Purple-gold central shaft
      const grad = ctx.createLinearGradient(w * 0.5, 0, w * 0.5, h);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, palette.accent + '44');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(w * 0.2, 0, w * 0.6, h);
      const rg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.45);
      rg.addColorStop(0, palette.highlight + '66');
      rg.addColorStop(1, 'transparent');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    case 'parchment': {
      // Warm central glow, parchment-like
      ctx.fillStyle = palette.accent + '18';
      ctx.fillRect(0, 0, w, h);
      const rg = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.7);
      rg.addColorStop(0, palette.highlight + '44');
      rg.addColorStop(1, 'transparent');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
      // Faint arabesque geometric hint — 8-point star
      ctx.save();
      ctx.translate(w * 0.7, h * 0.35);
      ctx.rotate(Math.PI / 8);
      ctx.strokeStyle = palette.accent + '35';
      ctx.lineWidth = 0.8;
      const R = 180;
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, R * 0.6, a, a + Math.PI / 4);
        ctx.stroke();
      }
      ctx.restore();
      break;
    }
  }

  // Layer 1: dust motes / particles (all backdrops get subtle particles)
  const dustCount = palette.mode === 'sandstorm' ? 240 : 90;
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < dustCount; i++) {
    const x = rng() * w, y = rng() * h;
    const size = 0.8 + rng() * 2.4;
    const alpha = 0.08 + rng() * 0.24;
    ctx.fillStyle = palette.highlight + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  // Layer 2: horizon band (all backdrops except parchment/regal)
  if (!['parchment', 'regal', 'ocean', 'coast', 'lantern'].includes(palette.mode)) {
    const horizonY = h * 0.65;
    const hg = ctx.createLinearGradient(0, horizonY - 30, 0, horizonY + 30);
    hg.addColorStop(0, 'transparent');
    hg.addColorStop(0.5, palette.accent + '33');
    hg.addColorStop(1, 'transparent');
    ctx.fillStyle = hg;
    ctx.fillRect(0, horizonY - 30, w, 60);
  }

  // Layer 3: grain
  const grain = ctx.createImageData(w, h);
  const gd = grain.data;
  for (let i = 0; i < gd.length; i += 4) {
    const n = (rng() - 0.5) * 22;
    gd[i] = 128 + n; gd[i + 1] = 128 + n; gd[i + 2] = 128 + n; gd[i + 3] = 14;
  }
  ctx.putImageData(grain, 0, 0);

  return c.toDataURL('image/webp', 0.72);
}

let cache = null;
export function getBackdrops(w = 1600, h = 900) {
  if (cache) return cache;
  cache = {};
  for (let i = 1; i <= 10; i++) {
    const palette = PALETTES[i];
    cache[i] = {
      dataUri: drawBackdrop(w, h, palette, i * 7919 + 42),
      palette,
    };
  }
  return cache;
}

export function getBackdropForMarco(idx) {
  return getBackdrops()[idx + 1];
}

export function paletteForMarco(idx) {
  return PALETTES[idx + 1];
}
