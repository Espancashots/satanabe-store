# Satanabe Store — v1.3 Alpha

Versão da Store para GitHub Pages com produtos organizados em subpáginas.

## Publicação
Envie todo o conteúdo deste ZIP para a raiz do repositório `satanabe-store`.

Estrutura principal:
- `index.html` — página inicial
- `pagamento.html` — checkout PIX
- `planos/satanabe-external-ios/` — subpágina do Satanabe External iOS
- `videos/` — vídeos da seção “Como funciona”
- `assets/` — imagens, QR Codes e artes
- `styles.css`
- `app.js`
- `VERSION`
- `CHANGELOG.md`

## Satanabe External iOS
- 3 horas — R$ 4
- 10 horas — R$ 8
- 1 dia — R$ 14
- 3 dias — R$ 30
- 7 dias — R$ 40
- 1 mês — R$ 70
- Teste grátis — solicitação separada pelo WhatsApp

## Como adicionar vídeos sem editar o HTML
Coloque os arquivos diretamente na pasta `videos/` do repositório.

Formatos aceitos pela listagem automática:
- `.mp4`
- `.webm`
- `.mov`
- `.m4v`

A página inicial consulta a pasta pública do repositório pelo GitHub e exibe automaticamente os vídeos encontrados. Os players usam `preload="metadata"`, evitando baixar o vídeo inteiro antes de o visitante dar play.

> Recomendado: MP4 com H.264 para maior compatibilidade em iPhone e navegadores.

## Pagamento
Os QR Codes e códigos PIX continuam com os mesmos valores da versão anterior. A liberação da key continua manual pelo WhatsApp após a conferência do comprovante.


## Vídeos
A seção **Como funciona** agora usa embeds do YouTube Shorts. Não é necessário enviar arquivos grandes para a pasta `videos/`.


## Ordem da página inicial na v1.3
A seção **Como funciona**, incluindo os 3 vídeos do YouTube, aparece antes do card **Satanabe External iOS**.
