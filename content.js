// Conteúdo do roteiro final de Mariana Rodrigues Fernandes,
// "O Islã à beira do deserto" (PDF, outubro de 2026). Texto transcrito sem reescrita;
// só erros de digitação foram corrigidos (lista no relatório de entrega).

export const intro = {
  title: 'O Islã à beira do deserto',
  author: 'Mariana Rodrigues Fernandes',
  text: 'O Islã surgiu na península Arábica, no século VII, a partir da revelação feita a Muhammad (Maomé), um comerciante da região de Meca. A religião nasceu em uma sociedade comercial, o que deu ao Islã preceitos morais e práticos ligados ao comércio. O código islâmico oferecia a mercadores distantes uma identidade comum e sanções morais que sustentavam confiança e crédito. Dessa forma, as rotas, já existentes antes do Islã, começaram a carregar os costumes e a religiosidade islâmica, acompanhando caravanas pelo Saara.',
  invite: 'Venha acompanhar a viagem islâmica pelo Sahel!',
  painting: './assets/doc/abertura-meca.webp',
  video: './assets/video/abertura-meca.mp4',
  alt: 'Pintura no estilo das miniaturas islâmicas: o pátio da Grande Mesquita de Meca ao amanhecer, com a Caaba ao centro, anéis de peregrinos de branco caminhando ao seu redor, pórticos com cúpulas, minaretes e nuvens douradas no céu.',
  refs: ['chiara', 'morais'],
};

export const caravan = {
  src: './assets/doc/maqamat-caravana.webp',
  video: './assets/video/caravana.mp4',
  poster: './assets/doc/caravana-poster.jpg',
  title: 'Caravana de peregrinos',
  caption: 'Maqamat de al-Hariri, 1237 · animação gerada por IA (Veo) a partir do original',
  alt: 'Miniatura árabe de 1237: caravana de peregrinos com estandartes, tocadores de tambor e trombeta, camelos, um palanquim dourado e um cavaleiro sobre cavalo vermelho.',
};

export const places = {
  mecca: [39.83, 21.42, 'Meca'],
  aksum: [38.72, 14.12, 'Axum'],
  arish: [33.8, 31.13, 'Al-ʿArish'],
  babylon: [31.23, 30.0, 'Babilônia · Fustat'],
  alexandria: [29.92, 31.2, 'Alexandria'],
  kairouan: [10.1, 35.68, 'Cairuão'],
  tadmekka: [1.15, 18.77, 'Tadmekka'],
  gao: [-0.05, 16.27, 'Gao'],
  kumbi: [-7.97, 15.76, 'Kumbi Saleh'],
  awdaghust: [-10.42, 17.43, 'Awdaghust'],
  takrur: [-14.6, 16.5, 'Takrūr'],
  kurukan: [-8.42, 11.93, 'Kurukan Fuga'],
  cairo: [31.24, 30.04, 'Cairo'],
  sijilmasa: [-4.26, 31.28, 'Sijilmassa'],
  taghaza: [-4.98, 23.62, 'Taghaza'],
  walata: [-7.03, 17.3, 'Walata'],
  malicap: [-8.38, 11.38, 'Capital do Mali'],
  timbuktu: [-3.0, 16.77, 'Timbuctu'],
};

export const events = [
  {
    date: 'c. 613',
    title: 'A fuga para Axum',
    text: 'Gerado pela grande perseguição aos primeiros muçulmanos em Mecca, Maomé enviou um grupo para o reino de Axum (atual Etiópia) para buscar refúgio, sendo o primeiro contato do Islã no continente africano.',
    path: ['mecca', 'aksum'],
    sea: true,
    detail: [
      { p: 'Por volta de 613 a 615, a perseguição dos coraixitas (poderosa tribo árabe que dominava Meca no século VII e guardava a Caaba) aos primeiros muçulmanos tornou-se intensa. Maomé enviou um grupo para buscar refúgio em Axum, reino cristão do outro lado do Mar Vermelho, cujo governante, o Najāshī (Negus), era conhecido por não tolerar injustiça. Segundo a biografia do Profeta escrita por Ibn Isḥāq, atravessaram o mar 83 homens e 18 mulheres, além de crianças pequenas, liderados por ʿUthmān ibn Maẓʿūn, e Muhammad permaneceu na Arábia. Os coraixitas enviaram dois emissários para pedir a devolução dos refugiados, e, diante do Najāshī, Jaʿfar ibn Abī Ṭālib defendeu a nova fé e recitou trechos da surata Maryam, o que fez o rei chorar e prometer não entregá-los.' },
      { quote: 'Ele disse: ‘Por certo, sou servo de Allah; Ele me concedeu o Livro e me fez profeta. E me fez abençoado onde quer que eu esteja, e recomendou-me a oração e a esmola enquanto eu viver; e a ser piedoso com minha mãe, e não me fez soberbo nem rebelde. E a paz está comigo no dia em que nasci, no dia em que morrer e no dia em que for ressuscitado.’ Esse é Jesus, filho de Maria: a palavra da verdade, da qual eles duvidam.', cite: 'Alcorão 19:30-34' },
      { p: 'A maioria dos muçulmanos ficou em Axum até 622, e por isso a historiografia costuma tratar o episódio como passageiro. Ainda assim, ele é considerado o primeiro contato formal entre o Islã e o continente africano, sendo o início de um Islã africano. Porém, existem alguns questionamentos presentes no momento, como a conversão do rei e a permanência dos muçulmanos na região. Entretanto, esse momento mostra a habilidade diplomática do Profeta e a influência internacional da nova religião, que precisava ser vista como universal.' },
    ],
    images: [],
    refs: ['pinto'],
  },
  {
    date: '639–641',
    title: 'A conquista do Egito',
    text: 'Em 639, o califa ʿUmar enviou ʿAmr ibn al-ʿĀṣ ao Egito, então província bizantina, com cerca de 4 mil homens. Em poucos anos o território passou ao controle árabe. A fortaleza de Babilônia caiu em abril de 641 e Alexandria se rendeu por tratado em novembro do mesmo ano. O Egito virou a porta de entrada para a conquista do resto do Norte da África.',
    path: ['arish', 'babylon', 'alexandria'],
    detail: [
      { p: 'O Egito, antes da chegada árabe, era bizantino e tinha sido ocupado pelos persas entre 619 e 629. ʿAmr cruzou a fronteira em dezembro de 639, em Al-ʿArish, com cerca de 4 mil cavaleiros, e tomou fortificações do leste do Delta, como Pelúsio. Reforços da Síria chegaram em 640, e o exército bizantino foi derrotado em Heliópolis. A fortaleza de Babilônia, perto do atual Cairo, resistiu a um cerco de cerca de seis meses e caiu em 9 de abril de 641. O governador de Alexandria aceitou negociar, e o tratado foi assinado em novembro de 641. Os bizantinos tentaram retomar a cidade poucos anos depois, sem sucesso. ʿAmr fundou perto de Babilônia o acampamento-cidade de Fustat, hoje parte do Velho Cairo, e o Egito passou a servir de base para as conquistas no Magrebe.' },
      { doc: 'PERF 558 (abril de 643 d.C. – 22 da Hégira)', p: 'É o mais antigo texto árabe datado com a era islâmica. É um recibo bilíngue, em árabe e grego, de 65 ovelhas entregues em Heracleópolis, no Egito, a tropas árabes, comandadas por um emir ʿAbdallāh, provavelmente ʿAbdallāh ibn Jābir. O texto grego chama os árabes de Magaritai, que se acredita vir de muhājirūn. Esse documento prova que dois anos depois do tratado, tropas árabes já operavam no Alto Egito e pediam suprimentos à burocracia local.' },
    ],
    images: [
      { src: './assets/doc/perf558-frente.webp', alt: 'Papiro PERF 558, frente: recibo bilíngue em árabe e grego.', caption: 'PERF 558, frente', source: 'https://en.wikipedia.org/wiki/PERF_558#/media/File:PERF_558,_recto.jpg' },
      { src: './assets/doc/perf558-verso.webp', alt: 'Papiro PERF 558, verso.', caption: 'PERF 558, verso', source: 'https://en.wikipedia.org/wiki/PERF_558#/media/File:PERF_558,_verso.jpg' },
    ],
    refs: ['morais', 'grohmann'],
  },
  {
    date: '670',
    title: 'Cairuão',
    text: 'Por volta de 670, o general árabe ʿUqba ibn Nāfiʿ fundou Cairuão, na atual Tunísia, como base militar e centro religioso dos muçulmanos no Norte da África. O domínio árabe só se firmou no fim do século VII, e a cidade se tornou o ponto de partida da islamização dos berberes, que mais tarde levariam o Islã através do Saara.',
    path: ['kairouan'],
    detail: [
      { p: 'Após a conquista do Egito, os árabes realizaram incursões na Ifríquia, província bizantina que corresponde à atual Tunísia, mas não chegaram a ocupá-la de forma duradoura. Por volta de 670, o general omíada ʿUqba ibn Nāfiʿ fundou Cairuão no interior do território, longe da costa vigiada pela frota bizantina. Segundo os relatos árabes, ele queria uma cidade fixa porque as populações locais deixavam de obedecer assim que o exército partia. Cairuão nasceu como acampamento militar e também como centro religioso, de onde saíam clérigos para converter os habitantes da região. Em 683, ʿUqba morreu numa emboscada do chefe berbere (grupo étnico indígena do Norte da África) Kusayla, que ocupou Cairuão por alguns anos. O domínio árabe só se firmou no início do século VIII, quando jovens berberes de origem nobre, feitos prisioneiros, passaram a ser libertados caso se convertessem e a ocupar postos no exército, o que fez as conversões se multiplicarem.' },
    ],
    images: [
      { src: './assets/doc/cairuao-mesquita.webp', alt: 'Minarete e pátio da Grande Mesquita de Cairuão, em pedra clara sob céu azul.', caption: 'Grande Mesquita de Cairuão (Tunísia). Fundada por ʿUqba ibn Nāfiʿ por volta de 670, segundo a tradição é uma das maiores provas históricas da presença árabe na região, fazendo parte do Patrimônio Mundial da UNESCO (Cairuão, 1988).', source: 'https://pt.wikipedia.org/wiki/Grande_Mesquita_de_Cairu%C3%A3o#/media/Ficheiro:Mosque_of_Uqba_minaret.jpg' },
    ],
    refs: ['chiara', 'mones', 'morais'],
  },
  {
    date: 'séc. VIII–X',
    title: 'As caravanas do ouro',
    text: 'A partir do século VIII, mercadores muçulmanos passaram a atravessar o Saara em caravanas regulares e a se instalar nas cidades comerciais do Sahel, como Kumbi Saleh, Gao, Awdaghust e Tadmekka, levando sal, tecidos e artigos de luxo para o sul e traziam ouro, cobre, noz de cola e escravizados para o norte.',
    path: ['tadmekka', 'gao', 'kumbi', 'awdaghust'],
    detail: [
      { p: 'As rotas que cruzavam o Saara já existiam antes da chegada do Islã. Por elas, o ouro, os escravizados e a noz de cola do sul eram trocados pelo sal, pelos tecidos e pelos artigos de luxo do norte, e muitos desses produtos chegavam em Magrebe. A partir do século VIII, mercadores muçulmanos ibaditas passaram a viver em cidades comerciais do Sahel, como Kumbi Saleh, Gao, Awdaghust e Tadmekka. Para comerciantes espalhados por longas distâncias, o Islã funcionava como uma identidade comum e criava regras morais que davam segurança ao crédito entre eles. Quem fazia negócios com o Norte muitas vezes se convertia, em parte para se integrar a essas redes, e as cidades se islamizaram mais rápido que o campo. Em Tadmekka, escavações encontraram moldes de cerâmica dos séculos IX e X, usados para derreter ouro e produzir pequenas moedas sem inscrição. Essas peças facilitavam o comércio das caravanas e, ao chegar à costa do Mediterrâneo, eram fundidas de novo ou transformadas em moedas com inscrição. O islã ibadita predominou no Sahel até os almorávidas, que a partir de 1040 difundiram o malikismo.' },
    ],
    images: [
      { src: './assets/doc/tadmekka-moldes.webp', alt: 'Três fragmentos de moldes de cerâmica com cavidades circulares, sobre fundo cinza.', caption: 'Moldes de cerâmica de Tadmekka (séculos IX e X), usados para derreter ouro. Institut des sciences humaines, Bamako. Reproduzida de STUDY 1: gold molds. In: Caravans of Gold, Fragments in Time (Block Museum of Art, 2019).', source: 'https://caravansofgold.org/case-studies/study-1-gold-molds/' },
    ],
    refs: ['chiara', 'morais', 'nixon', 'goldmolds'],
  },
  {
    date: 'c. 1009–1030',
    title: 'Os primeiros reis convertidos',
    text: 'Por volta de 1009-1010, Dya Kosoy, soberano de Gao (atual Mali), converteu-se, e por volta de 1030, Wār Dyābī, de Takrūr (o que seria hoje partes do Senegal e Mauritânia), foi apontado como o primeiro chefe do Sudão Ocidental a seguir o mesmo caminho.',
    path: ['gao', 'takrur'],
    detail: [
      { p: 'As conversões no Sahel acompanharam as rotas comerciais que ligavam a região ao Norte da África. Quem fazia negócios com os mercadores muçulmanos muitas vezes se convertia, em parte, para se integrar a essas redes. Com o tempo, as cidades “se islamizaram” e foi nesse cenário que Dya Kosoy, soberano de Gao, adotou o Islã por volta de 1009-1010. Cerca de vinte anos depois, Wār Dyābī, de Takrūr, foi apontado por Hrbek como o primeiro chefe do Sudão Ocidental a se converter.' },
      { p: 'As estelas funerárias de Gao foram encontradas na necrópole de Saney, mesmo sendo posterior ao momento da conversão do reino (século XII), mostra ainda a ligação da elite de Gao com a religião e as rotas do Saara e a península Ibérica (uma delas é de mármore e foi feita em Almería, na Espanha, e levada através do Saara até Gao). A inscrição em árabe traz um poema inspirado no Alcorão, que afirma a unicidade de Deus e apresenta Muhammad como seu servo e mensageiro, e diz que a pessoa enterrada viveu e morreu fiel a essa religião.' },
    ],
    images: [
      { src: './assets/doc/gao-estela.webp', alt: 'Estela funerária fragmentada com inscrição árabe entalhada, sobre fundo escuro.', caption: 'Estela funerária da necrópole de Saney, Gao (século XII).', source: 'https://caravans.library.northwestern.edu/works/19/' },
    ],
    refs: ['chiara', 'morais', 'stone'],
  },
  {
    date: 'c. 1060',
    title: 'O Reino de Gana',
    text: 'Aproximadamente em 1060, o soberano de Gana acolheu os mercadores muçulmanos que chegavam pelas rotas do Saara e permitiu que tivessem mesquitas, sendo a primeira fase da presença do Islã no Sahel.',
    path: ['kumbi'],
    detail: [
      { p: 'Mesmo que juristas como al-Qayrawānī desaprovassem o comércio em terras de não muçulmanos, as trocas continuaram. A presença desses comerciantes aparece na descrição que al-Bakri fez de Kumbi Saleh, onde havia um bairro muçulmano com doze mesquitas e juízes. O islã ganhou força na região, o que gerou a conversão dos próprios soberanos. Apenas no fim do século XVIII, o islã acaba perdendo a força na região, o que fez os mercadores muçulmanos viverem em bairros separados, com mesquita e juízes próprios.' },
      { p: 'Isso pode ser visto nos relatos do geógrafo hispano-árabe al-Bakri em sua obra de 1068 sobre o Império de Gana (apud LEVTZION; HOPKINS, 2000, p. 79-80):' },
      { quote: 'A cidade de Gana consiste em duas cidades situadas em uma planície. Uma dessas cidades, que é habitada por muçulmanos, é grande e possui doze mesquitas, nas quais eles se reúnem para a oração de sexta-feira. Há ímãs assalariados e muezins, bem como juristas e eruditos. Nos arredores existem poços com água doce, da qual eles bebem e com a qual cultivam vegetais.', cite: 'al-Bakri, 1068' },
    ],
    images: [
      { src: './assets/doc/kumbi-saleh.webp', alt: 'Ruínas de muros de pedra seca de Kumbi Saleh sob céu claro.', caption: 'Ruínas de Kumbi Saleh (atual Mauritânia).', source: 'https://agenciaecofin.com/home-fr-fr/noticias-turismo/2303-2252-kumbi-saleh-quando-a-capital-do-imperio-do-gana-ficava-na-mauritania' },
    ],
    refs: ['albakri', 'chiara', 'morais'],
  },
  {
    date: 'c. 1235',
    title: 'O Reino Mali e a Carta de Mandén',
    text: 'No século XIII, o Mali tornou-se a principal potência do Sahel e assumiu o controle das rotas do ouro que antes haviam enriquecido Gana. Segundo a tradição oral, o império foi fundado por Sundjata Keita, que por volta de 1235 derrotou Sumaoro Kanté, rei do Sosso, na batalha de Kirina. A mesma tradição conta que, depois da vitória, o fundador reuniu uma assembleia em Kurukan Fuga e proclamou a Carta do Mandén, reconhecida pela UNESCO em 2009 como Patrimônio Cultural Imaterial da Humanidade.',
    path: ['kurukan'],
    detail: [
      { p: 'O núcleo do Mali ficava na região do alto rio Níger, entre as atuais Guiné e Mali, próximo às zonas auríferas de Buré e Bambuk. O controle dessas áreas deu ao império a principal mercadoria do comércio transaariano, o ouro, que era trocado pelo sal extraído no deserto e pelos tecidos e artigos de luxo vindos do Norte, enquanto a noz de cola, o cobre e os escravizados também circulavam por essas rotas. Ao se expandir, o Mali passou a controlar os caminhos que antes haviam enriquecido Gana, e o rio Níger tornou-se o grande eixo de ligação entre as regiões produtoras de ouro e as cidades do Sahel onde chegavam as caravanas do Saara. Esse comércio era conduzido em grande parte por mercadores muçulmanos, como os wangara, também chamados de diula. Segundo a tradição, a própria Carta do Mandén incluía a liberdade de comércio entre os seus princípios. Como boa parte dessa história foi preservada pela tradição oral, as datas do período são aproximadas.' },
    ],
    images: [
      { src: './assets/doc/kurukan-fuga.webp', alt: 'Monumento de Kurukan Fuga: dois pilares com símbolos e uma placa entre árvores, em savana.', caption: 'Kurukan Fuga, local da proclamação da Carta do Mandén.', source: 'https://ich.unesco.org/en/RL/manden-charter-proclaimed-in-kurukan-fuga-00290' },
    ],
    refs: ['chiara', 'morais', 'niane', 'unescomanden'],
  },
  {
    date: '1324–1325',
    title: 'O hajj de Mansa Musa',
    text: 'Em 1324-1325, Mansa Musa, rei de Mali, fez a peregrinação a Meca. A viagem, marcada pela enorme quantidade de ouro que ele levou e distribuiu pelo caminho, tornou o Mali conhecido em todo o mundo islâmico e na Europa como a terra do ouro.',
    path: ['cairo', 'mecca'],
    detail: [
      { p: 'A peregrinação a Meca é um dos pilares do Islã e era um dever religioso para todo fiel que tivesse condições de realizá-la. Mansa Musa partiu do Mali em 1324, atravessou o Saara até o Cairo e de lá seguiu para a Arábia, pelas rotas que ligavam o Sahel ao restante do mundo islâmico. Nessas rotas, os viajantes contavam com a hospitalidade oferecida a quem estava em trânsito, dessa forma, as peregrinações se associavam com as redes de mercadores que estavam presentes na região, o que acabava gerando a mistura de ambos. No Cairo, segundo o cronista al-ʿUmarī, Mansa Musa relutou em se prostrar diante do sultão mameluco e só o fez ao declarar que se prostrava apenas a Deus. O mesmo autor conta que ele distribuiu tanto ouro na cidade que o valor do metal caiu por vários anos.' },
      { p: 'O Atlas Catalão, produzido em Maiorca em 1375 e atribuído ao cartógrafo Abraão Cresques, mostra exatamente esse momento e deu fama de Mansa Musa como um dos homens mais poderosos e ricos da história.' },
    ],
    images: [
      { src: './assets/doc/atlas-catalao.webp', alt: 'Folha do Atlas Catalão com o Mediterrâneo, o Norte da África e, embaixo, Mansa Musa coroado segurando uma moeda de ouro diante de um cavaleiro em um camelo.', caption: 'CRESQUES, Abraão (atribuído). Atlas Catalão. Maiorca, 1375. Bibliothèque nationale de France, Espagnol 30.', source: 'https://pt.wikipedia.org/wiki/Atlas_Catal%C3%A3o' },
    ],
    refs: ['chiara', 'niane', 'cresques'],
  },
  {
    date: '1352–1353',
    title: 'Ibn Battuta no Mali',
    text: 'Entre 1352 e 1353, o viajante marroquino Ibn Battuta atravessou o Saara e visitou o Mali, então governado por Mansa Sulayman. Em sua rihla, ele registrou o caminho das caravanas, das minas de sal de Taghaza até as cidades do rio Níger, e descreveu a segurança do território e a prática do Islã na corte e entre a população.',
    path: ['sijilmasa', 'taghaza', 'walata', 'malicap', 'timbuktu', 'gao'],
    detail: [
      { p: 'Ibn Battuta, jurista nascido em Tânger, já havia passado quase três décadas viajando pelo mundo islâmico quando decidiu conhecer o Mali. Em fevereiro de 1352, partiu de Sijilmassa com uma caravana e, depois de cerca de 25 dias, chegou às minas de sal de Taghaza, de onde saía boa parte do sal trocado pelo ouro do Sahel. De lá seguiu até Walata e depois até a capital do Mali, onde foi recebido por Mansa Sulayman, irmão de Mansa Musa. Em seu relato, elogiou a segurança das estradas e a dedicação dos habitantes às orações, mas criticou costumes que considerava contrários à prática islâmica, como a forma de vestir das mulheres da corte. Na volta, passou por Timbuctu e desceu o Níger até Gao, então um importante centro comercial, antes de retornar ao Marrocos em 1354. Lá ditou suas memórias ao letrado Ibn Juzayy, a pedido do sultão marínida, e o texto foi concluído em 1356. A obra pertence ao gênero da rihla, o relato de viagem surgido no Magrebe e na Península Ibérica no século XII, em que peregrinação, busca de conhecimento e comércio aparecem juntos.' },
      { quote: 'Assim, cheguei à cidade de Mali, a capital do rei dos negros. Parei no cemitério e fui para o bairro ocupado pelos brancos [nota: comerciantes árabes e berberes do Norte da África], onde perguntei por Muhammad ibn al-Faqih. Descobri que ele havia alugado uma casa para mim e fui para lá.', cite: 'IBN BATTUTA, 2004, p. 302' },
    ],
    images: [
      { src: './assets/doc/ibn-battuta-rihla.webp', alt: 'Manuscrito árabe aberto, com texto em tinta preta e vermelha, encadernação escura.', caption: 'Manuscrito da Tuḥfat an-nuẓẓār (Rihla) de Ibn Battuta.', source: 'https://www.sothebys.com/en/buy/auction/2021/arts-of-the-islamic-world-india-including-fine-rugs-and-carpets-2/ibn-battuta-d-1377-tuhfat-an-nuzzar-fi-gharaib-al' },
    ],
    refs: ['chiara', 'menezes', 'niane', 'ibnbattuta'],
  },
  {
    date: 'c. 1440',
    title: 'Timbuctu',
    text: 'No século XV, Timbuctu era um dos principais centros de comércio e de saber islâmico da África Ocidental. Situada na curva do rio Níger, a cidade reunia as caravanas do Saara e o comércio fluvial, e suas mesquitas e escolas corânicas atraíam estudiosos e alunos. Por volta de 1440, segundo a tradição, chegou à cidade o xarife Sidi Yahia, escolhido como imã da mesquita que hoje leva o seu nome.',
    path: ['timbuktu'],
    detail: [
      { p: 'Timbuctu ficava na curva do rio Níger, no ponto em que o transporte pelo rio encontrava as caravanas que atravessavam o Saara. No seu mercado se trocavam sal, ouro, gado e cereais, e também manuscritos, que circulavam como mercadoria e levavam ideias junto com as transações comerciais. A tradição atribui a Mansa Musa a construção da mesquita de Djingareyber, na volta da sua peregrinação, e a mesquita de Sankore foi erguida no século XIV. Em meados de 1400, o marabuto Sheik El Moktar Hamalla construiu uma nova mesquita, à espera de um homem santo. Quarenta anos depois chega o xarife Sidi Yahia e é escolhido como imã. Nos séculos XV e XVI, com suas mesquitas, escolas corânicas e estudiosos, Timbuctu tornou-se uma capital intelectual e espiritual e um centro de difusão do Islã na África Ocidental. Em 1988, a cidade foi inscrita na Lista do Patrimônio Mundial da UNESCO.' },
    ],
    images: [
      { src: './assets/doc/djinguereber.webp', alt: 'Fachada de adobe da mesquita de Djinguereber, com vigas de madeira salientes, numa rua de areia.', caption: 'Mesquita de Djinguereber, Timbuctu.', source: 'https://www.tripadvisor.com.br/Attraction_Review-g304007-d318006-Reviews-Djinguereber_Mosque-Timbuktu_Tombouctou_Region.html' },
    ],
    refs: ['mota', 'unescotimbuktu'],
  },
];

export const atlasScene = {
  src: './assets/doc/atlas-catalao-mansa-musa.webp',
  video: './assets/video/atlas-mansa-musa.mp4',
  poster: './assets/doc/atlas-poster.jpg',
  sheet: './assets/doc/atlas-catalao.webp',
  title: 'Mansa Musa no Atlas Catalão',
  caption: 'Atlas Catalão, Maiorca, 1375 · atribuído a Abraão Cresques · animação gerada por IA (Veo) a partir do original',
  alt: 'Detalhe do Atlas Catalão: Mansa Musa, coroado e sentado no trono, estende uma moeda de ouro a um cavaleiro de turbante montado num camelo.',
};

export const finale = {
  text: 'Da fuga de um pequeno grupo de muçulmanos para Axum, em 613, às mesquitas e escolas de Tombuctu no século XV, o Islã percorreu um longo caminho até se estabelecer pelo continente africano, influenciando a economia e conexões adentro do território africano, sendo um dos principais marcos na história global.',
  quote: 'Ó humanos, Nós vos criamos de um homem e de uma mulher e vos fizemos povos e tribos, para que vos conhecêsseis uns aos outros',
  cite: 'Alcorão (49:13)',
};

// Referências bibliográficas do roteiro. "used" é calculado em main.js a partir
// de intro.refs e events[].refs.
export const refs = {
  chiara: 'CHIARA, Pietro Enrico Menegatti de; GATT, Pablo. Deslocamentos do Maghreb ao Mashriq: viagens no mundo islâmico africano. In: CHIARA, Pietro de; FELDMAN, Sérgio Alberto; GATT, Pablo (org.). <i>Crenças e culturas em circularidade no contexto tardo antigo e medieval</i>. v. II. Ituiutaba: Barlavento, 2025. p. 210-233.',
  morais: 'MORAIS E SILVA, Bruno Rafael Véras de. O Islã na África do Norte e Ocidental: recepção e reinvenção (séc. VII-XIV). <i>História e Cultura Africana e Afro-Brasileira</i>, 2012. p. 16-38.',
  pinto: 'PINTO, Otávio Luiz Vieira. A Crescente no Mar Eritreu: reflexões sobre a expansão do Islã na costa oriental da África antes do II milênio EC. In: DIAS, Eduardo Costa; GIACOMAZZI, Gabriel dos Santos; DIAS, João Ferreira; MACEDO, José Rivair; BALDÉ, Saido (org.). <i>Sociedades Africanas: religiosidades, identidades e conexões globais</i>. Lisboa: CEI-Iscte, 2023. (E-Book’IS). p. 129-138.',
  grohmann: 'GROHMANN, Adolf. <i>From the World of Arabic Papyri</i>. Cairo: Al-Maaref Press, 1952.',
  mones: 'MONÈS, Hussain. A conquista da África do Norte e a resistência berbere. In: EL FASI, Mohammed (ed.). <i>História geral da África, III: África do século VII ao XI</i>. Brasília: UNESCO, 2010.',
  nixon: 'NIXON, Sam; REHREN, Thilo; GUERRA, Maria Filomena. New light on the early Islamic West African gold trade: coin moulds from Tadmekka, Mali. <i>Antiquity</i>, v. 85, n. 330, p. 1353-1368, 2011. DOI: 10.1017/S0003598X00062104.',
  goldmolds: 'Gold molds. In: <i>CARAVANS of Gold, Fragments in Time: art, culture, and exchange across medieval Saharan Africa</i>. Evanston: Block Museum of Art, Northwestern University, 2019. Disponível em: <a href="https://caravansofgold.org/case-studies/study-1-gold-molds/" target="_blank" rel="noreferrer">https://caravansofgold.org/case-studies/study-1-gold-molds/</a>.',
  stone: 'STONE monument. In: <i>CARAVANS of Gold, Fragments in Time: art, culture, and exchange across medieval Saharan Africa</i>. Evanston: Block Museum of Art, Northwestern University, 2019.',
  albakri: 'AL-BAKRI. Kitāb al-Masālik wa-l-Mamālik (1068). In: LEVTZION, Nehemia; HOPKINS, John F. P. (ed.). <i>Corpus of Early Arabic Sources for West African History</i>. New York: Marcus Weiner Press, 2000. p. 62-87.',
  niane: 'NIANE, Djibril Tamsir. O Mali e a segunda expansão manden. In: NIANE, Djibril Tamsir (ed.). <i>História geral da África, IV: África do século XII ao XVI</i>. Brasília: UNESCO, 2010.',
  unescomanden: 'UNESCO. <i>Manden Charter, proclaimed in Kurukan Fuga</i>. Paris: UNESCO, 2009. Disponível em: <a href="https://ich.unesco.org/en/RL/manden-charter-proclaimed-in-kurukan-fuga-00290" target="_blank" rel="noreferrer">https://ich.unesco.org/en/RL/manden-charter-proclaimed-in-kurukan-fuga-00290</a>.',
  cresques: 'CRESQUES, Abraão (atribuído). <i>Atlas Catalão</i>. Maiorca, 1375. 1 mapa, manuscrito. Bibliothèque nationale de France, Département des Manuscrits, Espagnol 30.',
  menezes: 'MENEZES, Rafael Farias de. A inserção da África Islâmica nas Rotas da Seda: o testemunho de Ibn Battuta, o tangerino (século XIV). In: SIMPÓSIO NACIONAL DE HISTÓRIA, 23., 2005, Londrina. <i>Anais</i> [...]. Londrina: ANPUH, 2005. 7 p.',
  ibnbattuta: 'IBN BATTUTA; IBN JUZAYY. <i>Riḥla</i>. [S. l.], 1356. 1 manuscrito. Bibliothèque nationale de France, Département des Manuscrits, Arabe 2291.',
  mota: 'MOTA, Thiago Henrique. “Sobre o Alcorão e por Maomé”: Islã, produção intelectual e capital cultural na Senegâmbia (séculos XVI e XVII). In: REIS, Raissa Brescia dos; RESENDE, Taciana Almeida Garrido de; MOTA, Thiago Henrique (org.). <i>Estudos sobre África Ocidental: dinâmicas culturais, diálogos atlânticos</i>. Curitiba: Prismas, 2016. p. 35-66.',
  unescotimbuktu: 'UNESCO. <i>Timbuktu</i>. Paris: UNESCO World Heritage Centre, 1988. Disponível em: <a href="https://whc.unesco.org/en/list/119/" target="_blank" rel="noreferrer">https://whc.unesco.org/en/list/119/</a>.',
};

// Ordem alfabética da lista final (ABNT)
export const refOrder = ['albakri', 'chiara', 'cresques', 'goldmolds', 'grohmann', 'ibnbattuta', 'menezes', 'mones', 'morais', 'mota', 'niane', 'nixon', 'pinto', 'stone', 'unescomanden', 'unescotimbuktu'];
