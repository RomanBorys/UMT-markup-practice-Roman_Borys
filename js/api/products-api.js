const BASE_URL = "/flowers.json";


export async function fetchProductsByPage(page = 1, limit = 8) {
  const response = await axios.get(BASE_URL);

  const all = Array.isArray(response.data)
    ? response.data
    : (response.data.products ?? []);

  const valid = all.filter((p) => p.title && p.img);

  const total = valid.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const items = valid.slice(start, start + limit);

  return { items, total, totalPages, page };
}
