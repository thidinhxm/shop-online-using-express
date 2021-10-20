const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    const categoryController = require('../controllers/categoryController')
    categoryController
        .getAll()
        .then(data => {
            res.locals.categories = data
            // console.log('Data is')
            console.log(data)

            res.render('index')
        })
        .catch(error => next(error))
        
    
})

module.exports = router