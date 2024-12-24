/* eslint-disable no-undef */
const express = require('express');
const OrderController = require('../controller/order');
const mongoose = require('mongoose');

const router = express.Router();

const checkValidObjectIdParam = (paramName) => {
  return (req, res, next) => {
    const objectId = req.params[paramName] || null;

    if (!mongoose.Types.ObjectId.isValid(objectId)) {
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
      await OrderController.getAllOrders(req, res);
    } catch (err) {
      res.json({ message: `ORDER CONTROLLER <Get all order error>: ${err}` });
    }
  })
  .put(async (req, res) => {
    try {
      await OrderController.editOrder(req, res);
    } catch (err) {
      res.json({ message: `ORDER CONTROLLER <Edit Order Error>: ${err}` });
    }
  });

router
  .route('/order/:id')
  .get(checkValidObjectIdParam('id'), async (req, res) => {
    try {
      await OrderController.getOrderById(req, res);
    } catch (err) {
      res.json({ message: `ORDER CONTROLLER <Get order by id error>: ${err}` });
    }
  })
  .delete(checkValidObjectIdParam('id'), async (req, res) => {
    try {
      await OrderController.deleteOrder(req, res);
    } catch (err) {
      res.json({ message: `ORDER CONTROLLER <Delete order error>: ${err}` });
    }
  });

module.exports = router;
