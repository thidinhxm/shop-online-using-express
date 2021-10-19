'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: 'productId'})
      this.belongsTo(models.Color, {foreignKey: 'colorId'})
    }
  };
  ProductColor.init({
    imagepath: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ProductColor',
  });
  return ProductColor;
};