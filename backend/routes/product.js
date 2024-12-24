/* eslint-disable no-undef */
const express = require('express');
const ProductController = require('../controller/product');
const mongoose = require('mongoose');

const router = express.Router();

const checkValidObjectIdParam = (paramName) => {
  return (req, res, next) => {
    // Assign null if paramName is not present in req.params
    const objectId = req.params[paramName] || null;

    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      // Return an error if objectId is null or not valid
      return res.status(400).json({
        message: `Invalid or missing ObjectId for parameter '${paramName}'`,
      });
    }

    next();
  };
};

router
  .route('/')
  .get(async (req, res) => {
    try {
      await ProductController.getProducts(req, res);
    } catch (err) {
      res.json({
        message: `PRODUCT CONTROLLER <Get all product error>: ${err}`,
      });
    }
  })
  .put(async (req, res) => {
    try {
      await ProductController.editProduct(req, res);
    } catch (err) {
      res.json({ message: `PRODUCT CONTROLLER <Edit Product Error>: ${err}` });
    }
  });

router
  .route('/product/:id')
  .get(checkValidObjectIdParam('id'), async (req, res) => {
    try {
      await ProductController.getProductById(req, res);
    } catch (err) {
      res.json({
        message: `PRODUCT CONTROLLER <Get product by id error>: ${err}`,
      });
    }
  })
  .delete(checkValidObjectIdParam('id'), async (req, res) => {
    try {
      await ProductController.deleteProduct(req, res);
    } catch (err) {
      res.json({
        message: `PRODUCT CONTROLLER <Delete product error>: ${err}`,
      });
    }
  });

module.exports = router;
