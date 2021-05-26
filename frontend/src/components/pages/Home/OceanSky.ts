import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";

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

let camera: any, scene: any, renderer: any, lastClientY: number;
let orbitControls, water: any, sun: any, mesh: any;
let id: number;

const sunColor = 0xaa9800;
const waterColor = 0x341e1f;
const spotLightStrengh = 1;
const cubeSize = 33;
const cubeAnimationSpeed = 0.00075;
const waterAnimationSpeed = 0.75;
const orbitControlsMaxPolarAngleFactor = 0.495;
const cubeRotationSpeed = .5;
const cubeXStopPoint = 6.2;

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
	var spotLight = new THREE.SpotLight(sunColor, spotLightStrengh);
	spotLight.position.set(0, 100, 100);
	scene.add(spotLight);

	// Water

	const waterGeometry = new THREE.PlaneGeometry(5000, 10000);

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

	// skyUniforms[ 'turbidity' ].value = 10;
	// skyUniforms[ 'rayleigh' ].value = 2;
	// skyUniforms[ 'mieCoefficient' ].value = 0.005;
	// skyUniforms[ 'mieDirectionalG' ].value = 0.8;

	skyUniforms["turbidity"].value = 10;
	skyUniforms["rayleigh"].value = 5;
	skyUniforms["mieCoefficient"].value = 0.001;
	skyUniforms["mieDirectionalG"].value = 0.8;

	const parameters = {
		elevation: .5,
		azimuth: 180,
	};

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
	const materials = [
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(cubeMap1),
		}),
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(cubeMap2),
		}),
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(cubeMap3),
		}),
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(cubeMap4),
		}),
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(cubeMap5),
		}),
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load(cubeMap6),
		}),
	];

	const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
	const material = new THREE.MeshPhongMaterial({
		reflectivity: 0,
		refractionRatio: 0,
	});
	const bumpTexture = new THREE.TextureLoader().load(bumpMap);
	material.map = bumpTexture;

	mesh = new THREE.Mesh(geometry, materials);
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

let canRotateY = false;
let canRotateX = true;
let canReset = false;
let timeOutIdX: any;
let timeOutIdY: any;
let i = 0;

function render() {
	const time = i += .0066;
  if (mesh.rotation.x <= cubeXStopPoint && canRotateX) {
    mesh.rotation.x = time;
    console.log('x------------------------------------------------');
    clearTimeout(timeOutIdX);
    timeOutIdX = setTimeout(() => {
      canRotateY = true;
    }, 250);
  }

  if (canRotateY && mesh.rotation.y <= 1.5 * cubeXStopPoint)  {
    mesh.rotation.y = time * cubeRotationSpeed;
    console.log('y------------------------------------------------');
    clearTimeout(timeOutIdY);
    timeOutIdY = setTimeout(() => {
      canReset = true;
    }, 250);
  }

  if (canReset) {
    console.log('resetting------------------------------------------------');
    canRotateY = false;
    canRotateX = true;
    mesh.rotation.x = 0;
    mesh.rotation.y = 0;
    canReset = false;
    performance.clearMarks();
    performance.clearMeasures();
    performance.clearResourceTimings();
  }

	water.material.uniforms["time"].value += waterAnimationSpeed / 60.0;

	renderer.render(scene, camera);
}
