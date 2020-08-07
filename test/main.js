// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0, no-underscore-dangle: 0 */


// -- Vendor Modules
const { JSDOM }         = require('jsdom')
    , { XMLSerializer } = require('xmldom')
    ;


// -- Local Modules
const RView = require('../src/rview').default
    , test_ = require('./int/lib/_')
    , testview = require('./int/rview')

    // , testrender1 = require('./int/renderer/render_1')
    //
    // , testcomp = require('./int/component/props')
    // , test$ = require('./int/component/props$')
    // , testcomp1 = require('./int/component/webcomp')
    // , testhyper = require('./int/component/hyperscript')
    // , testdiff = require('./int/component/diffing')
    // , testcrender = require('./int/component/rendering')
    //
    // , testrender2 = require('./int/renderer/render_2')

    // , hello = require('./stress/hello')
    // , clock = require('./stress/clock')
    // , iclock = require('./stress/iclock')
    // , ssclock = require('./stress/startstopclock')
    // , hhello = require('./stress/hhello')
    // , mhello = require('./stress/mhello')
    // , anim = require('./stress/anim')
    ;


// -- Local Constants


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

describe('Test RView Library:', () => {
  test_(RView);
  testview(RView);


  //
  // // test View.render
  // testrender1(View);
  //
  // // test view.Component
  // testcomp(View);
  // test$(View);
  // testcomp1(View);
  // testhyper(View);
  // testdiff(View);
  // testcrender(View);
  //
  // // test View.render/restore/remove/replace
  // testrender2(View);
  //

  // Stress tests
  // hello(RView, 'stress1');
  // clock(RView, 'stress2');
  // iclock(RView, 'stress3');
  // ssclock(RView, 'stress4');
  // hhello(RView, 'stress5');
  // mhello(RView, 'stress6');
  // anim(RView, 'stress7');
});
