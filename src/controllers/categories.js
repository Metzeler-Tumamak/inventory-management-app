const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateCategory = [
  body("id")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("id must not be empty")
    .isUUID("7")
    .withMessage("id must be of type uuidv7"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name must not be empty")
    .matches(/\s+\w+/g)
    .withMessage("Name must only contain letters"),
];

const createCategory = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { name } = matchedData(req);

    try {
      await db.postCreateCategory(name);
    } catch (err) {
      throw new Error(
        "Error encountered when creating category: " + err.message,
      );
    }

    res.status(201).end();
  },
];

const updateCategory = [
  validateCategory,
  async (req, res) => {
    const { id, name } = req.body;
    let category = null;

    try {
      category = await db.putUpdateCategory(id, name);
    } catch (err) {
      throw new Error(
        "Error encountered when updating category :" + err.message,
      );
    }

    res.json(category);
  },
];

async function deleteCategory(req, res) {
  const { id } = req.query;
  try {
    await db.deleteCategoryById(id);
  } catch (err) {
    throw new Error(
      "Error encountered when deleting category : " + err.message,
    );
  }

  res.status(204).end();
}

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};
