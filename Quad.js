var createPlaneGeometry = require('./create-plane-geometry');
var defaults = require('lodash.defaults');

var __material;
function Quad(params) {
	params = params || {};
	defaults(params, {
		alignX: 0.5,
		alignY: 0.5,
		material: new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			transparent: true,
			opacity: 0.5,
			side: THREE.DoubleSide
		})
	});

	var geometry = createPlaneGeometry(params.alignX, params.alignY);
	THREE.Mesh.call(this, geometry, params.material);
}

Quad.prototype = Object.create(THREE.Mesh.prototype);

module.exports = Quad;