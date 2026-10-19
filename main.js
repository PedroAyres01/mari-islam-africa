import './style.css';
import {intro, caravan, events, atlasScene, finale, refs, refOrder} from './content.js';
import {khatamTile, bandTile, bandTileV, rosette, mandalaSVG} from './ornaments.js';
import {mountKaaba} from './kaaba.js';
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
$('#mandala').innerHTML = mandalaSVG();

$('#timeline').innerHTML = events.map((e, i) => `<li><button class="astro-mark" type="button" data-i="${i}" aria-label="${e.date}: ${e.title}"><span class="tick" aria-hidden="true"></span><span class="astro-date">${e.date}</span></button></li>`).join('');

// Referências: onde cada uma foi usada
const usedIn = {};
const mark = (key, label) => { (usedIn[key] ||= []).push(label); };
intro.refs.forEach(k => mark(k, 'Introdução'));
events.forEach((e, i) => e.refs.forEach(k => mark(k, `${i + 1}. ${e.title} (${e.date})`)));
$('#referencias-lista').innerHTML = refOrder.map(k => `<li id="ref-${k}"><p>${refs[k]}</p><p class="used">Usada em: ${usedIn[k].join(' · ')}</p></li>`).join('');

// Documentos e imagens
const docs = [
  {src: caravan.src, caption: `${caravan.title} (${caravan.caption})`, where: 'Abertura da linha do tempo', source: null, note: 'Bibliothèque nationale de France, Arabe 5847'},
  ...events.flatMap((e, i) => e.images.map(im => ({...im, where: `${i + 1}. ${e.title}`}))),
  {src: atlasScene.src, caption: `Detalhe do Atlas Catalão: Mansa Musa (1375)`, where: '8. O hajj de Mansa Musa', source: 'https://pt.wikipedia.org/wiki/Atlas_Catal%C3%A3o'},
];
$('#docs').innerHTML = docs.map(d => `<figure class="doc"><div class="doc-img"><img src="${d.src}" alt="${(d.alt || d.caption).replace(/"/g, '&quot;')}" loading="lazy"></div><figcaption><span class="doc-where">${d.where}</span>${d.caption}${d.source ? ` <a href="${d.source}" target="_blank" rel="noreferrer">Fonte da imagem</a>` : d.note ? ` <span class="doc-note">${d.note}</span>` : ''}</figcaption></figure>`).join('');
$('#credits').innerHTML = `<p>Conteúdo histórico, textos, seleção de documentos e referências: Mariana Rodrigues Fernandes.</p>
<p>Site desenvolvido com auxílio de inteligência artificial (Claude, da Anthropic), como previsto na atividade. A ilustração da abertura, os ornamentos e a mandala foram desenhados em código para este site e não são documentos históricos. As animações da caravana e do Atlas Catalão movimentam as imagens originais. A rota no globo liga os lugares na ordem dos marcos e é esquemática.</p>
<p>Texturas da Terra: exemplos do Three.js. Fontes tipográficas: Aref Ruqaa e Spectral (SIL Open Font License). Efeito de areia adaptado de “Sculpture Hero”, de guglielmogiannattasio.it.</p>`;

// ---------- Navegação entre cenas ----------
let current = -1, view = 'abertura', globe = null, caravanPainting = null, atlasPainting = null, dunesPainting = null;
const views = ['abertura', 'caravana', 'viagem', 'atlas', 'fim', 'referencias'];

function show(id, focusEl) {
  if (id === view) return;
  const prev = $('#' + view), next = $('#' + id);
  next.hidden = false;
  requestAnimationFrame(() => {
    next.classList.add('is-active');
    prev.classList.remove('is-active');
    // o foco só pode ir para a cena depois que ela fica visível
    (focusEl || next.querySelector('h1, h2'))?.focus({preventScroll: true});
  });
  const done = () => { prev.hidden = true; };
  reduced ? done() : setTimeout(done, 450);
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
mountKaaba($('#kaaba'));

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

function mountVideo(host, {src, poster, alt}) {
  const v = document.createElement('video');
  Object.assign(v, {src, poster, muted: true, loop: true, playsInline: true, autoplay: !reduced, preload: 'auto'});
  v.className = 'scene-video';
  v.setAttribute('aria-label', alt);
  host.append(v);
  return {destroy() { v.pause(); v.remove(); }, video: v};
}

async function openCaravan() {
  show('caravana', $('#caravana-go'));
  $('#caravana-art').innerHTML = '';
  $('#dunes').innerHTML = '';
  dunesPainting = mountPainting($('#dunes'), {source: paintDunes(1600, 1000), alt: '', fit: 'cover', intro: true, introMs: 2800, pointerTarget: $('#caravana')});
  caravanPainting = (await hasVideo(caravan.video))
    ? mountVideo($('#caravana-art'), {src: caravan.video, poster: caravan.src, alt: caravan.alt})
    : mountPainting($('#caravana-art'), {src: caravan.src, alt: caravan.alt, warps: caravanWarps, intro: false, interactive: false});
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
    if (useVideo) { atlasPainting = mountVideo(art, {src: atlasScene.video, poster: atlasScene.src, alt: atlasScene.alt}); return; }
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
$('#caravana-go').onclick = () => goTo(0);
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
$('.skip').onclick = e => { e.preventDefault(); show('referencias'); };

document.addEventListener('keydown', e => {
  if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || view !== 'viagem') return;
  if (e.target.closest('input, textarea, select')) return;
  if (e.key === 'ArrowRight' && current < 9) { e.preventDefault(); goTo(current + 1); }
  else if (e.key === 'ArrowLeft' && current > 0) { e.preventDefault(); goTo(current - 1); }
});
document.body.dataset.view = view;
// o cabeçalho flutuante sai de cena enquanto a página rola, para não cobrir títulos
views.forEach(v => $('#' + v).addEventListener('scroll', e => document.body.classList.toggle('scrolled', e.currentTarget.scrollTop > 48), {passive: true}));
