const httpStatus = require('http-status');
const { getProducts } = require('../data/products');

const products = async (req, res, next) => {
  try {
    // const productId = req.params.productId;

    res.json(httpStatus.OK, getProducts());
    return next();
  } catch (err) {
    res.json(httpStatus.INTERNAL_SERVER_ERROR);
    return next();
  }
};

module.exports = { products };
