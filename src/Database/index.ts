import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'chris', 'secretpass', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});



export default sequelize;
