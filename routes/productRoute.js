const express = require('express');
const router = express.Router();
const {
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
} = require('../controller/product');

router.get('/', getProduct);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router