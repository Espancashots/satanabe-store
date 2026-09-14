const PLANS = {"3h": {"id": "3h", "name": "3H", "label": "3 horas", "price": 0.0, "tag": "GRÁTIS", "emoji": "👺"}, "10h": {"id": "10h", "name": "10H", "label": "10 horas", "price": 2.0, "emoji": "🔥", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654042.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63040AE5", "qr": "assets/pix-10h.png"}, "1d": {"id": "1d", "name": "1D", "label": "1 dia", "price": 3.0, "emoji": "👹", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654043.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63041919", "qr": "assets/pix-1d.png"}, "3d": {"id": "3d", "name": "3D", "label": "3 dias", "price": 4.0, "emoji": "🔥", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654044.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***630462ED", "qr": "assets/pix-3d.png"}, "7d": {"id": "7d", "name": "7D", "label": "7 dias", "price": 5.0, "tag": "POPULAR", "emoji": "👺", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654045.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63047111", "qr": "assets/pix-7d.png"}, "30d": {"id": "30d", "name": "30D", "label": "30 dias", "price": 9.0, "tag": "MELHOR", "emoji": "👹", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654049.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***6304A101", "qr": "assets/pix-30d.png"}};
const WHATSAPP = "5521987269193";

function money(v) {
  return v === 0 ? "Grátis" : `R$ ${v.toFixed(0)},00`;
}

function renderPlans() {
  const grid = document.getElementById("plansGrid");
  if (!grid) return;
  grid.innerHTML = Object.values(PLANS).map(p => `
    <article class="plan-card ${p.tag ? "hot" : ""}">
      <div class="plan-top">
        <span class="plan-emoji">${p.emoji}</span>
        ${p.tag ? `<span class="plan-tag">${p.tag}</span>` : ""}
      </div>
      <h3>${p.name}</h3>
      <p>${p.label}</p>
      <div class="plan-price ${p.tag ? "red" : ""}">${money(p.price)}</div>
      <a class="btn red full" href="pagamento.html?plano=${p.id}">
        ${p.price === 0 ? "PEGAR GRÁTIS" : "COMPRAR"}
      </a>
    </article>
  `).join("");
}

function makeOrderId() {
  const d = new Date();
  const date = String(d.getFullYear()).slice(-2) +
    String(d.getMonth()+1).padStart(2,"0") +
    String(d.getDate()).padStart(2,"0");
  const rnd = Math.random().toString(36).slice(2,6).toUpperCase();
  return `STB-${date}-${rnd}`;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const t = document.createElement("textarea");
  t.value = text;
  t.style.position = "fixed";
  t.style.opacity = "0";
  document.body.appendChild(t);
  t.select();
  document.execCommand("copy");
  t.remove();
}

function showToast(text) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = text;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1500);
}

function buildMessage(plan, orderId) {
  const name = document.getElementById("customerName")?.value.trim() || "";
  const phone = document.getElementById("customerPhone")?.value.trim() || "";
  const extra = `${name ? `\nNome: ${name}` : ""}${phone ? `\nMeu WhatsApp: ${phone}` : ""}`;

  if (plan.price === 0) {
    return `👺 Olá! Quero solicitar a key do plano grátis de ${plan.label}.\nPedido: ${orderId}${extra}`;
  }

  return `🔥 Olá! Fiz o PIX do plano de ${plan.label} no valor de ${money(plan.price)}.\nPedido: ${orderId}${extra}\n\nVou enviar o comprovante agora para você conferir e gerar minha key.`;
}

function initCheckout() {
  const title = document.getElementById("checkoutPlan");
  if (!title) return;

  const params = new URLSearchParams(location.search);
  const plan = PLANS[params.get("plano")] || PLANS["30d"];
  const orderId = makeOrderId();

  title.textContent = plan.label;
  document.getElementById("checkoutPrice").textContent = money(plan.price);
  document.getElementById("orderId").textContent = orderId;

  const pixPanel = document.getElementById("pixPanel");
  const freePanel = document.getElementById("freePanel");

  if (plan.price === 0) {
    pixPanel.classList.add("hidden");
    freePanel.classList.remove("hidden");
    document.getElementById("freeBtn").addEventListener("click", () => {
      const msg = buildMessage(plan, orderId);
      location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    });
    return;
  }

  document.getElementById("pixQr").src = plan.qr;
  document.getElementById("pixCode").value = plan.pix;

  document.getElementById("copyPix").addEventListener("click", async () => {
    await copyText(plan.pix);
    showToast("PIX copiado 🔥");
  });

  document.getElementById("paidBtn").addEventListener("click", () => {
    const msg = buildMessage(plan, orderId);
    location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  });
}

renderPlans();
initCheckout();
