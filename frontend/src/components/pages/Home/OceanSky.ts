import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module.js';

// import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

import waterNormals from '../../../imgs/waterNormals.jpg';

let camera: any, scene: any, renderer: any;
let controls, water: any, sun: any, mesh: any;

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

  //

  sun = new THREE.Vector3();

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
      sunColor: 0xaabb00,
      waterColor: 0x341e3f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add( water );

  // Skybox

  const sky = new Sky();
  sky.scale.setScalar( 10000 );
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
    elevation: 2,
    azimuth: 180
  };

  const pmremGenerator = new THREE.PMREMGenerator( renderer );

  function updateSun() {

    const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
    const theta = THREE.MathUtils.degToRad( parameters.azimuth );

    sun.setFromSphericalCoords( 1, phi, theta );

    sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
    water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

    // scene.environment = pmremGenerator.fromScene( sky as any ).texture;

  }

  updateSun();

  //

  const geometry = new THREE.BoxGeometry( 30, 30, 30 );
  const material = new THREE.MeshStandardMaterial( { roughness: 0 } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  //

  controls = new OrbitControls( camera, renderer.domElement );
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.target.set( 0, 10, 0 );
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;
  controls.update();



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

  const time = performance.now() * 0.001;

  mesh.position.y = Math.sin( time ) * 20 + 5;
  mesh.rotation.x = time * 0.5;
  mesh.rotation.z = time * 0.51;

  water.material.uniforms[ 'time' ].value += .75 / 60.0;

  renderer.render( scene, camera );

}