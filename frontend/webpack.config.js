const UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').UnusedFilesWebpackPlugin;

module.exports = {
  // ... your existing config
  plugins: [
    new UnusedFilesWebpackPlugin({
      patterns: ['src/**/*.*'],
      globOptions: {
        ignore: ['**/*.test.*', '**/__mocks__/**'],
      },
    }),
  ],
};
