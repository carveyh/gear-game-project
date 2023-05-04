// webpack.config.js

const path = require('path'); //if the project name is diff on other machines
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //handle diff CSS requirements

const config = {
  entry: [
		//tells webpack where to look for either js or css as entry points
    path.resolve(__dirname, 'src', 'index.js'), //whatever the directory name (root directory), ignore name and builds path calls src, and a path called index.js, defining the entry point and where to look
    path.resolve(__dirname, 'src', 'index.scss') //resolve turns it into one string: gear-game-project/src/index.js
  ],
  output: { //output path to an output.
    path: path.join(__dirname, 'dist'), // bundled file in dist/
    filename: '[name].js' //by default should output to main.
  },
  module: {
    rules: [
      {
        test: /\.js$/, // applies to js files
        use: ['babel-loader'], // transpiles your js (one of the npm packages/libraries we pulled in)
        exclude: /node_modules/, // don't transpile node modules 
      },
      {
        test: /\.s?[ac]ss$/, // applies to css/scss/sass files
        use: [
          MiniCssExtractPlugin.loader, // create bundled css file
          {
            loader: 'css-loader', // resolves @import statements
            options: { url: false } // don't resolve url() statements
          },
          'sass-loader', // compiles sass to css
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
};

module.exports = (env, argv) => { // take an environemnt variable, and any args included in "npm start", look for them
  if (argv.mode === 'production') { // when we do --mode=development
    config.devtool = 'source-map'; //as navigate thru inspect, will show source code in functions, without evaluate. in production, ignore debuggers
  } else {
    config.devtool = 'eval-source-map'; //we DO want to hit debuggers in test mode. This maps over all our JS files
  }

  return config;
}