import * as THREE from 'three';
import * as lil from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Wireframe } from 'three/examples/jsm/Addons.js';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

scene.add(camera);

// loading textures means images
let loader = new THREE.TextureLoader();
// loading color texture means color image
let color = loader.load("./textures/color.jpg");
// loading roughness texture means roughness image
let roughness = loader.load("./textures/roughness.jpg");
// loading normal texture means normal image
let normal = loader.load("./textures/normal.png");
// loading height texture means height image
// let height = loader.load("./textures/height.png");  



// this is used for box geometry
// let box = new THREE.BoxGeometry(1, 1, 1);

// this is used for Sphere geometry
// let sphere = new THREE.SphereGeometry(1,10,10,2);
// let sphere = new THREE.CylinderGeometry(1, 1, 2, 10,10,true);
let sphere = new THREE.BoxGeometry(2,1,1,10,10);
// let material = new THREE.MeshBasicMaterial({color: "purple",side: THREE.DoubleSide});
let material = new THREE.MeshStandardMaterial({map:color,roughnessMap:roughness,normalMap:normal});
let Mesh = new THREE.Mesh(sphere, material);
scene.add(Mesh);

const canvas = document.querySelector('#draw');
let renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// // adding directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// adding ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// // adding point light
const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
pointLight.position.set(0, 0, 5);
scene.add(pointLight);

// adding a helper for the directional light
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2);
scene.add(directionalLightHelper);

// adding a helper for the point light
const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
scene.add(pointLightHelper);


window.addEventListener('resize',()=>{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix();
})


const guiv = new lil.GUI();


const materialfolder = guiv.addFolder("Material");
materialfolder.add(material,"roughness").min(0).max(1).step(0.01);
materialfolder.add(material,"metalness").min(0).max(1).step(0.01);
materialfolder.addColor(material,"color").onChange(()=>{
  console.log("color changed");
}); 
materialfolder.open();

const meshfolder = guiv.addFolder("Mesh");
meshfolder.add(Mesh.rotation,"x").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation X");
meshfolder.add(Mesh.rotation,"y").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Y");
meshfolder.add(Mesh.rotation,"z").min(-Math.PI).max(Math.PI).step(0.01).name("Rotation Z"); 

meshfolder.add(Mesh.position,"x").min(-3).max(3).step(0.01).name("Position X");
meshfolder.add(Mesh.position,"y").min(-3).max(3).step(0.01).name("Position Y");
meshfolder.add(Mesh.position,"z").min(-3).max(3).step(0.01).name("Position Z");

meshfolder.add(Mesh.scale,"x").min(0).max(3).step(0.01).name("Scale X");
meshfolder.add(Mesh.scale,"y").min(0).max(3).step(0.01).name("Scale Y");
meshfolder.add(Mesh.scale,"z").min(0).max(3).step(0.01).name("Scale Z");

meshfolder.open();

const lightfolder = guiv.addFolder("Light");
lightfolder.add(directionalLight,"intensity").min(0).max(10).step(0.01).name("Directional Light Intensity");
lightfolder.add(pointLight,"intensity").min(0).max(10).step(0.01).name("Point Light Intensity");
lightfolder.add(ambientLight,"intensity").min(0).max(10).step(0.01).name("Ambient Light Intensity");
// lightfolder.add(directionalLightHelper,"size").min(0).max(10).step(0.01).name("Directional Light Helper Size");
// lightfolder.add(pointLightHelper,"size").min(0).max(10).step(0.01).name("Point Light Helper Size");
lightfolder.open();

const controls = new OrbitControls( camera, renderer.domElement );

// this enable damping of the camera
// controls.enableDamping = true;
// this set the damping factor of the camera
// controls.dampingFactor = 0.01;

// this enable auto rotation of the camera
// controls.autoRotate = true;
// controls.autoRotateSpeed = 30;
// this disable zooming of the camera and enable only if true
controls.enableZoom = true;

let clock = new THREE.Clock();
function animate(){
    window.requestAnimationFrame(animate);
    // Mesh.rotation.x = clock.getElapsedTime();
    // Mesh.rotation.y = clock.getElapsedTime();
    controls.update();
    renderer.render(scene,camera);
}
animate();