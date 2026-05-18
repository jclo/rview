// ESLint declarations:
/* global describe */
/* eslint no-unused-vars: 0 */


// -- Vendor Modules
import { JSDOM } from 'jsdom';
import { XMLSerializer } from 'xmldom';


// -- Local Modules
import pack from '../package.json' with { type: 'json' };
import testlib from './int/lib.js';
import test_ from './int/lib/_.js';

// import hello from './stress/hello.js';
// import clock from './stress/clock.js';
// import iclock from './stress/iclock.js';
// import ssclock from './stress/startstopclock.js';
// import hhello from './stress/hhello.js';
// import mhello from './stress/mhello.js';
// import anim from './stress/anim.js';


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
// global.navigator = { userAgent: 'node.js' };
global.XMLSerializer = XMLSerializer;
global.DOMParser = dom.window.DOMParser;

// Nota:
// If you want that 'display-coverage' shows the coverage files by files,
// you should set 'RView' and 'testlib' like this:
//  . const RView (await import('../src/prototypal.js').default;
//  . testlib(RView, '{{lib:name}}', '{{lib:version}}', 'without new');
//
// But, if you want that 'display-coverage' shows the coverage in one file,
// you should set 'RView' and 'testlib' like this:
//  . import RView from '../index.js';
//  . testlib(RView, libname, pack.version, 'without new');

const RView = (await import('../src/rview.js')).default;
// const RView (await import('../index.js')).default;

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


// - oOo --
