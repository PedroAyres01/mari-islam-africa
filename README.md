# Dez direções para Entre areias e mar

Abrir a versão construída em `http://127.0.0.1:8766/alternativas/dist/?v=1` quando o servidor da pasta principal estiver ligado.

## Executar

No Mac, dê dois cliques em **Abrir experiência.command**. O navegador abre a versão já construída; mantenha a janela do servidor aberta enquanto navega. Não precisa instalar Vite para esse modo.

Na pasta `alternativas`, execute `npm install` e `npm run dev`. Acesse `http://127.0.0.1:5174`. Para atualizar a versão estática, execute `npm run build`.

## Comparar

Comece por **Começar a viagem**. Setas esquerda/direita avançam e voltam na história; teclas 1–9 e 0 selecionam os dez marcos. R repete o movimento. As datas e botões Anterior/Próximo marco permanecem disponíveis. Arraste o globo, clique nas cidades ou use **Ver fotografia do lugar**. **Entender este marco** leva à análise e às fontes.

O botão **Comparar visuais** revela as dez alternativas. Enquanto esse painel está aberto, as setas e teclas numéricas escolhem a direção visual. Feche o painel para voltar aos atalhos históricos.

As opções são composições comparáveis, com narrativa e leitura compartilhadas; não são dez sites independentes. A experiência principal é uma viagem guiada, com fotos contextuais, câmera e rotas associadas aos marcos. O original permanece na pasta superior. A escolha definitiva ainda está aberta.

## Verificação

Vite 8.2.2 e Three.js 0.186.0. Build concluído. Playwright verificou as dez alternativas em 1440×900, 768×1024 e 375×812, sem transbordamento horizontal. Navegação dos dez marcos, seletor de fotos, movimento reduzido e setas de comparação exercitados. Sem erros de console nessa verificação.

O bundle principal inclui o Three.js e tem aproximadamente 582 kB minificado (150 kB gzip). Fotos e texturas são locais. O fundo de dunas é uma ilustração gerada por IA; seu prompt está em `public/assets/horizonte.prompt.txt`. Fotos documentais e licenças: `public/assets/PHOTO-CREDITS.json`. Texturas contemporâneas da Terra: exemplos oficiais Three.js, arquivos earth_atmos_2048.jpg, earth_normal_2048.jpg e earth_specular_2048.jpg.

## Limites acadêmicos

Mariana precisa revisar o argumento, as fontes e a regra de assistência externa antes da entrega. O limite 1482 pertence à atividade; os dez marcos escolhidos terminam em 1468. Formas tridimensionais abstratas e rotas são esquemáticas, não reconstituições históricas.
