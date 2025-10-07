'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameTable('users', 'Users');
  },

  async down(queryInterface) {
    await queryInterface.renameTable('Users', 'users');
  },
};

