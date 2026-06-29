function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createFeedbackMarkup({
  id,
  author,
  text,
}) {
  const safeId = Number(id);
  const safeAuthor = escapeHtml(author);
  const safeText = escapeHtml(text);

  return `
    <li data-feedback-id="${safeId}">
      <div class="review-card">
        <blockquote class="review-card__quote">
          &ldquo;${safeText}&rdquo;
        </blockquote>

        <p class="review-card__author">
          ${safeAuthor}
        </p>
      </div>
    </li>
  `;
}

export function renderFeedbacks(
  feedbacks,
  listElement,
) {
  if (
    !listElement ||
    !Array.isArray(feedbacks)
  ) {
    return;
  }

  listElement.innerHTML = feedbacks
    .map(createFeedbackMarkup)
    .join("");
}