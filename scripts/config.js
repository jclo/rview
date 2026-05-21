/** ************************************************************************
 *
 * Configuration file.
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ********************************************************************** */
/* - */


// -- Vendor Modules


// -- Local Modules
import pack from '../package.json' with { type: 'json' };


// -- Local Constants
const libname = 'RView'
    , name    = libname.replace(/\s+/g, '').toLowerCase()
    , source  = './src/rview.js'
    ;


// -- Local Variables


// -- Main

export default {
  ES6GLOB: '$__ES6GLOB',
  root: '.',
  dist: './_dist',
  libdir: './lib',
  libname,
  name,
  index: './index.js',
  distlink: `./_dist/lib/${name}.js`,

  // This is the entry javascript file of your library. Choose one
  // pattern among the proposed ones in src. The files 'basic.js',
  // 'functional.js', 'functional-shared.js', 'prototypal.js',
  // 'pseudoclassical.js' and pseudoclassical-auto.js' are mutually exclusives.
  source,

  webfiles: [
    // These are the files to copy to the root path of the web app,
    './README.md',
    './LICENSE.md',
  ],

  get license() {
    return ['/*! ****************************************************************************',
      ` * ${libname} v${pack.version}`,
      ' *',
      ` * ${pack.description}.`,
      ' * (you can download it from npm or github repositories)',
      ` * Copyright (c) ${(new Date()).getFullYear()} ${pack.author.name} <${pack.author.email}> (${pack.author.url}).`,
      ' * Released under the MIT license. You may obtain a copy of the License',
      ' * at: http://www.opensource.org/licenses/mit-license.php).',
      ' * Built from ES6Kadoo v3.0.0-beta.1.4.',
      ' * ************************************************************************** */',
      ''].join('\n');
  },
};
