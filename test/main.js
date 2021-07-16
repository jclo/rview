// ESLint declarations:
/* global describe */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { JSDOM }         = require('jsdom')
    , { XMLSerializer } = require('xmldom')
    ;


// -- Local Modules
const pack    = require('../package.json')
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
const libname = 'RView';


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

// This define root for Node.js:
global.root = {};

const dom = new JSDOM(HTML);
global.window = dom.window;
global.root = dom.window;
global.document = dom.window.document;
global.navigator = { userAgent: 'node.js' };
global.XMLSerializer = XMLSerializer;
global.DOMParser = dom.window.DOMParser;

// Nota:
// If you want that 'display-coverage' shows the coverage files by files,
// you should set 'RView' and 'testlib' like this:
//  . const RView = require('../src/<file>').default;
//  . testlib(RView, '{{lib:name}}', '{{lib:version}}', 'without new');
//
// But, if you want that 'display-coverage' shows the coverage in one file,
// you should set 'RView' and 'testlib' like this:
//  . const RView = require('../index');
//  . testlib(RView, libname, pack.version, 'without new');

const RView = require('../src/rview').default;
// const RView = require('../index');

describe('Test RView:', () => {
  testlib(RView, '{{lib:name}}', '{{lib:version}}', 'without new');
  // testlib(RView, libname, pack.version, 'without new');

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
