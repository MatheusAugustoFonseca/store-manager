const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModel = require('../../../src/models/salesModel');
// const { connection } = require('../../../src/models/connection');
const salesMock = require('./mocks/sales.services.mock');
const salesServices = require('../../../src/services/salesServices');
const { expect } = chai;
chai.use(sinonChai);


describe('Sales Services', function () {
  describe('List all sales', function () {
    this.afterEach(() => {
      sinon.restore();
    });

    it('Should return all sales list', async function () {
      sinon.stub(salesModel, 'getAll').resolves(salesMock.sales);
      
      const result = await salesServices.getAll();
      expect(result.message).to.be.deep.equal(salesMock.sales);
    });
  });

  describe('Find sale by id', function () {
    this.afterEach(() => {
      sinon.restore();
    });

    it('Should return the sale requested', async function () {
      const saleId = 2
      sinon.stub(salesModel, 'findById').resolves(salesMock.saleIdTwo);
      
      const result = await salesServices.findById(saleId);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([
        {
        "saleId": 2,
          "date": "2023-02-03T16:52:33.000Z",
          "productId": 3,
          "quantity": 15
        }
      ]);
        sinon.restore();
      });

    // it('Should return an error, Sale not found', async function () {
    //   const saleId = 99
    //   sinon.stub(salesModel, 'findById').resolves(undefined);
      
    //   const error = await salesServices.findById(saleId);
    //   expect(error.type).to.equal(404);
    //   expect(error.message).to.equal('Sale not found');
    //   sinon.restore();
    // });
  });

  // describe('Create new products', function () {
  //   this.afterEach(() => {
  //     sinon.restore();
  //   });

  //   it('Should return a new product', async function () {
  //     sinon.stub(productsModel, 'addNewProduct').resolves(3);
      
  //     const result = await productsServices.addNewProduct(productsMock.newProduct);
  //     expect(result).to.be.deep.equal({
  //       id: 3,
  //       name: productsMock.newProduct.name,
  //     });
  //   });
  // });
});
