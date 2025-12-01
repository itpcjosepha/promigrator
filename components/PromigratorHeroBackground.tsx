"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function PromigratorHeroBackground() {
  // React ref that points to the DOM element where our WebGL canvas will attach
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Grab the DOM node
    const container = containerRef.current;
    if (!container) return;

    // =====================================================================
    // === BASIC SETUP =====================================================
    // =====================================================================

    // Create the 3D scene
    const scene = new THREE.Scene();
    // Dark blue / indigo background
    scene.background = new THREE.Color(0x050816);

    // Create camera with perspective projection
    const camera = new THREE.PerspectiveCamera(
      55,                                        // field of view
      container.clientWidth / container.clientHeight, // aspect ratio
      0.1,                                       // near clipping plane
      100                                        // far clipping plane
    );
    // Position the camera slightly above and back
    camera.position.set(0, 1.5, 6);

    // Create renderer (the <canvas> inside container)
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // smooth edges
      alpha: true,     // allow transparency over page background
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement); // attach canvas to page

    // Orbit controls (even though pointer-events: none prevents mouse input,
    // these give smooth camera damping animation)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;   // smooth movement
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.7;
    controls.minDistance = 3;        // limits zoom distance
    controls.maxDistance = 10;
    controls.target.set(0, 0.5, 0);  // camera orbits around this point
    controls.update();

    // =====================================================================
    // === FLOOR ===========================================================
    // =====================================================================

    // Large reflective disc under everything
    const floorGeometry = new THREE.CircleGeometry(8, 64);
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x020617, // deep navy
      metalness: 0.6,  // metallic finish
      roughness: 0.35, // mid roughness for soft reflections
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // make circle horizontal
    floor.position.y = -1.25;        // slightly below scene center
    scene.add(floor);

    // =====================================================================
    // === GLASSY OUTER SPHERE =============================================
    // =====================================================================

    // Large transparent orb behind hero text
    const glassGeometry = new THREE.SphereGeometry(1.2, 64, 64);
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,     // blue tint
      metalness: 0.7,
      roughness: 0.12,
      transparent: true,
      opacity: 0.35,        // adjusts how much text shows through
    });
    const glassSphere = new THREE.Mesh(glassGeometry, glassMaterial);
    glassSphere.position.y = 0.5; // raise to mid-screen
    scene.add(glassSphere);

    // =====================================================================
    // === GLOWING INNER CORE ==============================================
    // =====================================================================

    // Very small glowing center point (radius is tiny: 0.05)
    const coreGeometry = new THREE.SphereGeometry(0.05, 48, 48);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x22c55e,        // green glow color
      emissive: 0x22c55e,     // self-illumination
      emissiveIntensity: .0,  // glow amount (0 = off)
      metalness: 0.2,
      roughness: 0.3,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.copy(glassSphere.position); // place inside the big sphere
    scene.add(core);

    // =====================================================================
    // === NEON RINGS (DISABLED) ===========================================
    // =====================================================================

    /* 
    // These created atomic-looking torus rings. You've disabled them.
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    const ringColors = [0x38bdf8, 0xa855f7, 0xf97316];

    ringColors.forEach((hex, index) => {
      const ringGeo = new THREE.TorusGeometry(1.7 + index * 0.25, 0.05, 32, 200);
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(hex),
        emissive: new THREE.Color(hex),
        emissiveIntensity: 2.3,
        metalness: 0.8,
        roughness: 0.15,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = (index * Math.PI) / 6 + 0.6;
      ring.rotation.y = (index * Math.PI) / 8;
      ring.position.y = glassSphere.position.y;
      ringGroup.add(ring);
    });
    */

    // =====================================================================
    // === FLOATING PARTICLES (CURRENTLY SQUARE POINTS) =====================
    // =====================================================================

    // 1. Create buffer geometry for ~400 floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 400;
    const positions = new Float32Array(particlesCount * 3); // x,y,z per particle

    // Fill position array with randomly distributed points
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 6 * Math.random() + 2;        // distance from center
      const angle = Math.random() * Math.PI * 2;   // 360° horizontal angle
      const y = (Math.random() - 0.5) * 4;         // vertical randomness

      positions[i] = Math.cos(angle) * radius;     // x
      positions[i + 1] = y;                        // y
      positions[i + 2] = Math.sin(angle) * radius; // z
    }

    // Feed positions into Three.js geometry
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

//     // 2. Material for the particles (currently squares)
// // === Particle material (soft glow, visually closer to circles) =======
// const particlesMaterial = new THREE.PointsMaterial({
//   size: 0.05,                  // a bit larger so the glow is visible
//   color: 0x60a5fa,             // same blue
//   transparent: true,
//   opacity: 0.55,               // softer so overlapping glows look nice
//   depthWrite: false,           // prevents particles from "cutting holes" in each other
//   blending: THREE.AdditiveBlending, // additive blending = glow-style
//   sizeAttenuation: true,       // smaller when farther away
// });


//     //2.1 Create Points object and add to scene
//     const particles = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particles);
// === Particle material using FileMaker logo sprite ===================

// Loader to fetch the logo texture from Next.js /public folder.
// Place the file at: public/filemaker-logo.png
const logoTexture = new THREE.TextureLoader().load("/claris_logo_white.png");

// PointsMaterial now uses the FileMaker logo as a sprite.
// Each particle will be a tiny logo billboarded to the camera.
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.07,             // visual size of each logo (tweak as needed)
  map: logoTexture,       // use the uploaded FileMaker logo as the sprite
  color: 0xffffff,        // tint color (white = original texture colors)
  transparent: true,      // allow alpha from the PNG
  opacity: 0.9,           // overall visibility
  alphaTest: 0.5,         // discard nearly-transparent pixels (helps remove box edges)
  depthWrite: false,      // keeps particles from punching holes in each other
  sizeAttenuation: true,  // makes them smaller when farther away
  // blending: THREE.AdditiveBlending, // enable this if you want glowier look
});

// Final particle system object
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

    // =====================================================================
    // === LIGHTS ==========================================================
    // =====================================================================

    // Key light (white directional)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(3, 5, 4);
    scene.add(mainLight);

    // Green-ish glowing light from left
    const fillLight = new THREE.PointLight(0x22c55e, 3.0, 12);
    fillLight.position.set(-2.5, 1.5, -1.5);
    scene.add(fillLight);

    // Blue-ish back light
    const rimLight = new THREE.PointLight(0x38bdf8, 2.5, 10);
    rimLight.position.set(2.5, 2.0, 2.5);
    scene.add(rimLight);

    // Global ambient light for softer shadows
    scene.add(new THREE.AmbientLight(0x404040, 0.7));

    // =====================================================================
    // === RESIZE HANDLER ==================================================
    // =====================================================================

    // Runs whenever browser window is resized
    const handleResize = () => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      // Update camera projection
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Update renderer size
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // =====================================================================
    // === ANIMATION LOOP ==================================================
    // =====================================================================

    const clock = new THREE.Clock(); // tracks elapsed time
    let frameId: number;

    const animate = () => {
      const t = clock.getElapsedTime(); // seconds since start

      // Rotate the outer glass sphere
      glassSphere.rotation.y = t * 0.15;

      // Spin and bob the core
      core.rotation.y = -t * 0.4;
      core.position.y = 0.5 + Math.sin(t * 1.5) * 0.08;

      // Rotate the particle swarm slowly
      particles.rotation.y += 0.0008;
      particles.rotation.x = Math.sin(t * 0.05) * 0.1;

      // Soft oscillation for lights
      fillLight.position.y = 1.5 + Math.sin(t * 1.2) * 0.3;
      rimLight.position.y = 2.0 + Math.cos(t * 0.9) * 0.25;

      // Smooth orbit controls update
      controls.update();

      // Render the scene
      renderer.render(scene, camera);

      // Request next frame
      frameId = requestAnimationFrame(animate);
    };

    animate(); // start animation loop

    // =====================================================================
    // === CLEANUP (IMPORTANT FOR NEXT.JS HOT RELOAD) ======================
    // =====================================================================
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);

      // Stop orbit controls
      controls.dispose();

      // Dispose all geometries/materials in scene to avoid memory leaks
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });

      // Dispose WebGL renderer
      renderer.dispose();

      // Remove canvas from DOM
      container.removeChild(renderer.domElement);
    };
  }, []);

  // =======================================================================
  // === JSX: the container the WebGL canvas attaches to ===================
  // =======================================================================
  return (
    <div
      ref={containerRef}               // this connects <div> to WebGL canvas
      className="pointer-events-none absolute inset-0" // covers entire hero section
    />
  );
}
