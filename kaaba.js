// Abertura: ilustração autoral do Masjid al-Haram, em canvas 2D.
// Céu com nuvens em deriva, pórticos e minaretes, pátio de mármore e anéis de
// peregrinos que giram em sentido anti-horário (como no tawaf) em volta da Caaba.

const TAU = Math.PI * 2;

export function mountKaaba(host) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.createElement('canvas');
  canvas.className = 'kaaba-canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Ilustração do pátio da Grande Mesquita de Meca: a Caaba ao centro, envolta por anéis de peregrinos em movimento, com pórticos, minaretes e nuvens ao fundo.');
  host.append(canvas);
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, dpr = 1, geo = null, raf = 0, last = 0, running = false, visible = true;
  let sky, arcade, kaabaSprite, sprites = [], clouds = [], pilgrims = [];

  const rand = (a, b) => a + Math.random() * (b - a);
  const layer = () => { const c = document.createElement('canvas'); c.width = W * dpr; c.height = H * dpr; const x = c.getContext('2d'); x.scale(dpr, dpr); return [c, x]; };

  function computeGeo() {
    const wide = W > H * 1.05;
    const S = wide ? Math.min(W * 0.7, H * 1.25) : Math.min(W * 1.7, H * 0.95);
    const cx = wide ? W * 0.62 : W * 0.5;
    const cy = wide ? H * 0.63 : H * 0.55;
    const rx = S * 0.5, ry = rx * 0.34;
    const k = S * 0.085; // meia largura da Caaba
    return {wide, S, cx, cy, rx, ry, k, horizon: cy - ry - S * 0.02};
  }

  function paintSky() {
    const [c, x] = layer();
    const {horizon} = geo;
    const g = x.createLinearGradient(0, 0, 0, horizon + 40);
    g.addColorStop(0, '#6f93b3');
    g.addColorStop(0.45, '#a9c1cf');
    g.addColorStop(0.85, '#e7dcc4');
    g.addColorStop(1, '#efe3c8');
    x.fillStyle = g;
    x.fillRect(0, 0, W, H);
    // halo do sol baixo, quente, atrás dos pórticos
    const sun = x.createRadialGradient(geo.cx - geo.rx * 0.6, horizon, 4, geo.cx - geo.rx * 0.6, horizon, geo.S * 0.6);
    sun.addColorStop(0, 'rgba(255,236,196,.75)');
    sun.addColorStop(1, 'rgba(255,236,196,0)');
    x.fillStyle = sun;
    x.fillRect(0, 0, W, horizon + 40);
    return c;
  }

  // Nuvens como manchas de guache: elipses sobrepostas com base achatada.
  function makeCloud(scale) {
    const w = Math.round(260 * scale), h = Math.round(110 * scale);
    const c = document.createElement('canvas');
    c.width = w * dpr; c.height = h * dpr;
    const x = c.getContext('2d');
    x.scale(dpr, dpr);
    const puffs = 7 + Math.floor(Math.random() * 5);
    for (let i = 0; i < puffs; i++) {
      const px = w * (0.15 + 0.7 * (i / (puffs - 1))) + rand(-10, 10) * scale;
      const py = h * 0.62 - Math.sin((i / (puffs - 1)) * Math.PI) * h * rand(0.22, 0.38);
      const r = h * rand(0.2, 0.32);
      const g = x.createRadialGradient(px, py - r * 0.3, r * 0.1, px, py, r);
      g.addColorStop(0, 'rgba(255,251,242,.98)');
      g.addColorStop(0.7, 'rgba(244,236,222,.9)');
      g.addColorStop(1, 'rgba(244,236,222,0)');
      x.fillStyle = g;
      x.beginPath(); x.arc(px, py, r, 0, TAU); x.fill();
    }
    // sombra azulada na base
    const base = x.createLinearGradient(0, h * 0.55, 0, h * 0.8);
    base.addColorStop(0, 'rgba(150,170,190,0)');
    base.addColorStop(1, 'rgba(150,170,190,.28)');
    x.globalCompositeOperation = 'source-atop';
    x.fillStyle = base;
    x.fillRect(0, 0, w, h);
    return {c, w, h};
  }

  function paintArcade() {
    const [c, x] = layer();
    const {cx, cy, rx, ry, S, horizon} = geo;
    // pátio (mataf) em mármore claro
    const floorTop = horizon;
    const fg = x.createLinearGradient(0, floorTop, 0, H);
    fg.addColorStop(0, '#d9d2c2');
    fg.addColorStop(0.35, '#ece6da');
    fg.addColorStop(1, '#f4efe6');
    x.fillStyle = fg;
    x.fillRect(0, floorTop, W, H - floorTop);
    // anéis do piso
    x.strokeStyle = 'rgba(160,145,118,.22)';
    x.lineWidth = 1;
    for (let i = 1; i < 9; i++) { x.beginPath(); x.ellipse(cx, cy, rx * i * 0.16, ry * i * 0.16, 0, 0, TAU); x.stroke(); }

    // pórticos em dois andares, de borda a borda, com cúpulas no topo
    const baseY = horizon + S * 0.005;
    const tierH = S * 0.075;
    const top2 = baseY - tierH * 2;
    const stone = x.createLinearGradient(0, top2 - S * 0.03, 0, baseY);
    stone.addColorStop(0, '#d7c6a2');
    stone.addColorStop(1, '#bfa77b');
    x.fillStyle = stone;
    x.fillRect(0, top2, W, baseY - top2);
    const archW = S * 0.042;
    for (let tier = 0; tier < 2; tier++) {
      const y0 = baseY - tierH * (tier + 1), y1 = baseY - tierH * tier;
      const aw = archW * (tier ? 0.85 : 1);
      for (let ax = -aw; ax < W + aw; ax += aw) {
        const l = ax + aw * 0.16, r = ax + aw * 0.84, top = y0 + tierH * 0.22, spring = y0 + tierH * 0.48;
        x.fillStyle = tier ? '#5c4a35' : '#4a3a2a';
        x.beginPath();
        x.moveTo(l, y1);
        x.lineTo(l, spring);
        x.quadraticCurveTo(l, top, (l + r) / 2, top - tierH * 0.06);
        x.quadraticCurveTo(r, top, r, spring);
        x.lineTo(r, y1);
        x.closePath();
        x.fill();
      }
      x.fillStyle = '#e6d8b8';
      x.fillRect(0, y0, W, S * 0.006);
    }
    // fileira de pequenas cúpulas
    x.fillStyle = '#cdb88d';
    for (let dx = archW * 0.5; dx < W; dx += archW) {
      x.beginPath(); x.ellipse(dx, top2, archW * 0.36, S * 0.022, 0, Math.PI, TAU); x.fill();
    }
    x.fillStyle = '#efe3c8';
    x.fillRect(0, top2 - S * 0.002, W, S * 0.004);

    // minaretes
    const mins = geo.wide ? [-0.95, -0.62, -0.25, 0.28, 0.66, 1.0] : [-0.9, -0.42, 0.42, 0.9];
    mins.forEach((m, i) => {
      const mx = cx + rx * m * 1.15, mw = S * 0.014, mh = Math.min(S * (0.24 + (i % 2) * 0.04), baseY - H * 0.1 - S * 0.075);
      const yb = baseY, yt = yb - mh;
      const mg = x.createLinearGradient(mx - mw, 0, mx + mw, 0);
      mg.addColorStop(0, '#c9b385'); mg.addColorStop(0.5, '#efe1bf'); mg.addColorStop(1, '#b49a6c');
      x.fillStyle = mg;
      x.fillRect(mx - mw / 2, yt, mw, mh);
      // galerias
      x.fillStyle = '#e9dcbc';
      [0.32, 0.62].forEach(f => { x.fillRect(mx - mw * 0.95, yt + mh * f, mw * 1.9, S * 0.006); });
      x.fillStyle = '#5c4a35';
      [0.36, 0.66].forEach(f => { for (let j = -1; j <= 1; j++) x.fillRect(mx + j * mw * 0.3 - mw * 0.07, yt + mh * f, mw * 0.14, S * 0.014); });
      // ponta e remate dourado
      x.fillStyle = '#d9c79c';
      x.beginPath(); x.moveTo(mx - mw * 0.6, yt); x.lineTo(mx, yt - S * 0.05); x.lineTo(mx + mw * 0.6, yt); x.closePath(); x.fill();
      x.strokeStyle = '#c8a04a'; x.lineWidth = Math.max(1, S * 0.003);
      x.beginPath(); x.moveTo(mx, yt - S * 0.05); x.lineTo(mx, yt - S * 0.075); x.stroke();
      x.fillStyle = '#c8a04a';
      x.beginPath(); x.arc(mx, yt - S * 0.06, S * 0.004, 0, TAU); x.fill();
    });
    // sombra suave dos pórticos sobre o pátio
    const sh = x.createLinearGradient(0, baseY, 0, baseY + S * 0.05);
    sh.addColorStop(0, 'rgba(90,70,40,.22)'); sh.addColorStop(1, 'rgba(90,70,40,0)');
    x.fillStyle = sh; x.fillRect(0, baseY, W, S * 0.05);
    return c;
  }

  function paintKaaba() {
    const {k, S} = geo;
    const fw = k * 2, sw = k * 0.9, hh = k * 1.95, tilt = k * 0.34; // frente, lateral, altura, perspectiva do topo
    const pad = 8, cw = fw + sw + pad * 2, ch = hh + tilt + k * 0.5 + pad * 2;
    const c = document.createElement('canvas');
    c.width = cw * dpr; c.height = ch * dpr;
    const x = c.getContext('2d');
    x.scale(dpr, dpr);
    const ox = pad, oy = pad + tilt;
    // sombra no piso
    x.fillStyle = 'rgba(40,30,20,.28)';
    x.beginPath(); x.ellipse(ox + fw * 0.62, oy + hh + k * 0.12, fw * 0.75, k * 0.22, 0, 0, TAU); x.fill();
    // topo
    x.fillStyle = '#2a2622';
    x.beginPath(); x.moveTo(ox, oy); x.lineTo(ox + sw, oy - tilt); x.lineTo(ox + fw + sw, oy - tilt); x.lineTo(ox + fw, oy); x.closePath(); x.fill();
    // frente
    const fg = x.createLinearGradient(ox, 0, ox + fw, 0);
    fg.addColorStop(0, '#191714'); fg.addColorStop(1, '#0f0d0b');
    x.fillStyle = fg; x.fillRect(ox, oy, fw, hh);
    // lateral
    x.fillStyle = '#060505';
    x.beginPath(); x.moveTo(ox + fw, oy); x.lineTo(ox + fw + sw, oy - tilt); x.lineTo(ox + fw + sw, oy - tilt + hh); x.lineTo(ox + fw, oy + hh); x.closePath(); x.fill();
    // faixa dourada (hizam) com caligrafia sugerida por traços
    const by = oy + hh * 0.2, bh = hh * 0.1;
    x.fillStyle = '#b8903c';
    x.fillRect(ox, by, fw, bh);
    x.beginPath(); x.moveTo(ox + fw, by); x.lineTo(ox + fw + sw, by - tilt); x.lineTo(ox + fw + sw, by - tilt + bh); x.lineTo(ox + fw, by + bh); x.closePath();
    x.fillStyle = '#8e6d2c'; x.fill();
    x.strokeStyle = 'rgba(30,22,10,.55)'; x.lineWidth = Math.max(0.6, k * 0.012);
    for (let t = ox + k * 0.06; t < ox + fw - k * 0.04; t += k * 0.09) {
      x.beginPath(); x.moveTo(t, by + bh * 0.3); x.quadraticCurveTo(t + k * 0.03, by + bh * 0.85, t + k * 0.06, by + bh * 0.45); x.stroke();
    }
    // porta dourada
    const dw = fw * 0.2, dh = hh * 0.36, dx = ox + fw * 0.58, dy = oy + hh * 0.42;
    x.fillStyle = '#c8a04a'; x.fillRect(dx, dy, dw, dh);
    x.strokeStyle = '#7a5a20'; x.lineWidth = Math.max(0.8, k * 0.015);
    x.strokeRect(dx + dw * 0.12, dy + dh * 0.08, dw * 0.76, dh * 0.84);
    x.beginPath(); x.moveTo(dx + dw / 2, dy + dh * 0.08); x.lineTo(dx + dw / 2, dy + dh * 0.92); x.stroke();
    // painéis bordados sob a faixa
    x.fillStyle = 'rgba(184,144,60,.55)';
    [0.12, 0.34].forEach(f => x.fillRect(ox + fw * f, by + bh * 1.6, fw * 0.12, hh * 0.05));
    // base de mármore (shadharwan)
    x.fillStyle = '#d8d0c0'; x.fillRect(ox - 2, oy + hh - k * 0.04, fw + 2, k * 0.07);
    return {c, cw, ch, ox: ox + fw * 0.55, oy: oy + hh};
  }

  // Figuras de manto branco (ihram), em faixas concêntricas mais densas perto da Caaba.
  function makeSprites() {
    const tones = [['#fffdf7', '#d9d1c2'], ['#f4efe4', '#cfc5b2'], ['#e9e1d0', '#bfb39b'], ['#4a4036', '#2e2721']];
    return tones.map(([lit, shade]) => {
      const sz = Math.max(3, geo.k * 0.07);
      const c = document.createElement('canvas');
      c.width = Math.ceil(sz * 2 * dpr); c.height = Math.ceil(sz * 3 * dpr);
      const x = c.getContext('2d');
      x.scale(dpr, dpr);
      const g = x.createLinearGradient(sz * 0.2, 0, sz * 1.8, 0);
      g.addColorStop(0, lit); g.addColorStop(1, shade);
      x.fillStyle = 'rgba(70,55,35,.18)';
      x.beginPath(); x.ellipse(sz, sz * 2.75, sz * 0.75, sz * 0.22, 0, 0, TAU); x.fill();
      x.fillStyle = g;
      x.beginPath(); x.ellipse(sz, sz * 1.75, sz * 0.62, sz * 1.05, 0, 0, TAU); x.fill();
      x.beginPath(); x.arc(sz, sz * 0.62, sz * 0.36, 0, TAU); x.fill();
      return {c, w: sz * 2, h: sz * 3};
    });
  }

  function seedPilgrims() {
    pilgrims = [];
    const {k} = geo;
    const inner = k * 1.85, outer = geo.rx * 0.97;
    const rings = 30;
    for (let i = 0; i < rings; i++) {
      const t = i / (rings - 1);
      const r = inner + (outer - inner) * t;
      const band = 0.55 + 0.45 * Math.cos(i * 0.9);
      const density = (1 - t * 0.6) * band;
      const count = Math.round(((TAU * r) / (k * 0.085)) * density);
      const speed = (0.12 - t * 0.08) * (0.92 + Math.random() * 0.16); // rad/s, mais rápido perto do centro
      for (let j = 0; j < count; j++) {
        const tone = Math.random();
        pilgrims.push({r: r + rand(-k * 0.03, k * 0.03), a: (j / count) * TAU + rand(-0.02, 0.02), s: speed, c: tone < 0.62 ? 0 : tone < 0.88 ? 1 : tone < 0.975 ? 2 : 3});
      }
    }
  }

  function setup() {
    const r = host.getBoundingClientRect();
    W = Math.max(1, r.width); H = Math.max(1, r.height);
    dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    geo = computeGeo();
    sky = paintSky();
    arcade = paintArcade();
    kaabaSprite = paintKaaba();
    const horizon = geo.horizon;
    clouds = Array.from({length: geo.wide ? 7 : 5}, (_, i) => {
      const sc = (geo.wide ? 0.9 : 0.6) * rand(0.7, 1.35);
      const cl = makeCloud(sc);
      return {...cl, x: rand(-cl.w, W), y: rand(horizon * 0.06, horizon * 0.62), v: rand(4, 11) * (0.6 + sc * 0.4)};
    });
    sprites = makeSprites();
    seedPilgrims();
    draw(0);
  }

  function drawPilgrims(front) {
    const {cx, cy, rx, ry} = geo;
    const sy = ry / rx;
    for (const p of pilgrims) {
      const sn = Math.sin(p.a);
      if ((sn >= 0) !== front) continue;
      const px = cx + Math.cos(p.a) * p.r, py = cy + sn * p.r * sy;
      const d = 0.78 + 0.3 * (sn * 0.5 + 0.5);
      const sp = sprites[p.c];
      ctx.drawImage(sp.c, px - (sp.w * d) / 2, py - sp.h * d * 0.92, sp.w * d, sp.h * d);
    }
  }

  function draw(dt) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.drawImage(sky, 0, 0, W, H);
    for (const c of clouds) {
      c.x += c.v * dt;
      if (c.x > W + 20) c.x = -c.w - rand(20, 200);
      ctx.drawImage(c.c, c.x, c.y, c.w, c.h);
    }
    ctx.drawImage(arcade, 0, 0, W, H);
    for (const p of pilgrims) p.a -= p.s * dt; // anti-horário visto de cima
    drawPilgrims(false);
    const s = kaabaSprite;
    ctx.drawImage(s.c, geo.cx - s.ox, geo.cy - s.oy + geo.k * 0.35, s.cw, s.ch);
    drawPilgrims(true);
  }

  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    draw(dt);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || reduced || !visible || document.hidden) return;
    running = true; last = performance.now(); raf = requestAnimationFrame(frame);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  const ro = new ResizeObserver(() => { setup(); });
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
  io.observe(host);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  setup();
  start();
  return {pause: stop, resume: start};
}
