const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 835;
const SLIDES_GAP = 24;

export function initReviewsSlider() {
  const section = document.querySelector(
    ".feedback",
  );

  if (!section) {
    return;
  }

  const grid = section.querySelector(
    ".reviews-grid",
  );

  const [prevButton, nextButton] =
    section.querySelectorAll(
      ".slider-arrows .arrow-btn",
    );

  if (!grid || !prevButton || !nextButton) {
    return;
  }

  if (section.dataset.reviewsSliderInit) {
    return;
  }

  section.dataset.reviewsSliderInit = "true";

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
    clip.className = "slider-track-clip";

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

  grid.style.willChange = "transform";

  function getItemsPerPage() {
    const viewportWidth =
      window.innerWidth;

    if (
      viewportWidth <
      MOBILE_BREAKPOINT
    ) {
      return 1;
    }

    if (
      viewportWidth <
      DESKTOP_BREAKPOINT
    ) {
      return 2;
    }

    return 3;
  }

  function getPageCount() {
    const itemsPerPage =
      getItemsPerPage();

    return Math.ceil(
      items.length / itemsPerPage,
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
    const pageCount = getPageCount();
    const hasOnePage = pageCount <= 1;

    setDisabled(
      prevButton,
      hasOnePage || currentPage === 0,
    );

    setDisabled(
      nextButton,
      hasOnePage ||
        currentPage >= pageCount - 1,
    );
  }

  function applyLayout() {
    items = Array.from(
      grid.children,
    );

    if (items.length === 0) {
      currentPage = 0;

      grid.style.width = "";
      grid.style.transform = "";

      updateArrows();
      return;
    }

    const itemsPerPage =
      getItemsPerPage();

    const clipWidth =
      clip.clientWidth;

    const itemWidth =
      (
        clipWidth -
        SLIDES_GAP *
          (itemsPerPage - 1)
      ) / itemsPerPage;

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

    updatePosition();
  }

  function updatePosition() {
    if (items.length === 0) {
      grid.style.transform = "";
      updateArrows();
      return;
    }

    const itemsPerPage =
      getItemsPerPage();

    const clipWidth =
      clip.clientWidth;

    const itemWidth =
      (
        clipWidth -
        SLIDES_GAP *
          (itemsPerPage - 1)
      ) / itemsPerPage;

    const pageOffset =
      currentPage *
      itemsPerPage *
      (itemWidth + SLIDES_GAP);

    grid.style.transform =
      `translate3d(-${pageOffset}px, 0, 0)`;

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

  function refreshItems({
    focusLast = false,
  } = {}) {
    items = Array.from(
      grid.children,
    );

    if (focusLast) {
      currentPage = Math.max(
        getPageCount() - 1,
        0,
      );
    } else {
      currentPage = 0;
    }

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

  document.addEventListener(
    "feedbacks:updated",
    (event) => {
      refreshItems({
        focusLast: Boolean(
          event.detail?.focusLast,
        ),
      });
    },
  );

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        currentPage = 0;
        applyLayout();
      }, 120);
    },
  );
  refreshItems();
}