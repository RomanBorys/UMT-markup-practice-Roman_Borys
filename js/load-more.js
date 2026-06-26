import { fetchBouquets } from "./api/products-api.js";
import { appendBouquets } from "./render/render-products.js";
import { state } from "./state/state.js";

function updateButton(button) {
  const hasMore =
    state.loadedCount < state.products.length;

  button.hidden = !hasMore;
  button.disabled = state.isLoading;
}

function renderNextBatch(grid, count) {
  const nextProducts = state.products.slice(
    state.loadedCount,
    state.loadedCount + count,
  );

  appendBouquets(nextProducts, grid);

  state.loadedCount += nextProducts.length;
}

export async function initLoadMore() {
  const button = document.querySelector(
    ".bouquets__cta .btn--wide",
  );
  const grid = document.querySelector(
    ".bouquets-grid",
  );
  const status = document.querySelector(
    ".bouquets__status",
  );

  if (!button || !grid) {
    return;
  }

  try {
    state.isLoading = true;
    button.disabled = true;
    button.hidden = true;

    if (status) {
      status.textContent = "Loading bouquets...";
    }

    const products = await fetchBouquets();

    state.products = products;
    state.loadedCount = 0;

    grid.innerHTML = "";

    renderNextBatch(
      grid,
      state.initialCount,
    );

    if (status) {
      status.textContent =
        products.length === 0
          ? "No bouquets are available yet."
          : "";
    }
  } catch {
    if (status) {
      status.textContent =
        "Unable to load bouquets. Please try again later.";
    }
  } finally {
    state.isLoading = false;
    updateButton(button);
  }

  button.addEventListener("click", () => {
    if (state.isLoading) {
      return;
    }

    renderNextBatch(
      grid,
      state.itemsPerClick,
    );

    updateButton(button);
  });
}