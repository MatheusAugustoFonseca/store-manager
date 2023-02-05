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
  return productById;
};

const updateProduct = async (id, name) => {
  // console.log(id);
  // console.log(name);
  // const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  
  const nameUpdated = JSON.stringify(name);
  const updated = await connection.connection
    .execute(`UPDATE StoreManager.products SET name = ${nameUpdated} WHERE id = ${id}`);
    // .execute(query, [nameUpdated, id]);
  // console.log(updated);
  
  return updated;
};

const addNewProduct = async ({ name }) => {
  const [product] = await connection.connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
  // console.log(product);
  return product.insertId;
};
// addNewProduct('capa da invisibilidade');

module.exports = {
  getAll,
  findById,
  addNewProduct,
  updateProduct,
};
