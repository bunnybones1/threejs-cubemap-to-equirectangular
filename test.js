THREE = require('three');
var convertCubeMapToEquirectangular = require('./');
var View = require('threejs-managed-view').View;
var Room = require('threejs-checkerroom');
var view = new View({
	useRafPolyfill: false
});

var Quad = require('./Quad');

var room = new Room(20, 20, 20);
view.scene.add(room);

var light = new THREE.AmbientLight(0xafcfdf);
view.scene.add(light);

function convertCubeMap() {
	var cubeMapCamera = new THREE.CubeCamera(0.1, 100, 512);
	view.scene.add(cubeMapCamera);
	cubeMapCamera.position.y = 2;
	cubeMapCamera.updateCubeMap(view.renderer, view.scene);

	var equirectangularMap = convertCubeMapToEquirectangular({
		renderer: view.renderer,
		cubeMap: cubeMapCamera.renderTarget
	});
	var previewMaterial = new THREE.MeshBasicMaterial({
		map: equirectangularMap
	});
	var preview = new Quad({
		material: previewMaterial
	});
	preview.scale.set(4, 2, 1);
	preview.position.y = 4;
	view.scene.add(preview);
}

view.renderManager.onExitFrame.addOnce(convertCubeMap);
window.scene = view.scene;