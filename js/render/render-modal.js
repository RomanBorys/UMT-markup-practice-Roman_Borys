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

export function createModalMarkup({
  photoURL,
  title,
  description,
  price,
}) {
  const safePhotoURL =
    escapeHtml(photoURL);

  const safeTitle =
    escapeHtml(title);

  const safeDescription =
    escapeHtml(description);

  const safePrice =
    formatPrice(price);

  return `
    <div class="modal__content">
      <img
        class="modal__img"
        src="${safePhotoURL}"
        alt="${safeTitle} bouquet"
        width="420"
        height="440"
      />

      <div class="modal__info">
        <h2 class="modal__title">
          ${safeTitle}
        </h2>

        <p class="modal__price">
          $${safePrice}
        </p>

        <p class="modal__desc">
          ${safeDescription}
        </p>

        <div class="modal__actions">
          <button
            class="btn btn--primary modal__buy-btn"
            type="button"
          >
            Buy now
          </button>

          <input
            class="modal__qty"
            type="number"
            value="1"
            min="1"
            max="99"
            step="1"
            aria-label="Quantity"
          />
        </div>
      </div>
    </div>
  `;
}