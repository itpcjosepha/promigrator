import * as THREE from "three";

const container = document.getElementById("app") as HTMLDivElement;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050816);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 4);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 150, 20);
const material = new THREE.MeshStandardMaterial({
  color: 0x38bdf8,
  metalness: 0.6,
  roughness: 0.3,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Lights
const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(3, 4, 5);
scene.add(dirLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

// Resize
window.addEventListener("resize", () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Animation
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  mesh.rotation.x = t * 0.5;
  mesh.rotation.y = t * 0.8;

  renderer.render(scene, camera);
}

animate();
