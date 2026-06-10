const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }

  console.log("Server listening at PORT " + PORT);
});
