// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { JSDOM }         = require('jsdom')
    , { XMLSerializer } = require('xmldom')
    ;


// -- Local Modules
const RView   = require('../src/rview').default
    // RView  = require('../index.js')
    // , pack = require('../package.json')
    , testlib = require('./int/lib')
    , test_   = require('./int/lib/_')

    // , hello = require('./stress/hello')
    // , clock = require('./stress/clock')
    // , iclock = require('./stress/iclock')
    // , ssclock = require('./stress/startstopclock')
    // , hhello = require('./stress/hhello')
    // , mhello = require('./stress/mhello')
    // , anim = require('./stress/anim')
    ;


// -- Local Constants
// const libname = 'RView';


// -- Local Variables


// -- Main

// Create a Virtual DOM:
const HTML = `
<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <div id="app"></div>

      <div id="stress1"></div>
      <div id="stress2"></div>
      <div id="stress3"></div>
      <div id="stress4"></div>
      <div id="stress5"></div>
      <div id="stress6"></div>
      <div id="stress7"></div>
    </body>
  </html>
`;

const dom = new JSDOM(HTML);
global.window = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };
global.XMLSerializer = XMLSerializer;
global.DOMParser = dom.window.DOMParser;

// Nota:
// If you choose 'RView = require('../index')', 'display-coverage' will
// show the coverage of all the library in one file.
//
// If you want to display the coverage file by file, you must choose
// 'RView = require('../src/prototypal').default'. But, in this case,
// the build isn't done, so you should pass '{{lib:name}}' as libname and
// '{{lib:version}}' as the library version.

describe('Test RView:', () => {
  // testlib(RView, libname, pack.version, 'without new');
  testlib(RView, '{{lib:name}}', '{{lib:version}}', 'without new');

  test_(RView);

  // Stress tests
  // hello(RView, 'stress1');
  // clock(RView, 'stress2');
  // iclock(RView, 'stress3');
  // ssclock(RView, 'stress4');
  // hhello(RView, 'stress5');
  // mhello(RView, 'stress6');
  // anim(RView, 'stress7');
});
