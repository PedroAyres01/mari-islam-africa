// Ornamentos geométricos islâmicos desenhados em SVG (autorais, gerados por código).
// khatam: estrela de oito pontas formada por dois quadrados sobrepostos.

const svgUri = s => `url("data:image/svg+xml;utf8,${encodeURIComponent(s)}")`;

function star8(cx, cy, r, inner = 0.414) {
  const pts = [];
  for (let i = 0; i < 16; i++) {
    const a = (i * Math.PI) / 8 - Math.PI / 2;
    const rr = i % 2 ? r * (1 - inner * 0.5) * 0.76 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(2)},${(cy + rr * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

// Padrão contínuo de estrelas e cruzes (khatam) para fundos.
export function khatamTile(stroke = '#c8a04a', opacity = 0.18, size = 64) {
  const s = size, h = s / 2;
  const sq = (cx, cy, r, rot) => {
    const p = [];
    for (let i = 0; i < 4; i++) {
      const a = rot + (i * Math.PI) / 2;
      p.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
    }
    return p.join(' ');
  };
  const r = s * 0.36;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}"><g fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1">
  ${[[h, h], [0, 0], [s, 0], [0, s], [s, s]].map(([x, y]) => `<polygon points="${sq(x, y, r, Math.PI / 4)}"/><polygon points="${sq(x, y, r, 0)}"/>`).join('')}
  </g></svg>`;
  return svgUri(svg);
}

// Banda de borda: cartuchos alternados com estrelas, como a moldura de um tapete ou de uma iluminura.
function bandInner({gold = '#c8a04a', ground = '#14223a', accent = '#2f7f86', cream = '#eadcc0', size = 48} = {}) {
  const s = size, h = s / 2;
  return `<rect width="${s * 2}" height="${s}" fill="${ground}"/>
  <path d="M0 ${s * 0.12}H${s * 2}M0 ${s * 0.88}H${s * 2}" stroke="${gold}" stroke-width="1.2"/>
  <path d="M0 ${s * 0.2}H${s * 2}M0 ${s * 0.8}H${s * 2}" stroke="${gold}" stroke-opacity=".45" stroke-width=".8"/>
  <polygon points="${star8(h, h, s * 0.26)}" fill="${gold}"/>
  <circle cx="${h}" cy="${h}" r="${s * 0.075}" fill="${ground}"/>
  <path d="M${s * 0.62} ${h}C${s * 0.8} ${s * 0.26} ${s * 1.2} ${s * 0.26} ${s * 1.38} ${h}C${s * 1.2} ${s * 0.74} ${s * 0.8} ${s * 0.74} ${s * 0.62} ${h}Z" fill="${accent}" stroke="${gold}" stroke-width="1"/>
  <path d="M${s * 0.82} ${h}C${s * 0.92} ${s * 0.38} ${s * 1.08} ${s * 0.38} ${s * 1.18} ${h}C${s * 1.08} ${s * 0.62} ${s * 0.92} ${s * 0.62} ${s * 0.82} ${h}Z" fill="${cream}" fill-opacity=".85"/>
  <polygon points="${star8(s * 2, h, s * 0.26)}" fill="${gold}"/><polygon points="${star8(0, h, s * 0.26)}" fill="${gold}"/>`;
}

export function bandTile(opts = {}) {
  const s = opts.size || 48;
  return svgUri(`<svg xmlns="http://www.w3.org/2000/svg" width="${s * 2}" height="${s}" viewBox="0 0 ${s * 2} ${s}">${bandInner(opts)}</svg>`);
}

// Moldura vertical (mesma banda girada) para bordas laterais.
export function bandTileV(opts = {}) {
  const s = opts.size || 48;
  return svgUri(`<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s * 2}" viewBox="0 0 ${s} ${s * 2}"><g transform="translate(${s} 0) rotate(90)">${bandInner(opts)}</g></svg>`);
}

// Roseta de canto (shamsa simplificada).
export function rosette({gold = '#c8a04a', ground = '#14223a', accent = '#2f7f86', cream = '#eadcc0'} = {}) {
  const petals = Array.from({length: 16}, (_, i) => {
    const a = (i * 360) / 16;
    return `<path transform="rotate(${a} 50 50)" d="M50 6C56 18 56 30 50 38C44 30 44 18 50 6Z" fill="${i % 2 ? accent : gold}" fill-opacity="${i % 2 ? .9 : 1}"/>`;
  }).join('');
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><circle cx="50" cy="50" r="48" fill="${ground}" stroke="${gold}" stroke-width="1.4"/>${petals}<polygon points="${star8(50, 50, 18)}" fill="${cream}"/><polygon points="${star8(50, 50, 10)}" fill="${gold}"/></svg>`;
}

// Mandala final: camadas concêntricas que giram em sentidos opostos.
export function mandalaSVG() {
  const g = '#d4ad55', t = '#2f8f95', l = '#1d3a6b', c = '#efe2c6', r = '#8e3b2e';
  const ring = (n, R, fn) => Array.from({length: n}, (_, i) => `<g transform="rotate(${(i * 360) / n} 500 500)">${fn(R)}</g>`).join('');
  const petal = (R, w, len, fill, stroke) => `<path d="M500 ${500 - R}C${500 + w} ${500 - R + len * .35} ${500 + w * .6} ${500 - R + len * .85} 500 ${500 - R + len}C${500 - w * .6} ${500 - R + len * .85} ${500 - w} ${500 - R + len * .35} 500 ${500 - R}Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  const arch = (R, w, fill) => `<path d="M${500 - w} ${500 - R + 60}Q${500 - w} ${500 - R} 500 ${500 - R - 18}Q${500 + w} ${500 - R} ${500 + w} ${500 - R + 60}Z" fill="${fill}" stroke="${g}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 1000 1000" aria-hidden="true" focusable="false">
  <defs><radialGradient id="mg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#22406f"/><stop offset="1" stop-color="#0d1a30"/></radialGradient></defs>
  <circle cx="500" cy="500" r="498" fill="url(#mg)"/>
  <g class="m-ring m-r1">${ring(32, 470, R => arch(R, 34, l))}${ring(32, 470, R => `<circle cx="500" cy="${500 - R + 28}" r="7" fill="${g}"/>`)}</g>
  <g class="m-ring m-r2">${ring(24, 400, R => petal(R, 46, 120, t, g))}${ring(24, 400, R => petal(R - 18, 22, 70, c, 'none'))}</g>
  <g class="m-ring m-r3">${ring(16, 290, R => petal(R, 62, 150, r, g))}${ring(16, 290, R => petal(R - 22, 32, 92, g, 'none'))}${ring(16, 290, R => `<polygon points="${star8(500, 500 - R - 22, 16)}" fill="${c}"/>`)}</g>
  <g class="m-ring m-r4">${ring(12, 168, R => petal(R, 52, 110, l, g))}${ring(12, 168, R => petal(R - 14, 26, 70, t, 'none'))}</g>
  <g class="m-ring m-r5"><polygon points="${star8(500, 500, 92)}" fill="${g}"/><polygon points="${star8(500, 500, 70)}" fill="${l}"/><polygon points="${star8(500, 500, 46)}" fill="${c}"/><polygon points="${star8(500, 500, 24)}" fill="${r}"/></g>
  <circle cx="500" cy="500" r="496" fill="none" stroke="${g}" stroke-width="3"/>
  <circle cx="500" cy="500" r="484" fill="none" stroke="${g}" stroke-opacity=".5" stroke-width="1.5"/>
  </svg>`;
}

export {star8};
