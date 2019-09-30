const { Router } = require('restify-router');

const handler = require('../../handlers/products');

const router = new Router();

router.get('/products', [handler.products]);

module.exports = router;
