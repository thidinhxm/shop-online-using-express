const controller = {}
const models = require('../models')
const Category = models.Category
const Sequelize = require('sequelize')
const Op = Sequelize.Op

controller.getAll = (query) => {
    const options = {
        attributes: ['id', 'name', 'imagepath', 'summary'],
        include: [{
            model: models.Product,
            where: {}
        }]
    }
    if (query && query.search != '') {
        options.include[0].where.name = {
            [Op.iLike]: `%${query.search}%`
        }
    }
    return new Promise((resolve, reject) => {
        Category
            .findAll(options)
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}

module.exports = controller