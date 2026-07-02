const LOCAL_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
]);

const API_ORIGIN = LOCAL_HOSTS.has(
  window.location.hostname,
)
  ? "http://localhost:3000"
  : "https://umt-markup-practice-roman-borys-backend.onrender.com";

const BOUQUETS_URL =
  `${API_ORIGIN}/api/bouquets`;

function isValidBouquet(bouquet) {
  return (
    Number.isInteger(Number(bouquet?.id)) &&
    typeof bouquet?.title === "string" &&
    bouquet.title.trim() !== "" &&
    typeof bouquet?.description === "string" &&
    typeof bouquet?.photoURL === "string" &&
    bouquet.photoURL.trim() !== "" &&
    Number.isFinite(Number(bouquet?.price))
  );
}

export async function fetchBouquets() {
  const response = await axios.get(
    BOUQUETS_URL,
  );

  if (!Array.isArray(response.data)) {
    throw new Error(
      "Bouquets API returned an invalid response",
    );
  }

  return response.data.filter(
    isValidBouquet,
  );
}

export async function fetchTopBouquets() {
  const response = await axios.get(
    BOUQUETS_URL,
    {
      params: {
        favorite: true,
      },
    },
  );

  if (!Array.isArray(response.data)) {
    throw new Error(
      "Bouquets API returned an invalid response",
    );
  }

  return response.data.filter(
    isValidBouquet,
  );
}

export async function fetchBouquetById(id) {
  const bouquetId = Number(id);

  if (
    !Number.isInteger(bouquetId) ||
    bouquetId <= 0
  ) {
    throw new Error(
      "Invalid bouquet id",
    );
  }

  const response = await axios.get(
    `${BOUQUETS_URL}/${bouquetId}`,
  );

  return response.data;
}