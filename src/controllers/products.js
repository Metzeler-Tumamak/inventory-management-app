const db = require("../db/queries");

async function createProduct(req, res) {
  let newProduct = null;
  try {
    await db.postCreateProduct(req.body);
  } catch (err) {
    throw new Error(
      "Issue encountered when creating new product: " + err.message,
    );
  }

  res.redirect("/");
}

async function updateProduct(req, res) {
  const { id, data } = req.body;
  let updatedProduct = null;

  try {
    updateProduct = await db.putUpdateProduct(id, data);
  } catch (err) {
    throw new Error("Error encounterd when updating product: " + err.message);
  }

  res.json(updateProduct);
}

async function deleteProduct(req, res) {
  const { id } = req.body;

  try {
    await db.deleteProductById(id);
  } catch (err) {
    throw new Error("Error encountered when deleting product: " + err.message);
  }

  res.status(200).end();
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
