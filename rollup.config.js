const { config } = require('@teclone/rollup-all');
module.exports = config({
  config: {},
  babelConfig: {
    presetsConfig: {
      presets: [
        [
          '@babel/preset-react'
        ],
      ],
    }
  },
});
