const ITEMS_PER_CLICK = 4;

async function loadAllValidProducts() {
  const response = await axios.get("/flowers.json");
  const all = Array.isArray(response.data)
    ? response.data
    : (response.data.products ?? []);
  return all.filter((p) => p.title && p.img);
}

function createCardMarkup({ img, title, desc, price }) {
  return `
    <li>
      <div class="bouquet-card">
        <img
          class="bouquet-card__img"
          src="${img}"
          srcset="${img} 2x"
          alt="${title} bouquet"
          width="309"
          height="296"
        />
        <div class="bouquet-card__body">
          <h3 class="bouquet-card__name">${title}</h3>
          <p class="bouquet-card__desc">${desc ?? ""}</p>
          <p class="bouquet-card__price" aria-label="Price ${price} dollars">$${price}</p>
        </div>
      </div>
    </li>
  `;
}

export function initLoadMore() {
  const btn = document.querySelector(".bouquets__cta .btn--wide");
  const grid = document.querySelector(".bouquets-grid");

  if (!btn || !grid) {
    console.warn(
      "[initLoadMore] Show More button or .bouquets-grid not found.",
    );
    return;
  }

  let allProducts = null;
  let loadedCount = 0;
  let isLoading = false;

  async function handleClick() {
    if (isLoading) return;

    try {
      isLoading = true;
      btn.disabled = true;

      if (!allProducts) {
        allProducts = await loadAllValidProducts();
      }

      const nextBatch = allProducts.slice(
        loadedCount,
        loadedCount + ITEMS_PER_CLICK,
      );

      if (nextBatch.length === 0) {
        btn.style.display = "none";
        return;
      }

      const markup = nextBatch.map(createCardMarkup).join("");
      grid.insertAdjacentHTML("beforeend", markup);

      loadedCount += nextBatch.length;

      if (loadedCount >= allProducts.length) {
        btn.style.display = "none";
      }
    } catch (err) {
      console.error("[initLoadMore] Failed to load products:", err);
    } finally {
      isLoading = false;
      btn.disabled = false;
    }
  }

  btn.addEventListener("click", handleClick);
}
