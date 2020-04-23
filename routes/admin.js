const path = require("path");

const express = require("express");
const { body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const products = [];

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price").isFloat(),
    body("description")
      .isString()
      .isLength({ min: 5, max: 500 })
      .trim()
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title")
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim(),
    body("price").isFloat(),
    body("description")
      .isAlphanumeric()
      .isLength({ min: 5, max: 500 })
      .trim()
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
