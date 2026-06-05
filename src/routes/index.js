const { Router } = require("express");
const controller = require("../controllers/index");
const router = Router();

router.use("/", controller.getHomePage);

router.use((req, res) => {
  res.status(404).render("404");
});

module.exports = router;
