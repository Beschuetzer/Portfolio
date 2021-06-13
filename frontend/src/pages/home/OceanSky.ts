import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import TTFLoader from 'three/examples/js/loaders/TTFLoader';
// import openType from "three/examples/js/libs/opentype.min"
// import Stats from "three/examples/jsm/libs/stats.module.js";
// import { gui } from 'three/examples/jsm/libs/dat.gui.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

import waterNormals from "../../imgs/waterNormals.jpg";
import bumpMap from "../../imgs/bridge-background-2.jpg";
import cubeMap5 from "../../imgs/cube-integrity.jpeg";
import cubeMap3 from "../../imgs/cube-hard-work.jpg";
import cubeMap6 from "../../imgs/cube-learning.jpg";
import cubeMap6Rotated from "../../imgs/cube-learning-rotated.jpg";
import cubeMap4 from "../../imgs/cube-communication.jpg";
import cubeMap1 from "../../imgs/cube-determination.jpg";
import cubeMap2 from "../../imgs/cube-passion.jpg";
import cloud from "../../imgs/cloud.png";
import uniqueFont from "../../fonts/poppins/Poppins_Regular.json";
import { Scene, TextBufferGeometry } from "three";

let camera: any, scene: any, renderer: any, lastClientY: number;
let orbitControls, water: any, sun: any, mesh: any;
let id: number;
let clouds: any[];
let texts: THREE.Mesh<TextBufferGeometry>[] = [];

let i = 0;
let cubeCanRotateY = false;
let cubeCanRotateX = true;
let cubeCanReset = false;
let cubeTimeOutIdX: any;
let cubeTimeOutIdY: any;

const cubeMaterial1 = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap1),
});
const cubeMaterial2 = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap2),
});
const cubeMaterial3 = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap3),
});
const cubeMaterial4 = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap4),
});
const cubeMaterial5 = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap5),
});
const cubeMaterial6 = new THREE.MeshPhongMaterial({
	map: new THREE.TextureLoader().load(cubeMap6Rotated),
});

const parameters = {
	elevation: 1,
	azimuth: 180,
};

const sunColor = new THREE.Color(0xf4d262);
const waterColor = new THREE.Color(0x8ac6d0);
const cloudTransparency = 0.55;
const skyTurbidity = 10; //(10)
const skyRayleigh = 5; //(2)
const skyMieCoefficient = 0.0025; //(.005)
const skyMieDirectionalG = 0.8; //(.8)

const spotLightStrength = 0.8;
const spotLightX = 0;
const spotLightY = 100;
const spotLightZ = 300;
const spotLightColor = sunColor;

const waterWidthSegments = 10000;
const waterHeightSegments = waterWidthSegments;
const waterAnimationSpeed = 0.75;

const orbitControlsMaxPolarAngleFactor = 0.495;

const cubeSize = 33;
const cubeRotationSpeed = 0.0066;
const cubeRotationDirectionTransitionTime = 250;
const cubeStartingHeight = 15;
const cubeMaxHeight = 17.5;
const cubeMinHeight = 12.5;
const cubeBobbingDirectionIsUp = true;
const cubeBobbingSpeed = Math.abs(cubeStartingHeight - cubeMaxHeight) / 90;

const cloudColor = new THREE.Color(0xff9999);
const cloudWidthSegments = 5000;
const cloudXRotationStart = 1.16;
const cloudYRotationStart = 0.12;
const cloudZRotationStart = Math.random() * 2 * Math.PI;
const cloudXPositionMax = 800;
const cloudXPositionMin = 400;
const cloudYPosition = 1300;
const cloudZPositionMax = 500;
const cloudZPositionMin = 500;
const cloudZRotationRateChange = 0.0005;
const cloudZPositionRateChange = 0.9;

interface TextData {
	text: string,
	x: number,
	y: number,
	z: number,
	xRotation: number,
	yRotation: number,
	zRotation: number,
	color: THREE.Color,
	size: number,
	height: number,
}

const textScrollSpeed = .1;
const defaultTextX = 0;
const defaultTextY = -0.2;
const defaultTextYRotation = 0;
const defaultTextZRotation = 0;
const defaultTextSize = 5;
const defaultTextHeight = .5;
const defaultTextColor = new THREE.Color(waterColor);
let textData: TextData[] = [
	{
		text: "Welcome",
		x: defaultTextX,
		y: defaultTextY,
		z: 50,
		xRotation: -Math.PI / 2,
		yRotation: defaultTextYRotation,
		zRotation: defaultTextZRotation,
		color: defaultTextColor,
		size: defaultTextSize,
		height: defaultTextHeight,
	},
	{
		text: "to my",
		x: defaultTextX,
		y: defaultTextY,
		z: 66,
		xRotation: -Math.PI / 2,
		yRotation: defaultTextYRotation,
		zRotation: defaultTextZRotation,
		color: defaultTextColor,
		size: defaultTextSize,
		height: defaultTextHeight,
	},
	{
		text: "Porfolio",
		x: defaultTextX,
		y: defaultTextY,
		z:80,
		xRotation: -Math.PI / 2,
		yRotation: defaultTextYRotation,
		zRotation: defaultTextZRotation,
		color: defaultTextColor,
		size: defaultTextSize,
		height: defaultTextHeight,
	},
]

function getCloudXPosition() {
	return Math.random() * cloudXPositionMax - cloudXPositionMin;
}
function getCloudYPosition() {
	return cloudYPosition;
}
function getCloudZPosition() {
	return Math.random() * cloudZPositionMax - cloudZPositionMin;
}

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
	var spotLight = new THREE.SpotLight(spotLightColor, spotLightStrength);
	spotLight.position.set(spotLightX, spotLightY, spotLightZ);
	scene.add(spotLight);

	// Water

	const waterGeometry = new THREE.PlaneGeometry(
		waterWidthSegments,
		waterHeightSegments,
	);

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
		waterColor: waterColor,
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

	const materials = [
		cubeMaterial1,
		cubeMaterial2,
		cubeMaterial3,
		cubeMaterial4,
		cubeMaterial5,
		cubeMaterial6,
	];

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

	clouds = addCloud();

	loadTexts(textData, scene);
	//

	orbitControls = new OrbitControls(camera, renderer.domElement);
	orbitControls.target.set(0, 15, 0);
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

function handleCubeBobbing(time: number) {
	if (mesh.position.y < cubeMaxHeight && cubeBobbingDirectionIsUp)
		mesh.position.y += cubeBobbingSpeed;
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

	if (cubeCanRotateY && mesh.rotation.y > -(Math.PI * 2)) {
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

function addCloud() {
	let clouds: any[] = [];
	let cloudLoader = new THREE.TextureLoader();
	cloudLoader.load(cloud, function (texture) {
		const cloudGeo = new THREE.PlaneGeometry(
			cloudWidthSegments,
			cloudWidthSegments,
		);
		const cloudMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			transparent: true,
			color: cloudColor,
		});

		for (let p = 0; p < 50; p++) {
			let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
			cloud.position.set(
				getCloudXPosition(),
				getCloudYPosition(),
				getCloudZPosition(),
			);
			cloud.rotation.x = cloudXRotationStart;
			cloud.rotation.y = cloudYRotationStart;
			cloud.rotation.z = cloudZRotationStart;
			cloud.material.opacity = cloudTransparency;
			scene.add(cloud);
			clouds.push(cloud);
		}
	});
	return clouds;
}

function addTextGeometry(
	scene: Scene,
	text: string,
	x: number,
	y: number,
	z: number,
	xRotation = 0,
	yRotation = 0,
	zRotation = 0,
	color = new THREE.Color(0xffffff),
	size = 10,
	height = 5,
) {
	const textLoader = new THREE.FontLoader();
	const font = textLoader.parse(uniqueFont);
	const geo = new THREE.TextGeometry(text, {
		font: font,
		size: size,
		height: height,
		curveSegments: 4,
		bevelEnabled: true,
		bevelThickness: 0.15,
		bevelSize: 0.3,
		bevelSegments: 5,
	});
	geo.center();

	const mesh = new THREE.Mesh(
		geo,
		new THREE.MeshBasicMaterial({
			color,
		}),
	);
	mesh.position.set(x, y, z);
	mesh.rotation.set(xRotation, yRotation, zRotation);
	scene.add(mesh);
	return mesh;
}

function loadTexts(textData: TextData[], scene: Scene) {
	for (let i = 0; i < textData.length; i++) {
		const textObj = textData[i];
		texts.push(addTextGeometry(
			scene,
			textObj.text,
			textObj.x,
			textObj.y,
			textObj.z,
			textObj.xRotation ? textObj.xRotation : undefined,
			textObj.yRotation ? textObj.yRotation : undefined,
			textObj.zRotation ? textObj.zRotation : undefined,
			textObj.color ? textObj.color : undefined,
			textObj.size ? textObj.size : undefined,
			textObj.height ? textObj.height : undefined,
		));
	}
}

function render() {
	const time = (i += cubeRotationSpeed);
	handleCubeRotation(time);
	// handleCubeBobbing(time);
	if (clouds)
		clouds.forEach((cloud) => {
			cloud.rotation.z += cloudZRotationRateChange;
			cloud.position.z -= cloudZPositionRateChange;
		});

	if (texts) {
		texts.forEach(text => {
			text.position.z -= textScrollSpeed;
		})
	}

	water.material.uniforms["time"].value += waterAnimationSpeed / 60.0;

	renderer.render(scene, camera);
}