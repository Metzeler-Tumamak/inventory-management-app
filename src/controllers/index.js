const db = require("../db/queries");

async function getHomePage(req, res) {
  const queryParams = req.query;
  const category_id = queryParams.category_id ?? "";
  const sort = queryParams.sort ?? "name";
  const order = queryParams.order ?? "ASC";
  const name = queryParams.name ?? "";

  const whereFields = [
    {
      field: "p.name",
      value: name,
      match: "any",
    },
    {
      field: "category_id",
      value: category_id,
      match: "exact",
    },
  ];

  let whereQuery = "";

  whereFields.forEach(({ field, value, match }) => {
    if (value.length === 0) {
      return;
    }

    let queryAppend = null;
    if (match === "any") {
      queryAppend = `${field} LIKE '%${value}%'`;
    } else if (match === "exact") {
      queryAppend = `${field} = '${value}'`;
    }

    whereQuery +=
      whereQuery.length === 0 ? `WHERE ${queryAppend}` : ` AND ${queryAppend}`;
  });

  console.log(whereQuery);
  const filters = {
    conditions: whereQuery.length ? whereQuery : "",
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
      name,
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
