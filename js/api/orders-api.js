const LOCAL_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
]);

const API_ORIGIN = LOCAL_HOSTS.has(
  window.location.hostname,
)
  ? "http://localhost:3000"
  : "https://umt-markup-practice-roman-borys-backend.onrender.com";

const ORDERS_URL = `${API_ORIGIN}/api/orders`;

export async function createOrder(payload) {
  const response = await axios.post(
    ORDERS_URL,
    payload,
  );

  return response.data;
}