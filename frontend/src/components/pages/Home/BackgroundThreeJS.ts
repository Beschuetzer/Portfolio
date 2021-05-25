// The CubeCamera object can also be used to create realistic refraction effects.


// The extra consideration when using the THREE.CubeCamera for refractions is,

// Set the CubeRenderTargets texture.mapping to THREE.CubeRefractionMapping
// Add the refractionRatio property to your Material

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import img from '../../../imgs/bridge-background-2.jpg';
// import Stats from 'three/examples/jsm/libs/stats.module'
// import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
let canvasClassname = '';

const scene: THREE.Scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000);

// const ambientLight = new THREE.AmbientLight(0x00406b);
// scene.add(ambientLight);

const light1 = new THREE.DirectionalLight();
light1.position.set(10, 5, 5)
light1.castShadow = false
light1.shadow.bias = -0.0002
light1.shadow.mapSize.height = 1024
light1.shadow.mapSize.width = 1024
light1.shadow.camera.left = -10
light1.shadow.camera.right = 10
light1.shadow.camera.top = 10
light1.shadow.camera.bottom = -10
scene.add(light1);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100)
camera.position.set(0, 8, 0)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
// document.querySelector(`.${canvasClassname}`)?.appendChild(renderer.domElement)
document.body.appendChild(renderer.domElement);

const orbitControls = new OrbitControls(camera, renderer.domElement)
orbitControls.dampingFactor = .1
orbitControls.enableDamping = true;
orbitControls.enableZoom = false;
orbitControls.enableKeys = false;
orbitControls.minAzimuthAngle = 0;
orbitControls.maxAzimuthAngle = 0;
orbitControls.minPolarAngle = 0;
orbitControls.maxPolarAngle = 0;
orbitControls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.ROTATE,
    RIGHT: THREE.MOUSE.ROTATE
}
orbitControls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.ROTATE,
}

const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(25, 25)
const texture = new THREE.TextureLoader().load(img)
const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ map: texture }))
plane.rotateX(-Math.PI / 2)
plane.receiveShadow = true
scene.add(plane)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const cubeRenderTarget2: THREE.WebGLCubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
const cubeRenderTarget3: THREE.WebGLCubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
const cubeCamera2: THREE.CubeCamera = new THREE.CubeCamera(.1, 1000, cubeRenderTarget2);
const cubeCamera3: THREE.CubeCamera = new THREE.CubeCamera(.1, 1000, cubeRenderTarget3);

const pivot2 = new THREE.Object3D();
scene.add(pivot2);
const pivot3 = new THREE.Object3D();
scene.add(pivot3);

const material2 = new THREE.MeshPhongMaterial({
    shininess: 100,
    color: 0xffffff,
    specular: 0xffffff,
    envMap: cubeRenderTarget2.texture,
    refractionRatio: .5,
    transparent: true,
    side: THREE.BackSide,
    combine: THREE.MixOperation
});
const material3 = new THREE.MeshPhongMaterial({
    shininess: 100,
    color: 0xffffff,
    specular: 0xffffff,
    envMap: cubeRenderTarget3.texture,
    refractionRatio: .5,
    transparent: true,
    side: THREE.BackSide,
    combine: THREE.MixOperation
});

cubeRenderTarget2.texture.mapping = THREE.CubeRefractionMapping
cubeRenderTarget3.texture.mapping = THREE.CubeRefractionMapping

const ball2 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material2);
ball2.position.set(.1, 1, 1);
ball2.castShadow = true;
ball2.receiveShadow = true;
ball2.add(cubeCamera2);
pivot2.add(ball2);

const ball3 = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material3);
ball3.position.set(7.2, 1.1, 0);
ball3.castShadow = true;
ball3.receiveShadow = true;
ball3.add(cubeCamera3);
pivot3.add(ball3);


// const gui = new GUI()
// const refractionFolder = gui.addFolder('Refraction')
// refractionFolder.add(data, 'refractionRatio', 0, 1, .01).onChange((v:number) => {
//     material1.refractionRatio = v
//     material2.refractionRatio = v
//     material3.refractionRatio = v
// })
// refractionFolder.open()

// const stats = Stats()
// document.body.appendChild(stats.dom)

const clock: THREE.Clock = new THREE.Clock()

if (document.body?.lastElementChild) document.body.lastElementChild.classList.add('home__canvas');

export const animate = function () {
    requestAnimationFrame(animate)

    const delta = clock.getDelta();
    ball2.rotateY(-1 * delta);
    pivot2.rotateY(0.3 * delta);
    ball3.rotateY(-0.4 * delta);
    pivot3.rotateY(0.4 * delta);

    // orbitControls.update()

    render()

    // stats.update()
};

function render() {
    ball2.visible = false
    cubeCamera2.update(renderer, scene);
    ball2.visible = true
    ball3.visible = false
    cubeCamera3.update(renderer, scene);
    ball3.visible = true

    renderer.render(scene, camera)
}
