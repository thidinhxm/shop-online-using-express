'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
            this.belongsTo(models.Category, {foreignKey: 'categoryId'})
            this.belongsTo(models.Brand, {foreignKey: 'brandId'})
            this.hasMany(models.ProductColor, {foreignKey: 'productId'})
            this.hasMany(models.ProductSpecification, {foreignKey: 'productId'})
            this.hasMany(models.Comment, {foreignKey: 'productId'})
            this.hasMany(models.Review, {foreignKey: 'productId'})
        }
    };
    Product.init({
        name: DataTypes.STRING,
        price: DataTypes.DECIMAL,
        imagepath: DataTypes.TEXT,
        thumbnailPath: DataTypes.TEXT,
        availability: DataTypes.BOOLEAN,
        summary: DataTypes.TEXT,
        description: DataTypes.TEXT,
        reviewCount: DataTypes.DECIMAL,
        overallReview: DataTypes.REAL,
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};