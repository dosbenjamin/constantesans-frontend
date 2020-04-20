require('dotenv').config()

module.exports = {
  plugins: {
    'posthtml-favicons': {
      outDir: process.env.FTP_LOCAL_DIR,
      configuration: {
        path: './',
        appName: process.env.PROJECT_NAME,
        appDescription: process.env.PROJECT_DESCRIPTION,
        developerName: process.env.PROJECT_AUTHOR,
        developerURL: process.env.PROJECT_AUTHOR_URL,
        dir: 'auto',
        lang: 'fr-FR',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'any',
        start_url: '/?homescreen=1',
        version: 1,
        logging: false,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: true,
          yandex: false
        }
      }
    },
    'posthtml-link-noreferrer': { attr: ['noopener', 'noreferrer'] }
  }
}
