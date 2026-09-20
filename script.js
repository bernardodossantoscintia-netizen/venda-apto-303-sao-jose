const form = document.querySelector("#visita-form");
const statusEl = document.querySelector("#form-status");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");

function openLightbox(src) {
  lightboxImage.src = src;
  lightbox.classList.add("open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightboxImage.src = "";
}

document.querySelectorAll("[data-photo]").forEach((button) => {
  button.addEventListener("click", () => {
    openLightbox(button.dataset.photo);
  });
});

lightbox.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const nome = String(data.get("nome") || "").trim();
  const telefone = String(data.get("telefone") || "").trim();

  if (!nome || !telefone) {
    statusEl.textContent = "Preencha nome e telefone para continuar.";
    return;
  }

  const mensagem = String(data.get("mensagem") || "").trim();
  const texto = [
    `Olá! Meu nome é ${nome}.`,
    `Tenho interesse no apto 303 (67 m²), desocupado — R$ 450.000,00.`,
    `Telefone: ${telefone}.`,
    mensagem
  ].filter(Boolean).join(" ");

  window.open(`https://wa.me/5548999919435?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
  statusEl.textContent = `Obrigado, ${nome}. Vamos abrir o WhatsApp para finalizar o pedido de visita.`;
  form.reset();
});
