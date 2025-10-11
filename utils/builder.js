export function buildQueryOptions(query) {
  const filter = {};
  const options = {};

  // Filtering
  if (query.category) filter.category = query.category;
  if (query.subCategory) filter.subCategory = query.subCategory;
  if (query.brand) filter.brand = query.brand;

  // Pagination
  const page = parseInt(query.page) || 1;
  const pageSize = parseInt(query.pageSize) || 5;

  // Validation
  options.page = page < 1 ? 1 : page;
  options.pageSize = pageSize > 100 ? 100 : pageSize;

  // Sorting
  options.sort = query.sort || "createdAt";
  options.order = query.order === "asc" ? "asc" : "desc";

  return { filter, options };
}
