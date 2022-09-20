'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(models.post, {
        through: models.like,
        foreignKey: 'userId',
        otherKey: 'postId',
        onDelete:'CASCADE'
      });
      models.post.belongsToMany(models.user, {
        through: models.like,
        foreignKey: 'postId',
        otherKey: 'userId',
        onDelete:'CASCADE'
      });
      models.like.belongsTo(models.post,{
        foreignKey:'postId',
        as: 'post',
        onDelete:'CASCADE'
      })
      models.like.belongsTo(models.user,{
        foreignKey:'userId',
        as: 'user',
        onDelete:'CASCADE',
      })
    }
  }
  like.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};