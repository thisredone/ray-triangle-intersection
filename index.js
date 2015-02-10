var cross = require('cross');
var dot = require('robust-dot-product');
var sub = require('gl-matrix').vec3.subtract;

var EPSILON = 0.000001;
var edge1 = [0,0,0];
var edge2 = [0,0,0];
var tvec = [0,0,0];
var pvec = [0,0,0];
var qvec = [0,0,0];

module.exports = intersectTriangle;

function intersectTriangle (out, pt, dir, tri) {
    sub(edge1, tri[1], tri[0]);
    sub(edge2, tri[2], tri[0]);
    
    cross(pvec, dir, edge2);
    var det = dot(edge1, pvec);
    
    if (det > -EPSILON && det < EPSILON) return null;
    sub(tvec, pt, tri[0]);
    
    var u = dot(tvec, pvec) / det;
    if (u < 0 || u > 1) return null;
    
    cross(qvec, tvec, edge1);
    var v = dot(dir, qvec) / det;
    if (v < 0 || u + v > 1) return null;
    
    var t = dot(edge2, qvec) / det;
    out[0] = pt[0] + t * dir[0];
    out[1] = pt[1] + t * dir[1];
    out[2] = pt[2] + t * dir[2];
    return out;
}
