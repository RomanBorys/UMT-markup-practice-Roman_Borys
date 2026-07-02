import {
  fetchTopBouquets,
} from "./api/products-api.js";

import {
  renderTopBouquets,
} from "./render/render-top-bouquets.js";

function notifyTopBouquetsUpdated() {
  document.dispatchEvent(
    new CustomEvent(
      "top-bouquets:updated",
    ),
  );
}

export async function initTopBouquets() {
  const list = document.querySelector(
    ".products-grid",
  );

  const status = document.querySelector(
    ".bestsellers__status",
  );

  if (!list || !status) {
    return;
  }

  try {
    status.textContent =
      "Loading top bouquets...";

    const bouquets =
      await fetchTopBouquets();

    renderTopBouquets(
      bouquets,
      list,
    );

    status.textContent =
      bouquets.length === 0
        ? "No top bouquets available."
        : "";

    notifyTopBouquetsUpdated();
  } catch {
    list.innerHTML = "";

    status.textContent =
      "Unable to load top bouquets. Please try again later.";

    notifyTopBouquetsUpdated();
  }
}