const WHATSAPP = "5521987269193";
const SITE_REPO = "espancashots/satanabe-store";
const ROOT = document.body?.dataset?.root || "";

const PLANS = {
  "3h": {
    id: "3h", name: "3 HORAS", label: "3 horas", price: 4,
    note: "Plano de entrada", qr: "assets/pix-3h.png",
    pix: "00020101021126580014br.gov.bcb.pix01360c0f1a70-bf41-4479-a66d-c6a527cf76fe52040000530398654044.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63049FFD"
  },
  "10h": {
    id: "10h", name: "10 HORAS", label: "10 horas", price: 8,
    note: "Para usar por mais tempo", qr: "assets/pix-10h.png",
    pix: "00020101021126580014br.gov.bcb.pix01360c0f1a70-bf41-4479-a66d-c6a527cf76fe52040000530398654048.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63044FED"
  },
  "1d": {
    id: "1d", name: "1 DIA", label: "1 dia", price: 14,
    note: "24 horas", qr: "assets/pix-1d.png",
    pix: "00020101021126580014br.gov.bcb.pix01360c0f1a70-bf41-4479-a66d-c6a527cf76fe520400005303986540514.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***6304DF35"
  },
  "3d": {
    id: "3d", name: "3 DIAS", label: "3 dias", price: 30,
    note: "72 horas", qr: "assets/pix-3d.png",
    pix: "00020101021126580014br.gov.bcb.pix01360c0f1a70-bf41-4479-a66d-c6a527cf76fe520400005303986540530.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63043C40"
  },
  "7d": {
    id: "7d", name: "7 DIAS", label: "7 dias", price: 40,
    note: "Uma semana completa", tag: "POPULAR", qr: "assets/pix-7d.png",
    pix: "00020101021126580014br.gov.bcb.pix01360c0f1a70-bf41-4479-a66d-c6a527cf76fe520400005303986540540.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***630407BC"
  },
  "1m": {
    id: "1m", name: "1 MÊS", label: "1 mês", price: 70,
    note: "Maior duração", tag: "MAIOR DURAÇÃO", qr: "assets/pix-1m.png",
    pix: "00020101021126580014br.gov.bcb.pix01360c0f1a70-bf41-4479-a66d-c6a527cf76fe520400005303986540570.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***6304756B"
  }
};

function money(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(value);
}

function normalizePhone(value = "") {
  return value.replace(/\D/g, "").slice(0, 15);
}

function planCard(plan, index, prefix = "") {
  return `
    <article class="plan-card ${plan.tag ? "featured" : ""}">
      <div class="plan-card-top">
        <span class="plan-number">0${index + 1}</span>
        ${plan.tag ? `<span class="plan-tag">${plan.tag}</span>` : ""}
      </div>
      <h3>${plan.name}</h3>
      <p>${plan.note}</p>
      <div class="plan-price"><strong>${money(plan.price)}</strong><small>pagamento único</small></div>
      <a class="btn btn-primary btn-full" href="${prefix}pagamento.html?plano=${plan.id}">Comprar</a>
      ${plan.id === "3h" ? `<button class="plan-trial" type="button" data-trial>ou solicitar teste grátis</button>` : ""}
    </article>
  `;
}

function renderPlans() {
  const grid = document.getElementById("plansGrid");
  if (!grid) return;
  grid.innerHTML = Object.values(PLANS).map((plan, index) => planCard(plan, index)).join("");
}

function renderExternalPlans() {
  const grid = document.getElementById("externalPlansGrid");
  if (!grid) return;
  grid.innerHTML = Object.values(PLANS).map((plan, index) => planCard(plan, index, ROOT)).join("");
}

function getOrderId(planId = "") {
  const key = `satanabe-order-${planId}`;
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const now = new Date();
  const date = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const random = crypto?.getRandomValues
    ? Array.from(crypto.getRandomValues(new Uint8Array(3))).map(v => (v % 36).toString(36)).join("").toUpperCase()
    : Math.random().toString(36).slice(2, 5).toUpperCase();
  const order = `STB-${date}-${random}`;
  sessionStorage.setItem(key, order);
  return order;
}

async function copyText(text) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function trialMessage() {
  return "Olá! Quero solicitar o teste grátis do Satanabe External iOS. Pode me orientar sobre a disponibilidade?";
}

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.location.href = url;
}

function bindTrialButtons() {
  document.querySelectorAll("[data-trial]").forEach(button => {
    if (button.dataset.boundTrial === "1") return;
    button.dataset.boundTrial = "1";
    button.addEventListener("click", () => openWhatsApp(trialMessage()));
  });
}

function paymentMessage(plan, orderId) {
  const name = document.getElementById("customerName")?.value.trim() || "";
  const phone = normalizePhone(document.getElementById("customerPhone")?.value || "");
  const details = [
    "Olá! Fiz o PIX na Satanabe Store.",
    "Produto: Satanabe External iOS",
    `Plano: ${plan.label}`,
    `Valor: ${money(plan.price)}`,
    `Pedido: ${orderId}`,
    name ? `Nome: ${name}` : "",
    phone ? `Meu WhatsApp: ${phone}` : "",
    "",
    "Vou enviar o comprovante agora para conferência."
  ].filter(Boolean);
  return details.join("\n");
}

function initCheckout() {
  const title = document.getElementById("checkoutPlan");
  if (!title) return;

  const params = new URLSearchParams(window.location.search);
  const planId = params.get("plano");
  const plan = PLANS[planId] || PLANS["7d"];
  const orderId = getOrderId(plan.id);

  title.textContent = plan.name;
  document.getElementById("checkoutPrice").textContent = money(plan.price);
  document.getElementById("orderId").textContent = orderId;
  document.getElementById("pixQr").src = plan.qr;
  document.getElementById("pixCode").value = plan.pix;

  const copyButton = document.getElementById("copyPix");
  copyButton?.addEventListener("click", async () => {
    try {
      await copyText(plan.pix);
      showToast("PIX copiado");
      copyButton.textContent = "PIX copiado ✓";
      setTimeout(() => { copyButton.textContent = "Copiar PIX"; }, 1800);
    } catch {
      showToast("Não foi possível copiar automaticamente");
    }
  });

  document.getElementById("paidBtn")?.addEventListener("click", () => {
    openWhatsApp(paymentMessage(plan, orderId));
  });
}

function prettyVideoName(filename) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, char => char.toUpperCase());
}

function renderVideoCard(grid, file) {
  const card = document.createElement("article");
  card.className = "video-card";

  const video = document.createElement("video");
  video.controls = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.src = `videos/${encodeURIComponent(file.name)}`;
  video.setAttribute("aria-label", prettyVideoName(file.name));

  const info = document.createElement("div");
  info.className = "video-info";
  const title = document.createElement("strong");
  title.textContent = prettyVideoName(file.name);
  const meta = document.createElement("span");
  meta.textContent = "Demonstração em vídeo";
  info.append(title, meta);

  card.append(video, info);
  grid.appendChild(card);
}

async function loadVideos() {
  const grid = document.getElementById("videosGrid");
  if (!grid) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${SITE_REPO}/contents/videos`, {
      headers: { "Accept": "application/vnd.github+json" },
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    const entries = await response.json();
    const supported = /\.(mp4|webm|mov|m4v)$/i;
    const files = Array.isArray(entries)
      ? entries.filter(item => item.type === "file" && supported.test(item.name))
      : [];

    grid.innerHTML = "";
    if (!files.length) {
      grid.innerHTML = `<div class="videos-empty"><b>Nenhum vídeo adicionado ainda.</b><span>Envie um arquivo .mp4, .webm, .mov ou .m4v para a pasta <code>videos/</code> do repositório.</span></div>`;
      return;
    }

    files.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { numeric: true }));
    files.forEach(file => renderVideoCard(grid, file));
  } catch (error) {
    grid.innerHTML = `<div class="videos-empty"><b>Não foi possível listar os vídeos agora.</b><span>Os arquivos continuam na pasta <code>videos/</code>. Recarregue a página depois.</span></div>`;
    console.warn("Satanabe Store: falha ao carregar vídeos", error);
  }
}

function initGallery() {
  const modal = document.getElementById("galleryModal");
  const image = document.getElementById("galleryImage");
  if (!modal || !image) return;

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    image.src = "";
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-gallery]").forEach(button => {
    button.addEventListener("click", () => {
      image.src = button.dataset.gallery;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
    });
  });

  modal.querySelector(".gallery-close")?.addEventListener("click", close);
  modal.addEventListener("click", event => {
    if (event.target === modal) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) close();
  });
}

renderPlans();
renderExternalPlans();
bindTrialButtons();
initCheckout();
loadVideos();
initGallery();
