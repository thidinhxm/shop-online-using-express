'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: 'productId'})
      this.belongsTo(models.User, {foreignKey: 'userId'})
      this.belongsTo(models.Comment, {as: 'Parent', foreignKey: 'parentCommentId'})
      this.hasMany(models.Comment, {as: 'SubComments', foreignKey: 'parentCommentId'})
    }
  };
  Comment.init({
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};