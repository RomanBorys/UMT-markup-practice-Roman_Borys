function createBouquetCardMarkup({ img, title, desc, price }) {
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

export function appendBouquets(products) {
  const list = document.querySelector(".bouquets-grid");
  if (!list) {
    console.error("[appendBouquets] .bouquets-grid not found.");
    return;
  }

  const markup = products.map(createBouquetCardMarkup).join("");
  list.insertAdjacentHTML("beforeend", markup);
}
