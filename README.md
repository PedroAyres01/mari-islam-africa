# O Islã à beira do deserto

Linha do tempo interativa de Mariana Rodrigues Fernandes: dez marcos de c. 613 (fuga para Axum) a c. 1440 (Timbuctu). O conteúdo segue o roteiro final dela, "O Islã à beira do Deserto .pdf", transcrito em `content.js`.

## Executar

No Mac, dê dois cliques em **Abrir experiência.command** para abrir a versão construída (`dist/`); mantenha a janela do servidor aberta enquanto navega.

Para desenvolver: `npm install` e `npm run dev` nesta pasta, depois `http://127.0.0.1:5174`. Para atualizar `dist/`: `npm run build`.

## Percurso

1. **Abertura** — ilustração do Masjid al-Haram (`kaaba.js`, canvas 2D): nuvens em deriva e anéis de peregrinos girando em sentido anti-horário, com o texto de introdução.
2. **Caravana** — a miniatura de 1237 se forma a partir de grãos de areia e passa a se mover (`painting.js`, WebGL2). O cursor desfaz a imagem em areia.
3. **Viagem** — globo (`globe.js`, Three.js) com a rota dourada desenhada marco a marco e um camelo (um barco na travessia do Mar Vermelho). A régua de astrolábio embaixo traz as datas. Setas ← → do teclado navegam. **Entender este marco** abre o fólio com os detalhes e os documentos.
4. **Atlas Catalão** — depois de Mansa Musa: a folha se aproxima do rei, que ergue a moeda de ouro e a entrega ao cavaleiro.
5. **Fim** — mandala em movimento com o texto final e o Alcorão 49:13.
6. **Referências e documentos** — referências com a indicação de onde cada uma foi usada; acervo de todas as imagens com a fonte.

## Arquivos

- `content.js` — todo o texto, lugares, imagens e referências.
- `ornaments.js` — estrelas de oito pontas, bandas de borda, rosetas e mandala em SVG gerado por código.
- `public/assets/doc/` — documentos e fotografias indicados por Mariana (origem de cada um na página de documentos do site).
- `public/assets/fonts/` — Aref Ruqaa e Spectral (SIL OFL).

Sem WebGL, as pinturas aparecem estáticas e a viagem segue pelo texto. Com "reduzir movimento" ativo no sistema, as animações param e as cenas aparecem no estado final.

## Limites

A ilustração da abertura, os ornamentos e a mandala foram desenhados para o site e não são documentos históricos. A rota no globo liga os lugares na ordem dos marcos e é esquemática. As animações movimentam as imagens originais por deformação; elas não foram redesenhadas.
