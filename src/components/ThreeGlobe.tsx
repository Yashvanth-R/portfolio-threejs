import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeGlobeProps {
  className?: string;
}

export const ThreeGlobe: React.FC<ThreeGlobeProps> = ({ className = 'w-full h-64' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Wireframe Globe
    const globeRadius = 2.4;
    const globeGeo = new THREE.SphereGeometry(globeRadius, 24, 24);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(globeRadius * 0.96, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.5,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Latitude / Longitude Accent Ring
    const ringGeo = new THREE.TorusGeometry(globeRadius + 0.3, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Helper: Convert Lat/Long to 3D Coordinates
    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Bangalore: ~12.97° N, 77.59° E
    const bangalorePos = latLongToVector3(12.97, 77.59, globeRadius);
    // Budapest: ~47.49° N, 19.04° E
    const budapestPos = latLongToVector3(47.49, 19.04, globeRadius);

    // Pin 1: Bangalore Marker (Gold)
    const pinGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const bangaloreMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const bangaloreMarker = new THREE.Mesh(pinGeo, bangaloreMat);
    bangaloreMarker.position.copy(bangalorePos);
    scene.add(bangaloreMarker);

    // Pin 2: Budapest Marker (Emerald / Cyan)
    const budapestMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const budapestMarker = new THREE.Mesh(pinGeo, budapestMat);
    budapestMarker.position.copy(budapestPos);
    scene.add(budapestMarker);

    // 3D Arc Curve linking Bangalore to Budapest
    const midPoint = new THREE.Vector3()
      .addVectors(bangalorePos, budapestPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(globeRadius * 1.45); // arc height

    const curve = new THREE.QuadraticBezierCurve3(bangalorePos, midPoint, budapestPos);
    const points = curve.getPoints(50);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
    const arcMat = new THREE.LineDashedMaterial({
      color: 0xf59e0b,
      dashSize: 0.1,
      gapSize: 0.05,
      linewidth: 2,
    });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    arcLine.computeLineDistances();
    scene.add(arcLine);

    // Floating pulse particles along the arc
    const pulseCount = 8;
    const pulseGroup = new THREE.Group();
    for (let i = 0; i < pulseCount; i++) {
      const pGeo = new THREE.SphereGeometry(0.03, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pulseGroup.add(pMesh);
    }
    scene.add(pulseGroup);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);
    const dirLight = new THREE.DirectionalLight(0xf59e0b, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Mouse tilt interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.5;
      mouseY = (y / rect.height) * 0.5;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation
      globeMesh.rotation.y = elapsedTime * 0.12 + mouseX;
      globeMesh.rotation.x = mouseY * 0.5;

      coreMesh.rotation.y = globeMesh.rotation.y;
      coreMesh.rotation.x = globeMesh.rotation.x;

      ringMesh.rotation.z = elapsedTime * 0.2;

      // Rotate markers and arc along with globe
      bangaloreMarker.position.copy(bangalorePos).applyEuler(globeMesh.rotation);
      budapestMarker.position.copy(budapestPos).applyEuler(globeMesh.rotation);

      // Re-transform arc points
      const transformedPoints = points.map((p) => p.clone().applyEuler(globeMesh.rotation));
      arcGeo.setFromPoints(transformedPoints);
      arcLine.computeLineDistances();

      // Animate arc pulse dots
      pulseGroup.children.forEach((child, index) => {
        const t = (elapsedTime * 0.4 + index / pulseCount) % 1;
        const pt = curve.getPoint(t).applyEuler(globeMesh.rotation);
        child.position.copy(pt);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      globeGeo.dispose();
      globeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pinGeo.dispose();
      bangaloreMat.dispose();
      budapestMat.dispose();
      arcGeo.dispose();
      arcMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
    </div>
  );
};
