import { fetchFeedbacks } from "./api/feedbacks-api.js";
import { renderFeedbacks } from "./render/render-feedbacks.js";

function notifyFeedbacksUpdated() {
  document.dispatchEvent(
    new CustomEvent("feedbacks:updated"),
  );
}

function getRequestErrorMessage(
  error,
  fallbackMessage,
) {
  const apiMessage =
    error?.response?.data?.message;

  return typeof apiMessage === "string"
    ? apiMessage
    : fallbackMessage;
}

export async function initFeedbacks() {
  const list = document.querySelector(
    ".reviews-grid",
  );

  const loadingStatus = document.querySelector(
    ".feedback__status",
  );

  if (!list || !loadingStatus) {
    return;
  }

  try {
    loadingStatus.textContent =
      "Loading feedbacks...";

    const feedbacks =
      await fetchFeedbacks();

    renderFeedbacks(feedbacks, list);

    loadingStatus.textContent =
      feedbacks.length === 0
        ? "No feedbacks yet."
        : "";

    notifyFeedbacksUpdated();
  } catch (error) {
    loadingStatus.textContent =
      getRequestErrorMessage(
        error,
        "Unable to load feedbacks. Please try again later.",
      );
  }
}
