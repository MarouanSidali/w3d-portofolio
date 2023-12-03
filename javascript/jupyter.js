import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



const spaceTexturePath = './texture/space.jpg';
const modelPath = './models/jupyter3.glb';

const scene = new THREE.Scene();



// Set up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;


// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Load space texture for the environment
const spaceTexture = new THREE.TextureLoader().load(spaceTexturePath); // Replace with the correct path

// Configure texture wrapping
spaceTexture.wrapS = THREE.RepeatWrapping;
spaceTexture.wrapT = THREE.RepeatWrapping;
spaceTexture.repeat.set(2, 1);

// Create a sphere geometry with the space texture
const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
const sphereMaterial = new THREE.MeshBasicMaterial({ map: spaceTexture, side: THREE.BackSide }); // Use MeshBasicMaterial
const spaceSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(spaceSphere);

// Load the Blender model
const loader = new GLTFLoader();
loader.load(modelPath, (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Get the animations from the loaded model
    const animations = gltf.animations;

    // If there are animations, set up controls
    if (animations && animations.length > 0) {
        const mixer = new THREE.AnimationMixer(model);
        const action = mixer.clipAction(animations[0]); // You can change the index to play a different animation

        // Optionally, set the animation to loop
        action.loop = THREE.LoopRepeat;

        // Start playing the animation
        action.play();

        // Update the mixer in the animate function
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            mixer.update(0.01); // You can adjust the time delta here
            renderer.render(scene, camera);
        };

        animate();
    } else {
        // If there are no animations, just render the scene without animation
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();
    }
});
