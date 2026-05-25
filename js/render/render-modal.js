export function createModalMarkup({ img, title, desc, price }) {
  return `
    <div class="modal__content">
      <img
        class="modal__img"
        src="${img}"
        alt="${title} bouquet"
        width="420"
        height="440"
      />
      <div class="modal__info">
        <h2 class="modal__title">${title}</h2>
        <p class="modal__price">$${price}</p>
        <p class="modal__desc">${desc ?? ""}</p>
        <div class="modal__actions">
          <button class="btn btn--primary modal__buy-btn" type="button">Buy now</button>
          <input
            class="modal__qty"
            type="number"
            value="1"
            min="1"
            aria-label="Quantity"
          />
        </div>
      </div>
    </div>
  `;
}
