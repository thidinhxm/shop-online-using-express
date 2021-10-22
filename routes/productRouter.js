const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    if ((req.query.category == null) || isNaN(req.query.category)) {
        req.query.category = 0
    }

    if ((req.query.brand == null) || isNaN(req.query.brand)) {
        req.query.brand = 0
    }

    if ((req.query.color == null) || isNaN(req.query.color)) {
        req.query.color = 0
    }

    if ((req.query.min == null) || isNaN(req.query.min)) {
        res.query.min = 0
    }

    if ((req.query.max == null) || isNaN(req.query.max)) {
        res.query.max = 100
    }

    const categoryController = require('../controllers/categoryController')
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data
            const brandController = require('../controllers/brandController')
            return brandController.getAll(req.query)
        })
        .then(data => {
            res.locals.brands = data
            const colorController = require('../controllers/colorController')
            return colorController.getAll(req.query)
            
        })
        .then(data => {
            res.locals.colors = data
            const productController = require('../controllers/productController')
            return productController.getAll(req.query)
        })
        .then(data => {
            res.locals.products = data
            res.render('category', {
                "title": "Shopping Category",
                "sub-title": "Shop Category"
            })
        })
        .catch(error => next(error))
})

router.get('/:id', (req, res, next) => {
    const productController = require('../controllers/productController')
    productController
        .getById(req.params.id)
        .then(product => {
            res.locals.product = product
            res.render('single-product', {
                "title": "Shop Single",
                "sub-title": "Shop Single"
            })
        })
        .catch(error => next(error))
})

module.exports = router