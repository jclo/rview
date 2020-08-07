// ESLint declarations:
/* global describe, it */
/* eslint  one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;

// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Main
module.exports = function(RView) {
  // Test the lib:
  describe('Test RView.VERSION, RView._setTestMode and RView.noConflict:', () => {
    it('Expects RView.VERSION to return a string.', () => {
      expect(RView.VERSION).to.be.a('string');
    });

    it('Expects RView._setTestMode to be a function.', () => {
      expect(RView._setTestMode).to.be.a('function');
    });
    // it('Expects RView._setTestMode() to return an object.', () => {
    //   expect(RView._setTestMode()).to.be.an('object');
    // });

    it('Expects RView.noConflict to be a function.', () => {
      expect(RView.noConflict).to.be.a('function');
    });
    it('Expects RView.noConflict() to return an object.', () => {
      expect(RView.noConflict()).to.be.an('object');
    });
  });
};
