const LOCAL_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
]);

const API_ORIGIN = LOCAL_HOSTS.has(
  window.location.hostname,
)
  ? "http://localhost:3000"
  : "https://umt-markup-practice-roman-borys-backend.onrender.com";

const FEEDBACKS_URL =
  `${API_ORIGIN}/api/feedbacks`;

export async function fetchFeedbacks() {
  const response = await axios.get(
    FEEDBACKS_URL,
  );

  if (!Array.isArray(response.data)) {
    throw new Error(
      "Feedback API returned an invalid response",
    );
  }

  return response.data;
}