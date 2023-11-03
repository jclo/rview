// ESLint declarations
/* eslint one-var: 0, semi-style: 0 */


// -- Node modules

// -- Local modules
const themeconfig = require('./.kasar/theme-config')
    // , docu        = require('./docsidemenu')
    ;


// -- Local constants
const FR          = 'fr'
    , EN          = 'en'
    , DE          = 'de'
    , IT          = 'it'
    , { base }    = themeconfig
    , { version } = require('../package.json')
    , basepath    = '/rview/'
    ;


// -- Local variables


// -- Main

module.exports = {

  // This is where is stored the static web site:
  basedist: `${base}/site/_dist`,
  dist: `${base}/site/_dist${basepath}`,

  // Build a dev or prod version:
  // (replace 'dev' by 'prod' to build a production version)
  webtype: 'dev',

  // This is the base path of your website:
  basepath,

  // This is your website's name and version:
  product: {
    name: 'RView',
    version,
  },

  // These are the parameters that define your app & company:
  title: 'Mobilabs | RView',
  description: 'RView documentation',
  company: {
    name: 'Mobilabs',
    description: 'Company slogan ...',
    street: '55, rue Saint-André-des-Arts',
    city: '75006 Paris',
    country: 'France',
    phone: '+33 1 49 85 32 51',
    fax: '+33 1 83 62 05 63',
    email: 'contact(at)mobilabs.fr',
    url: {
      protocol: 'https',
      domain: 'www.mobilabs.fr',
    },
    // Nota:
    // you should not replace © by &copy; because JSDOM convert ';' to &amp. So,
    // the output becomes '&amp;copy;'
    copyright: 'Copyright © {{copyright:year}} Mobilabs. All rights reserved.',
    credits: {
      name: 'mobilabs',
      link: 'https://www.mobilabs.fr',
    },
  },

  // These are the tags to include on your pages to help google to identify
  // the owner of the website. 'google.verify.v1' is a tag to include in the
  // head section of your pages. It is provided by Google Analytics.
  // 'google.verify.v2' is a file to include at the root level of your website.
  // It is now the preferred way for Google identification. So, prefer This
  // second option to 'google.verify.v1'.
  google: {
    verify: {
      v1: '-',
      // v2: `${base}/site/tobuildweb/google123.html`,
    },
    sitega4id: null,
  },

  // This is the tag to include in Kiwi tracker.
  kiwi: {
    siteid: null,
  },

  axeptio: {
    siteid: null,
  },

  // These are the pages to build. Google doesn't like that the title and the
  // description are shared among several pages. Take care to set a title and a
  // description unique for each page (see the yaml header of the file).
  // If the contents of your page is detailed using markdown with or without html
  // tags, choose for the extension '.md'. If your contents is entirely written
  // with html tags, choose for the extension '.html'. This page won't be
  // processed by the markdown parser.
  website: {
    en: [
      `${base}/site/webpages/${EN}/introduction.md`,
      `${base}/site/webpages/${EN}/quickstart.md`,
      {
        title: 'Examples',
        pages: [
          `${base}/site/webpages/${EN}/examples/hello.md`,
          `${base}/site/webpages/${EN}/examples/hello2.md`,
          `${base}/site/webpages/${EN}/examples/hello3.md`,
          `${base}/site/webpages/${EN}/examples/clock.md`,
          `${base}/site/webpages/${EN}/examples/clock2.md`,
          `${base}/site/webpages/${EN}/examples/animrect.md`,
        ],
      },
      `${base}/site/webpages/${EN}/reference.md`,
    ],
  },

  // Adds the documentation:
  // docs: docu.docs || null,

  // These are the top and bottom menus and a special 'mobile' menu that
  // replace the default menus (top and bottom) on devices with a small screen.
  /* eslint-disable object-curly-newline */
  menu: {
    en: {
      top: {
        left: [
          { text: 'Home', link: `${basepath}${EN}` },
        ],
        right: [
          {
            text: 'EN',
            link: '#',
            target: null,
            lang: EN,
            children: [
              { text: 'English', link: `${basepath}${EN}/#`, lang: EN, icon: '<span class="fi fi-gb"></span>' },
            ],
          },
          { text: '', link: '#switchtheme', lang: null, icon: '<span id="switchthemetopmenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode.">' },
        ],
      },
      bottom: [
        { text: 'contact', link: 'https://www.mobilabs.fr/en/contact.html' },
        { text: 'legal', link: 'https://www.mobilabs.fr/en/legal.html' },
        { text: 'designed with &#10084;&#65039; by ourselves and Kasar!', link: 'https://www.npmjs.com/package/@mobilabs/kasar', target: '_blank' },
      ],
      mobile: [
        // { text: 'Home', link: `${basepath}${EN}/index.html` },
        { text: 'Doc', link: `${basepath}${EN}/rview/introduction.html`, tag: 'doc' },
        { text: 'Contact', link: 'https://www.mobilabs.fr/en/contact.html' },
        { text: 'Legal', link: 'https://www.mobilabs.fr/en/legal.html' },
        {
          text: '',
          link: '#',
          target: null,
          lang: EN,
          icon: '<span class="fi fi-gb"></span>',
          tag: 'lang',
          children: [
          ],
        },
        { text: '', link: '#switchtheme', lang: EN, icon: '<span id="switchthemesidemenu" class="theme-color-icons theme-icon" title="Switch between dark and light mode.">' },
      ],
    },
  },

  // These are the scripts to insert at the bottom of the body of the HTML
  // output.
  scripts: [
    `${basepath}vendor/libs/highlight.min.js`,
  ],
};
