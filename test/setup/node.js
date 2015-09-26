global.chai = require('chai');
global.sinon = require('sinon');
global.chai.use(require('sinon-chai'));

var jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><head></head><body></body></html>', {});
global.window = document.parentWindow;

require('babel-core/register')({optional: ['es7.decorators']});
require('./setup')();
