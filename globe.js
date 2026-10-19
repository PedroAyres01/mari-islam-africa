import * as THREE from 'three';
import {events, places} from './content.js';

// Globo da viagem: Terra realista com gradação em lápis-lazúli e areia, rota dourada
// que se desenha marco a marco e um camelo (ou barco, na travessia do Mar Vermelho)
// que caminha até o lugar do marco. Rota esquemática: liga os lugares na ordem dos marcos.

const R = 2;
const CAMEL = `<svg viewBox="0 0 64 48" aria-hidden="true">
<path class="tail" d="M13 24c-3 2-4 5-4 8" fill="none" stroke="#3b2614" stroke-width="1.6" stroke-linecap="round"/>
<g class="camel-legs" stroke="#3b2614" stroke-width="2.2" stroke-linecap="round"><path class="leg l1" d="M18 29v15"/><path class="leg l2" d="M22 29v15"/><path class="leg l3" d="M43 29v15"/><path class="leg l4" d="M47 28v16"/></g>
<g class="camel-body"><path d="M12 24c0-6 5-10 10-10c3-4 6-6 9-6s6 2 8 6c2 2 4 4 5 6c2-5 4-10 7-13c2-1 5-1 7 1l3 2c1 1 0 2-1 2l-4 0c-2 3-4 8-5 13c-1 4-3 6-6 7c-6 1-15 1-22 0c-4 0-7-3-7-8z" fill="#3b2614" stroke="#e8c877" stroke-width="1.1" stroke-linejoin="round"/>
<path d="M24 14c3-1 10-1 13 1l-1 5c-4 1-8 1-11 0z" fill="#c8a04a"/><path d="M25 17h11" stroke="#8e3b2e" stroke-width="1.2"/></g></svg>`;
const BOAT = `<svg viewBox="0 0 64 48" aria-hidden="true"><path d="M6 32h52l-7 9H14z" fill="#3b2614" stroke="#e8c877" stroke-width="1.2"/><path d="M30 31V6l-18 23z" fill="#efe2c6" stroke="#c8a04a" stroke-width="1.2"/><path d="M33 31V10l14 19z" fill="#e3d2ae" stroke="#c8a04a" stroke-width="1.2"/><path class="wave" d="M2 44c6-3 10 3 16 0s10 3 16 0 10 3 16 0 10 3 12 1" fill="none" stroke="#7fb2c4" stroke-width="1.6"/></svg>`;

function toVec(lon, lat, r = R) {
  const a = THREE.MathUtils.degToRad(lon), b = THREE.MathUtils.degToRad(lat);
  return new THREE.Vector3(r * Math.cos(b) * Math.cos(a), r * Math.sin(b), -r * Math.cos(b) * Math.sin(a));
}

// Arco de círculo máximo entre dois pontos, levemente elevado no meio.
function arc(p, q, steps = 48, lift = 0.06) {
  const a = p.clone().normalize(), b = q.clone().normalize();
  const ang = a.angleTo(b);
  const out = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const v = ang < 1e-4 ? a.clone() : a.clone().multiplyScalar(Math.sin((1 - t) * ang) / Math.sin(ang)).add(b.clone().multiplyScalar(Math.sin(t * ang) / Math.sin(ang)));
    out.push(v.normalize().multiplyScalar(R + 0.02 + Math.sin(t * Math.PI) * lift * Math.min(1, ang * 2)));
  }
  return out;
}

export async function createGlobe(host) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try { renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); }
  catch { host.dataset.engine = 'off'; return {focus() {}, reset() {}}; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.className = 'globe-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 8.6);
  const group = new THREE.Group();
  scene.add(group, new THREE.HemisphereLight(0xfff4dc, 0x203458, 2.1));
  const sun = new THREE.DirectionalLight(0xffefd0, 2.6);
  sun.position.set(-5, 4, 7);
  scene.add(sun);

  const loader = new THREE.TextureLoader();
  const [color, normal, spec] = await Promise.all(['earth-color', 'earth-normal', 'earth-specular'].map(n => loader.loadAsync(`./assets/${n}.jpg`).catch(() => null)));
  if (color) { color.colorSpace = THREE.SRGBColorSpace; color.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy()); }
  const mat = new THREE.MeshPhongMaterial({map: color, normalMap: normal, normalScale: new THREE.Vector2(0.25, 0.25), specularMap: spec, specular: new THREE.Color(0x2a3d58), shininess: 12, transparent: true, depthWrite: false});
  // Gradação de iluminura: oceanos puxados para o lápis-lazúli, terras para areia e ocre.
  mat.onBeforeCompile = sh => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <dithering_fragment>', `#include <dithering_fragment>
      vec3 c = gl_FragColor.rgb;
      float l = dot(c, vec3(0.299,0.587,0.114));
      float water = smoothstep(0.02, 0.12, c.b - c.r);
      vec3 sand = mix(vec3(0.42,0.30,0.17), vec3(0.93,0.84,0.64), smoothstep(0.08, 0.55, l));
      vec3 lapis = mix(vec3(0.06,0.11,0.24), vec3(0.20,0.36,0.58), smoothstep(0.05, 0.4, l));
      gl_FragColor.rgb = mix(sand, lapis, water);
      float edge = smoothstep(0.0, 0.42, abs(dot(normalize(vNormal), normalize(vViewPosition))));
      gl_FragColor.a *= edge;`);
  };
  const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 96, 64), mat);
  group.add(earth);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.035, 64, 48), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.BackSide,
    vertexShader: 'varying vec3 n; varying vec3 e; void main(){vec4 p=modelViewMatrix*vec4(position,1.0); n=normalize(normalMatrix*normal); e=normalize(-p.xyz); gl_Position=projectionMatrix*p;}',
    fragmentShader: 'varying vec3 n; varying vec3 e; void main(){float rim=pow(1.0-abs(dot(normalize(n),normalize(e))),2.6); gl_FragColor=vec4(0.86,0.70,0.36,rim*0.35);}',
  }));
  group.add(halo);

  // Rota completa: sequência de lugares na ordem dos marcos.
  const legs = []; // {eventIndex, points[], sea}
  let prev = null;
  events.forEach((ev, i) => {
    ev.path.forEach(id => {
      const [lon, lat] = places[id];
      const v = toVec(lon, lat);
      if (prev && prev.distanceTo(v) > 1e-3) legs.push({i, pts: arc(prev, v), sea: !!ev.sea});
      prev = v;
    });
  });
  const routeMat = new THREE.MeshBasicMaterial({color: 0xe0b860, transparent: true, opacity: 0.95});
  const doneMat = new THREE.MeshBasicMaterial({color: 0xc8a04a, transparent: true, opacity: 0.55});
  legs.forEach(l => {
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(l.pts), 64, 0.008, 6, false);
    l.mesh = new THREE.Mesh(geo, routeMat);
    l.mesh.visible = false;
    l.count = geo.index.count;
    group.add(l.mesh);
  });

  // Pontos dos lugares
  const dots = {};
  const dotGeo = new THREE.SphereGeometry(0.026, 14, 10);
  Object.entries(places).forEach(([id, [lon, lat]]) => {
    const m = new THREE.Mesh(dotGeo, new THREE.MeshBasicMaterial({color: 0xf6ecd2}));
    m.position.copy(toVec(lon, lat, R + 0.012));
    m.visible = false;
    group.add(m);
    dots[id] = m;
  });

  // Rótulos e o viajante (DOM sobre o canvas)
  const labelLayer = document.createElement('div');
  labelLayer.className = 'globe-labels';
  labelLayer.setAttribute('aria-hidden', 'true');
  host.append(labelLayer);
  const labels = {};
  Object.entries(places).forEach(([id, [, , name]]) => {
    const el = document.createElement('span');
    el.className = 'place-tag';
    el.textContent = name;
    el.hidden = true;
    labelLayer.append(el);
    labels[id] = el;
  });
  const traveler = document.createElement('div');
  traveler.className = 'traveler';
  traveler.innerHTML = CAMEL;
  traveler.hidden = true;
  labelLayer.append(traveler);

  // Rete de astrolábio em volta do globo
  const rete = document.createElement('div');
  rete.className = 'rete';
  rete.setAttribute('aria-hidden', 'true');
  rete.innerHTML = reteSVG();
  host.prepend(rete);

  let current = -1, anim = null, drag = false, lastX = 0, lastY = 0, travelerAt = null, travelerDir = 1, iconSea = false;
  const setIcon = sea => { if (sea !== iconSea) { traveler.innerHTML = sea ? BOAT : CAMEL; iconSea = sea; } };
  const tmp = new THREE.Vector3();

  let baseZ = 8.6, zoom = 1, zoomFrom = 1, zoomTo = 1;
  function applyZoom() {
    camera.position.z = baseZ * zoom;
    const r = host.getBoundingClientRect();
    const fov = THREE.MathUtils.degToRad(camera.fov);
    // centro do globo no palco (definido no CSS), convertido para unidades do mundo
    const cs = getComputedStyle(host);
    const gx = parseFloat(cs.getPropertyValue('--globe-cx')) || 0.5, gy = parseFloat(cs.getPropertyValue('--globe-cy')) || 0.5;
    const halfH = Math.tan(fov / 2) * camera.position.z, halfW = halfH * camera.aspect;
    group.position.set((gx - 0.5) * 2 * halfW, (0.5 - gy) * 2 * halfH, 0);
    const px = (R / (camera.position.z * Math.tan(fov / 2))) * (r.height / 2);
    host.style.setProperty('--globe-r', px.toFixed(1) + 'px');
  }

  function size() {
    const r = host.getBoundingClientRect();
    if (!r.width || !r.height) return;
    renderer.setSize(r.width, r.height, false);
    camera.aspect = r.width / r.height;
    // mantém o globo inteiro visível em telas estreitas
    baseZ = camera.aspect < 0.9 ? 8.6 / Math.max(0.62, camera.aspect / 0.9) : 8.6;
    camera.updateProjectionMatrix();
    applyZoom();
  }

  function project(v) {
    const r = host.getBoundingClientRect();
    tmp.copy(v).applyMatrix4(group.matrixWorld);
    const facing = tmp.clone().normalize().dot(camera.position.clone().sub(tmp).normalize()) > 0.08;
    const p = tmp.project(camera);
    return {x: (p.x * 0.5 + 0.5) * r.width, y: (-p.y * 0.5 + 0.5) * r.height, facing};
  }

  function render() {
    group.updateMatrixWorld();
    renderer.render(scene, camera);
    const placed = [];
    // lugares do marco atual primeiro; os anteriores só aparecem se houver espaço
    Object.entries(labels).sort(([a], [b]) => (dots[b].userData.current ? 1 : 0) - (dots[a].userData.current ? 1 : 0)).forEach(([id, el]) => {
      if (!dots[id].visible) { el.hidden = true; return; }
      const cur = dots[id].userData.current === true;
      const p = project(dots[id].position);
      const w = el.offsetWidth || 80;
      const hit = x => placed.some(q => x < q.x + q.w + 6 && q.x < x + w + 6 && Math.abs(q.y - p.y) < 24);
      // à direita do ponto; se colidir, à esquerda
      let x = p.x + 10;
      if (hit(x)) x = p.x - w - 10;
      const show = p.facing && !hit(x);
      el.hidden = !show;
      el.classList.toggle('is-current', cur);
      if (show) { placed.push({x, y: p.y, w}); el.style.transform = `translate(${x.toFixed(1)}px, ${p.y.toFixed(1)}px)`; }
    });
    if (travelerAt) {
      const p = project(travelerAt);
      traveler.hidden = !p.facing;
      traveler.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) scaleX(${travelerDir})`;
    } else traveler.hidden = true;
  }

  function targetRotation(points) {
    const c = new THREE.Vector3();
    points.forEach(p => c.add(p));
    c.normalize();
    const lat = Math.asin(c.y), lon = Math.atan2(-c.z, c.x);
    return new THREE.Euler(lat * 0.9, -Math.PI / 2 - lon, 0);
  }

  function setState(i) {
    legs.forEach(l => {
      l.mesh.visible = l.i <= i;
      l.mesh.material = l.i === i ? routeMat : doneMat;
      l.mesh.geometry.setDrawRange(0, l.count);
    });
    Object.values(dots).forEach(d => { d.visible = false; d.userData.current = false; });
    events.forEach((ev, k) => { if (k <= i) ev.path.forEach(id => { dots[id].visible = true; if (k === i) dots[id].userData.current = true; }); });
  }

  // Leva o globo ao marco i; o viajante percorre as pernas novas da rota.
  function focus(i) {
    const fresh = legs.filter(l => l.i === i);
    const from = current;
    current = i;
    setState(i);
    const pts = fresh.flatMap(l => l.pts);
    const anchor = pts.length ? pts : events[i].path.map(id => toVec(places[id][0], places[id][1]));
    const rot = targetRotation(anchor);
    const own = events[i].path.map(id => toVec(places[id][0], places[id][1]));
    const c = own.reduce((a, p) => a.add(p.clone().normalize()), new THREE.Vector3()).normalize();
    const spread = Math.max(...own.map(p => p.clone().normalize().angleTo(c)));
    zoomFrom = zoom;
    zoomTo = Math.max(0.66, Math.min(1, 0.6 + spread * 1.1));
    const forward = from < i && fresh.length;
    if (forward) fresh.forEach(l => l.mesh.geometry.setDrawRange(0, 0));
    const startRot = group.rotation.clone();
    const total = fresh.reduce((s, l) => s + l.pts.length - 1, 0);
    const walkMs = forward ? Math.min(4200, Math.max(1600, total * 26)) : 0;
    const turnMs = 1100;
    const t0 = performance.now();
    host.dataset.travel = 'moving';
    anim = now => {
      const tt = reduced ? 1 : Math.min(1, (now - t0) / (turnMs + walkMs));
      const turn = reduced ? 1 : Math.min(1, (now - t0) / turnMs);
      const e = 1 - Math.pow(1 - turn, 3);
      group.rotation.set(THREE.MathUtils.lerp(startRot.x, rot.x, e), lerpAngle(startRot.y, rot.y, e), 0);
      zoom = zoomFrom + (zoomTo - zoomFrom) * e;
      applyZoom();
      if (forward) {
        const w = reduced ? 1 : Math.max(0, Math.min(1, (now - t0 - turnMs * 0.55) / walkMs));
        const we = w < 0.5 ? 2 * w * w : 1 - Math.pow(-2 * w + 2, 2) / 2;
        let budget = we * total, prevPt = null, head = null, sea = false;
        for (const l of fresh) {
          const seg = l.pts.length - 1;
          const n = Math.min(seg, Math.max(0, budget));
          l.mesh.geometry.setDrawRange(0, Math.floor((l.count * (n / seg)) / 3) * 3);
          if (budget > 0 || !head) {
            const k = Math.min(seg - 1, Math.floor(n)), f = n - k;
            head = l.pts[k].clone().lerp(l.pts[k + 1], f);
            prevPt = l.pts[Math.max(0, k - 2)];
            sea = l.sea;
          }
          budget -= seg;
        }
        travelerAt = head;
        if (head && prevPt) {
          const p1 = project(prevPt), p2 = project(head);
          if (Math.abs(p2.x - p1.x) > 0.5) travelerDir = p2.x < p1.x ? -1 : 1;
        }
        setIcon(sea);
        traveler.classList.toggle('walking', w > 0 && w < 1);
      } else {
        const last = events[i].path[events[i].path.length - 1];
        travelerAt = toVec(places[last][0], places[last][1], R + 0.02);
        setIcon(!!events[i].sea);
        traveler.classList.remove('walking');
      }
      if (tt >= 1) { anim = null; host.dataset.travel = 'complete'; traveler.classList.remove('walking'); }
    };
  }

  function lerpAngle(a, b, t) {
    let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
    if (d < -Math.PI) d += Math.PI * 2;
    return a + d * t;
  }

  function reset() {
    current = -1;
    travelerAt = null;
    zoom = zoomTo = 1;
    applyZoom();
    setState(-1);
    group.rotation.set(0.3, -Math.PI / 2 - THREE.MathUtils.degToRad(15), 0);
  }

  renderer.domElement.addEventListener('pointerdown', e => { drag = true; anim = null; lastX = e.clientX; lastY = e.clientY; renderer.domElement.setPointerCapture(e.pointerId); });
  renderer.domElement.addEventListener('pointermove', e => {
    if (!drag) return;
    group.rotation.y += (e.clientX - lastX) * 0.005;
    group.rotation.x = Math.max(-1.2, Math.min(1.2, group.rotation.x + (e.clientY - lastY) * 0.004));
    lastX = e.clientX; lastY = e.clientY;
  });
  const end = () => { drag = false; };
  renderer.domElement.addEventListener('pointerup', end);
  renderer.domElement.addEventListener('pointercancel', end);

  let visible = true, raf = 0;
  const loop = now => { if (anim) anim(now); render(); raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(loop); }).observe(host);
  new ResizeObserver(size).observe(host);
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); cancelAnimationFrame(raf); host.dataset.engine = 'off'; });
  size();
  reset();
  raf = requestAnimationFrame(loop);
  return {focus, reset};
}

// Rete: anel graduado com ponteiros em chama, como num astrolábio de latão.
function reteSVG() {
  const ticks = Array.from({length: 72}, (_, i) => {
    const a = (i * 5 * Math.PI) / 180, long = i % 6 === 0;
    const r1 = 492, r2 = long ? 470 : 480;
    return `<line x1="${500 + r1 * Math.cos(a)}" y1="${500 + r1 * Math.sin(a)}" x2="${500 + r2 * Math.cos(a)}" y2="${500 + r2 * Math.sin(a)}"/>`;
  }).join('');
  const flames = Array.from({length: 12}, (_, i) => `<path transform="rotate(${i * 30 + 15} 500 500)" d="M500 28c10 14 10 30 0 44c-10-14-10-30 0-44z"/>`).join('');
  return `<svg viewBox="0 0 1000 1000"><g fill="none" stroke="#c8a04a"><circle cx="500" cy="500" r="496" stroke-width="2"/><circle cx="500" cy="500" r="462" stroke-opacity=".5"/><g stroke-width="1.4" stroke-opacity=".8">${ticks}</g></g><g fill="#c8a04a" fill-opacity=".85">${flames}</g></svg>`;
}
