const { Router } = require("express");
const controller = require("../controllers/index");
const router = Router();

router.get("/", controller.getHomePage);

router.use(controller.pageNotFound);

module.exports = router;
