/* eslint-disable no-undef */
const { ProductModel } = require('../model/product');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ products });
  } catch (err) {
    console.error('Error fetching all products', err);
    res.status(500).json({ message: 'Error fetching all products' });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error('Error fetching product by ID', err);
    res.status(500).json({ message: 'Error fetching product by ID' });
  }
};

module.exports.createProduct = async (req, res) => {
  const { name, category, colors, price, rating, description, features } =
    req.body;

  try {
    const productModel = new ProductModel(
      name,
      category,
      colors,
      price,
      rating,
      description,
      features,
    );
    const product = await productModel.save();
    res.status(200).json({
      message: 'Created product successfully',
      id: product._id,
    });
  } catch (err) {
    console.error('Error creating product', err);
    res.status(500).json({ message: 'Error creating product' });
  }
};

module.exports.editProduct = async (req, res) => {
  const { productId } = req.body;
  const product = await productModel.findById(productId);

  try {
    const update = {
      name: req.body.name ? req.body.name : product.name,
      category: req.body.category ? req.body.category : product.category,
      colors: req.body.colors ? req.body.colors : product.colors,
      price: req.body.price ? req.body.price : product.price,
      rating: req.body.rating ? req.body.rating : product.rating,
      description: req.body.description
        ? req.body.description
        : product.description,
      features: req.body.features ? req.body.features : product.features,
    };

    await ProductModel.findOneAndUpdate({ _id: productId }, update);
    res.status(200).json({ message: 'Edited product successfully' });
  } catch (err) {
    console.error('Error editing product', err);
    res.status(500).json({ message: 'Error editing product' });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);

  try {
    if (!product) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    await ProductModel.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Deleted product successfully' });
  } catch (err) {
    console.error('Error deleting product', err);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
