const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");

const AppError = require("./AppError");
const Product = require("./models/product");
const methodOverride = require("method-override");

const categories = ["fruit", "vegetable", "dairy"];
mongoose
  .connect("mongodb://localhost:27017/farmStand2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("we're in");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/products", async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category) {
      const products = await Product.find({ category });
      res.render("products/index", { products, category });
    } else {
      const products = await Product.find({});
      res.render("products/index", { products, category: "All" });
    }
  } catch (e) {
    next(e);
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", wrapAsync(async (req, res, next) => {

  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`products/${newProduct._id}`);

}));

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(e => next(e));
  }
}
app.get("/products/:id", wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError("Product not found!", 404);
  }
  res.render("products/show", { product });
}));

app.get("/products/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AppError("Product not found!", 404);
    }
    res.render("products/edit", { product, categories });
  } catch (err) {
    next(err);
  }
});

app.put("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, });
    res.redirect(`/products/${product._id}`);
  } catch (err) {
    next(err);
  }
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

handleValidationError = err => {
  console.log('Its a validation error!');
  return err;
}

app.use((err, req, res, next) => {
  console.log('*********');
  console.log(err.name);
  console.log('*********');
  if (err.name === 'ValidationError') {
    console.dir(err);
    err = handleValidationError(err);
  }
  next(err);
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Bad errrorrr" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
