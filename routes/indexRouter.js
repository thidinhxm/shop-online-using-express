const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    const categoryController = require('../controllers/categoryController')
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data
            const productController = require('../controllers/productController')
            return productController.getTrendingProducts();
        })
        .then(data => {
            res.locals.trendingProducts = data
            res.render('index')
        })
        .catch(error => next(error))
        
    
})

module.exports = router