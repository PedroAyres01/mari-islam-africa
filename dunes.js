// Dunas do Saara desenhadas em canvas: céu claro, camadas de dunas com lado iluminado
// e lado em sombra, ondulações do vento e grão. Servem de matéria para o efeito de areia.

export function paintDunes(width = 1600, height = 1000) {
  const c = document.createElement('canvas');
  c.width = width; c.height = height;
  const x = c.getContext('2d');
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  // o céu fica transparente (é um gradiente no CSS): só a areia vira grão

  // camadas, do fundo para a frente
  const layers = [
    {y: 0.4, amp: 0.035, lit: '#e2c58f', shade: '#c9a46b', freq: 1.3},
    {y: 0.5, amp: 0.05, lit: '#ddb878', shade: '#b98d55', freq: 1.0},
    {y: 0.62, amp: 0.07, lit: '#d6a964', shade: '#a87943', freq: 0.8},
    {y: 0.76, amp: 0.08, lit: '#cf9c55', shade: '#94653a', freq: 0.65},
    {y: 0.9, amp: 0.07, lit: '#c58f4b', shade: '#835733', freq: 0.55},
  ];
  layers.forEach((L, li) => {
    const ph = rnd() * 10;
    const crest = i => {
      const t = i / width;
      return height * (L.y - L.amp * (Math.sin(t * Math.PI * 2 * L.freq + ph) * 0.65 + Math.sin(t * Math.PI * 2 * L.freq * 2.3 + ph * 1.7) * 0.35));
    };
    // corpo da duna em sombra
    x.beginPath();
    x.moveTo(0, height);
    for (let i = 0; i <= width; i += 4) x.lineTo(i, crest(i));
    x.lineTo(width, height);
    x.closePath();
    const g = x.createLinearGradient(0, height * (L.y - L.amp), 0, height);
    g.addColorStop(0, L.shade);
    g.addColorStop(1, L.shade);
    x.fillStyle = g;
    x.fill();
    // face iluminada: o lado da duna voltado para a luz (encostas que sobem para a direita)
    x.save();
    x.clip();
    // luz de fim de tarde vinda da esquerda: encostas que sobem para a direita ficam claras
    for (let i = 0; i < width; i += 3) {
      const y0 = crest(i), slope = crest(i + 6) - crest(i - 6);
      const k = Math.max(0, Math.min(1, -slope / 9));
      if (k <= 0.02) continue;
      const lg = x.createLinearGradient(0, y0, 0, y0 + height * 0.22);
      lg.addColorStop(0, L.lit);
      lg.addColorStop(1, L.lit + '00');
      x.globalAlpha = k;
      x.fillStyle = lg;
      x.fillRect(i, y0 - 2, 3.6, height * 0.22);
    }
    x.globalAlpha = 1;
    // ondulações do vento
    x.strokeStyle = 'rgba(90, 55, 25, .16)';
    x.lineWidth = 1.2;
    for (let r = 0; r < 26; r++) {
      const ry = rnd(), rx = rnd() * width;
      x.beginPath();
      for (let i = -60; i <= 220; i += 6) {
        const px = rx + i, py = crest(Math.max(0, Math.min(width, px))) + 10 + ry * height * 0.16 + Math.sin(i * 0.05) * 3;
        i === -60 ? x.moveTo(px, py) : x.lineTo(px, py);
      }
      x.stroke();
    }
    x.restore();
    // aresta da crista
    x.beginPath();
    for (let i = 0; i <= width; i += 4) i ? x.lineTo(i, crest(i)) : x.moveTo(i, crest(i));
    x.strokeStyle = li < 2 ? 'rgba(255, 240, 205, .35)' : 'rgba(255, 236, 196, .45)';
    x.lineWidth = 1.5;
    x.stroke();
  });

  // grão
  const img = x.getImageData(0, 0, width, height);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    if (!d[i + 3]) continue;
    const n = (rnd() - 0.5) * 18;
    d[i] += n; d[i + 1] += n; d[i + 2] += n * 0.8;
  }
  x.putImageData(img, 0, 0);
  return c;
}
