const controller = {}
const models = require('../models')
const Brand = models.Brand

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Brand
            .findAll({
                attributes: ['id', 'name', 'imagepath'],
                include: [{model: models.Product}]
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}

module.exports = controller