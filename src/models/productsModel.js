const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [products] = await connection.connection.execute(query);
  // console.log(products);
  return products;
};
// getAll();

const findById = async (id) => {
  // const query = ('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  // const [[productById]] = await connection.connection.execute(query);
  const [[productById]] = await connection.connection
  .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  // console.log(productById);
  return productById;
};

module.exports = {
  getAll,
  findById,
};
