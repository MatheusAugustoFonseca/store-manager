const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/productsModel');
const productsServices = require('../../../src/services/productsServices');
const productsMock = require('./mocks/products.services.mock');


describe('Products Services', function () {
  describe('List all products', function () {
    this.afterEach(() => {
      sinon.restore();
    });

    it('Should return all products list', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productsMock.products);
      
      const result = await productsServices.getAll();
      expect(result).to.be.deep.equal(productsMock.products);
    });
  });

  describe('Find product by id', function () {
    this.afterEach(() => {
      sinon.restore();
    });

    it('Should return the product requested', async function () {
      const productId = 1
      sinon.stub(productsModel, 'findById').resolves(productsMock.productOne);
      
      const result = await productsServices.findById(productId);
      expect(result.type).to.equal(null);
      expect(result.data).to.deep.equal({
          id: 1,
          name: "Martelo de Thor",
      });
        sinon.restore();
      });

    it('Should return an error, id do not exist', async function () {
      const productId = 99
      sinon.stub(productsModel, 'findById').resolves(undefined);
      
      const error = await productsServices.findById(productId);
      expect(error.type).to.equal(404);
      expect(error.message).to.equal('Product not found');
      sinon.restore();
    });
  });

  describe('Create new products', function () {
    this.afterEach(() => {
      sinon.restore();
    });

    it('Should return a new product', async function () {
      sinon.stub(productsModel, 'addNewProduct').resolves(3);
      
      const result = await productsServices.addNewProduct(productsMock.newProduct);
      expect(result).to.be.deep.equal({
        id: 3,
        name: productsMock.newProduct.name,
      });
    });
  });
});
