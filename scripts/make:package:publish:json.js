#!/usr/bin/env node
/* *****************************************************************************
 *
 * Creates package.publish.jon.
 *
 * make:package:publish:json.js script creates the package.json version
 * to be published on NPM.
 *
 * Private Functions:
 *  . _help                       displays the help message,
 *  . _clean                      removes the previous package.publish.json,
 *  . _dopublish                  creates package.publish.json,
 *
 *
 * Public Static Methods:
 *  . run                         executes the script,
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint curly: 1 */


// -- Vendor Modules
import fs from 'fs';
import nopt from 'nopt';


// -- Local Modules
import pack from '../package.json' with { type: 'json' };


// -- Local Constants
const VERSION     = '0.0.0-alpha.0'
    , opts        = {
      help: [Boolean, false],
      version: [String, null],
    }
    , shortOpts   = {
      h: ['--help'],
      v: ['--version', VERSION],
    }
    , parsed      = nopt(opts, shortOpts, process.argv, 2)
    , destination = '.'
    ;


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Dispays the help message.
 *
 * @function ()
 * @private
 * @param {}                -,
 * @returns {}              -,
 * @since 0.0.0
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    '                       creates package.publish.json',
    '',
    'Options:',
    '',
    '-h, --help             output usage information',
    '-v, --version          output the version number',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
}

/**
 * Removes the previous package.publish.json.
 *
 * @function ([arg1])
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {Object}        returns a promise,
 * @since 0.0.0
 */
function _clean(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mclean\x1b[89m\x1b[0m\'...\n');

  return new Promise((resolve) => {
    fs.rm(`${destination}/package.publish.json`, { force: true }, (err1) => {
      if (err1) {
        throw new Error(err1);
      }

      const d2 = new Date() - d1;
      process.stdout.write(`Finished '\x1b[36mclean\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      resolve();
      if (done) {
        done();
      }
    });
  });
}

/**
 * Creates package.publish.json.
 *
 * @function (arg1)
 * @private
 * @param {Function}        the function to call at the completion,
 * @returns {}              -,
 * @since 0.0.0
 */
function _dopublish(done) {
  const d1 = new Date();
  process.stdout.write('Starting \'\x1b[36mdo:publish\x1b[89m\x1b[0m\'...\n');

  const pubpack = {};
  pubpack.name = pack.name;
  pubpack.version = pack.version;
  pubpack.description = pack.description;
  pubpack.main = pack.main;
  pubpack.minified = pack.minified;
  pubpack.unpkg = pack.unpkg;
  pubpack.module = pack.module;

  // pubpack.bin = pack.bin;
  // pubpack.type = pack.type;

  pubpack.scripts = {};
  pubpack.scripts.postpack = pack.scripts.postpack;

  pubpack.repository = pack.repository;
  pubpack.keywords = pack.keywords;

  pubpack.author = pack.author;
  pubpack.author.name = pack.author.name;
  pubpack.author.email = pack.author.email;
  pubpack.author.url = pack.author.url;

  pubpack.license = pack.license;
  pubpack.bugs = pack.bugs;
  pubpack.bugs.url = pack.bugs.url;
  pubpack.homepage = pack.homepage;

  pubpack.dependencies = {};
  pubpack.devDependencies = {};

  // pubpack.c8 = pack.c8;
  pubpack.publishConfig = pack.publishConfig;
  pubpack.private = pack.private;

  fs.writeFile(`${destination}/package.publish.json`, JSON.stringify(pubpack, null, 2), { encoding: 'utf8' }, (err) => {
    if (err) {
      throw new Error(err);
    }

    const d2 = new Date() - d1;
    process.stdout.write(`Finished '\x1b[36mdo:dopublish\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
    done();
  });
}


// -- Public Static Methods ----------------------------------------------------

const Lib = {

  /**
   * Executes the script.
   *
   * @method ()
   * @public
   * @param {}                -,
   * @returns {}              -,
   * @since 0.0.0
  */
  async run() {
    const PENDING = 1;

    if (parsed.help) {
      _help();
      return;
    }

    if (parsed.version) {
      process.stdout.write(`version: ${parsed.version}\n`);
      return;
    }

    const d1 = new Date();
    process.stdout.write('Starting \'\x1b[36mmake:package:publish:json\x1b[89m\x1b[0m\'...\n');

    let pending = PENDING;
    /**
     * Executes done until completion.
     */
    function done() {
      pending -= 1;
      if (!pending) {
        const d2 = new Date() - d1;
        process.stdout.write(`Finished '\x1b[36mmake:package:publish:json\x1b[89m\x1b[0m' after \x1b[35m${d2} ms\x1b[89m\x1b[0m\n`);
      }
    }

    await _clean();
    _dopublish(done);
  },
};


// -- Where the script starts --------------------------------------------------
Lib.run();


// -- oOo --
