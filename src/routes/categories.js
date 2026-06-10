const { Router } = require("express");
const controller = require("../controllers/categories");

const router = Router();

router
  .route("/")
  .post(controller.createCategory)
  .put(controller.updateCategory)
  .delete(controller.deleteCategory);
