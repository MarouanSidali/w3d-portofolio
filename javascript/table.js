import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 25;
camera.position.y = 10;
camera.position.x = -10;

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xd0e4fe); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the controls
const controls = new OrbitControls(camera, renderer.domElement);

// Set up the lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

// Load the Blender model
const loader = new GLTFLoader();
loader.load('./models/table.glb', (gltf) => {
    scene.add(gltf.scene);

    // Add any animations or additional setup here

    // Animate the scene
    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };

    animate();
});
