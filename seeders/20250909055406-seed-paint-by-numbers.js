'use strict';

const { title } = require("process");

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Products', [
      {
        title: 'Time Square',
        description: 'A completed paint-by-numbers piece featuring an artistic take of Time Square in the 1960s.',
        price: 350.00,
        imageUrl: '/images/Paintings/Completed Paint By Numbers/TimeSquare1960s.png',
        category: 'Paintings',
        subcategory: 'Completed Paint By Numbers',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Floral Bicycle',
        description: 'A 1950s style bicycle with a floral arrangement in the basket.',
        price: 350.00,
        imageUrl: '/images/Paintings/Completed Paint By Numbers/Flowers.png',
        category: 'Paintings',
        subcategory: 'Completed Paint By Numbers',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Floral Eye',
        description: 'An artistic representation of an eye with floral elements.',
        price: 350.00,
        imageUrl: '/images/Paintings/Completed Paint By Numbers/FloralEye.png',
        category: 'Paintings',
        subcategory: 'Completed Paint By Numbers',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Autumn Park',
        description: 'A serene autumn park scene with vibrant fall colors.',
        price: 350.00,
        imageUrl: '/images/Paintings/Completed Paint By Numbers/AutumnPark.png',
        category: 'Paintings',
        subcategory: 'Completed Paint By Numbers',
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};

