// ESLint declarations:
/* global describe, it */
/* eslint  one-var: 0, semi-style: 0, no-underscore-dangle: 0,
  no-unused-expressions: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;

// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(RView) {
  const [_] = RView._setTestMode();
  // Test the lib:

  describe('Test the library _.js:', () => {
    //
    it('Expects "_" to be an object.', () => {
      expect(_).to.be.an('object');
    });

    describe('Test the method _.extend():', () => {
      const o = _.extend({ a: 1 }, { b: 2, c: 3 });
      const keys = Object.keys(o);

      it('Expects "_.extend({ a: 1}, {b: 2, c: 3 })" to return an object.', () => {
        expect(o).to.be.an('object');
      });

      it('Expects it to own three properties.', () => {
        expect(keys).to.be.an('array').that.has.lengthOf(3);
      });

      it('Expects it to own the property "a" equal to 1.', () => {
        expect(o).to.own.property('a').that.is.equal(1);
      });

      it('Expects it to own the property "b" equal to 2.', () => {
        expect(o).to.own.property('b').that.is.equal(2);
      });

      it('Expects it to own the property "c" equal to 3.', () => {
        expect(o).to.own.property('c').that.is.equal(3);
      });
    });

    describe('Test the method _.assign():', () => {
      const o = _.assign({}, { b() {} });

      it('Expects "_.assign({}, { b() {} })" to return an object.', () => {
        expect(o).to.be.an('object');
      });
      // To be completed!!!
    });

    describe('Test the method _.isString():', () => {
      it('Expects _.isString() to return false.', () => {
        expect(_.isString()).to.be.false;
      });
      it('Expects _.isString("a") to return true.', () => {
        expect(_.isString('a')).to.be.true;
      });
    });

    describe('Test the method _.isNumber():', () => {
      it('Expects _.isNumber() to return false.', () => {
        expect(_.isNumber()).to.be.false;
      });
      it('Expects _.isNumber(1) to return true.', () => {
        expect(_.isNumber(1)).to.be.true;
      });
    });

    describe('Test the method _.isObject():', () => {
      it('Expects _.isObject() to return false.', () => {
        expect(_.isObject()).to.be.false;
      });
      it('Expects _.isObject([]) to return true.', () => {
        expect(_.isObject([])).to.be.true;
      });
    });

    describe('Test the method _.isLiteralObject():', () => {
      it('Expects _.isLiteralObject([1, 2, 3]) to return false.', () => {
        expect(_.isLiteralObject([1, 2, 3])).to.be.false;
      });
      it('Expects _.isLiteralObject({ a: 1, b: 2 }) to return true.', () => {
        expect(_.isLiteralObject({ a: 1, b: 2 })).to.be.true;
      });
    });

    describe('Test the method _.isFunction():', () => {
      it('Expects _.isFunction() to return false.', () => {
        expect(_.isFunction()).to.be.false;
      });
      it('Expects _.isFunction(function fn(){}) to return true.', () => {
        const fn = function() {};
        expect(_.isFunction(fn)).to.be.true;
      });
    });

    describe('Test the method _.isArray():', () => {
      it('Expects _.isArray() to return false.', () => {
        expect(_.isArray()).to.be.false;
      });
      it('Expects _.isArray([1, 2, 3]) to return true.', () => {
        expect(_.isArray([1, 2, 3])).to.be.true;
      });
    });
  });
};
