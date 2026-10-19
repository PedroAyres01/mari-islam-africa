---
name: O Islã à beira do deserto
description: Linha do tempo em dez marcos lida como manuscrito iluminado em movimento, com o globo lido como astrolábio.
colors:
  lapis-950: "#0b1526"
  lapis-900: "#0e1a2e"
  lapis-800: "#14223a"
  sand-50: "#f6efe0"
  sand-100: "#f1e6cf"
  sand-200: "#eadcc0"
  sand-300: "#d9c49b"
  paper-top: "#efe3c8"
  paper-bot: "#e5d3b0"
  sepia-900: "#2a1a0d"
  sepia-700: "#4a2f1a"
  brown-500: "#7a5230"
  gold-600: "#a8822f"
  gold-500: "#c8a04a"
  gold-300: "#e6cb8a"
  turq-500: "#2f7f86"
typography:
  display:
    fontFamily: "Aref Ruqaa, Spectral, Georgia, serif"
    fontSize: "clamp(2.4rem, 4.4vw, 4.1rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-.01em"
  headline:
    fontFamily: "Aref Ruqaa, Spectral, Georgia, serif"
    fontSize: "clamp(2.2rem, 4vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.05
  title:
    fontFamily: "Aref Ruqaa, Spectral, Georgia, serif"
    fontSize: "clamp(2rem, 3.1vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
  scene-title:
    fontFamily: "Aref Ruqaa, Spectral, Georgia, serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.3rem)"
    fontWeight: 700
    lineHeight: 1.1
  subhead:
    fontFamily: "Aref Ruqaa, Spectral, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
  date:
    fontFamily: "Aref Ruqaa, Spectral, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: "1.08rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: ".98rem"
    fontWeight: 600
    letterSpacing: ".01em"
  caption:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: ".9rem"
    fontWeight: 400
    lineHeight: 1.55
  tag:
    fontFamily: "Spectral, Georgia, serif"
    fontSize: ".8rem"
    fontWeight: 600
    lineHeight: "22px"
    letterSpacing: ".02em"
rounded:
  filet: "2px"
  plate: "3px"
  medallion: "50%"
spacing:
  band: "clamp(18px, 2.6vw, 36px)"
  gap: "12px"
  gap-wide: "16px"
  cartouche-pad: "clamp(24px, 3vw, 40px)"
  folio-pad: "clamp(20px, 5vw, 72px)"
components:
  button-gold:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.sepia-900}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.4rem"
    height: "48px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.sepia-700}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.4rem"
    height: "48px"
  button-quiet-on-lapis:
    backgroundColor: "transparent"
    textColor: "{colors.sand-100}"
    rounded: "{rounded.plate}"
    height: "48px"
  masthead-plate:
    backgroundColor: "{colors.lapis-900}"
    textColor: "{colors.gold-300}"
    rounded: "{rounded.plate}"
    padding: "0 16px"
    height: "44px"
  cartouche:
    backgroundColor: "{colors.paper-top}"
    textColor: "{colors.sepia-900}"
    padding: "{spacing.cartouche-pad}"
  folio:
    backgroundColor: "{colors.paper-top}"
    textColor: "{colors.sepia-900}"
    padding: "{spacing.folio-pad}"
  astro-step:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.sepia-900}"
    rounded: "{rounded.medallion}"
    size: "44px"
  astro-scale:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.sepia-900}"
    rounded: "{rounded.plate}"
    height: "64px"
  astro-mark-current:
    textColor: "{colors.sand-50}"
  place-tag:
    backgroundColor: "{colors.lapis-900}"
    textColor: "{colors.sand-100}"
    typography: "{typography.tag}"
    rounded: "{rounded.filet}"
    padding: "0 8px"
  place-tag-current:
    backgroundColor: "{colors.gold-300}"
    textColor: "{colors.sepia-900}"
---

# Design System: O Islã à beira do deserto

## Overview

**Creative North Star: "O Manuscrito Iluminado em Viagem"**

A viagem é um códice aberto sobre lápis-lazúli. Cada tela é uma página emoldurada por iluminura: uma única moldura de tapete, fixa, envolve todas as cenas (banda de cartuchos com estrelas de oito pontas e rosetas nos cantos), e dentro dela o conteúdo alterna entre dois materiais: o campo de lápis-lazúli, onde vivem o globo, as pinturas animadas e a mandala, e o papel de areia, onde se lê. O texto de Mariana nunca flutua solto sobre imagem; sempre está num papel com filete de ouro.

O globo é lido como astrolábio: a rete dourada gira em volta da Terra, e a linha do tempo é uma régua de latão gravada, com datas em vez de números e uma alidade que desliza até o marco atual. O ouro é metal, não tinta de destaque: aparece em filetes, bandas, rete, régua, medalhões e no botão principal. A densidade é de leitura acadêmica: colunas de 62 a 78 caracteres, entrelinha generosa, capitular no início de cada fólio.

O movimento serve à matéria: a pintura da abertura respira em loop, a areia das dunas se espalha sob o cursor, o camelo anda pela rota, a tinta "assenta" quando um marco troca, a mandala gira devagar. Com movimento reduzido, tudo fica parado e legível.

**Key Characteristics:**
- Uma moldura de tapete fixa (banda + rosetas) em todas as cenas; o conteúdo vive dentro dela.
- Dois materiais: campo de lápis-lazúli com trama khatam em ouro; papel de areia com trama khatam em sépia.
- Toda superfície de leitura é papel com filete duplo de ouro (iluminura), nunca vidro ou card neutro.
- Ouro como metal: filetes, rete, régua, medalhões e o botão principal.
- Títulos em Aref Ruqaa; todo o texto corrido e os controles em Spectral.
- Proveniência declarada: o que é gerado por IA ou desenhado em código está dito nos créditos.

## Colors

Paleta de manuscrito: lápis-lazúli de fundo, papel de areia de leitura, sépia de tinta, ouro de metal e turquesa de azulejo só dentro do ornamento.

### Primary
- **Ouro de Iluminura** (gold-500): o metal do sistema. Filetes internos de todo papel, bandas da moldura, rete do globo, régua do astrolábio, medalhões de navegação, rota concluída no globo, fios das citações e base do gradiente do botão principal.
- **Ouro Pálido** (gold-300): ouro iluminado. Texto sobre lápis (marca no cabeçalho, títulos das cenas de pintura), etiqueta do lugar atual no globo, anel de foco e seleção de texto.
- **Ouro Velho** (gold-600): ouro em sombra. Barra de rolagem; sua variante translúcida desenha os filetes divisórios e o filete externo dos papéis.

### Secondary
- **Turquesa de Azulejo** (turq-500): acento raro, vive só dentro do ornamento desenhado em código (cartuchos da banda, pétalas alternadas das rosetas). Não é usado em texto, controles ou superfícies.

### Neutral
- **Lápis-Lazúli Noturno** (lapis-950): fundo do final, base dos gradientes radiais das cenas de globo e pintura.
- **Lápis-Lazúli** (lapis-900): cor de página padrão do corpo e da página de referências; fundo das placas translúcidas (cabeçalho, etiquetas, barra da caravana); ponta da alidade.
- **Lápis-Lazúli Claro** (lapis-800): centro dos gradientes radiais, chão da banda ornamental, cor de tema do navegador, traço dos marcos já percorridos na régua.
- **Papel de Areia, Topo / Base** (paper-top / paper-bot): os dois extremos do gradiente vertical de todo papel (cartucho, painel do marco, fólio, referências, cartão final).
- **Areia** (sand-50, sand-100, sand-200, sand-300): texto claro sobre lápis (sand-100 padrão, sand-200 legendas em itálico, sand-300 dicas), fundo da abertura antes do vídeo (sand-200), data atual gravada na régua (sand-50) e fundo de espera das figuras (sand-300).
- **Tinta Sépia** (sepia-900): texto corrido sobre papel e texto sobre ouro.
- **Sépia de Título** (sepia-700): títulos, legendas e botões discretos sobre papel.
- **Castanho de Rubrica** (brown-500): datas, capitular, assinatura, links, citações atribuídas e notas de uso sobre papel. Contraste de cerca de 5:1 sobre o papel.

### Named Rules
**The Two Grounds Rule.** Só existem dois chãos: lápis-lazúli (cenas, globo, imagem) e papel de areia (leitura). Texto longo só se assenta no papel; sobre lápis, apenas títulos curtos, legendas e controles.

**The Metal Rule.** Ouro é metal aplicado: filete, banda, régua, medalhão, botão principal. Sobre papel, o ouro nunca vira cor de texto; a hierarquia no papel é sépia e castanho.

**The Tile Accent Rule.** A turquesa existe só dentro do ornamento desenhado em código. Fora dele, nenhum texto, botão ou fundo é turquesa. (A mandala gerada por IA é imagem e tem a paleta própria.)

## Typography

**Display Font:** Aref Ruqaa (com Spectral, Georgia, serif)
**Body Font:** Spectral (com Georgia, serif)

**Character:** Aref Ruqaa é caligrafia ruqʿa latinizada, com o traço de pena de um manuscrito; Spectral é uma serifa de leitura de tela, sóbria, com itálico verdadeiro. As duas fontes são locais (`public/assets/fonts/`), sob SIL Open Font License, e Aref Ruqaa bold e Spectral regular são pré-carregadas.

### Hierarchy
- **Display** (Aref Ruqaa 700, clamp(2.4rem, 4.4vw, 4.1rem), 1.05): só o título da abertura no cartucho, em sépia-700, com `text-wrap: balance`.
- **Headline** (Aref Ruqaa 700, clamp(2.2rem, 4vw, 3.6rem), 1.05): título do fólio "Entender este marco"; a página de referências usa a mesma voz um degrau abaixo (clamp(2rem, 3.6vw, 3rem)).
- **Title** (Aref Ruqaa 700, clamp(2rem, 3.1vw, 3rem), 1.08): título do marco no painel do globo.
- **Scene title** (Aref Ruqaa 700, clamp(1.6rem, 2.6vw, 2.3rem), 1.1): títulos das cenas de pintura, em ouro pálido sobre lápis.
- **Subhead** (Aref Ruqaa 700, 1.5rem, 1.2): nome do documento dentro do fólio.
- **Date** (Aref Ruqaa 400, 1.45rem, 1.2): datas abaixo dos títulos, em castanho. As datas gravadas na régua usam Aref Ruqaa 700 a 1.05rem.
- **Body** (Spectral 400, 17px, 1.6; 16px no celular): texto padrão; o texto do cartucho e do marco sobe para 1.02rem/1.65, máximo 62ch.
- **Reading** (Spectral 400, 1.08rem, 1.75): texto longo do fólio, máximo 68ch, com hifenização e `text-wrap: pretty`. O primeiro parágrafo abre com capitular em Aref Ruqaa 700 a 3.6em, castanho.
- **Label** (Spectral 600, .98rem, .01em): botões.
- **Caption** (Spectral 400, .9rem, 1.55): legendas de figura, créditos, nota de uso das referências (em itálico castanho).
- **Tag** (Spectral 600, .8rem, linha de 22px, .02em): nomes de lugar no globo.

### Named Rules
**The Pen and Press Rule.** Aref Ruqaa só para o que seria escrito à pena: títulos, datas, convite, capitular, citação final e "FIM". Todo parágrafo, legenda e controle é Spectral.

**The Quote Voice Rule.** Citações do fólio são Spectral itálico (1.12rem, 1.7) entre dois filetes de ouro com uma estrela de oito pontas no topo; a atribuição é Spectral 600 castanho, sem itálico.

## Layout

Cada cena ocupa a viewport inteira (`position: fixed`), recuada pela banda da moldura (`--band`, clamp(18px, 2.6vw, 36px)); todo deslocamento interno é calculado a partir dela (`calc(var(--band) + …)`). As cenas trocam por crossfade, sem rolagem entre elas; dentro de cada cena há rolagem própria quando o conteúdo pede (fólio, referências, abertura no celular).

- **Abertura:** pintura em tela cheia (enquadramento 62% 50%), cartucho de papel à esquerda, centralizado na vertical, largura min(33rem, 40vw).
- **Globo:** globo deslocado para a direita (centro em 66% × 45%), painel do marco à esquerda (min(31rem, 33vw)), régua do astrolábio ancorada na base, entre os dois medalhões.
- **Fólio:** página de papel de até 1200px, grade de texto e figuras em 1.35fr / 1fr, com as figuras fixas (`sticky`) ao lado do texto.
- **Referências:** página de papel de até 1100px, lista com filetes entre itens, grade de documentos `auto-fill` com mínimo de 230px e células 4:3.
- **Final:** mandala centralizada maior que a tela (max(118vmin, 760px)), cartão centralizado por cima.

Ritmo: espaçamento contínuo por `clamp()` em vez de escala fixa; vãos entre controles de 12px, entre grupos de 16 a 24px, padding interno dos papéis entre 22 e 72px.

**Responsivo.** Até 1050px o fólio vira uma coluna e as figuras passam para uma grade abaixo do texto. Até 820px ou em retrato (aspect-ratio ≤ 4/5) tudo empilha: a pintura da abertura fica `sticky` em 64dvh (enquadramento 88% 50%) e o cartucho sobe por cima dela; o globo vira uma faixa de min(56dvh, 110vw) sangrando até a moldura, seguido da régua e do painel; os botões da barra de cena ocupam a largura toda. Até 480px o cabeçalho e o cartão final se compactam.

## Elevation & Depth

Profundidade de iluminura, não de interface: cada papel e cada figura é emoldurado por anéis concêntricos (filete de ouro, faixa de papel, filete de ouro velho), desenhados com `box-shadow inset` ou anéis externos, e repousa sobre o lápis com uma sombra ambiente larga e difusa. Não há sombras duras nem deslocadas. Os metais (botão de ouro, medalhões, régua) têm volume por gradiente vertical ou radial e um realce interno de 1px.

### Shadow Vocabulary
- **Moldura de iluminura** (`inset 0 0 0 1px #c8a04a, inset 0 0 0 6px #efe3c8, inset 0 0 0 7px rgba(168,130,47,.6)`): cartucho, painel do marco e cartão final.
- **Moldura de figura** (`0 0 0 1px #c8a04a, 0 0 0 5px #efe3c8, 0 0 0 6px rgba(168,130,47,.55), 0 14px 30px rgba(42,26,13,.25)`): imagens de documento dentro do fólio.
- **Moldura de pintura** (`0 0 0 1px #c8a04a, 0 0 0 6px rgba(14,26,46,.6), 0 0 0 7px rgba(200,160,74,.55), 0 22px 50px rgba(0,0,0,.5)`): vídeos da caravana e do Atlas sobre lápis.
- **Repouso sobre lápis** (`0 18px 40px` a `0 24px 60px`, preto ou sépia a .28–.5): sombra ambiente de todo papel.
- **Moldura da página** (filete de ouro + 3px de lápis + filete de ouro translúcido, por dentro da banda): o fio interno da moldura de tapete.

### Named Rules
**The Illumination Frame Rule.** Toda superfície de leitura e toda figura histórica ganha moldura de anéis concêntricos (ouro, papel, ouro velho). Uma superfície sem esse filete não pertence ao sistema.

## Shapes

Formas de manuscrito e instrumento: retângulos com cantos quase retos (3px em botões, cabeçalho e régua; 2px nas etiquetas e no anel de foco; papéis com canto vivo), e círculos só para objetos de metal ou de cosmos (medalhões de navegação, mandala, moedas, globo). A geometria ornamental é a estrela de oito pontas (khatam): na trama de fundo (ladrilho de 72px), na banda, no centro das rosetas e no fecho das citações. A alidade é um triângulo recortado por `clip-path`.

## Components

### Buttons
Placas de metal, sóbrias e táteis.
- **Shape:** cantos quase retos (3px), altura mínima de 48px, padding horizontal de 1.4rem.
- **Gold (principal):** gradiente vertical de ouro (#e3c378 → gold-500 → #b18a39) com filete interno claro, anel de ouro e filete escuro, e sombra curta; texto sepia-900 em Spectral 600. Um por grupo de ações, sempre a ação de avançar ("Começar a viagem", "Seguir a caravana", "Continuar viagem", "Ver referências").
- **Hover / Active:** o gradiente clareia e o botão sobe 1px; no clique, volta. Transição de 200ms com a curva ease-out do sistema.
- **Quiet (secundário):** fundo transparente com filete interno de 1px em ouro; texto sepia-700 no papel, sand-100 sobre lápis; no hover, véu de ouro a 14%.
- **Focus:** anel de 2px em ouro pálido, afastado 3px.

### Masthead plate
Placa de lápis translúcido (82%, com desfoque de 6px) e filete de ouro, com o nome do site em Aref Ruqaa 700 em ouro pálido; leva de volta à abertura. Some na abertura e quando a página rola.

### Cartucho de papel
O papel da abertura, do painel do marco e do cartão final: gradiente de papel quase opaco (97 a 98%) com trama khatam em sépia, moldura de iluminura e sombra de repouso. Ao trocar de marco, os filhos do painel entram com "tinta assentando" (opacidade, desfoque de 3px → 0 e 6px de subida, 600ms, escalonados em 40ms).

### Régua do astrolábio com alidade
A linha do tempo é uma barra de latão (gradiente vertical de ouro, realce de 1px em cima, sombra de 1px embaixo) com escala de traços finos a cada 9px e um traço maior por data. As datas são gravadas em Aref Ruqaa 700 sepia-900; o marco atual ganha um véu escuro de lápis e data em sand-50; marcos percorridos ganham traço mais longo e grosso em lapis-800. A alidade, um triângulo de lápis no topo, desliza até a data atual em 700ms. A régua rola na horizontal com snap e fica entre dois medalhões de ouro (44px, gradiente radial) com chevrons em SVG; nos extremos, o medalhão desativado cai para 35% de opacidade.

### Rete
Anel ornamental em SVG em volta do globo (2,32 × o raio): dois círculos de ouro, marcas de graduação e doze chamas. Opacidade de 50%, gira 1,4s a cada troca de marco, nunca recebe ponteiro.

### Place-tag
Etiqueta de lugar ancorada no globo: placa de lápis a 78% com filete de ouro a 45%, cantos de 2px, Spectral 600 a .8rem em sand-100. O lugar atual inverte para fundo ouro pálido com texto sepia-900, sem filete.

### Fólio
A página "Entender este marco": papel opaco até 1200px com trama khatam e filete de ouro, cabeçalho separado por filete de ouro velho, capitular castanha no primeiro parágrafo, citações entre filetes com estrela, figuras com moldura de figura e legenda com link "Fonte da imagem", rodapé com as duas ações.

### Moldura de tapete (site-frame)
Uma camada fixa acima de todas as cenas, sem ponteiro: banda horizontal e vertical de 40px desenhada em código (chão lapis-800, dois pares de filetes de ouro, estrelas de oito pontas em ouro, cartuchos turquesa com miolo de areia), escalada para `--band`, com rosetas (shamsa de 16 pétalas ouro/turquesa e estrela central) sobrepostas nos quatro cantos e um filete interno ouro–lápis–ouro.

### Cenas de pintura
Caravana e Atlas: barra de legenda abaixo da imagem (título em ouro pálido, legenda em itálico areia, ação à direita). Na caravana, as dunas desenhadas em código formam o chão sob um céu em gradiente, e a areia se espalha sob o cursor. O Atlas abre com a folha original se aproximando de Mansa Musa (2,4s) e então toca o vídeo.

## Proveniência dos materiais visuais

Registrada porque faz parte do sistema: toda nova imagem entra com a mesma declaração nos créditos.

- **Gerado por IA para o site (não são documentos históricos):** a pintura da abertura (Nano Banana, Google Flow) e sua animação em loop (Veo, Google Flow); a mandala do final (Nano Banana, Google Flow); as animações da caravana (Maqamat de al-Hariri, 1237) e do Atlas Catalão (1375), feitas pelo Veo a partir das imagens originais. As originais, sem alteração, estão na lista de documentos.
- **Desenhado em código:** a banda ornamental, as rosetas, a trama khatam, as dunas, a rete, o camelo e a rota no globo (esquemática, na ordem dos marcos).
- **Terceiros:** texturas da Terra dos exemplos do Three.js; efeito de areia adaptado de "Sculpture Hero" (guglielmogiannattasio.it); Aref Ruqaa e Spectral sob SIL OFL.

## Do's and Don'ts

### Do:
- **Do** colocar todo texto longo em papel de areia (paper-top → paper-bot) com a moldura de iluminura; sobre lápis, só títulos curtos, legendas e controles.
- **Do** usar o ouro como metal: filetes de 1px, bandas, régua, medalhões e o botão principal.
- **Do** manter um único botão gold por grupo de ações, para avançar; a ação secundária é quiet.
- **Do** usar Aref Ruqaa só em títulos, datas, capitular e citação final; todo o resto em Spectral.
- **Do** derivar todo recuo da banda da moldura (`calc(var(--band) + …)`), para que nada encoste no ornamento.
- **Do** usar a curva cubic-bezier(.16, 1, .3, 1) com 200ms para estado, 450ms para troca de cena, e parar todo movimento contínuo com `prefers-reduced-motion`.
- **Do** declarar nos créditos a origem de cada imagem nova (IA, código ou acervo) e manter a original na lista de documentos quando ela for animada.

### Don't:
- **Don't** criar uma segunda moldura ornamental dentro das cenas; a moldura de tapete é uma só e fica fixa.
- **Don't** usar turquesa fora do ornamento desenhado em código.
- **Don't** pintar texto de ouro sobre papel; no papel a hierarquia é sepia-900, sepia-700 e brown-500.
- **Don't** usar sombra dura ou deslocada; profundidade é anel de iluminura mais sombra ambiente difusa.
- **Don't** numerar marcos na linha do tempo; a régua grava datas.
- **Don't** arredondar papéis ou botões além de 3px; círculo só para metal e cosmos.
- **Don't** apresentar imagem gerada por IA como documento histórico.
