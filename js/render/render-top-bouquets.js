function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPrice(value) {
  const price = Number(value);

  if (!Number.isFinite(price)) {
    return "0";
  }

  return Number.isInteger(price)
    ? String(price)
    : price.toFixed(2);
}

function createTopBouquetMarkup({
  id,
  title,
  description,
  price,
  photoURL,
}) {
  const bouquetId = Number(id);
  const safeTitle = escapeHtml(title);
  const safeDescription =
    escapeHtml(description);
  const safePhotoURL =
    escapeHtml(photoURL);
  const safePrice =
    formatPrice(price);

  return `
    <li>
      <div
        class="product-card"
        data-id="${bouquetId}"
        role="button"
        tabindex="0"
        aria-label="View ${safeTitle} bouquet details"
      >
        <img
          class="product-card__img"
          src="${safePhotoURL}"
          alt="${safeTitle} bouquet"
          width="405"
          height="320"
          loading="lazy"
        />

        <div class="product-card__body">
          <h3 class="product-card__name">
            ${safeTitle}
          </h3>

          <p class="product-card__desc">
            ${safeDescription}
          </p>

          <p
            class="product-card__price"
            aria-label="Price ${safePrice} dollars"
          >
            $${safePrice}
          </p>
        </div>
      </div>
    </li>
  `;
}

export function renderTopBouquets(
  bouquets,
  listElement,
) {
  if (
    !listElement ||
    !Array.isArray(bouquets)
  ) {
    return;
  }

  listElement.innerHTML = bouquets
    .map(createTopBouquetMarkup)
    .join("");
}