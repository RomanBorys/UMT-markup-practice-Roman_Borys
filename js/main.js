import "./modal/modal.js";

import {
  initFeedbacks,
} from "./feedbacks.js";

import {
  initLoadMore,
} from "./load-more.js";

import {
  initTopBouquets,
} from "./top-bouquets.js";

import {
  initReviewsSlider,
} from "./sliders/reviews-slider.js";

import {
  initTopBouquetsSlider,
} from "./sliders/top-bouquets-slider.js";

initLoadMore();

initTopBouquetsSlider();
initTopBouquets();

initReviewsSlider();
initFeedbacks();