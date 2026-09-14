const PLANS = {"3h": {"id": "3h", "name": "3 horas", "price": 0.0, "highlight": "GRÁTIS", "desc": "Teste rápido para conhecer o acesso."}, "10h": {"id": "10h", "name": "10 horas", "price": 2.0, "desc": "Acesso curto para uso no mesmo dia.", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654042.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63040AE5", "qr": "assets/pix-10h.png"}, "1d": {"id": "1d", "name": "1 dia", "price": 3.0, "desc": "24 horas de acesso.", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654043.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63041919", "qr": "assets/pix-1d.png"}, "3d": {"id": "3d", "name": "3 dias", "price": 4.0, "desc": "Mais tempo por um valor baixo.", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654044.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***630462ED", "qr": "assets/pix-3d.png"}, "7d": {"id": "7d", "name": "7 dias", "price": 5.0, "highlight": "MAIS ESCOLHIDO", "desc": "Uma semana completa de acesso.", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654045.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63047111", "qr": "assets/pix-7d.png"}, "30d": {"id": "30d", "name": "30 dias", "price": 9.0, "highlight": "MELHOR CUSTO", "desc": "Maior duração e melhor custo-benefício.", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654049.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***6304A101", "qr": "assets/pix-30d.png"}};
const WHATSAPP = "5521987269193";

function money(value) {
  if (value === 0) return "Grátis";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function makeOrderId() {
  const d = new Date();
  const part = String(d.getFullYear()).slice(-2) +
    String(d.getMonth()+1).padStart(2,"0") +
    String(d.getDate()).padStart(2,"0");
  const rnd = Math.random().toString(36).slice(2,6).toUpperCase();
  return `STB-${part}-${rnd}`;
}

function renderPlans() {
  const grid = document.getElementById("plansGrid");
  if (!grid) return;

  grid.innerHTML = Object.values(PLANS).map(plan => `
    <article class="plan-card ${plan.highlight ? "highlight" : ""}">
      ${plan.highlight ? `<span class="plan-tag">${plan.highlight}</span>` : `<span class="plan-tag">ACESSO</span>`}
      <h3>${plan.name}</h3>
      <div class="plan-price">${plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(0)}<small>,00</small>`}</div>
      <p>${plan.desc}</p>
      <div class="plan-meta">
        <span>PIX</span>
        <span>WhatsApp</span>
        <span>1 key</span>
      </div>
      <a class="btn primary full" href="pagamento.html?plano=${encodeURIComponent(plan.id)}">
        ${plan.price === 0 ? "Solicitar grátis" : "Comprar agora"}
      </a>
    </article>
  `).join("");
}

function setupMenu() {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded","false");
    btn.textContent = "☰";
  }));
}

function showToast(text) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = text;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1600);
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

function buildMessage(plan, orderId) {
  const name = document.getElementById("customerName")?.value.trim() || "";
  const phone = document.getElementById("customerPhone")?.value.trim() || "";
  const details = `${name ? `\nNome: ${name}` : ""}${phone ? `\nMeu WhatsApp: ${phone}` : ""}`;

  if (plan.price === 0) {
    return `Olá! Quero solicitar a key do plano gratuito de ${plan.name}.\nPedido: ${orderId}${details}`;
  }

  return `Olá! Fiz o PIX do plano de ${plan.name} no valor de ${money(plan.price)}.\nPedido: ${orderId}${details}\n\nVou enviar o comprovante agora para você conferir e gerar minha key.`;
}

function initCheckout() {
  const title = document.getElementById("checkoutPlan");
  if (!title) return;

  const params = new URLSearchParams(location.search);
  const plan = PLANS[params.get("plano")] || PLANS["30d"];
  const orderId = makeOrderId();

  title.textContent = plan.name;
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
    showToast("PIX copiado");
  });

  document.getElementById("paidBtn").addEventListener("click", () => {
    const msg = buildMessage(plan, orderId);
    location.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  });
}

renderPlans();
setupMenu();
initCheckout();
