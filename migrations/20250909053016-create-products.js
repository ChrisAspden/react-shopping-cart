'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      price: Sequelize.DECIMAL(10, 2),
      imageUrl: Sequelize.STRING,
      category: Sequelize.STRING,
      subcategory: Sequelize.STRING,
      stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Products');
  },
};


