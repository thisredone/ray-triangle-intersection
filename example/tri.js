var intersect = require('../');

var tri = [[5,5,5],[10,15,4],[15,5,3]];
var pt = [9,5,-5];
var dir = [0,0.1,0.9];

console.log(intersect([], pt, dir, tri));
