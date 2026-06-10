const db = require("../db/queries");

async function createCategory(req, res) {
  const { name } = req.body;
  let newCategory = null;

  try {
    newCategory = await db.createCategory(name);
  } catch (err) {
    throw new Error("Error encountered when creating category: " + err.message);
  }

  res.json(newCategory);
}

async function deleteCategory(req, res) {
  const { id } = req.body;
  try {
    await db.deleteCategoryById(id);
  } catch (err) {
    throw new Error(
      "Error encountered when deleting category : " + err.message,
    );
  }

  res.send(200).end();
}

module.exports = {
  createCategory,
  deleteCategory,
};
