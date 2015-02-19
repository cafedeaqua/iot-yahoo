/**
 * Created by tkawashita on 15/02/15.
 */

var forever = require('forever');

var child = new (forever.Monitor)('main.js', {
  max: 100,
  silent: true,
});
