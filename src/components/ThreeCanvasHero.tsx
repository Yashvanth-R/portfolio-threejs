import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeCanvasHeroProps {
  theme?: 'cyber' | 'emerald' | 'budapest' | 'obsidian';
}

export const ThreeCanvasHero: React.FC<ThreeCanvasHeroProps> = ({ theme = 'budapest' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    const idleHandle = window.requestIdleCallback?.(() => setIsReady(true)) ?? window.setTimeout(() => setIsReady(true), 140);
    return () => {
      if (typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle as number);
      } else {
        window.clearTimeout(idleHandle as number);
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const themeColors = {
      budapest: { primary: 0xd97706, secondary: 0x3b82f6, particles: 0xf59e0b, wireframe: 0x60a5fa },
      cyber: { primary: 0x06b6d4, secondary: 0x8b5cf6, particles: 0x22d3ee, wireframe: 0xa855f7 },
      emerald: { primary: 0x10b981, secondary: 0x065f46, particles: 0x34d399, wireframe: 0x059669 },
      obsidian: { primary: 0x94a3b8, secondary: 0x475569, particles: 0xc084fc, wireframe: 0x64748b },
    };

    const colors = themeColors[currentTheme] || themeColors.budapest;

    const mainGeo = new THREE.TorusKnotGeometry(4.2, 1.2, 128, 32);
    const mainMat = new THREE.MeshStandardMaterial({
      color: colors.primary,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: colors.primary,
      emissiveIntensity: 0.15,
    });
    const mainMesh = new THREE.Mesh(mainGeo, mainMat);
    scene.add(mainMesh);

    const outerGeo = new THREE.IcosahedronGeometry(7.5, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: colors.wireframe,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    const nodeGroup = new THREE.Group();
    const nodeCount = 14;
    const nodeMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const size = 0.2 + Math.random() * 0.4;
      const nodeGeo = new THREE.OctahedronGeometry(size, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? colors.primary : colors.secondary,
        roughness: 0.3,
        metalness: 0.9,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);

      const radius = 8.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      node.position.x = radius * Math.cos(theta) * Math.cos(phi);
      node.position.y = radius * Math.sin(phi);
      node.position.z = radius * Math.sin(theta) * Math.cos(phi);

      nodeGroup.add(node);
      nodeMeshes.push(node);
    }
    scene.add(nodeGroup);

    const particleCount = 160;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: colors.particles,
      size: 0.16,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(colors.primary, 3, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.secondary, 3, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainMesh.rotation.x = elapsedTime * 0.2 + targetY;
      mainMesh.rotation.y = elapsedTime * 0.3 + targetX;
      outerMesh.rotation.x = -elapsedTime * 0.15 - targetY * 0.5;
      outerMesh.rotation.y = -elapsedTime * 0.25 - targetX * 0.5;

      nodeGroup.rotation.y = elapsedTime * 0.1;
      nodeMeshes.forEach((node, idx) => {
        node.rotation.x += 0.01;
        node.rotation.y += 0.015;
        node.position.y += Math.sin(elapsedTime * 2 + idx) * 0.005;
      });

      particleSystem.rotation.y = elapsedTime * 0.03;
      camera.position.x = Math.sin(elapsedTime * 0.5) * 0.5 + targetX * 3;
      camera.position.y = Math.cos(elapsedTime * 0.5) * 0.5 - targetY * 3;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      mainGeo.dispose();
      mainMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [currentTheme, isReady]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full block opacity-75 dark:opacity-85" />
      <div className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" />
    </div>
  );
};
