import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import Stats from "three/examples/jsm/libs/stats.module.js";
// import { gui } from 'three/examples/jsm/libs/dat.gui.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

import waterNormals from "../../../imgs/waterNormals.jpg";
import bumpMap from "../../../imgs/bridge-background-2.jpg";
import cubeMap1 from "../../../imgs/cube-1.jpg";
import cubeMap2 from "../../../imgs/cube-2.jpg";
import cubeMap3 from "../../../imgs/cube-3.jpeg";
import cubeMap4 from "../../../imgs/cube-4.jpg";
import cubeMap5 from "../../../imgs/cube-5.jpg";
import cubeMap6 from "../../../imgs/cube-6.jpg";
import cubeMap6Rotated from "../../../imgs/cube-6-rotated.jpg";

let camera: any, scene: any, renderer: any, lastClientY: number;
let orbitControls, water: any, sun: any, mesh: any;
let id: number;

let i = 0;
let cubeCanRotateY = false;
let cubeCanRotateX = true;
let cubeCanReset = false;
let cubeTimeOutIdX: any;
let cubeTimeOutIdY: any;

const cubeMaterial1 =	new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap1),
});
const cubeMaterial2 =	new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap2),
});
const cubeMaterial3 =	new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap3),
});
const cubeMaterial4 =	new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap4),
});
const cubeMaterial5 =	new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap5),
});
const cubeMaterial6 =	new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap6Rotated),
});

const parameters = {
	elevation: 1,
	azimuth: 180,
};

const sunColor = 0xaa9800;
const skyTurbidity = 10;   //(10)
const skyRayleigh = 5 //(2)
const skyMieCoefficient = .0025; //(.005)
const skyMieDirectionalG = .8; //(.8)


const spotLightStrength = 1;
const spotLightX = 0;
const spotLightY = 100;
const spotLightZ = 300;

const waterColor = 0x341e1f;
const waterWidthSegments = 10000;
const waterHeightSegments = waterWidthSegments;
const waterAnimationSpeed = 0.75;

const orbitControlsMaxPolarAngleFactor = 0.495;

const cubeSize = 33;
const cubeRotationSpeed = .0066;
const cubeRotationDirectionTransitionTime = 250;
const cubeStartingHeight = 15;
const cubeMaxHeight = 17.5;
const cubeMinHeight = 12.5;
const cubeBobbingDirectionIsUp = true;
const cubeBobbingSpeed = Math.abs(cubeStartingHeight - cubeMaxHeight) / 90;

export function init() {
	//

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	document.body.appendChild(renderer.domElement);

	//

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		55,
		window.innerWidth / window.innerHeight,
		1,
		20000,
	);
	camera.position.set(0, 0, 100);

	//light
	var spotLight = new THREE.SpotLight(sunColor, spotLightStrength);
	spotLight.position.set(spotLightX, spotLightY, spotLightZ);
	scene.add(spotLight);

	// Water

	const waterGeometry = new THREE.PlaneGeometry(waterWidthSegments, waterHeightSegments);

	water = new Water(waterGeometry, {
		textureWidth: 512,
		textureHeight: 512,
		waterNormals: new THREE.TextureLoader().load(
			waterNormals,
			function (texture) {
				texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			},
		),
		sunDirection: new THREE.Vector3(),
		sunColor,
		waterColor,
		distortionScale: 3.7,
		fog: scene.fog !== undefined,
	});

	water.rotation.x = -Math.PI / 2;

	scene.add(water);

	// Skybox

	const sky = new Sky();
	sky.scale.setScalar(500);
	scene.add(sky);

	const skyUniforms = sky.material.uniforms;

	skyUniforms["turbidity"].value = skyTurbidity;
	skyUniforms["rayleigh"].value = skyRayleigh;
	skyUniforms["mieCoefficient"].value = skyMieCoefficient;
	skyUniforms["mieDirectionalG"].value = skyMieDirectionalG;

	if (document.body)
		document.body.lastElementChild?.classList.add("home__canvas");

	const pmremGenerator = new THREE.PMREMGenerator(renderer);

	sun = new THREE.Vector3();

	function updateSun() {
		const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
		const theta = THREE.MathUtils.degToRad(parameters.azimuth);

		sun.setFromSphericalCoords(1, phi, theta);

		sky.material.uniforms["sunPosition"].value.copy(sun);
		water.material.uniforms["sunDirection"].value.copy(sun).normalize();

		scene.environment = pmremGenerator.fromScene(sky as any).texture;
	}

	updateSun();

	//

	const materials = [cubeMaterial1, cubeMaterial2, cubeMaterial3, cubeMaterial4, cubeMaterial5, cubeMaterial6];

	const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
	const material = new THREE.MeshPhongMaterial({
		reflectivity: 0,
		refractionRatio: 0,
	});
	const bumpTexture = new THREE.TextureLoader().load(bumpMap);
	material.map = bumpTexture;

	mesh = new THREE.Mesh(geometry, materials);
	mesh.position.y = cubeStartingHeight;
	scene.add(mesh);

	//

	orbitControls = new OrbitControls(camera, renderer.domElement);
	orbitControls.target.set(0, 10, 0);
	orbitControls.minDistance = 100;
	orbitControls.maxDistance = 100;
	orbitControls.minAzimuthAngle = 0;
	orbitControls.maxAzimuthAngle = 0;
	orbitControls.maxPolarAngle = Math.PI * orbitControlsMaxPolarAngleFactor;
	orbitControls.minPolarAngle = orbitControls.maxPolarAngle;
	orbitControls.mouseButtons = {
		LEFT: THREE.MOUSE.ROTATE,
		MIDDLE: THREE.MOUSE.ROTATE,
		RIGHT: THREE.MOUSE.ROTATE,
	};
	orbitControls.touches = {
		ONE: THREE.TOUCH.ROTATE,
		TWO: THREE.TOUCH.ROTATE,
	};
	orbitControls.update();

	window.addEventListener("resize", onWindowResize);
	window.addEventListener("mousemove", onMouseMove);
}

function onMouseMove(e: MouseEvent) {
	const currentY = e.clientY;
	let mouseWasMovedUp = false;

	if (currentY < lastClientY) mouseWasMovedUp = true;

	if (mouseWasMovedUp) {
	} else {
	}

	lastClientY = e.clientY;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
	id = requestAnimationFrame(animate);
	render();
}

export function stopKey() {
	cancelAnimationFrame(id);
}

function render() {
	const time = i += cubeRotationSpeed;
  handleCubeRotation(time);
	// handleCubeBobbing(time);

	water.material.uniforms["time"].value += waterAnimationSpeed / 60.0;

	renderer.render(scene, camera);
}

function handleCubeBobbing(time: number) {
	if (mesh.position.y < cubeMaxHeight && cubeBobbingDirectionIsUp) mesh.position.y += cubeBobbingSpeed;
	else {
	}
}

function handleCubeRotation(time: number) {
	if (mesh.rotation.x < Math.PI * 2 && cubeCanRotateX) {
    mesh.rotation.x = time;
    clearTimeout(cubeTimeOutIdX);
    cubeTimeOutIdX = setTimeout(() => {
      cubeCanRotateY = true;
			cubeCanRotateX = false;
			cubeMaterial6.map = new THREE.TextureLoader().load(cubeMap6);
			i = 0;
    }, cubeRotationDirectionTransitionTime);
  }

  if (cubeCanRotateY && mesh.rotation.y > -(Math.PI * 2))  {
    mesh.rotation.y = -time;
    clearTimeout(cubeTimeOutIdY);
    cubeTimeOutIdY = setTimeout(() => {
			cubeCanRotateY = false;
      cubeCanReset = true;
    }, cubeRotationDirectionTransitionTime);
  }

  if (cubeCanReset) {
		cubeMaterial6.map = new THREE.TextureLoader().load(cubeMap6Rotated);
		mesh.rotation.x = 0;
    mesh.rotation.y = 0;
    cubeCanRotateY = false;
    cubeCanRotateX = true;
    cubeCanReset = false;
		i = 0;
  }
}
