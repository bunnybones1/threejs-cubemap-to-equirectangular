var defaults = require('lodash.defaults');
var Quad = require('./Quad');
var CubeMapToEquirectangularMaterial = require('./CubeMapToEquirectangularMaterial');

function convertCubeMapToEquirectangular(params) {
	params = params || {};
	defaults(params, {
		width: 2048,
		height: 1024,
		cubeMap: undefined,
		renderer: undefined
	});

	if(!params.cubeMap) throw new Error('You must provide a cubeMap.');
	if(!params.renderer) throw new Error('You must provide a renderer.');

	var renderTarget = new THREE.WebGLRenderTarget(params.width, params.height);
	var camera = new THREE.OrthographicCamera(-0.5, 0.5, -0.5, 0.5, -0.5, 0.5);
	var quad = new Quad({
		material: new CubeMapToEquirectangularMaterial({
			map: params.cubeMap,
			side: THREE.DoubleSide
		})
	});
	var scene = new THREE.Scene();
	scene.add(quad);
	scene.add(camera);

	params.renderer.render(scene, camera, renderTarget);
	return renderTarget;
}

module.exports = convertCubeMapToEquirectangular;