const PLANS = {"3h": {"id": "3h", "label": "3 horas", "price": 0.0, "badge": "GRÁTIS"}, "10h": {"id": "10h", "label": "10 horas", "price": 2.0, "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654042.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63040AE5", "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAECUlEQVR4nO2cQW7kOAxFP9sGspSBHCBHcd1gjhT0kXID+Si5gbwMIIOzECnJ6VlFBqpr6nNhVNn14DJAUOQnLVEM2PZrhAaIEydOnDhx4sSJX4uL2QxsyyHYFjvXrgL7DGD3n96uuzvxJ8VXVVVNgNz2F5X3TxHVBGATEVVVBXCI3DCpf73u7sSfFN9r+MIh+vtNVW5BVd5VFdhn+FWgxMRL7078ufD5jzMhQdYEKPblfGXKcvHdiT8n/t3rFPucscmUBUGBbUmQ9QNQ7Nffnfhz4u51QQHsALZ/vkSBQ7BGWNTb3jKw3VBCXa8rP/SzE78Xbl63FYeaIOvni8r68aqC/TUD+2uW9XPOsqbXLMBxWmUf+tmJ3wuHns3OhgysaVIAfljTHz/W+NDPTvy+uNwAFEVuba6HQ7BqhsbwVZW7uagpV96d+LPhFr4iUB1uqqEsA2s7JEBVM1RTxR762YnfCy/uU1bTfkmFOVcMJh8DmFRj8clMryM+YpbNBTtoDBn+qV2wNE8jJi2rLr2O+M/NFtMEqKbJ41rw5G5NgHkizhfodcTH8NL9krcvwbZMqpoOaWmevKdJW6vWV+LL7k782fCa1wEwgaQGPHhe1w5WTXjBwVhH/EfWSXUluHVSXcv6zNe86gBXWOIjZkErqJcKyQQST+nUF9ea/8WQ6XXER6xpc1a0uuv1lWtwcQXFCVnDEh+yfoVNgEbUWKda5WMLfa2kpdcRH7CWuXUpXS1fOzeLrWnBaoL4mHle534VURtfvuq6kDdZXcG8jvgY3qnEZSFFdbMI1BcqPKWrXVp6HfEBs1iH6ZzDTZ2vWfyrUnEEu//Eh8zyOqAbcnINpZ8IaDUEa1jiF/dh7WyNcBE+fdLyui7qPfSzE78X3o8HV6m4635FoIp2XkNw0on4GH5STop5M9Zcz0W7MngXqqRCryP+Yzvpdae11pS7ms2l9gYF9TriQ9avsHWMOFZZrrTAzoN37b0deh3xH1mrYf2Tz6jHNrLuQop7IvM64lfgwbYzAUKGyALIu9Y3w5ZDRJbDNnZaP+u2J3/Hnyf+YHiV4OoYXa1mayHRt2CLzMJqgviQtVKh9cFOzYg2fTJVNZkrLPEh07O5QNzaEkArH/pxY3od8TG87dWpcZ8B287kkNaRwCYzLPW7+O7Enw3vYpjPzeV6oU41dWPEp4F2xjriI3jdq3OTFxNINvFSdVt8J6eyxcnOfU6IX4wfgjVNZYdYrzDsHdnyBsW28H1Y4tfiIX/fdB0IX+LbZM/A6kLe3/fniT8E/p95ndaXrb8nciazgDUs8REzvaRYa+2bNtJGm2AzJxnswxIfxIsQ0rYaVqB6WHeh+6r97x/62YkTJ06cOHHixP9P+L/DurKJBjnvnQAAAABJRU5ErkJggg=="}, "1d": {"id": "1d", "label": "1 dia", "price": 3.0, "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654043.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63041919", "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAD/ElEQVR4nO2dTW7jOBCFX40EZEndwEeRbtZXk46SAwQQlwJkvFmw+GOn0QtLg7RHr4A4kcUPtIFCka+qqBhxwJZ/jtCAcOHChQsXLly48HNxc+thZj0A3A2IZliebsQ8dDpvduEXxUeS5AqQK2BT7AGgo00AOMNvAOhIknzED84u/KJ4LOELABBILAOAcQXs1wpguW1pSA6HJ84u/Fp4/3Rt6ScOIMKXcbntPRA2A0JHIJ46u/Br4s9eB6DbgdjthgDYuIK2DF8gouFbcu+tv7vwn8Kz1wXCA1n4Mi5TBwL35GZE/CCWqduRLk+bXfg1cbTaAB0xrn9+yUNHkpzf+rsL/yk8xbo2fIUdWG47uNx2AGEzLgOMy20z4mmRfevvLvyncI91I5kDWWAT3DiHHWS9RBmiWCf8Vcv7ujgACHuPcUYJczts/OxhCJsREcC4DuAy2UmzC78mnmIdZ7Q7N88Ihz0liP09MoU+jNy1rxN+xKo3Vf9z5ypOOAcyvZB7sybL64S/Zs8a1oVsDXjF4VYga1gvi8nrhL9m2es6JpWQ3Cz5VRYSyRPzuio1IfwUnORm5GffFF5tAoBluFvKpiB+kHPsgfFTdVjhh8x3aSuQwpxv2naQdCGb93qkd59oXyf8mLmj0fVqfXE1kXd97oRATt/J64S/bFm5AimupY1c2OGhb+2YN3euZlvsrb+78J/Cv+XrUDNyax4yp99dI2TldcIPWFMRSxEOnjRxcRuKaC0VsXGFssTCT8CjuYYFACy3nMNLWWLcjTPulmTGjE4d7MKPWKMmas0LAOqq6xoWQJs0VqwT/rI1tYm0cmb5UJWDW6D664SfgpcIl8PcmBMkeUv30AIwQ/k64aetsE3hq8qH39xdXchqhRV+wGrmJG/p8kauLr3PuznI64QfsqfaRI1wNa7Vcemv4pPyOuGv2UOsY9tfUiJcW6VdvTYmrxN+wHIM61qXmnNu2O/mUlm+VOZE+CFrFWnRq63ldpPS1a6KmPAzs8Rrru+XpB2Q+zs9kQIgZ1jkdcJfNT5aeq/s8Fohi7YOq1gn/IA1vsZ6RqwJfTWbUk0aVvhxvIoGpBMU8SN5ok1p2N3sVzk3MXKzB/zg7MKviddndQJhM7PbZumxE0XXYhk6ArFHerDdibMLvxreatiSG2mah1lLYKWhXaewhZ+D52d1mg13Xz7H1VdYs6HzR3cuZlbX37/lwwt/c5wzALObP9jJE8QszSjhoQ/lL/vwwt8Wjz382GtuWU/xzx9T7F3FNv03swu/Eh7YdAv7468HpFPY3treCAl1sAs/ZE954PTeDMDPSATvDciDy5FFqQnhr5rpv9cJFy5cuHDhwoX/L/B/ARmJOZmX0Y7wAAAAAElFTkSuQmCC"}, "3d": {"id": "3d", "label": "3 dias", "price": 4.0, "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654044.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***630462ED", "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAEEUlEQVR4nO2cy23rOhCGv7kSkKUMuICUQndwSkpN6UAqJQVcQFoGoDB3wYdoe2fpIPH1PwvDlPSBEjCYF4c0Z4dM/+yhQbhw4cKFCxcuXPixuGXpYTqttl1r/y09sJRHL8fNLvxF8eDu7jPYZXlzuyxm7jMwmZm7uwOr2YXOy/C42YW/KL5U88VqPg7udhnc7cPdYekpdyHZxENnF/7q+ODOZNmb3t7467MLfwW8vxk7Sx+NYYbp3WE6zVj4BGc5x6NnF/6aeNG6wYEFmP58G2FcewewMINP7xGmC8n0tRbvqb9d+E/hWeumpFAdFr7e3FjObuHzHGE5RwtffbQwn6PBeuV1n/rbhf8Ujl8L0DkMEfe5K0M6J8x3D/v41N8u/GdxuwCpIhc8R292YTWCR3wcvmvlrk/VlCNnF/5qePKwPhk4QwSWc/TpT+dA7IG1J8xretphNQ/z6aDZhb8mTuNXw9w5wb140xl8HHL5GOjcx1QljsjDCt8hWX2G8uMegTLMVbohQpiz1iWvK60T/rjc2Lpk4TxpGCSrNw61UldLxUFaJ/xhaVdVq3KFGYqvrV63prn1mrRO+GPSKBJAVqli6xrXW/1vsoTysMIfl6w/c4nXxqZUVy1hvZZ1EnlY4XukzSaAUgyONaRrnWvJa6O0TvgeyR42mbm6NgG0metQnfDgymGFH2jryjBeWTMo6xVDbFJaaZ3wHVJc56ZXJWndVl9rrLcFgdI64TtkyxeoC//lRvG6uZBX2gIU1wnfh7e2LtS8IikckGO4GtJR901I64Q/Llc5bFWpxrjl4K4UV+pQWif8YckeFpomJ5pmgNJkt+UQymGFH+dh2zbOauFGSvfJFtc1Vu+pv134T+Fte3Duaurug7s527pSL5atE75LGls3AlvRpKhetnpUI5j+ydYJf1y2ysnWwdksRtQYbovwcq4hrRP+sGwO9mppvxSNGbxpvCtD5bDCd8ldWgpXbpZcQykBX1ZHaZ3w3fhkb56PmBjcmU6ruXvdGXZazey05oOdwlc99uRXvLzwJ8WDR8ze3e1jBqBzu6Tuk9Xa8nEyh7Ut5Ve8vPBnw5tUIScSlDbi2ul5q2uqEgvfh9/t/d80rO1q3+K/umVMWif8UUm7sMtW/i6Wo5tWA1ZzlnM0hlhO4bk52Ompv134T+GNDSupKk0be16R2LZM+FVDu2yd8IekxHU0+6y3Jdhmt+LW2q56nfDD8dUIM9hlKPYv57Df6ehYppNyWOHH4kmvwMelHhM7fFs6Jvvjq4dQCnm/7+WFPwV+H9elUsnVDootkGvcsTys8Efl/qzOz1M5A7buoIC1B7poDP/25doBswt/TfxKh9I/h5o5lBvN0Nvnn/rbhQsXLly4cOHC/0/4fwunlvrqoCsiAAAAAElFTkSuQmCC"}, "7d": {"id": "7d", "label": "7 dias", "price": 5.0, "badge": "POPULAR", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654045.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***63047111", "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAEGklEQVR4nO2dQW7cOgyGPz4bmKUM9AA5in2zokd6N7CPkgMEsJcDyGAXEiVlsqptIBkMuZjUjj8oAxCkfpJWRTlhy39naHDccccdd9xxxx13/FpcsvXItPUAu8AmwlJ+IdIDmz06Xbe64y+Kj6qquoL+GUBkAKBTmQCdAdU131NV1c/4ydUdf1F8s/A1rsD4flOWIV/K7xVY3u7pkRz1rlzd8dfC+4drIdxF4S4QPkSXt9hDuAtwU9guXd3x18QfvQ7oFOhUAGRcUVmGD5RtkC/Fvaf+7o5/F25eFxQLZHsPdJFx3lEAZbspy9RF0uVlqzv+0niSqgN5SzeuANtNZdp6ZCJv7mRiTxL20tUdfzEc/WyMGoGgmj5GjVnDziE+PqzzU393x78Lx3xNLcIFVca1Sx/Z1+ol5RH3OsePWtrXKdsAhGiXRCBEZHzvTdduwLgO6DJZgn3u7+74d+GWNNcufUDIKbX517jac3OIpCTssc7x45Y7DXXTZnnV0izoHFTTh2pscrJ7nePHLPtQ2rTlUh0krwOoDrdi96wt5l7n+Ck83EWmENE53KXJsPqeJwJkClXcRmS6cnXHXwsv8qFT2ATGdU8aItkyIRBWYPulsP2KjP/38ZrVHX9NPHmXjPPem4btFMhqVggfvS5TH3V5i8kJs8K9YnXHXxMvhd+IzuTNXdrhJTVhU02qGo2wX/i+zvFj1k7L1YqwNSjakgpZzVbMvc7xY1brJeTkCq2GhVK06xoh617n+Amz6m/Wpule6bk2HVmwjlga/HSvc/ywWazDvGkF6qD6WGvIa97c+b7O8Ss7YqXnlWrDlN4EbePfuhTudY4ftUZNpP3amlVqVQ7ZQhlLAc+wjp+xGuGSm5WButqHaEYAZvA+rOOX1etKwCtTnVWqVoVbhKxnWMdPmDlc7flbqbgt5H3ezeFe5/gps3xZmlw115YCXX0OTFy41zl+3Cx81e5X9xjhmpmnpnziXuf4YasZtr6UY1W6suGzVpldeuXE8VOWM2xyqdKbaB7o2qnO0ipzr3P8hJlKtVmSxq9MuWZ3DGVfZ+HQvc7xY6atlXGnEPkiZD/1YT3WOX7CGm2am7EmUHW1uFYdLptrWMfP41UlpLuLnRUmU/q5i/y29xEZ9e4nTjh+xh5yaLOvy+NO0caIrYbXvMbosc7xQ2ZVYtXa82+Gh7W0wGpJz9/Cdvwa3M7qlGkTYXnLAS/dk8GC4CIisN38hFjHT9jjqYm6TCCEvScf0xnzgXW5QbEi9d5zf3fHfxDeKWw3S7iAyLCLHVO8i87sfga74xfgQcu0cJ5WT262DLuovvfA1ud7Tav2Z/zxjj8Z/lXD1mKwRjtYhyIu6iuLriYcP2pfD7j+F/P/vc5xxx133HHHHXf8p+B/AQQHMMcIXWCvAAAAAElFTkSuQmCC"}, "30d": {"id": "30d", "label": "30 dias", "price": 9.0, "badge": "MELHOR VALOR", "pix": "00020101021126360014br.gov.bcb.pix0114+552197355481052040000530398654049.005802BR5917JOAO P M BAPTISTA6013CACHOEIRAS DE62070503***6304A101", "qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAD+0lEQVR4nO2dXYrjSgxGj64D/ejALCBLcXZwlzRbs5fSC2iwHwMOmocqVVU6MDB2IB3y6cFtu+tgG4RUn+on5uyw6b89NAgXLly4cOHChQt/LG7ZDth5OcB0vBosZkzlH2YHYImm58c9Xfi74Yf0ZxgBll/4dOwwegC61QB8OoOz/Er3ALCHPF34e+NLhK/BVxg+P5zpCAwz2O8ZmE6X1CRHvUc+Xfh74Ydv10b/dWA6YtB/mU+n9QD9xZInsjz06cLfE//udbB85BLe9D/YMOM2Hb9wuNhdce+lv134s/Dwut7Jgaz/Mp/OwDBfcQBn+XCmc5ecrnW9l/524c/CcXcvftQ5w/z3QzQd3N3Hl/524c/CU6xrw1d/MabTik+nNV36dMR8Ol3Mb5s+++WFvyieY93gHoGsj7Nh7tzHfsU9Yp2PlCaKdcK3WsS65Qj0a76cTo7Rr9jwecDoL+YswDAf8elsD3q68PfEI9alQNY5g69ESIuzYc7tfOzXKOkp1gnfbJ5tLWfu4WtZPvjYu6dDaSevE77DItZBxDp39xlqNy87XL1HF9750t8u/Fl4VE5CIAAhGgYPIUGk3txEakL4PstRa+5SNMs5tJyNQOjazqualdcJ32HRS1tJ8sFLSKv3RrqcZkdQv074I9XECOFhQA1p0W4NQrFO+D5rR8QirkWYq6m3VbMVk9cJ32ZNvS4phz7n1TrmWjt3VcjK64TvsKphcwl4pqiJ0KuNaIXsjsqwwrdbaFiKN603Y7PJ9dYQt6WaIq8Tvt2ayknttI39CnXiU63hNUVjeZ3wzdZWiaNzl0JfSq50RWu45tcJfwheRvVLv87bAt33KQAjqtcJf2SGTdelI9dI1WZYrBnDkNcJ32pRr+uKr5U02xTybntzyOuE77LIsN9m1bVxrbZLZ6PmnAjfZ02sG2qBDqgRrpnz1EwQkNcJ32z3/bpckaspNdfratZV5UT4PsuKdG7V7E2D4n8zfJcZ8jrhmyxiXYyD1ZRaC8QekwESkSss8jrhW61m2FYv9F4crl2jfbd456W/Xfiz8Fab5sHYEKg59MWsurGBpGGF78erSkh3p9grzM7R0H43k4wvdoPvfLrwd8Pv9znxMix2M9OkDtXGFBTFOuFbLWvY0rlLJeAopDTLeJLMcG9Wi8nrhO/CY69OO3M1s1MukKR7duyc4fMAk5k1W9z9kJcX/uJ4XQpG3tOpZFggphaX4bOf9fLCXxZfDukQCRfMjte0uxjDfDUfuWoPduEPwEuEo1/T9tdmR9JvALh/Zk9MO2Q3Mz1/xssLfzH8TsMCzfLESLhFXNQli1ITwrfa/QbX/2L69TrhwoULFy5cuPCfgv8BU6RsgKk6RZ8AAAAASUVORK5CYII="}};
const DESTINATION = "5521987269193";

function money(v) {
  return v === 0 ? "Grátis" : v.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
}

function makeOrderId() {
  const now = new Date();
  const date = now.getFullYear().toString().slice(-2) +
    String(now.getMonth()+1).padStart(2,"0") +
    String(now.getDate()).padStart(2,"0");
  const rnd = Math.random().toString(36).slice(2,6).toUpperCase();
  return `STB-${date}-${rnd}`;
}

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1800);
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
  return Promise.resolve();
}

function renderPlans() {
  const root = document.getElementById("plans");
  if (!root) return;
  root.innerHTML = Object.values(PLANS).map(p => `
    <article class="plan-card ${p.badge ? "featured" : ""}">
      ${p.badge ? `<span class="plan-badge">${p.badge}</span>` : ""}
      <div>
        <h3>${p.label}</h3>
        <div class="plan-price">${money(p.price)}${p.price ? "<small> pagamento único</small>" : ""}</div>
        <p>Acesso válido por ${p.label}.</p>
      </div>
      <a class="btn primary" href="pagamento.html?plano=${encodeURIComponent(p.id)}">
        ${p.price === 0 ? "Solicitar grátis" : "Comprar agora"}
      </a>
    </article>
  `).join("");
}

function buildWhatsappMessage(plan, orderId) {
  const name = (document.getElementById("customerName")?.value || "").trim();
  const phone = (document.getElementById("customerPhone")?.value || "").trim();

  if (plan.price === 0) {
    return `Olá! Quero solicitar a key do plano gratuito de ${plan.label}.\n\nPedido: ${orderId}${name ? `\nNome: ${name}` : ""}${phone ? `\nMeu WhatsApp: ${phone}` : ""}`;
  }

  return `Olá! Fiz o PIX do plano de ${plan.label} no valor de ${money(plan.price)}.\n\nPedido: ${orderId}${name ? `\nNome: ${name}` : ""}${phone ? `\nMeu WhatsApp: ${phone}` : ""}\n\nVou enviar o comprovante agora para você confirmar e gerar minha key.`;
}

function initPayment() {
  if (!document.getElementById("planTitle")) return;

  const params = new URLSearchParams(location.search);
  const plan = PLANS[params.get("plano")] || PLANS["30d"];
  const orderId = makeOrderId();

  document.getElementById("planTitle").textContent = plan.label;
  document.getElementById("planPrice").textContent = money(plan.price);
  document.getElementById("orderId").textContent = orderId;

  const paidArea = document.getElementById("paidArea");
  const freeArea = document.getElementById("freeArea");

  if (plan.price === 0) {
    paidArea.classList.add("hidden");
    freeArea.classList.remove("hidden");
    document.getElementById("requestFree").addEventListener("click", () => {
      const msg = buildWhatsappMessage(plan, orderId);
      location.href = `https://wa.me/${DESTINATION}?text=${encodeURIComponent(msg)}`;
    });
    return;
  }

  document.getElementById("pixQr").src = plan.qr;
  document.getElementById("pixCode").value = plan.pix;

  document.getElementById("copyPix").addEventListener("click", async () => {
    await copyText(plan.pix);
    toast("PIX copiado");
  });

  document.getElementById("confirmPayment").addEventListener("click", () => {
    const msg = buildWhatsappMessage(plan, orderId);
    location.href = `https://wa.me/${DESTINATION}?text=${encodeURIComponent(msg)}`;
  });
}

renderPlans();
initPayment();
