const BREAKPOINT = 768;

export function initReviewsSlider() {
  const section = document.querySelector(".feedback");
  if (!section) return;

  const grid = section.querySelector(".reviews-grid");
  const [prevBtn, nextBtn] = section.querySelectorAll(".arrow-btn");

  if (!grid || !prevBtn || !nextBtn) return;

  const items = Array.from(grid.children); // <li> elements
  const total = items.length;
  if (total === 0) return;

  let current = 0;
  let isDesktop = window.innerWidth >= BREAKPOINT;
  let resizeTimer = null;

  const clip = document.createElement("div");
  clip.className = "slider-track-clip";
  clip.style.cssText = "overflow: hidden; width: 100%;";
  grid.parentNode.insertBefore(clip, grid);
  clip.appendChild(grid);

  grid.style.transition = "transform 300ms ease";
  grid.style.willChange = "transform";


  function getSlideWidth() {
    return clip.offsetWidth;
  }

  function applyMobileLayout() {
    const w = getSlideWidth();
    grid.style.display = "flex";
    grid.style.flexWrap = "nowrap";
    grid.style.gap = "0px";
    grid.style.width = `${total * w}px`;
    items.forEach((item) => {
      item.style.flex = `0 0 ${w}px`;
      item.style.width = `${w}px`;
      item.style.boxSizing = "border-box";
    });
  }

  function resetDesktopLayout() {
    grid.style.display = "";
    grid.style.flexWrap = "";
    grid.style.gap = "";
    grid.style.width = "";
    grid.style.transform = "";
    items.forEach((item) => {
      item.style.flex = "";
      item.style.width = "";
    });
  }

  function setSlide(index) {
    if (index < 0) index = 0;
    if (index > total - 1) index = total - 1;
    current = index;

    if (!isDesktop) {
      const offset = current * getSlideWidth();
      grid.style.transform = `translateX(-${offset}px)`;
    }

    updateArrows();
  }

  function updateArrows() {
    if (isDesktop) {
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      prevBtn.style.opacity = "0.35";
      nextBtn.style.opacity = "0.35";
      prevBtn.style.cursor = "default";
      nextBtn.style.cursor = "default";
      return;
    }

    const atStart = current === 0;
    const atEnd = current === total - 1;

    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
    prevBtn.style.opacity = atStart ? "0.35" : "";
    nextBtn.style.opacity = atEnd ? "0.35" : "";
    prevBtn.style.cursor = atStart ? "default" : "";
    nextBtn.style.cursor = atEnd ? "default" : "";
  }


  function setup() {
    isDesktop = window.innerWidth >= BREAKPOINT;
    if (isDesktop) {
      resetDesktopLayout();
      updateArrows();
    } else {
      if (current >= total) current = total - 1;
      applyMobileLayout();
      setSlide(current);
    }
  }


  if (!prevBtn.dataset.sliderInit) {
    prevBtn.dataset.sliderInit = "reviews";
    prevBtn.addEventListener("click", () => {
      if (!isDesktop) setSlide(current - 1);
    });
  }

  if (!nextBtn.dataset.sliderInit) {
    nextBtn.dataset.sliderInit = "reviews";
    nextBtn.addEventListener("click", () => {
      if (!isDesktop) setSlide(current + 1);
    });
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const wasDesktop = isDesktop;
      isDesktop = window.innerWidth >= BREAKPOINT;
      if (wasDesktop !== isDesktop) {
        current = 0;
      }
      setup();
    }, 120);
  });

  setup();
}
