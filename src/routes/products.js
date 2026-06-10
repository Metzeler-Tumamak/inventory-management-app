const { Router } = require("express");
const controller = require("../controllers/products");

const router = Router();

router
  .route("/")
  .post(controller.createProduct)
  .put(controller.updateProduct)
  .delete(controller.deleteProduct);

module.exports = router;
