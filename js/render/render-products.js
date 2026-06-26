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

function createBouquetCardMarkup({
  id,
  photoURL,
  title,
  description,
  price,
}) {
  const safeId = Number(id);
  const safePhotoURL = escapeHtml(photoURL);
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safePrice = formatPrice(price);

  return `
    <li>
      <div
        class="bouquet-card"
        data-id="${safeId}"
        tabindex="0"
        role="button"
        aria-label="View ${safeTitle} bouquet details"
      >
        <img
          class="bouquet-card__img"
          src="${safePhotoURL}"
          alt="${safeTitle} bouquet"
          width="309"
          height="296"
          loading="lazy"
        />
        <div class="bouquet-card__body">
          <h3 class="bouquet-card__name">${safeTitle}</h3>
          <p class="bouquet-card__desc">${safeDescription}</p>
          <p
            class="bouquet-card__price"
            aria-label="Price ${safePrice} dollars"
          >
            $${safePrice}
          </p>
        </div>
      </div>
    </li>
  `;
}

export function appendBouquets(products, listElement) {
  const list =
    listElement ??
    document.querySelector(".bouquets-grid");

  if (!list || !Array.isArray(products)) {
    return;
  }

  const markup = products
    .map(createBouquetCardMarkup)
    .join("");

  list.insertAdjacentHTML("beforeend", markup);
}