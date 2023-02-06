const connection = require('./connection');

// const addNewSales = async (newSales) => {
//   const [sales] = await connection.connection
//     .execute('INSERT INTO StoreManager.sales (name) VALUES (?)', [newSales]);
//   // console.log(product);
//   return sales.insertId;
// };

const getAll = async () => {
  const query = `SELECT sal.id AS saleId, sal.date AS date,
  sp.product_id AS productId, sp.quantity AS quantity
  FROM StoreManager.sales AS sal
  INNER JOIN StoreManager.sales_products AS sp ON sal.id = sp.sale_id`;
  const [sales] = await connection.connection.execute(query);
  return sales;
};

const findById = async (id) => {
  const [salesById] = await connection.connection.execute(
    `SELECT sal .date AS date,
    sp.product_id AS productId, sp.quantity AS quantity
    FROM StoreManager.sales AS sal
    INNER JOIN StoreManager.sales_products AS sp ON sal.id = sp.sale_id
    WHERE sp.sale_id = ${id}
    ORDER BY sp.sale_id ASC, product_id ASC`,
  );
  return salesById;
};

const deleteSales = async (id) => {
 await connection.connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

// const update = async () => {
// };

module.exports = {
  // addNewSales,
  getAll,
  findById,
  deleteSales,
  // update,
};
