import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'pgjs',
  description: 'THE ORM for PostgreSQL',
  base: '/pgjs/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/introduction' },
      { text: 'Queries', link: '/select/' },
      { text: 'GitHub', link: 'https://github.com/aosorio/pgjs' }
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Architecture', link: '/architecture' },
            { text: 'Roadmap', link: '/roadmap' }
          ]
        },
        {
          text: 'Queries',
          items: [
            { text: 'Select', link: '/select/' },
            { text: 'Basics', link: '/select/basics' },
            { text: 'Joins', link: '/select/joins' },
            { text: 'Conditions', link: '/select/conditions' },
            { text: 'Operators', link: '/select/operators' },
            { text: 'Aggregates', link: '/select/aggregates' },
            { text: 'Grouping', link: '/select/grouping' },
            { text: 'Ordering', link: '/select/ordering' },
            { text: 'Advanced', link: '/select/advanced' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/aosorio/pgjs' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    }
  }
}) 