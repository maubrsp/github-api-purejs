var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var argv;
try {
  argv = JSON.parse(process);
} catch (ex) {
  argv = process.argv;
}

let dinamicConfigs = {
  localport: '8080',
  url: 'http://localhost:8080/1/',
  libs_url: 'http://localhost:8080/1/',
  images_url: 'http://localhost:8080/1/images/',
  local_url: 'http://localhost',
  local_libs_url: 'http://localhost:8080/',
  local_images_url: 'http://localhost:8080/assets/images/',
  homologa_url: 'https://pure-js-boilerplate-example.netlify.com/',
  homologa_libs_url: 'https://pure-js-boilerplate-example.netlify.com/',
  homologa_images_url:
    'https://pure-js-boilerplate-example.netlify.com/images/',
  js: './src/libs/pages',
  html: 'src/doom'
};

let jsEntries = {};
let htmlEntries = {};
let pageData = [
  {
    id: 'index'
  }
];

pageData.forEach((value, index) => {
  jsEntries[value.id] = dinamicConfigs.js + '/' + value.id + '.js';
  // jsEntries[value.id + '.mobile'] =
  //   dinamicConfigs.js + '/' + value.id + '/' + value.id + '.mobile.js';

  htmlEntries[value.id] = dinamicConfigs.html + '/' + value.id + '.ejs';
  // htmlEntries[value.id + '.mobile'] =
  //   dinamicConfigs.html + '/' + value.id + '/' + value.id + '.mobile.ejs';
});

let tmpHash = Math.round(Math.random() * 11111111 + 99999999);

/*console.log(`argv: ${argv[2]}`);*/
var production = argv[2] == '-p' ? true : false;
var dir = './../dev';
var assetPath = './../assets';

let urls = {
  url: dinamicConfigs.local_url,
  libs_url: dinamicConfigs.local_libs_url,
  images_url: dinamicConfigs.local_images_url
};

var config = {
  entry: jsEntries,
  output: {
    path: path.join(__dirname, dir),
    publicPath: '',
    filename: 'libs/[name].' + tmpHash + '.js',
    chunkFilename: 'libs/[id].chunk.js'
  },
  resolve: {
    extensions: ['.json', '.js', '.less', '.css', '.ejs']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?' + `name='./assets/fonts/[name].[ext]'`
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 30720 * 7,
          name: 'images/[name].' + tmpHash + '.[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanPlugin([dir]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
      //minChunks: 3
    }),

    new ExtractTextPlugin('styles/[name].' + tmpHash + '.css'),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
    // new CopyWebpackPlugin([
    //   {
    //     from: path.join(__dirname, assetPath),
    //     to: path.join(__dirname, dir + '/assets')
    //   }
    // ])
  ],

  devServer: {
    host: 'localhost',
    port: dinamicConfigs.localport,
    inline: true,
    hot: false
  }
};

module.exports = config;

Object.keys(htmlEntries).forEach(function(key) {
  var conf = {
    filename: key + '.html',
    template: htmlEntries[key],
    inject: false,
    hash: false,
    production: production,
    currentHash: tmpHash,
    url: urls.url,
    libs_url: urls.libs_url,
    images_url: urls.images_url,
    chunks: ['common', key]
    //minify: true,
    /*
		,
        minify: { 
			removeComments: false,
			collapseWhitespace: false,
			removeAttributeQuotes: false
		}
		*/
  };
  config.plugins.push(new HtmlWebpackPlugin(conf));
});

function getEntry(globPath) {
  var files = glob.sync(globPath);
  var entries = {},
    entry,
    dirname,
    basename,
    pathname,
    extname;

  for (var i = 0; i < files.length; i++) {
    entry = files[i];
    dirname = path.dirname(entry);
    extname = path.extname(entry);
    basename = path.basename(entry, extname);
    pathname = path.join(dirname, basename);
    entries[pathname] = './' + entry;
  }
  return entries;
}
