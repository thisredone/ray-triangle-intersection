var intersect = require('../');

var tri = [[5,5,5],[10,15,4],[15,5,3]];
var pt = [9,5,-4];
var dir = [0,0,0.5];

console.log(intersect([], pt, dir, tri));
