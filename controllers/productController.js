const controller = {}
const models = require('../models')
const Product = models.Product


controller.getTrendingProducts = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                order: [
                    ['overallReview', 'DESC']
                ],
                limit: 8,
                include: [{model: models.Category}],
                attributes: ['id', 'name', 'imagepath', 'price']
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                include: [{model: models.Category}],
                attributes: ['id', 'name', 'imagepath', 'price']
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)))
    })
}

controller.getById = (id) => {
    let product;
    return new Promise((resolve, reject) => {
        Product
            .findOne({
                where: {id: id},
                include: [{model: models.Category}],
            }) 
            .then(result => {
                product = result
                return models.ProductSpecification.findAll({
                    where: {productId: id},
                    include: [{model: models.Specification}]
                })
            })
            .then(productSpecification => {
                product.ProductSpecification = productSpecification
                return models.Comment.findAll({
                    where: {productId: id, parentCommentId: null},
                    include: [{model: models.User}, 
                        {
                        model: models.Comment,
                        as: 'SubComments',
                        include: [{model: models.User}]
                    }]
                })
            })
            .then(comments => {
                product.Comments = comments
                return models.Review.findAll({
                    where: {productId: id},
                    include: [{model: models.User}]
                })
            })
            .then(reviews => {
                product.Reviews = reviews
                const stars = []
                for (let i = 1; i <= 5; i++) {
                    stars.push(reviews.filter(item => (item.rating == i)).length)
                }
                product.stars = stars;
                resolve(product)
            })
            .catch(error => reject(new Error(error)))
    })
}
module.exports = controller