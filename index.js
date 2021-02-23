var cross = require('gl-vec3/cross');
var dot = require('gl-vec3/dot');
var sub = require('gl-vec3/subtract');

var EPSILON = 0.0001;
var edge1 = new Float32Array([0, 0, 0]);
var edge2 = new Float32Array([0, 0, 0]);
var tvec = new Float32Array([0, 0, 0]);
var pvec = new Float32Array([0, 0, 0]);
var qvec = new Float32Array([0, 0, 0]);

module.exports = function intersectTriangle (out, pt, dir, tri) {
    sub(edge1, tri[1], tri[0]);
    sub(edge2, tri[2], tri[0]);

    cross(pvec, dir, edge2);
    var det = dot(edge1, pvec);

    if (det > -EPSILON && det < EPSILON)
        return null;
    invDet = 1 / det;
    sub(tvec, pt, tri[0]);

    var u = dot(tvec, pvec) * invDet;
    if (u < 0 || u > 1)
        return null;
    cross(qvec, tvec, edge1);

    var v = dot(dir, qvec) * invDet;
    if (v < 0 || u + v > 1) return null;
    var t = dot(edge2, qvec) * invDet;
    out[0] = pt[0] + t * dir[0];
    out[1] = pt[1] + t * dir[1];
    out[2] = pt[2] + t * dir[2];
    return t
}
