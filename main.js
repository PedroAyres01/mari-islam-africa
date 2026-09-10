import './style.css';
import events from './events.json';
import refs from './refs.json';
import overview from './overview.json';
import {gsap} from 'gsap';
import {createAtlas} from './scene.js';
import {createCinema} from './cinema.js';
import {getBackdropForMarco, paletteForMarco} from './backdrops.js';
import {initParallax} from './parallax.js';

const directions=[
 ['Horizonte africano','Terra realista sobre uma paisagem de dunas, com leitura clara.','globe','O islã na África.','Redes que atravessam o tempo.'],
 ['Atlas noturno','Uma apresentação imersiva. O continente e suas conexões ocupam o palco.','night','Um continente.\nMuitos caminhos.','Religião, comércio e formas de viver.'],
 ['Pedra e memória','A arquitetura abre a história; o mapa aparece como peça de uma exposição.','stone','A história\nhabita lugares.','Da pedra de coral às redes do Índico.'],
 ['Areia e mar','Paisagem de dunas e globo terrestre em uma composição de dois planos.','split','Entre areias\ne mar.','Conexões não produzem sociedades iguais.'],
 ['Mesa cartográfica','Abertura editorial acima de um globo inclinado, com a história ao alcance.','table','A África,\nem relação.','Observe os lugares. Percorra as transformações.'],
 ['Caderno de campo','Uma publicação digital: fotografia, margem e leitura com ritmo editorial.','book','Ler os vestígios.\nConectar histórias.','Um argumento histórico em dez marcos.'],
 ['Rede de cidades','Uma rede abstrata que pode ser girada, sem representar fronteiras ou posições exatas.','network','O poder\ncircula.','Cidades, instituições e caminhos compartilhados.'],
 ['Marés do Índico','Horizonte aberto e relevo de ondas para uma narrativa guiada pela costa.','ocean','O mar\naproxima.','A costa suaíli dentro de uma história africana.'],
 ['Galeria do tempo','Uma fotografia por vez em um espaço expositivo, com leitura acessível abaixo.','gallery','O tempo deixa\nmarcas.','Três lugares. Diferentes arquivos da história.'],
 ['Linhas de poder','Faixas cronológicas em profundidade: um diagrama para acompanhar processos.','ribbon','Nada acontece\nisoladamente.','Religião e comércio reorganizam a vida social.']
];
const regionNames={north:'Norte da África',sahel:'Sahel',east:'Costa suaíli'};
const photoInfo={kilwa:['Grande Mesquita de Kilwa','2016 · Janetmpurdy · CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Great_Mosque_Kilwa_Kisiwani_Tanzania.jpg'],timbuktu:['Djinguereber, Timbuctu','2001 · upyernoz · CC BY 2.0','https://commons.wikimedia.org/wiki/File:Djinguereber_in_Timbuktu.jpg'],era640:['Cidade islâmica no rio (c. 640)','Ilustração gerada por IA · imagem interpretativa, não documento histórico','#'],era700:['Metrópole islâmica ao amanhecer (c. 700)','Ilustração gerada por IA · imagem interpretativa, não documento histórico','#'],era1000:['Skyline islâmica ao entardecer (c. 1000)','Ilustração gerada por IA · imagem interpretativa, não documento histórico','#']};
let variant=Math.max(0,Math.min(9,(Number(new URL(location).searchParams.get('v'))||1)-1)),current=-1;
let reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelector('#app').innerHTML=`
 <a class="skip" href="#reading">Ir para a leitura</a>
 <header><a class="brand" href="../../">Entre areias e mar<span>HISTÓRIA DA ÁFRICA</span></a><nav aria-label="Navegação principal"><button id="read-link">Ler o argumento</button><a href="../../#sources">Site original e fontes</a></nav></header>
 <main><section class="stage" aria-label="Prévia da direção visual">
 <figure class="photograph"><img src="./assets/kilwa.jpg" alt="Arcos de pedra de coral da Grande Mesquita de Kilwa"><figcaption></figcaption></figure>
 <div class="scene" aria-label="Visualização tridimensional de conexões históricas"><span class="fallback">Carregando o atlas…</span></div>
 <div class="copy"><p class="byline">Por Mariana Rodrigues Fernandes</p><h1></h1><p class="subtitle"></p><p class="thesis">Redes comerciais e instituições islâmicas transformaram a autoridade e a vida urbana de maneiras distintas no Norte da África, no Sahel e na costa suaíli.</p><button class="primary" id="begin">Percorrer os dez marcos <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></button></div>
 <div class="scene-caption"><span id="scene-label"></span><button id="replay">Rever movimento</button></div>
 <div class="place-labels" aria-hidden="true"><span>SAHEL</span><span>NORTE DA ÁFRICA</span><span>OCEANO ÍNDICO</span></div>
 <div class="stage-foot"><span>639 — 1468</span><span>10 marcos · um argumento histórico</span></div>
 </section>
 <section class="story-bar" aria-label="Navegação da linha do tempo"><button id="prev" aria-label="Marco anterior">Anterior</button><div class="timeline"></div><button id="next">Próximo marco</button></section>
 <section id="reading" class="reading"><div class="reading-heading"><p id="event-meta">A proposta</p><h2 id="event-title">Uma história de relações e diferenças.</h2></div><div class="reading-body"><p id="paragraph">A linha do tempo acompanha processos de conquista, formação urbana, circulação comercial e legitimação religiosa. Os dez marcos foram selecionados para comparar sociedades e formas de autoridade, sem tratar a islamização como um processo uniforme. Abra um marco para ler sua justificativa e os limites das fontes.</p><div id="evidence" hidden><h3>Por que conectar ao próximo marco?</h3><p id="bridge"></p><h3>Como interpretar o intervalo?</h3><p id="gap"></p><a id="source-link" href="../../#sources">Consultar as fontes no site original</a></div></div></section>
 <footer><p>Estudos visuais para revisão. Pesquisa e organização assistidas por IA; revisão acadêmica de Mariana pendente.</p><p>Fotografias atuais, posteriores ao recorte. Formas 3D são esquemas visuais, não reconstituições históricas. Geografia: Natural Earth.</p><div class="credits"></div></footer>
 </main><aside class="chooser" aria-label="Comparar dez alternativas"><div class="choice-title"><span id="choice-count"></span><strong id="choice-name"></strong><p id="choice-note"></p></div><div class="choice-controls"><button id="design-prev" aria-label="Alternativa anterior">←</button><select id="design-select" aria-label="Escolher alternativa">${directions.map((d,i)=>`<option value="${i}">${i+1}. ${d[0]}</option>`).join('')}</select><button id="design-next" aria-label="Próxima alternativa">→</button></div><div class="numbers">${directions.map((d,i)=>`<button data-variant="${i}" aria-label="${i+1}. ${d[0]}">${i+1}</button>`).join('')}</div></aside>`;
const $=s=>document.querySelector(s);
$('.chooser').hidden=true;
$('.stage').insertAdjacentHTML('afterbegin','<img class="landing-hero" src="./assets/era640.jpg" alt="" aria-hidden="true"><img class="journey-backdrop" alt="" aria-hidden="true"><div class="journey-shade"></div>');
$('.byline').insertAdjacentHTML('afterend','<p id="journey-date" hidden></p>');
$('#begin').insertAdjacentHTML('afterend','<button class="secondary" id="understand" hidden>Entender este marco</button><button class="secondary" id="photo-toggle" hidden>Ver fotografia do lugar</button>');
$('.stage-foot').insertAdjacentHTML('beforebegin','<p class="journey-credit" hidden></p>');
// compare + motion buttons removed by design — chooser aside stays hidden
$('.chooser').before($('.story-bar'));
$('#understand').onclick=()=>$('#reading').scrollIntoView({behavior:reduced?'instant':'smooth'});
$('#photo-toggle').onclick=()=>{const photo=document.body.classList.toggle('place-mode');$('#photo-toggle').textContent=photo?'Voltar à Terra 3D':'Ver fotografia do lugar';$('#photo-toggle').setAttribute('aria-pressed',String(photo));syncExperience();};
$('.brand').href='#';$('.brand').onclick=e=>{e.preventDefault();current=-1;document.body.classList.remove('journey-active','place-mode');$('#journey-date').hidden=true;$('#understand').hidden=true;$('#photo-toggle').hidden=true;$('#photo-toggle').textContent='Ver fotografia do lugar';$('.journey-credit').hidden=true;$('.journey-backdrop').removeAttribute('src');$('#prev').disabled=true;$('#next').disabled=false;$('#begin').textContent='Começar a viagem';$('.thesis').textContent='Redes comerciais e instituições islâmicas transformaram a autoridade e a vida urbana de maneiras distintas no Norte da África, no Sahel e na costa suaíli.';$('.stage-foot span:first-child').textContent='639 — 1468';$('.stage-foot span:last-child').textContent='10 marcos · um argumento histórico';document.querySelectorAll('[data-event]').forEach(b=>b.setAttribute('aria-current','false'));cinema&&cinema.onReset();changeDesign(variant);$('main').scrollTo({top:0,behavior:'instant'});};
$('#event-meta').textContent='';$('#design-prev').innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6"/></svg>';$('#design-next').innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const bibliography=document.createElement('section');bibliography.className='bibliography';bibliography.id='bibliography';bibliography.innerHTML='<h2>Fontes e leituras</h2><p>Referências do percurso para revisão acadêmica. Os links levam às páginas institucionais ou aos registros bibliográficos; nem todos oferecem o texto integral.</p><ol>'+[...new Set(events.flatMap(e=>e.refs))].map(k=>{const r=refs[k];return `<li id="ref-${k}">${r.url?`<a href="${r.url}" target="_blank" rel="noreferrer">${r.title}</a>`:`<strong>${r.title}</strong>`}<p>${r.author}</p><p>${r.note}</p></li>`;}).join('')+'</ol>';$('footer').before(bibliography);$('#source-link').href='#bibliography';$('#source-link').textContent='Consultar as fontes deste percurso';$('header nav a').href='#bibliography';$('header nav a').textContent='Fontes';
$('.credits').innerHTML=Object.values(photoInfo).map(p=>`<a href="${p[2]}" target="_blank" rel="noreferrer">${p[0]} · ${p[1]}</a>`).join('');
$('.timeline').innerHTML=events.map((e,i)=>`<button data-event="${i}" title="${e.title}" aria-label="${e.date}: ${e.title}"><span>${i+1}</span><small>${e.year}</small></button>`).join('');
const places=document.createElement('section');places.className='places';places.innerHTML=`<div><h2>Os lugares também contam.</h2><p>Arquitetura, espaço urbano e vestígios materiais ampliam o que podemos perguntar aos documentos escritos.</p><div class="photo-choices">${['kilwa','era700','timbuktu'].map(n=>`<button data-photo="${n}" aria-pressed="${n==='kilwa'}">${n==='kilwa'?'Kilwa':n==='era700'?'Cairo':'Timbuctu'}</button>`).join('')}</div></div><figure><img id="place-image" src="./assets/kilwa.jpg" alt="Grande Mesquita de Kilwa" loading="lazy"><figcaption id="place-credit"></figcaption></figure>`;$('footer').before(places);
function selectPhoto(n){const p=photoInfo[n];$('#place-image').src='./assets/'+n+'.jpg';$('#place-image').alt=p[0];$('#place-credit').textContent=p[0]+' · '+p[1]+'. Fotografia atual, não reconstituição medieval.';document.querySelectorAll('[data-photo]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.photo===n)));}document.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>selectPhoto(b.dataset.photo));selectPhoto('kilwa');
$('.credits').insertAdjacentHTML('beforeend','<a href="https://threejs.org/examples/webgl_materials_normalmap.html" target="_blank" rel="noreferrer">Texturas da Terra: distribuição de exemplos Three.js. Imagem contemporânea.</a><span>Paisagem de abertura: ilustração gerada por IA; não é registro histórico.</span>');
const atlas=await createAtlas($('.scene'));
const cinema=createCinema({stageHost:$('.stage'),sceneEl:$('.scene')});
cinema.initReading($('#reading'));
// Initial sync of reduced state (in case user has prefers-reduced-motion)
if(reduced)cinema.setReduced(true);
// Parallax scroll layer (deferred a beat so DOM is settled)
requestAnimationFrame(()=>initParallax($('main')));
// Wire up the reading-closer CTA — jumps to next marco or bibliography
document.addEventListener('click', ev => {
  const btn = ev.target.closest('#next-chapter');
  if (!btn) return;
  ev.preventDefault();
  if (current >= 9) {
    document.querySelector('#bibliography').scrollIntoView({behavior: reduced ? 'instant' : 'smooth'});
  } else {
    travel(current + 1);
  }
});
// Backdrops:
// - Journey default per marco: mostly procedural region-specific atmosphere (backdrops.js)
//   but selected marcos open with an authored IA image as their primary backdrop
// - place-mode ON: swap to the real photograph of the region
// - City click: swap to that specific city's photo when available (see below)
// marcoPrimary[i] can be 'proc' (procedural) or an asset key ('era640','era700','era1000','kilwa','timbuktu')
const marcoPrimary=['era640','proc','proc','era700','proc','proc','proc','era1000','proc','proc'];
const cityToPhoto={cairo:'era700',alexandria:'era700',kilwa:'kilwa',sofala:'kilwa',lamu:'kilwa',aden:'era1000',india:'era1000',mecca:'era1000',timbuktu:'timbuktu',gao:'era640',mande:'era640',walata:'era640',sijilmasa:'era640',ghana:'era640'};
let backdropRequest=0;
function paintBackdrop(source){const token=++backdropRequest;let src;if(source&&source.startsWith('proc:')){const idx=+source.slice(5);const b=getBackdropForMarco(idx);if(!b)return;src=b.dataUri;const el=$('.journey-backdrop');gsap.killTweensOf(el);const preload=new Image();preload.onload=()=>{if(token!==backdropRequest||current<0)return;el.src=src;gsap.fromTo(el,{opacity:.28},{opacity:document.body.classList.contains('place-mode')?1:.72,duration:reduced?0:.6,ease:'power2.out',clearProps:'opacity',overwrite:true});document.body.dataset.material='procedural';document.body.dataset.palette=b.palette.name;};preload.src=src;return;}src='./assets/'+source+(source==='horizonte'||source==='stone'?'.png':'.jpg');const img=new Image();img.src=src;img.decode().then(()=>{if(token!==backdropRequest||current<0)return;const el=$('.journey-backdrop');gsap.killTweensOf(el);el.src=src;gsap.fromTo(el,{opacity:.28},{opacity:document.body.classList.contains('place-mode')?1:.55,duration:reduced?0:.5,ease:'power2.out',clearProps:'opacity',overwrite:true});document.body.dataset.material=source;}).catch(()=>{});}
// City click on globe → swap to that city's photo (when we have one)
$('.scene').addEventListener('click',e=>{const btn=e.target.closest('.city-tag');if(!btn||current<0)return;const label=btn.textContent.toLowerCase();const key=Object.keys(cityToPhoto).find(k=>label.includes(k)||k.includes(label.slice(0,5)));if(key){paintBackdrop(cityToPhoto[key]);document.body.dataset.cityBackdrop='true';}},{capture:true});
const fitObserver=new ResizeObserver(()=>document.documentElement.style.setProperty('--scene-height',$('main').clientHeight+'px'));fitObserver.observe($('main'));
function changeDesign(n){variant=(n+10)%10;const d=directions[variant];document.body.dataset.design=d[2];$('h1').textContent=d[3];$('.subtitle').textContent=d[4];$('#choice-name').textContent=d[0];$('#choice-count').textContent=String(variant+1).padStart(2,'0')+' / 10';$('#choice-note').textContent=d[1];$('#design-select').value=variant;
 document.querySelectorAll('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.variant===variant)));
 const photo=variant===5?'timbuktu':variant===3?'era700':'kilwa',p=photoInfo[photo];$('.photograph img').src=`./assets/${photo}.jpg`;$('.photograph img').alt=p[0];$('.photograph figcaption').textContent=p[0]+' · '+p[1];
 $('#scene-label').textContent=['Conexões esquemáticas · arraste para observar','Conexões esquemáticas · arraste para observar','Fragmento arquitetônico abstrato','Sahel e Índico · esquemas de circulação','Atlas em perspectiva · rotas esquemáticas','Camadas de leitura · composição abstrata','Conexões entre cidades · posições esquemáticas','Monções · interpretação visual do movimento','Fotografias atuais em um espaço expositivo','Faixas de processos · escala temporal esquemática'][variant];
 atlas.set(variant,reduced,current);cinema.onDesignChange(d[2]);if(current>=0)syncExperience();const u=new URL(location);u.searchParams.set('v',variant+1);history.replaceState(null,'',u);
}
function syncExperience(){const e=events[current],northByYear=e.year<800?'era640':e.year<1200?'era700':'era1000',photo=e.region==='north'?northByYear:e.region==='east'?'kilwa':'timbuktu',p=photoInfo[photo];document.body.classList.add('journey-active');$('#journey-date').hidden=false;$('#journey-date').textContent=e.date+' · '+regionNames[e.region];$('h1').textContent=e.title;$('.subtitle').textContent=e.place;$('.thesis').textContent=overview[current];document.body.dataset.cityBackdrop='false';const primary=marcoPrimary[current]||'proc';const eraNames={era640:'Cidade islâmica no rio · geração por IA',era700:'Metrópole islâmica ao amanhecer · geração por IA',era1000:'Skyline islâmica ao entardecer · geração por IA',kilwa:'Grande Mesquita de Kilwa · fotografia atual',timbuktu:'Djinguereber, Timbuctu · fotografia atual'};paintBackdrop(document.body.classList.contains('place-mode')?photo:(primary==='proc'?'proc:'+current:primary));$('.journey-credit').hidden=false;const pal=paletteForMarco(current);if(document.body.classList.contains('place-mode')){$('.journey-credit').textContent='Contexto visual da região: '+p[0]+' · '+p[1]+'. Fotografia atual.';}else if(primary==='proc'){$('.journey-credit').textContent='Atmosfera procedural — '+pal.name+' · sem registro fotográfico do período. Clique numa cidade para ver o lugar.';}else{$('.journey-credit').textContent=eraNames[primary]||'';}$('#understand').hidden=false;$('#photo-toggle').hidden=false;$('#begin').textContent=current===9?'Concluir o argumento':'Continuar a viagem';$('.stage-foot span:first-child').textContent='MARCO '+String(current+1).padStart(2,'0')+' DE 10';$('.stage-foot span:last-child').textContent=current===9?'1468 · fim do recorte selecionado':'A seguir: '+events[current+1].date;selectPhoto(photo);cinema.onMarco(current,reduced);cinema.onReadingMarco(current,reduced);}
function selectEvent(n,scroll=false){current=Math.max(0,Math.min(9,n));const e=events[current];$('#event-meta').textContent=`${String(current+1).padStart(2,'0')} / 10 · ${e.date} · ${regionNames[e.region]}`;$('#event-title').textContent=e.title;$('#paragraph').textContent=e.paragraph;$('#bridge').textContent=e.bridge;$('#gap').textContent=e.gap;$('#evidence h3').textContent=current===9?'Por que encerrar aqui?':'Por que conectar ao próximo marco?';$('#source-link').href='#ref-'+e.refs[0];$('#source-link').textContent='Referências: '+e.refs.map(k=>refs[k].title).join(' · ');$('#evidence').hidden=false;$('#prev').disabled=current===0;$('#next').disabled=current===9;document.querySelectorAll('[data-event]').forEach(b=>b.setAttribute('aria-current',String(+b.dataset.event===current)));$('[data-event="'+current+'"]').scrollIntoView({block:'nearest',inline:'nearest',behavior:reduced?'instant':'smooth'});atlas.focus(current,reduced);if(scroll)$('#reading').scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});}
function travel(n){selectEvent(n);syncExperience();$('main').scrollTo({top:0,behavior:reduced?'instant':'smooth'});}
$('#design-select').onchange=e=>changeDesign(+e.target.value);$('#design-prev').onclick=()=>changeDesign(variant-1);$('#design-next').onclick=()=>changeDesign(variant+1);document.querySelectorAll('[data-variant]').forEach(b=>b.onclick=()=>changeDesign(+b.dataset.variant));document.querySelectorAll('[data-event]').forEach(b=>b.onclick=()=>travel(+b.dataset.event));$('#begin').textContent='Começar a viagem';$('#begin').onclick=()=>current===9?$('#reading').scrollIntoView({behavior:reduced?'instant':'smooth'}):travel(current+1);$('#read-link').onclick=()=>$('#reading').scrollIntoView({behavior:reduced?'instant':'smooth'});$('#prev').onclick=()=>travel(current-1);$('#next').onclick=()=>travel(current+1);$('#prev').disabled=true;$('#replay').onclick=()=>current>=0?atlas.focus(current,reduced):atlas.replay(reduced);
// #motion button removed — reduced motion follows the OS prefers-reduced-motion setting only
document.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return; if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();if(!$('.chooser').hidden)changeDesign(variant+(e.key==='ArrowRight'?1:-1));else if(e.key==='ArrowRight'&&current<9)travel(current+1);else if(e.key==='ArrowLeft'&&current>0)travel(current-1);}else if(/^[0-9]$/.test(e.key)){if(!$('.chooser').hidden)changeDesign(e.key==='0'?9:+e.key-1);else travel(e.key==='0'?9:+e.key-1);}else if(e.key.toLowerCase()==='r'){$('#replay').click();}});
changeDesign(variant);
