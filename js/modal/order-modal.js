import { createOrder } from "../api/orders-api.js";

const orderBackdrop = document.querySelector(
  ".order-backdrop",
);

const orderCloseButton = document.querySelector(
  ".order-modal__close",
);

const orderForm = document.querySelector(
  "#order-form",
);

const orderStatus = document.querySelector(
  ".order-form__status",
);

const submitButton = orderForm?.querySelector(
  ".order-form__submit",
);

let closeModalUtil = null;
let onOrderCreated = null;
let selectedBouquetId = null;
let selectedQuantity = 1;
let successTimer = null;

export function isOrderModalOpen() {
  return (
    orderBackdrop?.classList.contains(
      "is-open",
    ) ?? false
  );
}

function setStatus(message) {
  if (orderStatus) {
    orderStatus.textContent = message;
  }
}

function getRequestErrorMessage(error) {
  const apiMessage =
    error?.response?.data?.message;

  return typeof apiMessage === "string"
    ? apiMessage
    : "Unable to create the order. Please try again.";
}

export function openOrderModal({
  bouquetId,
  quantity = 1,
} = {}) {
  const normalizedBouquetId =
    Number(bouquetId);

  const normalizedQuantity =
    Number(quantity);

  if (
    !Number.isInteger(normalizedBouquetId) ||
    normalizedBouquetId <= 0
  ) {
    return;
  }

  selectedBouquetId =
    normalizedBouquetId;

  selectedQuantity =
    Number.isInteger(normalizedQuantity) &&
    normalizedQuantity >= 1 &&
    normalizedQuantity <= 99
      ? normalizedQuantity
      : 1;

  setStatus("");

  orderBackdrop?.classList.add(
    "is-open",
  );

  document.body.classList.add(
    "no-scroll",
  );

  const firstInput =
    orderForm?.querySelector("input");

  firstInput?.focus();
}

export function closeOrderModal() {
  if (!orderBackdrop) {
    return;
  }

  clearTimeout(successTimer);

  if (closeModalUtil) {
    closeModalUtil(orderBackdrop);
  } else {
    orderBackdrop.classList.remove(
      "is-open",
    );

    const anyOpen =
      document.querySelector(
        ".modal-backdrop.is-open, .order-backdrop.is-open",
      );

    if (!anyOpen) {
      document.body.classList.remove(
        "no-scroll",
      );
    }
  }

  orderForm?.reset();

  selectedBouquetId = null;
  selectedQuantity = 1;

  setStatus("");
}

function handleBackdropClick(event) {
  if (event.target === orderBackdrop) {
    closeOrderModal();
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  if (
    !orderForm ||
    !orderForm.reportValidity()
  ) {
    return;
  }

  if (
    !Number.isInteger(selectedBouquetId) ||
    selectedBouquetId <= 0
  ) {
    setStatus(
      "Unable to determine the selected bouquet.",
    );

    return;
  }

  const formData =
    new FormData(orderForm);

  const payload = {
    bouquetId: selectedBouquetId,

    customerName: String(
      formData.get("name") ?? "",
    ).trim(),

    phone: String(
      formData.get("phone") ?? "",
    ).trim(),

    address: String(
      formData.get("address") ?? "",
    ).trim(),

    message: String(
      formData.get("message") ?? "",
    ).trim(),

    quantity: selectedQuantity,
  };

  try {
    if (submitButton) {
      submitButton.disabled = true;
    }

    setStatus("Creating your order...");

    const createdOrder =
      await createOrder(payload);

    orderForm.reset();

    setStatus(
      `Order #${createdOrder.id} was created successfully.`,
    );

    successTimer = setTimeout(() => {
      closeOrderModal();
      onOrderCreated?.();
    }, 1000);
  } catch (error) {
    setStatus(
      getRequestErrorMessage(error),
    );
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
  }
}

export function initOrderModal({
  closeModal,
  onSuccess,
} = {}) {
  if (!orderBackdrop || !orderForm) {
    return;
  }

  if (closeModal) {
    closeModalUtil = closeModal;
  }

  if (onSuccess) {
    onOrderCreated = onSuccess;
  }

  if (orderBackdrop.dataset.modalInit) {
    return;
  }

  orderBackdrop.dataset.modalInit =
    "true";

  orderCloseButton?.addEventListener(
    "click",
    closeOrderModal,
  );

  orderBackdrop.addEventListener(
    "click",
    handleBackdropClick,
  );

  orderForm.addEventListener(
    "submit",
    handleFormSubmit,
  );
}