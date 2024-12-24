/* eslint-disable no-undef */
const { OrderModel } = require('../model/order');

module.exports.getAllOrders = async (req, res) => {
  try {
    allOrders = OrderModel.find({});
    res.status(200).json({ allOrders });
  } catch (err) {
    console.error('Error fetching all orders', err);
    res.status(500).json({ message: 'Error fetching all orders' });
  }
};

module.exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (err) {
    console.error('Error fetching order details:', err);
    res.status(500).json({ message: 'Error fetching order details' });
  }
};

module.exports.createOrder = async (req, res) => {
  const {
    fname,
    lname,
    addr1,
    addr2,
    city,
    state,
    zipcode,
    country,
    totalprice,
    products,
  } = req.body;

  try {
    const orderModel = new OrderModel(
      fname,
      lname,
      addr1,
      addr2,
      city,
      state,
      zipcode,
      country,
      totalprice,
      products,
    );
    const order = await orderModel.save();
    res.status(200).json({
      message: 'Created order successfully',
      id: order._id,
    });
  } catch (err) {
    console.error('Error creating order', err);
    res.status(500).json({ message: 'Error creating order' });
  }
};

module.exports.editOrder = async (req, res) => {
  const { orderId } = req.body;
  const order = await OrderModel.findById(orderId);

  try {
    const update = {
      fname: req.body.fname ? req.body.fname : order.fname,
      lname: req.body.lname ? req.body.lname : order.lname,
      addr1: req.body.addr1 ? req.body.addr1 : order.addr1,
      addr2: req.body.addr2 ? req.body.addr2 : order.addr2,
      city: req.body.city ? req.body.city : order.city,
      state: req.body.state ? req.body.state : order.state,
      zipcode: req.body.zipcode ? req.body.zipcode : order.zipcode,
      country: req.body.country ? req.body.country : order.country,
      totalprice: req.body.totalprice ? req.body.totalprice : order.totalprice,
      products: req.body.products ? req.body.products : order.products,
    };

    await OrderModel.findOneAndUpdate({ _id: orderId }, update);
    res.status(200).json({ message: 'Edited order successfully' });
  } catch (err) {
    console.error('Error editing order', err);
    res.status(500).json({ message: 'Error editing order' });
  }
};

module.exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await OrderModel.findById(orderId);

  try {
    if (!order) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }
    await OrderModel.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Deleted order successfully' });
  } catch (err) {
    console.error('Error deleting order', err);
    res.status(500).json({ message: 'Error deleting order' });
  }
};
