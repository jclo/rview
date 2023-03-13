// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { expect } = require('chai')
    ;


// -- Local Modules


// -- Local Constants
// Number of properties added by your library.
const OWNPROPS = 8
    , TESTMODE = 4
    ;


// -- Local Variables


// -- Main
module.exports = function(RView, libname, version) {
  describe('RView introspection:', () => {
    describe('Test the nature of RView:', () => {
      it('Expects RView to be an object.', () => {
        expect(RView).to.be.an('object');
      });

      it(`Expects RView to own ${6 + OWNPROPS} properties.`, () => {
        expect(Object.keys(RView)).to.be.an('array').that.has.lengthOf(6 + OWNPROPS);
      });
    });


    // -- This section must not be modified --
    // NAME, VERSION, _library, _setTestMode, noConflict, whoami
    describe('Check the owned generic properties:', () => {
      it(`Expects RView to own the property "NAME" whose value is "${libname}".`, () => {
        expect(RView).to.own.property('NAME').that.is.equal(libname);
      });

      it(`Expects RView to own the property "VERSION" whose value is "${version}".`, () => {
        expect(RView).to.own.property('VERSION');
      });

      it('Expects RView to own the property "_library" that is an object.', () => {
        expect(RView).to.own.property('_library').that.is.an('object');
      });

      it('Expects RView to own the property "_setTestMode" that is a function.', () => {
        expect(RView).to.own.property('_setTestMode').that.is.a('function');
      });

      it('Expects RView to own the property "noConflict" that is a function.', () => {
        expect(RView).to.own.property('noConflict').that.is.a('function');
      });

      it('Expects RView to own the property "whoami" that is a function.', () => {
        expect(RView).to.own.property('whoami').that.is.a('function');
      });

      describe('Test the owned generic properties:', () => {
        it('Expects the property "_library" to own two properties.', () => {
          expect(Object.keys(RView._library)).to.be.an('array').that.has.lengthOf(2);
        });
        it(`Expects the property "_library" to own the property "name" whose value is "${libname}".`, () => {
          expect(RView._library).to.own.property('name').that.is.equal(libname);
        });
        it(`Expects the property "_library" to own the property "version" whose value is "${version}".`, () => {
          expect(RView._library).to.own.property('version').that.is.equal(version);
        });

        it(`Expects the property "_setTestMode" to return an array with ${TESTMODE} item(s).`, () => {
          expect(RView._setTestMode()).to.be.an('array').that.has.lengthOf(TESTMODE);
        });

        it('Expects the property "noConflict" to return an object.', () => {
          expect(RView.noConflict()).to.be.an('object');
        });

        it('Expects the property "whoami" to return an object.', () => {
          expect(RView.whoami()).to.be.an('object');
        });
        it('Expects this object to own two properties.', () => {
          expect(Object.keys(RView.whoami())).to.be.an('array').that.has.lengthOf(2);
        });
        it(`Expects this object to own the property "name" whose value is "${libname}".`, () => {
          expect(RView.whoami()).to.own.property('name').that.is.equal(libname);
        });
        it(`Expects this object to own the property "version" whose value is "${version}".`, () => {
          expect(RView.whoami()).to.own.property('version').that.is.equal(version);
        });
      });
    });


    // -- This section must be adapted --
    // Replace here 'getString' and 'getArray' by the inherited properties
    // added by your library.
    describe('Check the owned specific properties:', () => {
      it('Expects RView to own the property "h" that is a function.', () => {
        expect(RView).to.own.property('h').that.is.a('function');
      });

      it('Expects RView to own the property "Component" that is a function.', () => {
        expect(RView).to.own.property('Component').that.is.a('function');
      });

      it('Expects RView to own the property "render" that is a function.', () => {
        expect(RView).to.own.property('render').that.is.a('function');
      });

      it('Expects RView to own the property "restore" that is a function.', () => {
        expect(RView).to.own.property('restore').that.is.a('function');
      });

      it('Expects RView to own the property "remove" that is a function.', () => {
        expect(RView).to.own.property('remove').that.is.a('function');
      });

      it('Expects RView to own the property "plugin" that is a function.', () => {
        expect(RView).to.own.property('plugin').that.is.a('function');
      });

      it('Expects RView to own the property "makeid" that is a function.', () => {
        expect(RView).to.own.property('makeid').that.is.a('function');
      });

      it('Expects RView to own the property "extends" that is a function.', () => {
        expect(RView).to.own.property('extends').that.is.a('function');
      });

      describe('Test the owned specific properties:', () => {
        it('Expects the property ... to be done!".', () => {
          expect(true).to.be.equal(true);
        });
      });
    });
  });
};
