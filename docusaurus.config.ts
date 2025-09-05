import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'SMOCS Documentation',           
  tagline: 'Streaming Monitoring Optimization Control System', 
  favicon: 'img/favicon.ico',

  url: 'https://armenkasp.github.io',
  baseUrl: '/SMOCS-DOCS/',
  
  // Update these
  organizationName: 'armenkasp',
  projectName: 'SMOCS-DOCS',

  // Navigation bar
  themeConfig: {
    navbar: {
      title: 'SMOCS Docs',
      logo: {
        alt: 'SMOCS Logo',
        src: 'img/logo.svg',             
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',          
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/armenkasp/SMOCS-DOCS',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        'https://github.com/JeffersonLab/SMOCS'
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SMOCS Project.`,
    },
  },
};