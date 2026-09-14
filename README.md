# Satanabe Store v2

Loja estática responsiva para PC, tablet e mobile.

## Arquivos
- index.html
- pagamento.html
- styles.css
- app.js
- assets/pix-*.png

## Fluxo
1. Cliente escolhe o plano.
2. Página de checkout mostra QR Code PIX e PIX Copia e Cola com o valor.
3. Cliente toca em "Já fiz o pagamento".
4. O WhatsApp é aberto com plano, valor e código do pedido.
5. Cliente envia o comprovante.
6. A key é gerada manualmente no painel administrativo.

O plano de 3 horas é grátis e vai direto para o WhatsApp.

## Publicação no GitHub Pages
Suba todos os arquivos e a pasta `assets` na raiz do repositório.
Depois:
Settings → Pages → Deploy from a branch → main → /(root)

## Responsividade
Um único código atende PC e mobile usando breakpoints em `styles.css`.
