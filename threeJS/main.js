import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Wireframe } from 'three/examples/jsm/Addons.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

scene.add(camera);
// this is used for box geometry
// let box = new THREE.BoxGeometry(1, 1, 1);

// this is used for Sphere geometry
let sphere = new THREE.SphereGeometry(1, 10, 10);
let material = new THREE.MeshBasicMaterial({color: "purple",wireframe:true});
let Mesh = new THREE.Mesh(sphere, material);
scene.add(Mesh);

let renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#draw')});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);



window.addEventListener('resize',()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix();
})

const controls = new OrbitControls( camera, renderer.domElement );

// this enable damping of the camera
controls.enableDamping = true;
// this set the damping factor of the camera
controls.dampingFactor = 0.01;

// this enable auto rotation of the camera
controls.autoRotate = true;
// controls.autoRotateSpeed = 30;
// this disable zooming of the camera and enable only if true
controls.enableZoom = false;

let clock = new THREE.Clock();
function animate(){
    window.requestAnimationFrame(animate);
    // Mesh.rotation.x = clock.getElapsedTime();
    // Mesh.rotation.y = clock.getElapsedTime();
    controls.update();
    renderer.render(scene,camera);
}
animate();