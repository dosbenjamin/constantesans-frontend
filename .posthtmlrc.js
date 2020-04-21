module.exports = {
  plugins: {
    'posthtml-favicons': {
      outDir: 'public',
      configuration: {
        path: './',
        appName: 'ConstanteSans',
        appDescription: 'TFE',
        developerName: 'Benjamin Dos Santos',
        developerURL: 'https://benjamindossantos.be',
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
