const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesServices = require('../../../src/services/salesServices');
const salesControllers = require('../../../src/controllers/salesController');
const salesMock = require('./mocks/sales.controllers.mock');
const { func } = require('joi');

chai.use(sinonChai);
const { expect } = chai;


describe('Sales Controllers', function () {
  describe('List all sales', function () {

    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('Should return a response with status 200 and all sales', async function () {
      sinon.stub(salesServices, 'getAll').resolves({ type:null, message: salesMock.sales });

      await salesControllers.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(salesMock.sales);
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
// if (type) return res.status(errorMap.mapError(type)).json({ message });
    it('Should return a response with status 404 and a { "message": "Sale not found" }', async function () {
      req.params = { id: 99 };
      
      sinon.stub(salesServices, 'findById').resolves({ type: 'NOT_FOUND', message: 'Sale not found' });
      // { type: 404, message: 'Product not found' }

      await salesControllers.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWithExactly({ message: 'Sale not found' });
    });

    it('Should return a response with status 200 and a sale', async function () {
      req.params = { id: 2 };
      
      sinon.stub(salesServices, 'findById').resolves(salesMock.saleIdTwo);
  
      await salesControllers.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly(salesMock[1]);

    });
  });

});