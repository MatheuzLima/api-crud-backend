import { Model, Sequelize } from 'sequelize'

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
      }
    )
  }
}