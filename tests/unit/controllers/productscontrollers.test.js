const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsServices = require('../../../src/services/productsServices');
const productsControllers = require('../../../src/controllers/productsControllers');
// const { connection } = require('../../../src/models/connection');
const productsMock = require('./mocks/products.controllers.mock.js');
const { func } = require('joi');

chai.use(sinonChai);
const { expect } = chai;


describe('Products Controllers', function () {
  describe('List all products', function () {

    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return a response with status 200 and all products', async function () {
      sinon.stub(productsServices, 'getAll').resolves(productsMock);

      await productsControllers.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsMock);
    });
  });

  describe('List products by id', function () {

    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return a response with status 404 and a { "message": "Product not found" }', async function () {
      req.params = { id: 20 };
      
      sinon.stub(productsServices, 'findById').resolves({ type: 404, message: 'Product not found' });
      // { type: 404, message: 'Product not found' }

      await productsControllers.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' });
    });

    it('Should return a response with status 200 and a product', async function () {
      req.params = { id: 1 };
      
      sinon.stub(productsServices, 'findById').resolves({ "id": 1, "name": "Martelo de Thor" });
  
      await productsControllers.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(productsMock[0]);

    });
  });

  describe('Create new product', function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res); // try to remove res
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should create a new product', async function () {
      req.body = productsMock.newProduct;
      const newProduct = { id: 4, ...req.body }

      sinon.stub(productsServices, 'addNewProduct').resolves(newProduct);

      await productsControllers.addNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWithExactly(newProduct);

    });    
  });

   describe('UPDATE', function () {

    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    // it('Should return a response with status 404 and a { "message": "Product not found" }', async function () {
    //   req.params = { id: 20 };
      
    //   sinon.stub(productsServices, 'findById').resolves({ type: 404, message: 'Product not found' });
    //   // { type: 404, message: 'Product not found' }

    //   await productsControllers.findById(req, res);

    //   expect(res.status).to.have.been.calledWith(404);
    //   expect(res.json).to.have.been.calledWithExactly({ message: 'Product not found' });
    // });

    it('Should return a response with status 200 and a product updated', async function () {
      req.params = { id: 1 };
      req.body = { name: 'Capa da invisibilidade' };
      const updatedProduct = { id: 1, name: req.body }
      sinon.stub(productsServices, 'updateProduct').resolves({ "id": 1, "name": 'Capa da invisibilidade' });
  
      await productsControllers.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly({ "id": 1, "name": 'Capa da invisibilidade' });

    });
   });
  
  describe('Delete', function () {

    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      res.end = sinon.stub().returns()
    });

    afterEach(() => {
      sinon.restore();
    });

    it('delete', async function () {
      req.params = { id: 1 };
      sinon.stub(productsServices, 'deleteProduct').resolves(1);
  
      await productsControllers.deleteProduct(req, res);

      // expect(res.status).to.have.been.calledWith(204);
      // expect(res.end).to.have.been.calledOnce;

    });
  });
});