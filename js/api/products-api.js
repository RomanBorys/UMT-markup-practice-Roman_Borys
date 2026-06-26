const BASE_URL =
  "https://umt-markup-practice-roman-borys-backend.onrender.com/api/bouquets";

function isValidBouquet(bouquet) {
  return (
    Number.isInteger(Number(bouquet?.id)) &&
    typeof bouquet?.title === "string" &&
    bouquet.title.trim() !== "" &&
    typeof bouquet?.photoURL === "string" &&
    bouquet.photoURL.trim() !== ""
  );
}

export async function fetchBouquets() {
  const response = await axios.get(BASE_URL);

  if (!Array.isArray(response.data)) {
    throw new Error("Bouquets API returned an invalid response");
  }

  return response.data.filter(isValidBouquet);
}

export async function fetchBouquetById(id) {
  const bouquetId = Number(id);

  if (!Number.isInteger(bouquetId) || bouquetId <= 0) {
    throw new Error("Invalid bouquet id");
  }

  const response = await axios.get(
    `${BASE_URL}/${bouquetId}`,
  );

  return response.data;
}