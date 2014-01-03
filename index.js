
module.exports.gradient = function(opts) {
  return function(x, y) {
    var dx = x - 0;
    var dy = y - 1;
    return dx + dy;
  };
};

