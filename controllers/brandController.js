const controller = {}
const models = require('../models')
const Brand = models.Brand

controller.getAll = (query) => {
    return new Promise((resolve, reject) => {
        const options = {
            attributes: ['id', 'name', 'imagepath'],
            include: [{
                model: models.Product,
                attributes: ['id'],
                where: {}
            }],
            
        }

        if (query.category) {
            options.include[0].where.categoryId = query.category
        }
        if (query.color) {
            options.include[0].include = [{
                model: models.ProductColor,
                attributes: [],
                where: {colorId: query.color}
            }]
        }
        Brand
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}

module.exports = controller