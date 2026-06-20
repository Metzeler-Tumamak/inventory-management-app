const db = require("../db/queries");

async function getHomePage(req, res) {
  const queryParams = req.query;
  const category_id = queryParams.category_id ?? "";
  const sort = queryParams.sort ?? "name";
  const order = queryParams.order ?? "ASC";

  const filters = {
    conditions: category_id.length
      ? `WHERE category_id = '${category_id}'`
      : "",
    sort: `ORDER BY ${sort} ${order}`,
  };
  const products = await db.getProductByFilters(filters);
  const categories = await db.getAllCategories();
  res.render("index", {
    products,
    categories,
    filters: {
      category_id,
      sort,
      order,
    },
  });
}

function pageNotFound(req, res) {
  res.status(404);
  res.render("404");
}

module.exports = {
  getHomePage,
  pageNotFound,
};
