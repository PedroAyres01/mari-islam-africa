---
name: Entre areias e mar
description: Narrativa africana guiada sobre Terra realista, fotografia regional e leitura acadêmica.
colors:
  paper: "#192127"
  ink: "#f2efe9"
  panel: "#202a32"
  comparator: "#141c22"
  footer: "#121a20"
  reading-text: "#d5d9db"
  stage-paper: "#202329"
  stage-ink: "#f8f5f0"
  journey-text: "#e8e9e9"
  city-surface: "#14202ade"
  city-text: "#f5eee2"
typography:
  display:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "clamp(64px, 6.6vw, 96px)"
    fontWeight: 500
    lineHeight: 0.99
    letterSpacing: "-.035em"
  journey-title:
    fontFamily: "Barlow, Arial, sans-serif"
    fontSize: "clamp(42px, 4.4vw, 64px)"
    fontWeight: 500
    lineHeight: 1.03
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-.025em"
  subtitle:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "23px"
    lineHeight: 1.4
  body:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "18px"
    lineHeight: 1.7
  journey-body:
    fontFamily: "Arial, sans-serif"
    fontSize: "14px"
    lineHeight: 1.6
  control:
    fontFamily: "Arial, sans-serif"
    fontSize: "12px"
rounded:
  primary: "50px"
  navigation: "40px"
  chip: "30px"
  current: "4px"
  city: "3px"
  select: "6px"
spacing:
  gap-small: "8px"
  inset-small: "12px"
  inset: "16px"
  inset-large: "24px"
  reading-gap: "28px"
components:
  button-primary:
    backgroundColor: "{colors.stage-ink}"
    textColor: "{colors.stage-paper}"
    rounded: "{rounded.primary}"
    padding: "17px 23px"
  button-primary-mobile:
    backgroundColor: "{colors.stage-ink}"
    textColor: "{colors.stage-paper}"
    rounded: "{rounded.primary}"
    padding: "14px 20px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.stage-ink}"
    padding: "8px 0"
  navigation-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.navigation}"
    padding: "0 20px"
  timeline-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.current}"
    padding: "8px 4px"
  photo-chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "0 18px"
  photo-chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.chip}"
    padding: "0 18px"
  city:
    backgroundColor: "{colors.city-surface}"
    textColor: "{colors.city-text}"
    rounded: "{rounded.city}"
    padding: "8px 12px"
  comparator-select:
    backgroundColor: "{colors.comparator}"
    textColor: "#f6f5f2"
    rounded: "{rounded.select}"
    padding: "8px"
---

# Design System: Entre areias e mar

## Overview

**Creative North Star: "Narrativa africana guiada"**

Uma narrativa africana guiada: o argumento histórico ocupa o primeiro plano, a Terra estabelece relações espaciais e as fotografias atuais contextualizam regiões. A paisagem de dunas dá presença à abertura; carvão e azul-noite sustentam a continuidade até leitura, bibliografia e rodapé. A autoria de Mariana Rodrigues Fernandes permanece visível.

Este registro descreve a implementação atual, não uma aprovação definitiva. Horizonte africano é a abertura padrão (`v=1`); a escolha final entre dez alternativas permanece aberta. As rejeições confirmadas são branco vazio, verde/bege como direção dominante e mapa estilizado como representação principal. Não houve comp ou seed retroativo; nenhum é alegado ou exigido aqui.

**Key Characteristics:**

- Terra realista com bordas transparentes e cidades localizáveis.
- Três fotografias regionais creditadas e uma ilustração de dunas identificada como IA.
- Narrativa, leitura e fontes na mesma continuidade escura.
- Navegação histórica em linha própria do viewport; comparador secundário oculto.

Evidência: `main.js` (montagem e estados), `style.css` (cascata completa), `scene.js` (materiais e movimento), `PRODUCT.md`; `package.json` confirma Vite + Three.js, além de HTML/CSS/JS e fontes locais. `events.json` confirma dez marcos de 639–642 até 1468. Capturas fornecidas e inspecionadas: `/private/tmp/mari-review/final-intro.png`, `final-desktop.png`, `final-tablet.png`, `final-mobile.png`, `final-reading.png`. A última ainda mostra o palco no mobile, não a seção de leitura. Comportamentos abaixo foram extraídos do código; este passe não executou nova validação funcional.

## Colors

### Primary

O CTA inverte tinta e superfície locais; não existe uma cor de marca saturada universal. Dentro da abertura principal, `stage-ink` e `stage-paper` prevalecem sobre `ink` e `paper` do documento. O frontmatter distingue esses escopos em vez de promover as declarações antigas de verde e bege.

### Neutral

`paper` sustenta o corpo e a barra histórica; `panel`, bibliografia e moldura fotográfica; `comparator`, o comparador; `footer`, o encerramento. `ink` é a tinta geral, `reading-text` o texto de apoio e `journey-text` o argumento sobre a fotografia. `city-surface` e `city-text` pertencem aos botões ancorados no globo. O foco é laranja funcional, registrado no sidecar, não uma nova paleta de marca. A propriedade `--accent` final existe, mas não tem consumo encontrado no CSS; não foi promovida a token normativo.

**The Continuidade editorial Rule.** Abertura, leitura e fontes compartilham superfícies escuras; a cor descritiva vem das fotografias e da Terra.

## Typography

**Display Font:** Barlow, com Arial/sans-serif de fallback, carregada de `/assets/display-0.ttf`.
**Body Font:** Spectral, com Georgia/serif de fallback, carregada de `/assets/text-0.ttf`.
**Label Font:** Arial/sans-serif nos controles e textos utilitários. Existem duas fontes locais, mas três famílias efetivamente declaradas; não descrever tudo como Barlow + Spectral.

### Hierarchy

Os tokens registram abertura, título de marco, títulos de leitura, subtítulo, corpo editorial e controles. A abertura usa o clamp `display`; durante a viagem, `journey-title` limita a linha a 13ch. No tablet (601–1050px), o título de marco tem 58px/18ch; no mobile (até 600px), 44px/14ch. Abertura: 70px no tablet e 64px no mobile. Subtítulo de marco: 19px, reduzido a 17px no mobile.

Leitura: 18px/1.7 e 65ch; até 900px cai a 16px e até 600px passa a 17px. No intervalo tablet a largura máxima é 68ch. Títulos de leitura e lugares: 42px, 34px até 900px para leitura e até 600px para lugares. Bibliografia: título 36px/1.2, itens 14px/1.7 e notas 12px. Datas da barra: informação funcional pequena, não um padrão recomendado de legibilidade.

**The Duas vozes editoriais Rule.** Barlow conduz os grandes títulos; Spectral acompanha subtítulos e leitura. Arial atende aos controles e textos utilitários existentes.

## Layout

O corpo ocupa 100dvh com overflow bloqueado. O contêiner principal é flex vertical: cabeçalho de 88px (80px no mobile), conteúdo com scroll interno e barra histórica fora desse scroll. Esta barra parece fixa, mas não usa uma sobreposição `position:fixed`: ocupa uma linha própria com mínimo de 96px, ou 116px no mobile. O comparador aberto acrescenta outra linha e reduz a área disponível.

Desktop: texto de abertura com 48% da largura, recuo de 6vw e cena a partir de 43%. O palco final usa `calc(100dvh - 205px)`, mínimo 690px; há máximo herdado de 920px. Tablet: mínimo 1040px, texto acima e globo abaixo, com cena de viagem em `460px 4% 95px`. Mobile: mínimo 930px, texto com recuos laterais de 24px e cena em `480px 0 105px`. Portanto o globo não cabe integralmente no primeiro viewport mobile/tablet; o scroll revela o restante. As capturas confirmam esse corte inicial, não uma sobreposição da barra.

A barra tem padding 12px 4vw e gap 20px no desktop; 8px 16px e gap 4px no mobile. A linha do tempo rola horizontalmente: botões com mínimo de 62px de largura, 52px no mobile, e alvos mobile de pelo menos 44px de altura. Anterior/próximo ocupam a segunda linha no mobile.

Leitura em grade 1fr/1.25fr com gap 10vw e margens 100px 8vw 120px; tablet e mobile empilham. Lugares usam 1fr/1.5fr, gap 7vw e fotografia com proporção 1.5. Bibliografia em duas colunas, gap 7vw, itens até 60ch; uma coluna até 1050px. Seus recuos são 56px 5vw, passando a 24px no mobile. Há recorrência de 8/12/16/24/28px, mas não uma escala universal de 4pt: valores de 17px, 23px, vw e ch também são reais.

## Elevation & Depth

A interface principal usa planos tonais e filetes; o comparador final tem sombra e blur desativados. A sombra e o vidro presentes em regras anteriores foram sobrescritos, não são tokens vigentes. No globo principal, o renderer possui alpha; a Terra usa opacidade .92, `depthWrite:false` e desvanecimento de borda com `smoothstep(0.02, 0.48, ...)`. A atmosfera é uma casca azul transparente de intensidade `rim*0.32`. Texturas contemporâneas de cor, normal e especular dão relevo e resposta à luz.

A fotografia regional entra com opacidade .65 sob proteção em gradiente horizontal; no mobile a proteção é vertical. Ver fotografia leva a imagem a opacidade 1 e oculta a cena. Esses gradientes protegem a leitura; não são proibidos. Sobreposições e parâmetros exatos estão no sidecar.

**The Profundidade geográfica Rule.** A profundidade vem da Terra, da transparência e da fotografia; gradientes de proteção de texto e atmosfera pertencem a este mundo.

## Shapes

CTA principal em cápsula, navegação também arredondada, filtros fotográficos em pílulas. A seleção histórica tem cantos discretos; cidade, retângulo compacto. Os raios normativos estão no frontmatter. Fotografias e painéis editoriais permanecem retangulares; não há regra de arredondar todas as superfícies. Filetes delimitam navegação e ações secundárias.

## Components

### Buttons

O CTA começa em “Começar a viagem”, muda para “Continuar a viagem” e encerra com “Concluir o argumento”, que rola até a leitura. Tem 13px no desktop e 12px no mobile; hover de 200ms com deslocamento de -2px e brilho 1.08 somente para ponteiro fino com hover. Ações secundárias têm filete inferior e alvo de 44px. Foco de botões, links e select: contorno de 3px, offset 4px. Desabilitados usam opacidade .35.

### Chips

Kilwa, Cairo e Timbuctu selecionam a fotografia com `aria-pressed`, sem representar filtros históricos. A seleção inverte as cores do corpo; a altura mínima é 44px. Não há campo de busca ou filtro de regiões implementado neste escopo.

### Cards / Containers

Fotografia dos lugares em moldura tonal com padding de 16px, 10px no mobile. Bibliografia tem painel retangular e links para registros institucionais/bibliográficos. O percurso detalhado inclui parágrafo, justificativa da conexão, interpretação do intervalo e referência; o link do marco aponta para a primeira referência, embora seu texto enumere todas.

### Inputs / Fields

Existe select nativo das dez alternativas, exibido no mobile dentro do comparador. Mantém borda, raio discreto e altura mínima de 44px; no desktop a seleção usa dez botões numerados. Não existem campos de entrada textual.

### Navigation

Dez marcos em ordem histórica, seleção por `aria-current`, anterior/próximo desabilitados nos extremos. Ações por clique, setas e números chamam `travel`, que sincroniza leitura, fotografia regional e câmera; 0 seleciona o décimo marco. Com comparador aberto, setas e números passam a selecionar alternativas. R repete o movimento. Eventos repetidos de teclado e modificadores são ignorados; inputs/selects/textareas não disparam atalhos.

O comparador começa com `hidden`; “Comparar visuais” alterna sua visibilidade e `aria-expanded`. `v` na URL preserva a alternativa. Alternativas existentes: Horizonte africano, Atlas noturno, Pedra e memória, Areia e mar, Mesa cartográfica, Caderno de campo, Rede de cidades, Marés do Índico, Galeria do tempo e Linhas de poder. As quatro variantes globe/night/split/table têm Terra realista; as demais usam arcos, folhas, rede abstrata, ondas, fotografia plana ou faixas. Elas não são dez sistemas aprovados nem dez globos equivalentes.

### Terra e imagens contextuais

Cidades disponíveis no marco geram botões projetados no globo, com descarte dos que estão atrás ou colidem. Clique localiza a cidade; arraste gira a Terra sem inércia. Rotas são conexões esquemáticas. Fotografia depende da região: Cairo para Norte, Timbuctu para Sahel, Kilwa para costa suaíli; são três imagens reutilizadas, não dez registros específicos dos eventos. Créditos no código: Kilwa, Janetmpurdy, 2016, CC BY-SA 4.0; Cairo, Vyacheslav Argenberg, 2007, CC BY 4.0; Timbuctu, upyernoz, 2001, CC BY 2.0. Os links originais estão no rodapé. Dunas em `horizonte.png` são ilustração gerada por IA, explicitamente identificada no rodapé. Texturas da Terra são creditadas à distribuição de exemplos Three.js; Natural Earth é citado para geografia. Estas atribuições foram lidas no código, não auditadas externamente.

A câmera histórica gira o grupo em 850ms com ease-out cúbico, por exigência explícita do usuário para teclado e clique. Não é duração universal de UI. O replay de abertura/troca de alternativa usa 400ms, ease-out quártico. Opacidade de cena: 250ms; imagem: 350ms. Não há autoloop: requestAnimationFrame termina em t=1. Arraste cancela a animação corrente. Não existe botão dedicado de pausa/retomada de peregrinação.

Movimento reduzido do sistema elimina transições/animações CSS e scroll suave; o JS aplica o destino da câmera sem interpolação quando reduzido. O botão manual só altera o estado JS: não desliga as transições CSS; o matchMedia é lido na inicialização sem listener de mudanças. O botão fica oculto no mobile. Sem WebGL há mensagem textual e navegação; falha ao carregar texturas da Terra não tem tratamento equivalente.

### Limitações observadas, não canonizadas

Créditos de viagem de 9px/8px no mobile, datas pequenas e a microlinha “HISTÓRIA DA ÁFRICA” sob a marca não viram padrões de tipografia para novas superfícies; a última é um eyebrow existente. A autoria e a data regional são informação, não kickers inventados. Não foram identificados ícones de glifo remanescentes: as setas do comparador são substituídas por SVG em runtime. O uso de Arial utilitária não equivale a fonte de sistema para display.

As famílias tipográficas carregam arquivos locais sem descritores explícitos de peso/estilo, embora h1 peça 500. O retorno à abertura não limpa o conteúdo anterior da leitura, e `place-mode` persiste ao avançar marcos; isso é comportamento atual, não regra de experiência aprovada. O PRODUCT menciona filtros, modos e pausa que não aparecem como controles dedicados nesta implementação. Contraste sobre fotografias, estados de todas as alternativas e navegação completa não foram certificados por este passe documental. Revisão histórica de Mariana, divergência sobre assistência de IA registrada no PRODUCT e escolha definitiva seguem abertas. Nada disso foi reparado: o escopo autoriza somente estes dois documentos, e outro agente realiza a revisão.

## Do's and Don'ts

### Do:

- Do manter autoria, créditos, distinção entre imagem contextual e evidência histórica e acesso à bibliografia.
- Do preservar a navegação histórica em linha própria, a seleção atual e o comparador inicialmente oculto.
- Do manter o mesmo caminho de navegação histórica para teclado e clique, incluindo a câmera de 850 ms quando o movimento completo está ativo.
- Do respeitar movimento reduzido e preservar a leitura quando o 3D estiver indisponível.

### Don't:

- Don't restaurar branco vazio ou verde/bege como paleta dominante; os tons naturais nas imagens continuam legítimos.
- Don't apresentar fotografias atuais, dunas de IA ou rotas esquemáticas como reconstituições medievais.
- Don't transformar a câmera histórica de 850 ms em duração padrão de controles ou criar movimento contínuo automático.
- Don't declarar alternativa definitiva, aprovação acadêmica, comp ou seed que não foram realizados.
