import * as THREE from "three";
// import TTFLoader from 'three/examples/js/loaders/TTFLoader';
// import openType from "three/examples/js/libs/opentype.min"
// import Stats from "three/examples/jsm/libs/stats.module.js";
// import { gui } from 'three/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
import cubeMap2 from "../../imgs/cube-driven.png";
import cloud from "../../imgs/cloud.png";
import introFont from "../../fonts/star-wars/star-jedi-rounded_Regular.json";
import {
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	TextBufferGeometry,
} from "three";
import { getLinearPercentOfMaxMatchWithinRange } from "../../helpers";
import { isContinueStatement } from "typescript";

//#region Variable Inits
let camera: PerspectiveCamera,
	orbitControls: OrbitControls,
	scene: THREE.Scene,
	renderer: THREE.WebGLRenderer,
	lastClientY: number;
let water: Water, sun: any, cube: Mesh, sky: Sky;
let id: number;
let clouds: any[];
let texts: THREE.Mesh<TextBufferGeometry>[] = [];

let startTime = Date.now();
let i = 0;
let cubeCanRotateY = false;
let cubeCanRotateX = true;
let cubeCanReset = false;
let cubeTimeOutIdX: any;
let cubeTimeOutIdY: any;
//#endregion

//#region cube stuff
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

const cubeSize = 33;
const cubeRotationSpeed = 0.0066;
const cubeRotationDirectionTransitionTime = 250;
const cubeStartHeight = -25;
const cubeMaxHeight = 17.5;
const cubeMinHeight = 12.5;
const cubeBobbingDirectionIsUp = true;
const cubeBobbingSpeed = Math.abs(cubeStartHeight - cubeMaxHeight) / 90;
const cubeEndHeight = 15;
//#endregion

//#region Sun, Water, Cloud
const parameters = {
	elevation: 1,
	azimuth: 180,
};

const sunColor = new THREE.Color(0xf4d262);
const waterColor = new THREE.Color(0x28537b);
const cloudTransparency = 0.55;
const skyTurbidity = 10; //(10)
const skyRayleigh = 5; //(2)
const skyMieCoefficient = 0.0025; //(.005)
const skyMieDirectionalG = 0.8; //(.8)

const waterWidthSegments = 10000;
const waterHeightSegments = waterWidthSegments;
const waterAnimationSpeed = .75;

const cloudZRotationRateChange = 0.0001;
const cloudZPositionRateChange = 0.5;
const cloudColor = new THREE.Color(0xff9999);
const cloudWidthSegments = 5000;
const cloudXRotationStart = 1.16;
const cloudYRotationStart = 0.12;
const cloudZRotationStart = Math.random() * 2 * Math.PI;
const cloudXPositionMax = 800;
const cloudXPositionMin = 400;
const cloudYPosition = 1300;
const cloudSpan = 500;
//#endregion

//#region Lighting
const spotLightStrength = 0.8;
const spotLightX = 0;
const spotLightY = 100;
const spotLightZ = 300;
const spotLightColor = sunColor;
//#endregion

//#region Text stuff
interface TextData {
	text: string;
	x: number;
	y: number;
	z: number;
	xRotation: number;
	yRotation: number;
	zRotation: number;
	color: THREE.Color;
	size: number;
	height: number;
}

const originalAspectRatio = window.innerWidth / window.innerHeight;
const isMobile = window.innerWidth < 1250;
const textMinXRotation = -Math.PI / 2 - 0.25;
const textScrollSpeed = 0.25;
const defaultTextX = 0;
const defaultTextY = -0.2;
const defaultTextYRotation = 0;
const defaultTextZRotation = 0;

const textSizeScaleFactor = getLinearPercentOfMaxMatchWithinRange(
	window.innerWidth,
	800,
	1600,
	0.0066,
	0.0038,
);
// const textSizeScaleFactor = isMobile ? .0066 : 0.0036;
const defaultTextSize = window.innerWidth * textSizeScaleFactor;
const defaultTextHeight = 1;
const defaultTextColor = new THREE.Color(0xf4d262);
const lineSpacing = defaultTextSize * 3;
const lineStart = 172;

const textsToUse = [
	{
		text: "Welcome!  My name is",
		spaceBefore: false,
	},
	{
		text: "Adam, and this is",
		spaceBefore: false,
	},
	{
		text: "my portfolio.",
		spaceBefore: false,
	},
	{
		text: "i build apps",
		spaceBefore: true,
	},
	{
		text: "to solve problems.",
		spaceBefore: false,
	},
	// {
	// 	text: "i recently changed my",
	// 	spaceBefore: true,
	// },
	// {
	// 	text: "life by deciding to",
	// 	spaceBefore: false,
	// },
	// {
	// 	text: "become a web developer.",
	// 	spaceBefore: false,
	// },
	// {
	// 	text: "i am excited",
	// 	spaceBefore: true,
	// },
	// {
	// 	text: "to show you what",
	// 	spaceBefore: false,
	// },
	// {
	// 	text: "i have built",
	// 	spaceBefore: false,
	// },
	{
		text: "This site highlights some of",
		spaceBefore: true,
	},
	{
		text: "the problems i have solved",
		spaceBefore: false,
	},
	{
		text: "using my web dev skills.",
		spaceBefore: false,
	},
	// {
	// 	text: "Everything on this site",
	// 	spaceBefore: true,
	// },
	// {
	// 	text: "was built using 'hand-made'",
	// 	spaceBefore: false,
	// },
	// {
	// 	text: "components and SASS/CSS",
	// 	spaceBefore: false,
	// },
	{
		text: "i Look forward to",
		spaceBefore: true,
	},
	{
		text: "hearing what you think!",
		spaceBefore: false,
	},

	// {
	// 	text: "React, Redux, custom SASS/CSS,",
	// spaceBefore: true,

	// },
	// {
	// 	text: "Express, and ThreeJS",
	// spaceBefore: false,
	// },
];

let textData: TextData[] = generateTextList(textsToUse);

const linesOfText = textsToUse.reduce((previous, current) => {
	let additional = 1;
	if (current.spaceBefore) additional = 2;
	return previous + additional;
}, 0);
//#endregion

//#region Camera and Animation stuff
const animationFPS = 120.0;
export let timeElapsedInMS = 0;
export const introPanDuration = 5000;
// const lineScrollDuration = 800;
const lineScrollDuration = 0;
export const introPanDurationMobile = linesOfText * lineScrollDuration;
;
export const introPanStartWait = isMobile
	? introPanDurationMobile
	: introPanDurationMobile + 5000;
export const cubeRaiseDuration = introPanDuration / 2;
export const cubeRaiseStartTime = introPanStartWait + introPanDuration / 2;

const cameraFinalFOV = 55;
const cameraPositionXStart = 0;
const cameraPositionYStart = 150;
const cameraPositionZStart = 100;
const cameraPositionYEnd = 15;

const cameraLookAtXStart = 0;
const cameraLookAtYStart = 0;
const cameraLookAtZStart = cameraPositionZStart;
const cameraLookAtZEnd = -waterWidthSegments / 20;
let currentCameraZLookAt = cameraLookAtZStart;

const cameraPositionYFactor = getFromStartToFinishUsingFunction(
	introPanDuration,
	cameraPositionYStart,
	cameraPositionYEnd,
	animationFPS,
	"exponential",
);
const cameraLookAtZFactor = getFromStartToFinishUsingFunction(
	introPanDuration * 2,
	cameraLookAtZStart,
	cameraLookAtZEnd,
	animationFPS,
	"linear",
);
console.log("cameraLookAtZFactor =", cameraLookAtZFactor);
const cubeHeightAdditiveIncrement = getFromStartToFinishUsingFunction(
	cubeRaiseDuration,
	cubeStartHeight,
	cubeEndHeight,
	animationFPS,
	"linear",
);
const opacityChangeRate = getFromStartToFinishUsingFunction(
	introPanDuration * 3,
	1,
	0.000001,
	animationFPS,
	"exponential",
);

//#endregion

//#region Helper Functions
function generateTextList(
	texts: { text: string; spaceBefore: boolean }[],
): TextData[] {
	let result: TextData[] = [];
	let lineCount = 0;
	for (let i = 0; i < texts.length; i++) {
		const text = texts[i];

		if (texts && text.spaceBefore) {
			lineCount++;
		}

		result.push({
			text: text.text,
			x: defaultTextX,
			y: defaultTextY,
			z: lineStart + lineSpacing * ++lineCount,
			xRotation: -Math.PI / 2,
			yRotation: defaultTextYRotation,
			zRotation: defaultTextZRotation,
			color: defaultTextColor,
			size: defaultTextSize,
			height: defaultTextHeight,
		});
	}

	return result;
}

function getCloudXPosition() {
	return Math.random() * cloudXPositionMax - cloudXPositionMin;
}

function getCloudYPosition() {
	return cloudYPosition;
}

function getCloudZPosition() {
	const secondsToGetToCameraFinalPosition =
		(introPanDuration + introPanStartWait) / 1000;
	const numberOfFramesIntroTakes =
		animationFPS * secondsToGetToCameraFinalPosition;
	const distanceCloudMovesDuringIntro =
		cloudZPositionRateChange * numberOfFramesIntroTakes;
	return (
		Math.random() * cloudSpan - cloudSpan + distanceCloudMovesDuringIntro * 0.75
	);
}

function updateSun(phi: number, theta: number) {
	const pmremGenerator = new THREE.PMREMGenerator(renderer);

	sun.setFromSphericalCoords(10, phi, theta);

	sky.material.uniforms["sunPosition"].value.copy(sun);
	(water.material as any).uniforms["sunDirection"].value.copy(sun).normalize();

	scene.environment = pmremGenerator.fromScene(sky as any).texture;
}

export function animate() {
	id = requestAnimationFrame(animate);
	render();
}

export function stopKey() {
	cancelAnimationFrame(id);
}

function handleCubeBobbing(time: number) {
	if (cube.position.y < cubeMaxHeight && cubeBobbingDirectionIsUp)
		cube.position.y += cubeBobbingSpeed;
	else {
	}
}

function handleCubeRotation(time: number) {
	if (cube.rotation.x < Math.PI * 2 && cubeCanRotateX) {
		cube.rotation.x = time;
		clearTimeout(cubeTimeOutIdX);
		cubeTimeOutIdX = setTimeout(() => {
			cubeCanRotateY = true;
			cubeCanRotateX = false;
			cubeMaterial6.map = new THREE.TextureLoader().load(cubeMap6);
			i = 0;
		}, cubeRotationDirectionTransitionTime);
	}

	if (cubeCanRotateY && cube.rotation.y > -(Math.PI * 2)) {
		cube.rotation.y = -time;
		clearTimeout(cubeTimeOutIdY);
		cubeTimeOutIdY = setTimeout(() => {
			cubeCanRotateY = false;
			cubeCanReset = true;
		}, cubeRotationDirectionTransitionTime);
	}

	if (cubeCanReset) {
		cubeMaterial6.map = new THREE.TextureLoader().load(cubeMap6Rotated);
		cube.rotation.x = 0;
		cube.rotation.y = 0;
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
	const font = textLoader.parse(introFont);
	const geo = new THREE.TextGeometry(text, {
		font: font,
		size: size,
		height: height,
		// curveSegments: 4,
		// bevelEnabled: true,
		// bevelThickness: 0.15,
		// bevelSize: 0.3,
		// bevelSegments: 5,
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
		texts.push(
			addTextGeometry(
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
			),
		);
	}
}

function adjustTextSizes() {
	if (texts) {
		const newSize = window.innerWidth * textSizeScaleFactor;
		// const currentAspectRation = window.innerWidth / window.innerHeight;

		// const ratioDifferenceFactor = currentAspectRation / originalAspectRatio;

		for (let i = 0; i < texts.length; i++) {
			const text = texts[i];
			const currentTextData = textData[i];
			if (!text || !currentTextData) continue;
			const meshToPush = addTextGeometry(
				scene,
				currentTextData.text,
				text.position.x,
				text.position.y,
				text.position.z,
				currentTextData.xRotation,
				currentTextData.yRotation,
				currentTextData.zRotation,
				currentTextData.color,
				newSize,
				currentTextData.height,
			);

			texts.push(meshToPush);

			let textToRemove = texts.slice(i, 1)[0];
			scene.remove(textToRemove);
		}

		for (let i = 0; i < textData.length; i++) {
			const removed = texts.splice(0, 1)[0];
			removed.geometry.dispose();
			//@ts-ignore
			removed.material.dispose();
			scene.remove(removed);
		}
	}
}

function getFromStartToFinishUsingFunction(
	durationInMS: number,
	start: number,
	end: number,
	fps: number,
	functionToUse: "linear" | "exponential",
) {
	//todo: return a number that when you multiply start with it frame times (durationInSeconds * fps) you get end
	let result = null;
	if (start > end && end === 0)
		throw new Error(
			"End must be a number other than 0 when start is greater than end",
		);
	if (start === 0 && end > start)
		throw new Error(
			"Start must be a number other than 0 when end is greater than start",
		);
	if (functionToUse === "linear") {
		result = getLinearStartToFinish(durationInMS, start, end, fps);
	} else if (functionToUse === "exponential") {
		if ((start > 0 && end < 0) || (start < 0 && end > 0))
			throw new Error(
				"Start and end numbers must be either both positive or both negative when using exponential.",
			);
		result = getExponentialStartToFinish(durationInMS, start, end, fps);
	}
	return result;
}

function getLinearStartToFinish(
	durationInMS: number,
	start: number,
	end: number,
	fps: number,
) {
	//TODO: return a number that when added to start and then the result repeatedly yields end in frame steps/intervals...
	const frames = (fps * durationInMS) / 1000;
	return (end - start) / frames;
}

function getExponentialStartToFinish(
	durationInMS: number,
	start: number,
	end: number,
	fps: number,
) {
	//TODO: return a number that when multiplied by start and then the result repeatedly yields end in frame steps/intervals...
	const frames = (fps * durationInMS) / 1000;
	return Math.pow(end / start, 1 / frames);
}
//#endregion

//#region Listeners
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
	adjustTextSizes();
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}
//#endregion

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
		60,
		window.innerWidth / window.innerHeight,
		1,
		20000,
	);

	camera.position.set(
		cameraPositionXStart,
		cameraPositionYStart,
		cameraPositionZStart,
	);
	camera.lookAt(cameraLookAtXStart, cameraLookAtYStart, cameraLookAtZStart);

	//#region Orbit Controls
	// orbitControls = new OrbitControls(camera, renderer.domElement);
	// orbitControls.update();
	//#endregion

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
	sky = new Sky();
	sky.scale.setScalar(5000);
	scene.add(sky);

	const skyUniforms = sky.material.uniforms;

	skyUniforms["turbidity"].value = skyTurbidity;
	skyUniforms["rayleigh"].value = skyRayleigh;
	skyUniforms["mieCoefficient"].value = skyMieCoefficient;
	skyUniforms["mieDirectionalG"].value = skyMieDirectionalG;

	if (document.body)
		document.body.lastElementChild?.classList.add("home__canvas");

	sun = new THREE.Vector3();
	const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
	const theta = THREE.MathUtils.degToRad(parameters.azimuth);

	updateSun(phi, theta);
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

	cube = new THREE.Mesh(geometry, materials);
	cube.position.y = cubeStartHeight;
	scene.add(cube);

	clouds = addCloud();

	loadTexts(textData, scene);
	//

	window.addEventListener("resize", onWindowResize);
	window.addEventListener("mousemove", onMouseMove);
}

function render() {
	const currentTime = Date.now();
	timeElapsedInMS = currentTime - startTime;

	// handleCubeBobbing(time);
	if (clouds)
		clouds.forEach((cloud) => {
			cloud.rotation.z += cloudZRotationRateChange;
			cloud.position.z -= cloudZPositionRateChange;
		});

	if (texts) {
		for (let i = 0; i < texts.length; i++) {
			const text = texts[i];
			if (!text) continue;
			const currentOpacity = (text.material as any).opacity;
			if (currentOpacity > 0) {
				if (timeElapsedInMS >= introPanStartWait) {
					text.material = new MeshBasicMaterial({
						transparent: true,
						opacity: currentOpacity * (opacityChangeRate as number),
						color: defaultTextColor,
					});
					// if (text.rotation.x >= textMinXRotation) text.rotation.x -= textScrollSpeed / 50;
				}
				text.position.z -= textScrollSpeed;
			}
		}
	}

	if (camera) {
		if (timeElapsedInMS >= introPanStartWait) {
			const currentYPosition = camera.position.y;
			if (currentYPosition >= cameraPositionYEnd) {
				camera.position.set(
					cameraPositionXStart,
					currentYPosition * (cameraPositionYFactor as number),
					cameraPositionZStart,
				);
			}

			if (currentCameraZLookAt >= cameraLookAtZEnd) {
				currentCameraZLookAt += cameraLookAtZFactor as any;
				camera.lookAt(
					cameraLookAtXStart,
					cameraLookAtYStart,
					currentCameraZLookAt,
				);
			}
		}
	}

	if (cube) {
		if (timeElapsedInMS >= cubeRaiseStartTime) {
			const currentYPosition = cube.position.y;
			if (currentYPosition <= cubeEndHeight) {
				cube.position.y += cubeHeightAdditiveIncrement as number;
			}

			if (currentYPosition >= cubeEndHeight) {
				const cubeRotationCounter = (i += cubeRotationSpeed);
				handleCubeRotation(cubeRotationCounter);
			}
		}
	}

	if (water)
		(water.material as any).uniforms["time"].value +=
			waterAnimationSpeed / animationFPS;

	renderer.render(scene, camera);
}

export function resetAnimations() {
	timeElapsedInMS = 0;
	camera.position.set(
		cameraPositionXStart,
		cameraPositionYStart,
		cameraPositionZStart,
	);
	camera.lookAt(cameraLookAtXStart, cameraLookAtYStart, cameraLookAtZStart);
}
