// src/database/index.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:'); // Or your DB config string

export default sequelize;
