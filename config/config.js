module.exports = {
  development: {
    username: 'chris',
    password: 'secretpass',
    database: 'shopping_cart',
    host: 'postgres', // ← this is the Docker container name
    port: 5432,
    dialect: 'postgres',
  },
};

