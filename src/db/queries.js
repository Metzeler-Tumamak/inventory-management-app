const pool = require("./pool");

async function getAllProducts() {
  const data = await pool.query("SELECT * FROM products");
  return data.rows;
}

async function getProductBySearch(name) {
  const data = await pool.query("SELECT * FROM products WHERE name LIKE $1", [
    `%${name}%`,
  ]);
  return data.rows;
}

async function getProductByFilters(filters) {
  const { conditions, sort } = filters;
  const sql = `SELECT * FROM products WHERE ${conditions} ORDER BY ${sort}`;
  const data = await pool.query(sql);
  return data.rows;
}

async function postCreateProduct(data) {
  const { name, category_id, available, minimum, maximum, price } = data;
  const newProduct = await pool.query(
    "INSERT INTO products (name, category_id, available, minimum, maximum, price) VALUES($1, $2, $3, $4, $5, $6)",
    [name, category_id, available, minimum, maximum, price],
  );
}

async function putUpdateProduct(id, data) {
  const { name, category_id, available, minimum, maximum, price } = data;
  const updatedProduct = await pool.query(
    "UPDATE products SET name=$2, category_id=$3, available=$4, minimum=$5, maximum=$6, price=$7 WHERE id=$1",
    [id, name, category_id, available, minimum, maximum, price],
  );
}

async function deleteProductById(id) {
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
}

async function deleteBulkProducts(ids) {
  await pool.query("DELETE FROM products WHERE id = ANY($1)", [ids]);
}

async function getAllCategories() {
  const data = await pool.query("SELECT * FROM categories");
  return data.rows;
}

async function putUpdateCategory(id, name) {
  const data = await pool.query("UPDATE categories SET name=$1 WHERE id=$2", [
    name,
    id,
  ]);
  return data.rows[0];
}

async function postCreateCategory(name) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [name]);
}

async function deleteCateogryById(id) {
  await pool.query("DELETE FROM categories WHERE id=$1", [id]);
}

module.exports = {
  getAllProducts,
  getProductByFilters,
  getProductBySearch,
  postCreateProduct,
  putUpdateProduct,
  deleteProductById,
  deleteBulkProducts,
  getAllCategories,
  postCreateCategory,
  putUpdateCategory,
  deleteCateogryById,
};
