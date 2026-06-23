const db = require("../db/queries");

async function createCategory(req, res) {
  const { name } = req.body;

  try {
    await db.postCreateCategory(name);
  } catch (err) {
    throw new Error("Error encountered when creating category: " + err.message);
  }

  res.redirect("/");
}

async function updateCategory(req, res) {
  const { id, name } = req.body;
  let category = null;

  try {
    category = await db.putUpdateCategory(id, name);
  } catch (err) {
    throw new Error("Error encountered when updating category :" + err.message);
  }

  res.json(category);
}

async function deleteCategory(req, res) {
  const { id } = req.query;
  try {
    await db.deleteCategoryById(id);
  } catch (err) {
    throw new Error(
      "Error encountered when deleting category : " + err.message,
    );
  }

  // res.status(200).end();
  res.redirect("/");
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
