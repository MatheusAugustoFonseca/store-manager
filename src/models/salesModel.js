const connection = require('./connection');

const addNewSales = async (newSales) => {
  const [{ insertId }] = await connection.connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW())');
  const valuesQuery = newSales.map(({ productId, quantity }) =>
    `(${insertId}, ${productId}, ${quantity})`).join(', ');
  // console.log(valuesQuery);
  await connection.connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES ${valuesQuery}`,
  );
  // console.log(insertId);
  return insertId;
};

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

const update = async (id, sales) => {
  const query = `UPDATE StoreManager.sales_products SET quantity = ?
   WHERE sale_id = ? and product_id = ?`;
  await Promise.all(sales.map(async (item) => {
    await connection.connection.execute(query, [item.quantity, id, item.productId]);
  }));
  return { type: null };
};

module.exports = {
  addNewSales,
  getAll,
  findById,
  deleteSales,
  update,
};
