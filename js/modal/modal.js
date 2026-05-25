import { createModalMarkup } from "../render/render-modal.js";
import {
  initOrderModal,
  openOrderModal,
  isOrderModalOpen,
} from "./order-modal.js";

const backdrop = document.querySelector(".modal-backdrop");
const closeBtn = document.querySelector(".modal__close");
const modalBody = document.querySelector(".modal__body");


export function openModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

export function closeModal(modalEl) {
  if (!modalEl) return;
  modalEl.classList.remove("is-open");

  const anyOpen = document.querySelector(
    ".modal-backdrop.is-open, .order-backdrop.is-open",
  );
  if (!anyOpen) {
    document.body.classList.remove("no-scroll");
  }
}


function extractProductFromCard(card) {
  const imgEl = card.querySelector("img");
  const srcsetRaw = imgEl?.getAttribute("srcset") ?? "";
  const srcsetUrl = srcsetRaw.trim().split(/\s+/)[0];
  const img = srcsetUrl || imgEl?.src || "";

  const title =
    card.querySelector(".bouquet-card__name, .product-card__name")
      ?.textContent ?? "";

  const desc =
    card.querySelector(".bouquet-card__desc, .product-card__desc")
      ?.textContent ?? "";

  const priceText =
    card.querySelector(".bouquet-card__price, .product-card__price")
      ?.textContent ?? "";

  const price = priceText.trim().replace(/^\$/, "").trim();

  return { img, title, desc, price };
}


function openProductModal(product) {
  if (!backdrop || !modalBody) return;

  modalBody.innerHTML = createModalMarkup(product);
  openModal(backdrop);

  const buyBtn = modalBody.querySelector(".modal__buy-btn");
  buyBtn?.addEventListener("click", () => {
    openOrderModal();
  });

  closeBtn?.focus();
}

function closeProductModal() {
  closeModal(backdrop);

  setTimeout(() => {
    if (backdrop && !backdrop.classList.contains("is-open") && modalBody) {
      modalBody.innerHTML = "";
    }
  }, 250);
}


function handleCardClick(e) {
  const card = e.target.closest(".bouquet-card, .product-card");
  if (!card) return;
  openProductModal(extractProductFromCard(card));
}


function handleGlobalKeydown(e) {
  if (e.key !== "Escape") return;

  if (isOrderModalOpen()) {
    import("./order-modal.js").then(({ closeOrderModal }) => closeOrderModal());
    return;
  }

  if (backdrop?.classList.contains("is-open")) {
    closeProductModal();
  }
}


function initModal() {
  if (!backdrop) {
    console.warn("[initModal] .modal-backdrop not found in DOM.");
    return;
  }

  document
    .querySelector(".bouquets-grid")
    ?.addEventListener("click", handleCardClick);
  document
    .querySelector(".products-grid")
    ?.addEventListener("click", handleCardClick);

  closeBtn?.addEventListener("click", closeProductModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeProductModal();
  });

  document.addEventListener("keydown", handleGlobalKeydown);

  initOrderModal({ closeModal });
}

initModal();
