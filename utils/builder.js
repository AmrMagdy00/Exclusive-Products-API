export function buildQueryOptions(query) {
  const filter = {};
  const q = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [key.toLowerCase(), value])
  );

  if (q.category) filter.category = q.category;
  if (q.subcategory) filter.subCategory = q.subcategory;
  if (q.brand) filter.brand = q.brand;
  if (q.ishook) filter.isHook = q.ishook === "true";
  if (q.isflash) filter.isFlash = q.isflash === "true";

  const page = Math.max(parseInt(q.page) || 1, 1);
  const pageSize = Math.min(parseInt(q.pagesize) || 10, 100);
  const sortField = q.sort || "createdAt";
  const sortOrder = q.order === "asc" ? 1 : -1;

  const options = {
    skip: (page - 1) * pageSize,
    limit: pageSize,
  };

  if (sortField === "random") {
    options.random = true;
  } else {
    options.sort = { [sortField]: sortOrder, _id: 1 };
  }

  return { filter, options };
}
