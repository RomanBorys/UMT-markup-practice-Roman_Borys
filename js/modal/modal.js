import {
  fetchBouquetById,
} from "../api/products-api.js";
import {
  createModalMarkup,
} from "../render/render-modal.js";
import {
  initOrderModal,
  openOrderModal,
  isOrderModalOpen,
} from "./order-modal.js";

const backdrop = document.querySelector(
  ".modal-backdrop",
);
const closeBtn = document.querySelector(
  ".modal__close",
);
const modalBody = document.querySelector(
  ".modal__body",
);

export function openModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.add("is-open");
  document.body.classList.add("no-scroll");
}

export function closeModal(modalElement) {
  if (!modalElement) {
    return;
  }

  modalElement.classList.remove("is-open");

  const anyOpen = document.querySelector(
    ".modal-backdrop.is-open, .order-backdrop.is-open",
  );

  if (!anyOpen) {
    document.body.classList.remove("no-scroll");
  }
}

function extractStaticProductFromCard(card) {
  const image = card.querySelector("img");

  const srcset = image
    ?.getAttribute("srcset")
    ?.trim()
    .split(/\s+/)[0];

  const photoURL =
    srcset || image?.src || "";

  const title =
    card.querySelector(
      ".bouquet-card__name, .product-card__name",
    )?.textContent?.trim() ?? "";

  const description =
    card.querySelector(
      ".bouquet-card__desc, .product-card__desc",
    )?.textContent?.trim() ?? "";

  const priceText =
    card.querySelector(
      ".bouquet-card__price, .product-card__price",
    )?.textContent ?? "";

  const price = priceText
    .trim()
    .replace(/^\$/, "")
    .trim();

  return {
    photoURL,
    title,
    description,
    price,
  };
}

function renderProductModal(product) {
  if (!backdrop || !modalBody) {
    return;
  }

  modalBody.innerHTML =
    createModalMarkup(product);

  const buyButton = modalBody.querySelector(
    ".modal__buy-btn",
  );

  buyButton?.addEventListener(
    "click",
    openOrderModal,
  );

  closeBtn?.focus();
}

function openStaticProductModal(card) {
  renderProductModal(
    extractStaticProductFromCard(card),
  );

  openModal(backdrop);
}

async function openApiProductModal(id) {
  if (!backdrop || !modalBody) {
    return;
  }

  modalBody.innerHTML =
    '<p class="modal__status">Loading bouquet...</p>';

  openModal(backdrop);

  try {
    const product =
      await fetchBouquetById(id);

    renderProductModal(product);
  } catch {
    modalBody.innerHTML =
      '<p class="modal__status">Unable to load bouquet details.</p>';
  }
}

function closeProductModal() {
  closeModal(backdrop);

  setTimeout(() => {
    if (
      backdrop &&
      !backdrop.classList.contains("is-open") &&
      modalBody
    ) {
      modalBody.innerHTML = "";
    }
  }, 250);
}

function handleCardActivation(card) {
  const bouquetId = Number(card.dataset.id);

  if (
    Number.isInteger(bouquetId) &&
    bouquetId > 0
  ) {
    openApiProductModal(bouquetId);
    return;
  }

  openStaticProductModal(card);
}

function handleCardClick(event) {
  const card = event.target.closest(
    ".bouquet-card, .product-card",
  );

  if (!card) {
    return;
  }

  handleCardActivation(card);
}

function handleCardKeydown(event) {
  if (
    event.key !== "Enter" &&
    event.key !== " "
  ) {
    return;
  }

  const card = event.target.closest(
    ".bouquet-card, .product-card",
  );

  if (!card) {
    return;
  }

  event.preventDefault();
  handleCardActivation(card);
}

function handleGlobalKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }

  if (isOrderModalOpen()) {
    import("./order-modal.js").then(
      ({ closeOrderModal }) => {
        closeOrderModal();
      },
    );

    return;
  }

  if (
    backdrop?.classList.contains("is-open")
  ) {
    closeProductModal();
  }
}

function initModal() {
  if (!backdrop) {
    return;
  }

  const bouquetsGrid =
    document.querySelector(".bouquets-grid");

  const productsGrid =
    document.querySelector(".products-grid");

  bouquetsGrid?.addEventListener(
    "click",
    handleCardClick,
  );
  bouquetsGrid?.addEventListener(
    "keydown",
    handleCardKeydown,
  );

  productsGrid?.addEventListener(
    "click",
    handleCardClick,
  );

  closeBtn?.addEventListener(
    "click",
    closeProductModal,
  );

  backdrop.addEventListener(
    "click",
    (event) => {
      if (event.target === backdrop) {
        closeProductModal();
      }
    },
  );

  document.addEventListener(
    "keydown",
    handleGlobalKeydown,
  );

  initOrderModal({ closeModal });
}

initModal();