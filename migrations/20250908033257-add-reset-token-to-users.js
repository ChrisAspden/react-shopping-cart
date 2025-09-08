export async function up(queryInterface, Sequelize) {
  return queryInterface.addColumn('users', 'resetToken', {
    type: Sequelize.STRING,
    allowNull: true,
  });
}

export async function down(queryInterface) {
  return queryInterface.removeColumn('users', 'resetToken');
}

