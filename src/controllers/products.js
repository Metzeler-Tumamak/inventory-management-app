const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const emptyErr = "must not be empty";
const uuidV7Err = "must be of type uuidv7";
const intTypeErr = "must be a number with a value of at least 0";

const validateProduct = [
  body("id")
    .optional({ values: "falsy" })
    .trim()
    .notEmpty()
    .withMessage("id " + emptyErr)
    .isUUID("7")
    .withMessage("id " + uuidV7Err),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name " + emptyErr)
    .isLength({ max: 255 })
    .withMessage("name be 255 characters or fewer")
    .matches(/^[\p{L}\p{N}\p{P}\p{S}\s]+$/u)
    .withMessage("name contains invalid characters"),
  body("category_id")
    .optional({ values: "falsy" })
    .isUUID("7")
    .withMessage("category_id " + uuidV7Err),
  body("available")
    .isInt({ min: 0 })
    .withMessage("available " + intTypeErr),
  body("minimum")
    .isInt({ min: 0 })
    .withMessage("minimum " + intTypeErr),
  body("maximum")
    .isInt({ min: 0 })
    .withMessage("maximum " + intTypeErr)
    .custom((value, { req }) => {
      if (value < req.body.minimum) {
        throw new Error("Maximum must be greater than minimum");
      }
      return true;
    }),
  body("price")
    .isFloat({ min: 0.0 })
    .withMessage("price must be a number not less than 0.00"),
];

const createProduct = [
  validateProduct,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let data = matchedData(req);
    let newProduct = null;

    try {
      newProduct = await db.postCreateProduct(data);
    } catch (err) {
      throw new Error(
        "Issue encountered when creating new product: " + err.message,
      );
    }

    res.json(newProduct);
  },
];

const updateProduct = [
  validateProduct,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    let updatedProduct = null;
    const data = matchedData(req);
    try {
      updatedProduct = await db.putUpdateProduct(data);
    } catch (err) {
      throw new Error("Error encounterd when updating product: " + err.message);
    }

    res.json(updateProduct);
  },
];

async function deleteProduct(req, res) {
  const { id } = req.query;

  try {
    await db.deleteProductById(id);
  } catch (err) {
    throw new Error("Error encountered when deleting product: " + err.message);
  }

  res.status(204).end();
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
