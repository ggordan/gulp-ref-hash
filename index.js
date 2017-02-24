var through     = require('through2');
var _           = require('underscore');
var gutil       = require('gulp-util');
var crypto      = require('crypto');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-ref-hash';

function randomHash() {
  return crypto.randomBytes(8).toString('hex');
}

function hashifyLine(path, assetType) {
  var url = [path, randomHash(), '.', assetType].join('');
  return '<!-- build:' + assetType + ' ' + url + ' -->';
}

module.exports = function(options) {
  var matches, assetType;

  options = _.extend({
    paths: {
      js: '/static/js/',
      css: '/static/css/',
    },
  }, options);


  return through.obj(function(file, enc, callback) {

    if (file.isNull()) return callback();

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-ref-hash', 'Streaming not supported.'));
      return callback();
    }
    var content = file.contents.toString();
    var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n';

    var contents = content.split(linefeed).map(function(line) {
        if (matches = line.match(/<!--\s*build:(\w+)(?:\(([^\)]+)\))?\s*([^\s]+)?\s*-->/)) {
            extension = matches[1];
            line = hashifyLine(options.paths[extension], extension);
        }
        return line;
    }).join(linefeed);

    file.contents = new Buffer(contents);
    this.push(file);
    return callback();

  });
};