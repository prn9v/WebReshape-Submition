"use client";
import React from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text3D, Center } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { ErrorBoundary } from "react-error-boundary";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// Extend Three.js to support TextGeometry
extend({ TextGeometry });

const TechModel = () => {
  try {
    const { scene } = useGLTF("/models/tech_logo.glb");
    useEffect(() => {
      return () => {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      };
    }, [scene]);
    return <primitive object={scene} scale={0.8} />;
  } catch (error) {
    console.error("Error loading GLTF model:", error);
    return null;
  }
};

const HeroText = () => {
  return (
    <Center>
      <Text3D
        font="/fonts/Geist_Bold.json"
        size={1}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.02}
        bevelSegments={5}
      >
        TECH FEST 2025
        <meshStandardMaterial emissive="blue" metalness={0.8} roughness={0.2} />
      </Text3D>
    </Center>
  );
};

const HeroFallback = () => (
  <div className="flex items-center justify-center h-screen bg-black text-white">
    <p>Loading 3D Experience...</p>
  </div>
);

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

const Hero = () => {
  const [webglSupported, setWebglSupported] = useState(isWebGLAvailable());
  const isLowPower = useMediaQuery({ maxWidth: 768 });

  if (!webglSupported) {
    return <HeroFallback />;
  }

  return (
    <section className="h-screen w-full flex items-center justify-center bg-black">
      <ErrorBoundary fallback={<HeroFallback />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Suspense fallback={<HeroFallback />}>
            <TechModel />
            <HeroText />
          </Suspense>
          {!isLowPower && <OrbitControls enableZoom={false} />}
        </Canvas>
      </ErrorBoundary>
    </section>
  );
};

export default Hero;
