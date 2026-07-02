const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;
const SLIDES_GAP = 32;

export function initTopBouquetsSlider() {
  const section = document.querySelector(
    ".bestsellers",
  );

  if (!section) {
    return;
  }

  const grid = section.querySelector(
    ".products-grid",
  );

  const dotsContainer =
    section.querySelector(
      ".slider-dots",
    );

  const [prevButton, nextButton] =
    section.querySelectorAll(
      ".slider-arrows .arrow-btn",
    );

  if (
    !grid ||
    !dotsContainer ||
    !prevButton ||
    !nextButton
  ) {
    return;
  }

  if (
    section.dataset.topBouquetsSliderInit
  ) {
    return;
  }

  section.dataset.topBouquetsSliderInit =
    "true";

  let items = [];
  let currentPage = 0;
  let resizeTimer = null;

  let clip = grid.parentElement;

  if (
    !clip?.classList.contains(
      "slider-track-clip",
    )
  ) {
    clip = document.createElement("div");
    clip.className =
      "slider-track-clip";

    grid.parentNode.insertBefore(
      clip,
      grid,
    );

    clip.appendChild(grid);
  }

  clip.style.overflow = "hidden";
  clip.style.width = "100%";

  grid.style.transition =
    "transform 300ms ease";

  grid.style.willChange =
    "transform";

  function getItemsPerPage() {
    if (
      window.innerWidth <
      TABLET_BREAKPOINT
    ) {
      return 1;
    }

    if (
      window.innerWidth <
      DESKTOP_BREAKPOINT
    ) {
      return 2;
    }

    return 3;
  }

  function getPageCount() {
    return Math.ceil(
      items.length /
        getItemsPerPage(),
    );
  }

  function setDisabled(
    button,
    disabled,
  ) {
    button.disabled = disabled;

    button.classList.toggle(
      "is-disabled",
      disabled,
    );
  }

  function updateArrows() {
    const pageCount =
      getPageCount();

    setDisabled(
      prevButton,
      pageCount <= 1 ||
        currentPage === 0,
    );

    setDisabled(
      nextButton,
      pageCount <= 1 ||
        currentPage >=
          pageCount - 1,
    );
  }

  function renderDots() {
    const pageCount =
      getPageCount();

    dotsContainer.innerHTML =
      Array.from(
        {
          length: pageCount,
        },
        (_, index) => `
          <button
            class="dot${
              index === currentPage
                ? " dot--active"
                : ""
            }"
            type="button"
            role="tab"
            aria-selected="${
              index === currentPage
            }"
            aria-label="Go to bestsellers page ${
              index + 1
            }"
            data-page="${index}"
          ></button>
        `,
      ).join("");
  }

  function updateDots() {
    const dots =
      dotsContainer.querySelectorAll(
        ".dot",
      );

    dots.forEach((dot, index) => {
      const active =
        index === currentPage;

      dot.classList.toggle(
        "dot--active",
        active,
      );

      dot.setAttribute(
        "aria-selected",
        String(active),
      );
    });
  }

  function getItemWidth() {
    const itemsPerPage =
      getItemsPerPage();

    return (
      clip.clientWidth -
      SLIDES_GAP *
        (itemsPerPage - 1)
    ) / itemsPerPage;
  }

  function updatePosition() {
    if (items.length === 0) {
      grid.style.transform = "";
      updateArrows();
      updateDots();
      return;
    }

    const itemsPerPage =
      getItemsPerPage();

    const itemWidth =
      getItemWidth();

    const offset =
      currentPage *
      itemsPerPage *
      (itemWidth + SLIDES_GAP);

    grid.style.transform =
      `translate3d(-${offset}px, 0, 0)`;

    updateDots();
    updateArrows();
  }

  function setPage(page) {
    const pageCount =
      getPageCount();

    currentPage = Math.min(
      Math.max(page, 0),
      Math.max(pageCount - 1, 0),
    );

    updatePosition();
  }

  function applyLayout() {
    items = Array.from(
      grid.children,
    );

    if (items.length === 0) {
      currentPage = 0;

      grid.style.width = "";
      grid.style.transform = "";

      dotsContainer.innerHTML = "";

      updateArrows();
      return;
    }

    const itemWidth =
      getItemWidth();

    const trackWidth =
      items.length * itemWidth +
      Math.max(
        items.length - 1,
        0,
      ) *
        SLIDES_GAP;

    grid.style.display = "flex";
    grid.style.flexWrap = "nowrap";
    grid.style.gap =
      `${SLIDES_GAP}px`;
    grid.style.width =
      `${trackWidth}px`;

    items.forEach((item) => {
      item.style.flex =
        `0 0 ${itemWidth}px`;

      item.style.width =
        `${itemWidth}px`;

      item.style.boxSizing =
        "border-box";
    });

    const pageCount =
      getPageCount();

    currentPage = Math.min(
      currentPage,
      Math.max(pageCount - 1, 0),
    );

    renderDots();
    updatePosition();
  }

  function refreshItems() {
    currentPage = 0;
    applyLayout();
  }

  prevButton.addEventListener(
    "click",
    () => {
      setPage(currentPage - 1);
    },
  );

  nextButton.addEventListener(
    "click",
    () => {
      setPage(currentPage + 1);
    },
  );

  dotsContainer.addEventListener(
    "click",
    (event) => {
      const dot = event.target.closest(
        ".dot",
      );

      if (!dot) {
        return;
      }

      const page = Number(
        dot.dataset.page,
      );

      if (Number.isInteger(page)) {
        setPage(page);
      }
    },
  );

  document.addEventListener(
    "top-bouquets:updated",
    refreshItems,
  );

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(
        () => {
          currentPage = 0;
          applyLayout();
        },
        120,
      );
    },
  );

  refreshItems();
}