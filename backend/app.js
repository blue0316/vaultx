/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');

const db = require('./db');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
db.connectDB().then(() => {
  app.use(express.json());

  app.use(cors());

  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
