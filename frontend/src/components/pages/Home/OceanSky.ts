import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js';

// import { gui } from 'three/examples/jsm/libs/dat.gui.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

import waterNormals from '../../../imgs/waterNormals.jpg';
import bumpMap from '../../../imgs/bridge-background-2.jpg';
import cubeMap1 from '../../../imgs/bridge-background.jpg';
import cubeMap2 from '../../../imgs/bridge-section-1.jpg';
import cubeMap3 from '../../../imgs/bridge-section-2.jpg';
import cubeMap4 from '../../../imgs/bridge-section-3.jpg';
import cubeMap5 from '../../../imgs/bridge-section-4.jpg';
import cubeMap6 from '../../../imgs/bridge-section-5.jpg';
import cubeMap7 from '../../../imgs/bridge-section-6.jpg';
import cubeMap8 from '../../../imgs/resume-background-1.jpg';

let camera: any, scene: any, renderer: any;
let orbitControls, water: any, sun: any, mesh: any;

const sunColor = 0xaa9800;
const waterColor = 0x341e3f;
const spotLightStrengh = 1;
const cubeSize = 33;
const cubeAnimationSpeed = 0.00075;
const waterAnimationSpeed = .75;
const orbitControlsMaxPolarAngleFactor = 0.495;

init();
// animate();

function init() {
  //

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  document.body.appendChild( renderer.domElement );

  //

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 20000 );
  camera.position.set( 0, 0, 100 );


  //light
  var spotLight = new THREE.SpotLight(sunColor, spotLightStrengh);
  spotLight.position.set(0,100, 100);
  scene.add(spotLight);
  
  // Water

  const waterGeometry = new THREE.PlaneGeometry( 5000, 10000 );

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(waterNormals, function ( texture ) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      } ),
      sunDirection: new THREE.Vector3(),
      sunColor,
      waterColor,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add( water );

  // Skybox

  const sky = new Sky();
  sky.scale.setScalar( 500 );
  scene.add( sky );

  const skyUniforms = sky.material.uniforms;

  // skyUniforms[ 'turbidity' ].value = 10;
  // skyUniforms[ 'rayleigh' ].value = 2;
  // skyUniforms[ 'mieCoefficient' ].value = 0.005;
  // skyUniforms[ 'mieDirectionalG' ].value = 0.8;

  skyUniforms[ 'turbidity' ].value = 10;
  skyUniforms[ 'rayleigh' ].value = 5;
  skyUniforms[ 'mieCoefficient' ].value = 0.001;
  skyUniforms[ 'mieDirectionalG' ].value = 0.8;

  const parameters = {
    elevation: 4,
    azimuth: 180
  };

  if (document.body) document.body.lastElementChild?.classList.add('home__canvas');

  const pmremGenerator = new THREE.PMREMGenerator( renderer );

  sun = new THREE.Vector3();

  function updateSun() {

    const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    const theta = THREE.MathUtils.degToRad( parameters.azimuth );

    sun.setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    scene.environment = pmremGenerator.fromScene( sky as any ).texture;
  }

  updateSun();




  //
  const materials = [
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cubeMap1)
    }),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cubeMap2)
    }),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cubeMap3)
    }),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cubeMap4)
    }),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cubeMap5)
    }),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cubeMap6)
    }),
 ];

  const geometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize);
  const material = new THREE.MeshPhongMaterial({
    reflectivity: 0,
    refractionRatio: 0,
  });
  const bumpTexture = new THREE.TextureLoader().load(bumpMap)
  material.map = bumpTexture;

  mesh = new THREE.Mesh( geometry, materials );
  scene.add( mesh );

  //

  orbitControls = new OrbitControls( camera, renderer.domElement );
  orbitControls.target.set( 0, 10, 0 );
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
  }
  orbitControls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.ROTATE,  
  }
  orbitControls.update();



  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

export function animate() {

  requestAnimationFrame( animate );
  render();
  // stats.update();

}

function render() {

  const time = performance.now() * cubeAnimationSpeed;

  mesh.position.y = Math.sin( time ) * 25;
  mesh.rotation.x = time * 0.5;
  mesh.rotation.z = time * 0.5;

  water.material.uniforms[ 'time' ].value += waterAnimationSpeed / 60.0;

  renderer.render( scene, camera );

}