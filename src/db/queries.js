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
  const data = await pool.query("SELECT * FROM products WHERE $1 ORDER BY $2", [
    conditions,
    sort,
  ]);
  return data.rows;
}

async function createProduct(data) {
  const { name, category_id, available, minimum, maximum, price } = data;
  const newProduct = await pool.query(
    "INSERT INTO products (name, category_id, available, minimum, maximum, price) VALUES($1, $2, $3, $4, $5, $6), [name, category_id, available, minimum, maximum, price]",
  );
  return newProduct.rows[0];
}

async function updateProductPost(id, data) {
  const { name, category_id, available, minimum, maximum, price } = data;
  const updatedProduct = await pool.query(
    "UPDATE products SET name=$2, category_id=$3, available=$4, minimum=$5, maximum=$6, price=$7 WHERE id=$1 ",
    [id, name, category_id, available, minimum, maximum, price],
  );
  return updateProductPost.rows[0];
}

async function deleteProduct(id) {
  await pool.query("DELETE products WHERE id=$1", [id]);
}

async function deleteBulkProducts(ids) {
  await pool.query("DELETE product WHERE id IN($1)", [ids]);
}
