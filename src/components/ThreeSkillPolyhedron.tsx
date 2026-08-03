import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSkillPolyhedronProps {
  activeCategory?: string;
  className?: string;
}

export const ThreeSkillPolyhedron: React.FC<ThreeSkillPolyhedronProps> = ({
  activeCategory = 'All',
  className = 'w-full h-72',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Target Color mapping based on category
  const getColorHex = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'frontend':
      case 'ui/ux':
        return 0x38bdf8; // Sky blue
      case 'backend':
      case 'architecture':
        return 0xf59e0b; // Amber
      case 'ai/ml':
      case 'data science':
        return 0xa855f7; // Purple / Violet
      case 'cloud':
      case 'devops':
        return 0x10b981; // Emerald
      default:
        return 0xf59e0b; // Gold/Amber
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Group to hold polyhedrons
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Outer Polyhedron Wireframe (Icosahedron)
    const polyRadius = 1.8;
    const outerGeo = new THREE.IcosahedronGeometry(polyRadius, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: getColorHex(activeCategory),
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerMesh);

    // Inner Glowing Core (Octahedron)
    const innerGeo = new THREE.OctahedronGeometry(polyRadius * 0.55, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: getColorHex(activeCategory),
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // Orbiting Skill Ring 1
    const ring1Geo = new THREE.TorusGeometry(polyRadius * 1.35, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x64748b,
      transparent: true,
      opacity: 0.5,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 2.5;
    mainGroup.add(ring1Mesh);

    // Orbiting Skill Ring 2 (Perpendicular)
    const ring2Geo = new THREE.TorusGeometry(polyRadius * 1.5, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 3;
    mainGroup.add(ring2Mesh);

    // Orbiting Nodes (Skill Satellites)
    const nodeCount = 12;
    const nodeGroup = new THREE.Group();
    for (let i = 0; i < nodeCount; i++) {
      const nGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const nMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xf59e0b : 0x10b981,
        roughness: 0.3,
        metalness: 0.9,
      });
      const nMesh = new THREE.Mesh(nGeo, nMat);
      nodeGroup.add(nMesh);
    }
    mainGroup.add(nodeGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(getColorHex(activeCategory), 3, 20);
    pointLight1.position.set(3, 4, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2, 20);
    pointLight2.position.set(-3, -4, -2);
    scene.add(pointLight2);

    // Mouse Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 1.2;
      targetRotationX = y * 1.2;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damp rotation to mouse
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;

      // Polyhedron auto spinning
      outerMesh.rotation.y = elapsed * 0.25;
      outerMesh.rotation.x = elapsed * 0.15;

      innerMesh.rotation.y = -elapsed * 0.4;
      innerMesh.rotation.z = elapsed * 0.2;

      ring1Mesh.rotation.z = elapsed * 0.3;
      ring2Mesh.rotation.z = -elapsed * 0.25;

      // Satellite node orbits
      nodeGroup.children.forEach((child, i) => {
        const angle = elapsed * 0.5 + (i * Math.PI * 2) / nodeCount;
        const radius = polyRadius * 1.35;
        child.position.x = Math.cos(angle) * radius;
        child.position.z = Math.sin(angle) * radius;
        child.position.y = Math.sin(angle * 2) * 0.4;
      });

      // Pulse color light
      pointLight1.color.setHex(getColorHex(activeCategory));
      outerMat.color.setHex(getColorHex(activeCategory));

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
    };
  }, [activeCategory]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
    </div>
  );
};
