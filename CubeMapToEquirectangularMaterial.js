var defaults = require('lodash.defaults');

var __uniforms = {
	map: { type: 't', value: null }
};

var __vertexShader = [
	"varying vec2 vUv;",
	"void main() {",
	"	vUv = uv;",
	"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
	"}"
].join("\n");

var __fragmentShader = [
	"uniform samplerCube map;",
	"varying vec3 vertexPos;",
	"varying vec2 vUv;",
	"vec4 cubeToLatLon(samplerCube cubemap, vec2 inUV) { ",
	"	const float PI = 3.141592653589793238462643383;",
	"	vec3 cubmapTexCoords;",
	"	cubmapTexCoords.x = -sin(inUV.x * PI * 2.0) * sin(inUV.y * PI);",
	"	cubmapTexCoords.y = cos(inUV.y * PI);",
	"	cubmapTexCoords.z = -cos(inUV.x * PI * 2.0) * sin(inUV.y * PI);",
	"	return textureCube(cubemap, cubmapTexCoords);",
	"}",
	"void main( void ) { ",
	"	gl_FragColor = cubeToLatLon(map, vUv);",
	"}"
].join("\n");

function CubeMapToEquirectangularMaterial(params) {
	params = params || {};
	defaults(params, {
	});
	var uniforms = THREE.UniformsUtils.clone(__uniforms);
	
	if(!params.map) throw new Error('You must provide a map.');

	uniforms.map.value = params.map;
	defaults(params, {
		uniforms: uniforms,
		fragmentShader: __fragmentShader,
		vertexShader: __vertexShader,
		transparent: true,
		side: THREE.DoubleSide
	});
	THREE.ShaderMaterial.call(this, params);
	this.name = 'CubeMapToEquirectangularMaterial';
}

CubeMapToEquirectangularMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);

module.exports = CubeMapToEquirectangularMaterial;