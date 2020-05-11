module.exports = {
  plugins: {
    'postcss-normalize': { forceImport: 'sanitize.css' },
    '@fullhuman/postcss-purgecss': {
      content: ['./src/**/*.pug', './src/**/*.js'],
    },
    'postcss-sort-media-queries': {},
    // 'postcss-merge-selectors': { promote: true },
    'postcss-combine-duplicated-selectors': {
      removeDuplicatedProperties: true
    },
    'css-declaration-sorter': { order: 'concentric-css' },
    cssnano: { preset: 'advanced' }
  }
}
