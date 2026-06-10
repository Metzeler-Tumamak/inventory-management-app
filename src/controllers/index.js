const db = require("../db/queries");

async function getHomePage(req, res) {
  const products = await db.getAllProducts();
  const categories = await db.getAllCategories();
  res.render("index", { products, categories });
}

function pageNotFound(req, res) {
  res.status(404);
  res.render("404");
}

module.exports = {
  getHomePage,
};
