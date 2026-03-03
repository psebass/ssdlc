// @ts-check
const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '(SSDLC)Desarrollo Seguro DevSecOps',
  tagline: 'Desarrollado por Pablo SPITALE',
  url: 'https://tu-dominio.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'SSDLC devsecops docs',
      items: [
        {type: 'doc', docId: 'intro', position: 'left', label: 'Docs'},
      ],
    },
    footer: {
      style: 'light',
      copyright: `© 08/02/2026 | Pablo SPITALE`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

module.exports = config;
