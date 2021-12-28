import "./style/main.css";
import * as THREE from "three";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

// Setup dimensions
// +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+-
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

// Construct Scene
// ======================================================================
const scene = new THREE.Scene();
RectAreaLightUniformsLib.init(); // Initialize rect light related constants
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 4.5);
scene.add(camera);

// Lights
// +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+-
const rectLight1 = new THREE.RectAreaLight(
  0xffdddd,
  20, // intensity
  1, // size x
  1 // size y
);
rectLight1.position.set(2, 2, 1);
rectLight1.lookAt(0, 0, 0);
scene.add(rectLight1);
const helper1 = new RectAreaLightHelper(rectLight1);
rectLight1.add(helper1);

// Geo
// +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+-
const geo = new THREE.BoxGeometry();
const mat = new THREE.MeshStandardMaterial();
const cube = new THREE.Mesh(geo, mat);
scene.add(cube);

// Setup render loop
// ======================================================================
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

const loop = () => {
  // Update
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render
  renderer.render(scene, camera);

  // Keep looping
  window.requestAnimationFrame(loop);
};
loop();
