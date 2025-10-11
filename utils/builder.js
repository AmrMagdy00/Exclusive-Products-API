export function buildQueryOptions(query) {
  const filter = {};
  const options = {};

  const q = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [key.toLowerCase(), value])
  );

  if (q.category) filter.category = q.category;
  if (q.subcategory) filter.subCategory = q.subcategory;
  if (q.brand) filter.brand = q.brand;

  const page = parseInt(q.page) || 1;
  const pageSize = parseInt(q.pagesize) || 5;

  options.page = page < 1 ? 1 : page;
  options.pageSize = pageSize > 100 ? 100 : pageSize;

  options.sort = q.sort || "createdAt";
  options.order = q.order === "asc" ? "asc" : "desc";
  return { filter, options };
}
