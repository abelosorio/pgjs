import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'pgjs',
  description: 'THE ORM for PostgreSQL',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/introduction' },
      { text: 'GitHub', link: 'https://github.com/aosorio/pgjs' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' }
        ]
      }
    ]
  }
}) 