const orderBackdrop = document.querySelector(".order-backdrop");
const orderCloseBtn = document.querySelector(".order-modal__close");
const orderForm = document.querySelector("#order-form");

let _closeModalUtil = null;


export function isOrderModalOpen() {
  return orderBackdrop?.classList.contains("is-open") ?? false;
}

export function openOrderModal() {
  if (!orderBackdrop) return;
  orderBackdrop.classList.add("is-open");
  document.body.classList.add("no-scroll");
  orderCloseBtn?.focus();
}

export function closeOrderModal() {
  if (!orderBackdrop) return;
  if (_closeModalUtil) {
    _closeModalUtil(orderBackdrop);
  } else {
    orderBackdrop.classList.remove("is-open");
    const anyOpen = document.querySelector(
      ".modal-backdrop.is-open, .order-backdrop.is-open",
    );
    if (!anyOpen) document.body.classList.remove("no-scroll");
  }
}


function handleBackdropClick(e) {
  if (e.target === orderBackdrop) closeOrderModal();
}

function handleFormSubmit(e) {
  e.preventDefault();
  closeOrderModal();
  orderForm?.reset();
}

export function initOrderModal({ closeModal } = {}) {
  if (!orderBackdrop) {
    console.warn("[initOrderModal] .order-backdrop not found in DOM.");
    return;
  }

  if (closeModal) _closeModalUtil = closeModal;

  if (orderBackdrop.dataset.modalInit) return;
  orderBackdrop.dataset.modalInit = "true";

  orderCloseBtn?.addEventListener("click", closeOrderModal);
  orderBackdrop.addEventListener("click", handleBackdropClick);
  orderForm?.addEventListener("submit", handleFormSubmit);
}
