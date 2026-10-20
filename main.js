import './style.css';
import {intro, caravan, events, atlasScene, finale, refs, refOrder} from './content.js';
import {khatamTile, bandTile, bandTileV, rosette} from './ornaments.js';
import {mountPainting} from './painting.js';
import {paintDunes} from './dunes.js';


const $ = s => document.querySelector(s);
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

// Ornamentos como variáveis de CSS
root.style.setProperty('--khatam', khatamTile('#c8a04a', 0.16, 72));
root.style.setProperty('--khatam-ink', khatamTile('#6b4a26', 0.1, 72));
root.style.setProperty('--band-h', bandTile({size: 40}));
root.style.setProperty('--band-v', bandTileV({size: 40}));
document.querySelectorAll('.corner').forEach(c => (c.innerHTML = rosette()));

// ---------- Conteúdo fixo ----------
$('#intro-title').textContent = intro.title;
$('#intro-text').textContent = intro.text;
$('#intro-invite').textContent = intro.invite;
$('#caravana-title').textContent = caravan.title;
$('#caravana-caption').textContent = caravan.caption;
$('#atlas-title').textContent = atlasScene.title;
$('#atlas-caption').textContent = atlasScene.caption;
$('#finale-text').textContent = finale.text;
$('#finale-quote').textContent = `“${finale.quote}”`;
$('#finale-cite').textContent = finale.cite;
// Mandala final: a roseta inteira gira devagar e o miolo gira ao contrário, como um caleidoscópio.
$('#mandala').innerHTML = '<img class="m-disk" src="./assets/doc/mandala.webp" alt=""><img class="m-core" src="./assets/doc/mandala.webp" alt="">';

$('#timeline').innerHTML = events.map((e, i) => `<li><button class="astro-mark" type="button" data-i="${i}" aria-label="${e.date}: ${e.title}"><span class="tick" aria-hidden="true"></span><span class="astro-date">${e.date}</span></button></li>`).join('');

// Referências: onde cada uma foi usada
const usedIn = {};
const mark = (key, label) => { (usedIn[key] ||= []).push(label); };
intro.refs.forEach(k => mark(k, 'Introdução'));
events.forEach((e, i) => e.refs.forEach(k => mark(k, `${i + 1}. ${e.title} (${e.date})`)));
$('#referencias-lista').innerHTML = refOrder.map(k => `<li id="ref-${k}"><p>${refs[k]}</p><p class="used">Usada em: ${usedIn[k].join(' · ')}</p></li>`).join('');

// Documentos e imagens
const docs = [
  {src: caravan.src, caption: `${caravan.title} (Maqamat de al-Hariri, 1237)`, where: 'Abertura da linha do tempo', source: null, note: 'Bibliothèque nationale de France, Arabe 5847'},
  ...events.flatMap((e, i) => e.images.map(im => ({...im, where: `${i + 1}. ${e.title}`}))),
  {src: atlasScene.src, caption: `Detalhe do Atlas Catalão: Mansa Musa (1375)`, where: '8. O hajj de Mansa Musa', source: 'https://pt.wikipedia.org/wiki/Atlas_Catal%C3%A3o'},
];
$('#docs').innerHTML = docs.map(d => `<figure class="doc"><div class="doc-img"><img src="${d.src}" alt="${(d.alt || d.caption).replace(/"/g, '&quot;')}" loading="lazy"></div><figcaption><span class="doc-where">${d.where}</span>${d.caption}${d.source ? ` <a href="${d.source}" target="_blank" rel="noreferrer">Fonte da imagem</a>` : d.note ? ` <span class="doc-note">${d.note}</span>` : ''}</figcaption></figure>`).join('');
$('#credits').innerHTML = `<p>Conteúdo histórico, textos, seleção de documentos e referências: Mariana Rodrigues Fernandes.</p>
<p>Site desenvolvido com auxílio de inteligência artificial (Claude, da Anthropic), como previsto na atividade.</p>
<p>Gerado por IA para este site (não são documentos históricos): a pintura da abertura (Nano Banana, Google Flow) e sua animação (Veo, Google Flow); a mandala do final (Nano Banana, Google Flow); as animações da caravana (Maqamat, 1237) e do Atlas Catalão (1375), feitas pelo Veo a partir das imagens originais. Nessas animações a IA altera detalhes das obras; as imagens originais, sem alteração, estão nos documentos acima.</p>
<p>Desenhado em código para o site: as bordas ornamentais, as dunas de areia e a rota no globo, que liga os lugares na ordem dos marcos e é esquemática.</p>
<p>Texturas da Terra: exemplos do Three.js. Fontes tipográficas: Aref Ruqaa e Spectral (SIL Open Font License). Efeito de areia adaptado de “Sculpture Hero”, de guglielmogiannattasio.it.</p>`;

// ---------- Navegação entre cenas ----------
let current = -1, view = 'abertura', globe = null, caravanPainting = null, atlasPainting = null, dunesPainting = null;
const views = ['abertura', 'caravana', 'viagem', 'atlas', 'fim', 'referencias'];

function show(id, focusEl, {instant = false} = {}) {
  if (id === view) return;
  const prev = $('#' + view), next = $('#' + id);
  next.hidden = false;
  if (instant) {
    // troca sem o fade padrão: a transição autoral cobre a passagem
    for (const el of [prev, next]) el.style.transition = 'none';
    next.classList.add('is-active');
    prev.classList.remove('is-active');
    prev.hidden = true;
    requestAnimationFrame(() => { for (const el of [prev, next]) el.style.transition = ''; });
    (focusEl || next.querySelector('h1, h2'))?.focus({preventScroll: true});
  } else requestAnimationFrame(() => {
    next.classList.add('is-active');
    prev.classList.remove('is-active');
    // o foco só pode ir para a cena depois que ela fica visível
    (focusEl || next.querySelector('h1, h2'))?.focus({preventScroll: true});
  });
  const done = () => { prev.hidden = true; };
  if (!instant) reduced ? done() : setTimeout(done, 450);
  view = id;
  document.body.dataset.view = id;
  next.scrollTop = 0;
  document.body.classList.remove('scrolled');
  if (id !== 'caravana' && caravanPainting) { caravanPainting.destroy(); caravanPainting = null; }
  if (id !== 'caravana' && dunesPainting) { dunesPainting.destroy(); dunesPainting = null; }
  if (id !== 'atlas' && atlasPainting) { atlasPainting.destroy(); atlasPainting = null; }
}
views.forEach(v => { const h = $('#' + v).querySelector('h1, h2'); if (h) h.tabIndex = -1; });

// Abertura
// A pintura da abertura (gerada para o site) ganha vida em loop; com movimento reduzido, fica parada.
(async () => {
  const host = $('#kaaba');
  // 1080p só onde a tela pede; celulares recebem 720p (bem mais leve)
  const src = innerWidth * Math.min(devicePixelRatio, 2) >= 1600 ? intro.video : intro.video.replace('.mp4', '-720.mp4');
  if (!reduced && await hasVideo(src)) mountVideo(host, {src, poster: intro.painting, alt: intro.alt, cover: true});
})();

// Caravana (Maqamat de al-Hariri, 1237). Se o vídeo animado existir, ele toca em loop;
// senão, a própria pintura ganha movimento por regiões. Atrás, dunas feitas de areia.
// Regiões em coordenadas da imagem (0–1). Tipos: 0 passo, 1 tecido ao vento, 2 pernas, 3 balanço, 4 erguer.
const caravanWarps = [
  {x: 0.2, y: 0.27, rx: 0.2, ry: 0.2, type: 1, amp: 6, freq: 2.4},           // estandartes
  {x: 0.43, y: 0.22, rx: 0.08, ry: 0.09, type: 4, amp: 9, freq: 4.2},        // baquetas do tambor, à esquerda
  {x: 0.56, y: 0.22, rx: 0.06, ry: 0.09, type: 4, amp: 9, freq: 4.2, phase: 3.1}, // baquetas do tambor, à direita
  {x: 0.69, y: 0.4, rx: 0.15, ry: 0.2, type: 3, amp: 4, freq: 1.8},          // palanquim dourado
  {x: 0.1, y: 0.47, rx: 0.12, ry: 0.11, type: 4, amp: 6, freq: 2.6, phase: 1},   // trombetas
  {x: 0.38, y: 0.52, rx: 0.2, ry: 0.12, type: 0, amp: 3.6, freq: 1.8, phase: 2}, // camelos
  {x: 0.55, y: 0.62, rx: 0.16, ry: 0.15, type: 0, amp: 5, freq: 2.6, phase: 0.5}, // cavaleiro e cavalo
  {x: 0.5, y: 0.7, rx: 0.05, ry: 0.07, type: 3, amp: 6, freq: 2.6, phase: 1.2}, // cabeça do cavalo
  {x: 0.53, y: 0.86, rx: 0.17, ry: 0.1, type: 2, amp: 7, freq: 5.2},         // pernas do cavalo
  {x: 0.86, y: 0.7, rx: 0.08, ry: 0.2, type: 0, amp: 3, freq: 2.8, phase: 0.8},  // homem com lança, à direita
];

// O vídeo só é usado se o arquivo existir de fato (o servidor de dev devolve HTML no lugar).
async function hasVideo(url) {
  try { const r = await fetch(url, {method: 'HEAD'}); return r.ok && (r.headers.get('content-type') || '').startsWith('video'); }
  catch { return false; }
}

function mountVideo(host, {src, poster, alt, loop = true, cover = false}) {
  const v = document.createElement('video');
  Object.assign(v, {src, poster, muted: true, loop, playsInline: true, autoplay: !reduced, preload: 'auto'});
  v.className = cover ? 'cover-video' : 'scene-video';
  v.setAttribute('aria-label', alt);
  host.append(v);
  return {destroy() { v.pause(); v.remove(); }, video: v};
}

function mountCaravan() {
  $('#caravana-art').innerHTML = '';
  $('#dunes').innerHTML = '';
  dunesPainting = mountPainting($('#dunes'), {source: paintDunes(1600, 1000), alt: '', fit: 'cover', intro: true, introMs: 2800, pointerTarget: $('#caravana')});
  return hasVideo(caravan.video).then(ok => {
    caravanPainting = ok
      ? mountVideo($('#caravana-art'), {src: caravan.video, poster: caravan.poster, alt: caravan.alt})
      : mountPainting($('#caravana-art'), {src: caravan.src, alt: caravan.alt, warps: caravanWarps, intro: false, interactive: false});
  });
}

// O globo (Three.js e texturas) começa a carregar enquanto a caravana está na tela.
let globeModule = null;
function preloadGlobe() {
  globeModule ||= import('./globe.js');
  ['earth-color', 'earth-normal', 'earth-specular'].forEach(n => { const i = new Image(); i.src = `./assets/${n}.jpg`; });
}

const wait = ms => new Promise(r => setTimeout(r, ms));
const easeIn = 'cubic-bezier(.55, 0, .7, .2)', easeOut = 'cubic-bezier(.16, 1, .3, 1)';

// Abertura → caravana: um vento de areia atravessa a tela e revela o deserto.
async function openCaravan() {
  preloadGlobe();
  if (reduced) { show('caravana', $('#caravana-go')); return mountCaravan(); }
  const veil = $('#sand-veil'), intro = $('#abertura');
  intro.querySelector('.cartouche').animate([{opacity: 1, transform: 'translateY(-50%)'}, {opacity: 0, transform: 'translateY(calc(-50% - 16px))'}], {duration: 380, easing: easeIn, fill: 'forwards'});
  intro.querySelector('.kaaba-host').animate([{transform: 'scale(1)', filter: 'blur(0) brightness(1)'}, {transform: 'scale(1.07)', filter: 'blur(5px) brightness(1.12)'}], {duration: 900, easing: easeIn, fill: 'forwards'});
  veil.hidden = false;
  await veil.animate([{transform: 'translateX(-100%)'}, {transform: 'translateX(0)'}], {duration: 760, delay: 140, easing: easeIn, fill: 'forwards'}).finished;
  show('caravana', $('#caravana-go'), {instant: true});
  intro.getAnimations({subtree: true}).forEach(a => a.cancel());
  await Promise.race([mountCaravan(), wait(600)]);
  await veil.animate([{transform: 'translateX(0)'}, {transform: 'translateX(100%)'}], {duration: 1000, easing: easeOut, fill: 'forwards'}).finished;
  veil.getAnimations().forEach(a => a.cancel());
  veil.hidden = true;
}

// Caravana → viagem: a miniatura se afasta e o globo se abre em círculo, como um astrolábio.
async function openJourney() {
  if (reduced) return goTo(0);
  const from = $('#caravana'), to = $('#viagem'), ring = $('#iris-ring');
  // o globo precisa de tamanho para nascer: a viagem entra na tela já recortada em círculo zero
  to.hidden = false;
  to.style.transition = 'none';
  to.style.clipPath = 'circle(0% at 50% 50%)';
  to.classList.add('is-active');
  to.style.zIndex = 5;
  const away = from.animate([{transform: 'scale(1)', opacity: 1, filter: 'blur(0)'}, {transform: 'scale(1.1)', opacity: 0, filter: 'blur(6px)'}], {duration: 900, easing: easeIn, fill: 'forwards'});
  if (!globe) globe = await (await (globeModule || import('./globe.js'))).createGlobe($('#globe'));
  renderMarco(0);
  const g = $('#globe').getBoundingClientRect();
  const cs = getComputedStyle($('#globe'));
  const cx = g.left + g.width * (parseFloat(cs.getPropertyValue('--globe-cx')) || 0.5);
  const cy = g.top + g.height * (parseFloat(cs.getPropertyValue('--globe-cy')) || 0.5);
  const R = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
  Object.assign(ring.style, {left: `${cx - R}px`, top: `${cy - R}px`, width: `${2 * R}px`, height: `${2 * R}px`});
  ring.hidden = false;
  await away.finished.catch(() => {});
  const dur = 1250;
  ring.animate([{transform: 'scale(0)', opacity: 1}, {transform: 'scale(.85)', opacity: 1, offset: .8}, {transform: 'scale(1)', opacity: 0}], {duration: dur, easing: easeOut, fill: 'forwards'});
  // em percentuais da tela: valores em px saíam fora de escala em telas de alta densidade
  const px = (cx / innerWidth * 100).toFixed(2), py = (cy / innerHeight * 100).toFixed(2);
  const rPct = (R / Math.sqrt((innerWidth ** 2 + innerHeight ** 2) / 2) * 100).toFixed(2);
  await to.animate([{clipPath: `circle(0% at ${px}% ${py}%)`}, {clipPath: `circle(${rPct}% at ${px}% ${py}%)`}], {duration: dur, easing: easeOut, fill: 'forwards'}).finished;
  to.getAnimations().forEach(a => a.cancel());
  Object.assign(to.style, {clipPath: '', zIndex: '', transition: ''});
  ring.hidden = true;
  ring.getAnimations().forEach(a => a.cancel());
  from.getAnimations().forEach(a => a.cancel());
  show('viagem', $('#marco-title'), {instant: true});
}

// Atlas Catalão: a folha se aproxima de Mansa Musa; ele ergue a pepita de ouro e a entrega ao cavaleiro.
const atlasWarps = [
  {x: 0.535, y: 0.58, rx: 0.05, ry: 0.09, type: 4, amp: 8, freq: 1.4},           // braço erguido com a pepita
  {x: 0.6, y: 0.66, rx: 0.12, ry: 0.28, type: 0, amp: 1.8, freq: 1.4, phase: 0.4}, // corpo de Mansa Musa
  {x: 0.13, y: 0.56, rx: 0.1, ry: 0.2, type: 0, amp: 3.2, freq: 2.6},              // cavaleiro
  {x: 0.25, y: 0.64, rx: 0.06, ry: 0.1, type: 3, amp: 5, freq: 2.6, phase: 1},     // pescoço do camelo
  {x: 0.16, y: 0.88, rx: 0.14, ry: 0.1, type: 2, amp: 6, freq: 5.2},               // pernas do camelo
];
const COIN_FROM = [0.527, 0.54], COIN_TO = [0.17, 0.6], COIN_D = 0.03;

// A moeda é recortada da própria pepita pintada, para ser a mesma matéria do manuscrito.
function paintedCoin(img) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  const w = img.naturalWidth, h = img.naturalHeight, d = w * COIN_D;
  x.beginPath(); x.arc(32, 32, 31, 0, Math.PI * 2); x.clip();
  x.drawImage(img, w * COIN_FROM[0] - d / 2, h * COIN_FROM[1] - d / 2, d, d, 0, 0, 64, 64);
  return c.toDataURL('image/png');
}

async function openAtlas() {
  show('atlas', $('#atlas-go'));
  const art = $('#atlas-art');
  art.querySelectorAll('.painting-canvas, .painting-fallback, .scene-video').forEach(n => n.remove());
  art.classList.remove('zoomed');
  const useVideo = await hasVideo(atlasScene.video);
  const start = () => {
    art.classList.add('zoomed');
    if (useVideo) {
      atlasPainting = mountVideo(art, {src: atlasScene.video, poster: atlasScene.poster, alt: atlasScene.alt, loop: false});
      // ao terminar a entrega da moeda, oferece rever a cena (teclado e toque)
      const v = atlasPainting.video, again = $('#atlas-replay');
      again.hidden = true;
      v.addEventListener('ended', () => { again.hidden = false; });
      again.onclick = () => { again.hidden = true; v.currentTime = 0; v.play(); };
      return;
    }
    atlasPainting = mountPainting(art, {src: atlasScene.src, alt: atlasScene.alt, warps: atlasWarps, intro: false, interactive: false});
    const coin = $('#coin');
    const src = new Image();
    src.onload = () => coin.style.backgroundImage = `url(${paintedCoin(src)})`;
    src.src = atlasScene.src;
    atlasPainting.onLayout(r => {
      coin.style.setProperty('--x0', `${r.x + r.w * COIN_FROM[0]}px`);
      coin.style.setProperty('--y0', `${r.y + r.h * COIN_FROM[1]}px`);
      coin.style.setProperty('--x1', `${r.x + r.w * COIN_TO[0]}px`);
      coin.style.setProperty('--y1', `${r.y + r.h * COIN_TO[1]}px`);
      coin.style.setProperty('--s', `${Math.max(10, r.w * COIN_D)}px`);
    });
  };
  reduced ? start() : setTimeout(start, 2300);
}

// Viagem
function renderMarco(i) {
  const e = events[i];
  current = i;
  $('#marco-date').textContent = e.date;
  $('#marco-title').textContent = e.title;
  $('#marco-text').textContent = e.text;
  $('#continue').textContent = i === 9 ? 'Finalizar viagem' : 'Continuar viagem';
  $('#folio-continue').textContent = i === 9 ? 'Finalizar viagem' : 'Continuar viagem';
  $('#prev').disabled = i === 0;
  $('#next').disabled = i === 9;
  document.querySelectorAll('.astro-mark').forEach(b => {
    const on = +b.dataset.i === i;
    b.setAttribute('aria-current', on ? 'step' : 'false');
    b.classList.toggle('is-past', +b.dataset.i < i);
  });
  const active = $(`.astro-mark[data-i="${i}"]`);
  const scale = $('#timeline');
  scale.style.setProperty('--alidade', `${active.parentElement.offsetLeft + active.offsetWidth / 2}px`);
  // só rolagem horizontal da régua (scrollIntoView também moveria a página na vertical)
  scale.scrollTo({left: active.parentElement.offsetLeft - (scale.clientWidth - active.offsetWidth) / 2, behavior: reduced ? 'instant' : 'smooth'});
  // fólio "Entender este marco"
  $('#folio-date').textContent = e.date;
  $('#folio-title').textContent = e.title;
  $('#folio-text').innerHTML = e.detail.map(d => d.quote
    ? `<blockquote><p>“${d.quote}”</p><cite>${d.cite}</cite></blockquote>`
    : `${d.doc ? `<h3>${d.doc}</h3>` : ''}<p>${d.p}</p>`).join('');
  $('#folio-figures').innerHTML = e.images.map(im => `<figure><img src="${im.src}" alt="${im.alt.replace(/"/g, '&quot;')}" loading="lazy"><figcaption>${im.caption} <a href="${im.source}" target="_blank" rel="noreferrer">Fonte da imagem</a></figcaption></figure>`).join('');
  $('#folio').classList.toggle('no-figures', !e.images.length);
  $('#folio').hidden = false;
  globe?.focus(i);
  $('.rete')?.style.setProperty('--rete-rot', `${i * 30}deg`);
  const panel = $('#marco-panel');
  panel.classList.remove('enter');
  void panel.offsetWidth;
  panel.classList.add('enter');
}

async function goTo(i) {
  if (view !== 'viagem') show('viagem', $('#marco-title'));
  if (!globe) globe = await (await import('./globe.js')).createGlobe($('#globe'));
  renderMarco(i);
  $('#viagem').scrollTo({top: 0, behavior: reduced ? 'instant' : 'smooth'});
}

function advance() {
  if (current === 9) return show('fim', $('#see-refs'));
  if (current === 7) return openAtlas(); // "Continuar viagem" a partir de Mansa Musa
  goTo(current + 1);
}

$('#start').onclick = openCaravan;
$('#caravana-go').onclick = openJourney;
$('#atlas-go').onclick = () => goTo(8);
$('#continue').onclick = advance;
$('#folio-continue').onclick = advance;
$('#understand').onclick = () => $('#folio').scrollIntoView({behavior: reduced ? 'instant' : 'smooth'});
$('#back-globe').onclick = () => $('#viagem').scrollTo({top: 0, behavior: reduced ? 'instant' : 'smooth'});
$('#prev').onclick = () => current > 0 && goTo(current - 1);
$('#next').onclick = () => current < 9 && goTo(current + 1);
$('#timeline').addEventListener('click', e => { const b = e.target.closest('.astro-mark'); if (b) goTo(+b.dataset.i); });
$('#see-refs').onclick = () => show('referencias');
$('#restart').onclick = () => { current = -1; globe?.reset(); show('abertura', $('#start')); };
$('#go-home').onclick = () => { current = -1; globe?.reset(); show('abertura', $('#start')); };
$('.skip').onclick = e => { e.preventDefault(); $('#' + view).querySelector('h1, h2')?.focus(); };

document.addEventListener('keydown', e => {
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || view !== 'viagem') return;
  if (e.target.closest('input, textarea, select')) return;
  if (e.key === 'ArrowRight' && current < 9) { e.preventDefault(); goTo(current + 1); }
  else if (e.key === 'ArrowLeft' && current > 0) { e.preventDefault(); goTo(current - 1); }
});
document.body.dataset.view = view;
// o cabeçalho flutuante sai de cena enquanto a página rola, para não cobrir títulos
views.forEach(v => $('#' + v).addEventListener('scroll', e => document.body.classList.toggle('scrolled', e.currentTarget.scrollTop > 48), {passive: true}));
