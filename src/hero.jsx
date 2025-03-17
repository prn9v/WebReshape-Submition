"use client";
import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Text,
  Center,
  SpotLight,
  Environment,
  Float,
  Stars,
  PerspectiveCamera,
  useDetectGPU,
} from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { ErrorBoundary } from "react-error-boundary";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// Extend Three.js with TextGeometry
extend({ TextGeometry });

// Model with hover effect and rotation animation - now properly centered and responsive
const TechModel = ({ isMobile, isTablet }) => {
  const group = useRef();
  const { scene } = useGLTF("/robot_playground.glb");
  const [hovered, setHovered] = useState(false);

  // Calculate scale based on device type
  const baseScale = isMobile ? 0.6 : isTablet ? 0.7 : 0.8;

  // Add rotation animation
  useFrame((state, delta) => {
    if (group.current) {
      // Slower rotation on mobile to reduce motion sickness
      group.current.rotation.y += delta * (isMobile ? 0.05 : 0.1);
    }
  });

  // Handle hover effect with smooth scale transition
  useEffect(() => {
    if (!group.current) return;

    const targetScale = hovered ? baseScale * 1.1 : baseScale;
    const duration = 0.5;
    let startTime = null;
    const initialScale = group.current.scale.x;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      const newScale =
        initialScale + (targetScale - initialScale) * easeProgress;

      if (group.current) {
        group.current.scale.set(newScale, newScale, newScale);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hovered, baseScale]);

  useEffect(() => {
    if (!scene) return;

    // Adjust position based on device type
    scene.position.set(0, isMobile ? -0.2 : -0.3, 0);

    // Optional: Enhance materials for better appearance
    scene.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;

        if (object.material) {
          // Lower quality materials on mobile for better performance
          if (isMobile) {
            object.material.roughness = 0.7;
            object.material.metalness = 0.6;
          } else {
            object.material.roughness = 0.6;
            object.material.metalness = 0.8;
          }
        }
      }
    });

    return () => {
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              mat.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      });
    };
  }, [scene, isMobile]);

  if (!scene) return null;

  return (
    <group
      ref={group}
      onPointerOver={() => !isMobile && setHovered(true)}
      onPointerOut={() => !isMobile && setHovered(false)}
      onClick={() => isMobile && setHovered(!hovered)} // Toggle on click for mobile
      position={[0, isMobile ? -1.2 : -1.0, 0]} // Adjust position for mobile
    >
      <primitive
        object={scene}
        position={[0, isMobile ? -0.8 : -1.0, 0]} // Adjust position for mobile
        scale={baseScale}
      />
    </group>
  );
};

// Enhanced text with floating animation - responsive positioning
const HeroText = ({ isMobile, isTablet }) => {
  // Adjust text size and position based on device type
  const fontSize = isMobile ? 0.8 : isTablet ? 1.0 : 1.2;
  const yPosition = isMobile ? 1.0 : isTablet ? 1.5 : 0.8;
  
  return (
    <Float
      speed={1.5} // Animation speed
      rotationIntensity={isMobile ? 0.05 : 0.1} // Reduced rotation on mobile
      floatIntensity={isMobile ? 0.15 : 0.3} // Reduced float for stability on mobile
      position={[0, yPosition, 0]} // Adjusted position based on device
    >
      <Text
        fontSize={fontSize} // Responsive font size
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={isMobile ? 0.03 : 0.04} // Thinner outline for mobile
        outlineColor="#0066ff"
        maxWidth={isMobile ? 2 : 4} // Limit text width on mobile
        lineHeight={1.2}
        textAlign="center"
      >
        TECH FEST 2025
        <meshPhysicalMaterial
          emissive="#4444ff"
          emissiveIntensity={isMobile ? 1.5 : 2} // Reduce intensity on mobile for better performance
          metalness={isMobile ? 0.7 : 0.9}
          roughness={isMobile ? 0.2 : 0.1}
          clearcoat={isMobile ? 0.7 : 1}
          reflectivity={isMobile ? 0.7 : 1}
          envMapIntensity={isMobile ? 0.7 : 1}
        />
      </Text>
    </Float>
  );
};

// Adaptive loading component showing different messages based on device capability
const HeroFallback = ({ isLowPerformance = false }) => (
  <div className="flex flex-col items-center justify-center h-[700px] bg-gradient-to-b from-black to-blue-900 text-white px-4">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-xl font-bold text-blue-400 text-center">
      {isLowPerformance 
        ? "Preparing Simplified Experience..." 
        : "Loading 3D Experience..."}
    </p>
    <p className="text-sm mt-2 text-blue-300 text-center max-w-xs">
      {isLowPerformance
        ? "We've detected your device may have limited 3D capabilities. Optimizing..."
        : "Preparing something amazing..."}
    </p>
  </div>
);

// Check for WebGL compatibility
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

// Camera controller adjusted for device type
const CameraController = ({ isMobile, isTablet }) => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    // Position the camera based on device type
    const cameraDistance = isMobile ? 7 : isTablet ? 6.5 : 6;
    camera.position.set(0, isMobile ? 0.8 : 1, cameraDistance);
    camera.lookAt(0, 0, 0);
  }, [camera, isMobile, isTablet]);

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 0, 0]} // Set target to the center of the scene
      enableZoom={true}
      enablePan={!isMobile} // Disable panning on mobile
      minDistance={isMobile ? 4 : 3}
      maxDistance={isMobile ? 9 : 10}
      dampingFactor={0.1}
      rotateSpeed={isMobile ? 0.5 : 0.7} // Slower rotation on mobile
      enableDamping={true}
      // Limit vertical rotation on mobile to prevent disorientation
      minPolarAngle={isMobile ? Math.PI / 6 : Math.PI / 8}
      maxPolarAngle={isMobile ? Math.PI / 2 : (Math.PI * 5) / 8}
    />
  );
};

// Adaptive performance settings based on device capability
const AdaptivePerformance = ({ children }) => {
  const GPU = useDetectGPU();
  const [qualityLevel, setQualityLevel] = useState("high"); // Default to high
  
  useEffect(() => {
    if (GPU.tier === null) return; // Wait until detection is complete
    
    // Set quality based on GPU tier
    if (GPU.tier < 1) {
      setQualityLevel("low");
    } else if (GPU.tier < 2) {
      setQualityLevel("medium");
    } else {
      setQualityLevel("high");
    }
  }, [GPU]);
  
  return children(qualityLevel);
};

const Hero = () => {
  const [webglSupported, setWebglSupported] = useState(true); // Default to true for SSR
  const [isClient, setIsClient] = useState(false);

  // Use media queries for responsive design
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isPortrait = useMediaQuery({ orientation: 'portrait' });
  
  useEffect(() => {
    // Set client-side flag and check WebGL support
    setIsClient(true);
    setWebglSupported(isWebGLAvailable());
  }, []);

  // Only render component on client-side to avoid SSR issues with media queries
  if (!isClient) {
    return <HeroFallback />;
  }

  if (!webglSupported) {
    return <HeroFallback isLowPerformance={true} />;
  }

  // Adjust height based on device type and orientation
  const canvasHeight = isMobile 
    ? isPortrait ? "500px" : "400px"  // Mobile: shorter in landscape
    : isTablet 
      ? "600px" 
      : "700px";

  return (
    <section 
      className={` min-h-screen relative w-full flex items-center justify-center bg-gradient-to-b from-black to-blue-900`}
      style={{ height: canvasHeight }}
    >
      <ErrorBoundary fallback={<HeroFallback isLowPerformance={true} />}>
        <AdaptivePerformance>
          {(qualityLevel) => (
            <Canvas
              shadows={qualityLevel !== "low"}
              gl={{
                antialias: qualityLevel !== "low",
                alpha: true,
                powerPreference: isMobile ? "low-power" : "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.2,
              }}
              dpr={
                qualityLevel === "low" 
                  ? 1 
                  : qualityLevel === "medium" 
                    ? [1, 1.5] 
                    : [1, 2]
              } // Adaptive resolution
              camera={{ 
                position: [0, isMobile ? 0.8 : 1, isMobile ? 7 : 6], 
                fov: isMobile ? 50 : 45,
                near: 0.1,
                far: 50,
              }}
              performance={{ min: 0.5 }} // Allow frame rate to drop to 30fps before throttling
            >
              {/* Gradient background */}
              <color attach="background" args={["#000012"]} />

              {/* Optimized lighting setup based on device performance */}
              <ambientLight intensity={0.3} />
              <spotLight
                position={[5, 10, 5]}
                angle={0.3}
                penumbra={1}
                intensity={1.5}
                castShadow={qualityLevel !== "low"}
                shadow-mapSize-width={qualityLevel === "high" ? 1024 : 512}
                shadow-mapSize-height={qualityLevel === "high" ? 1024 : 512}
                color="#4d85ff"
              />
              <spotLight
                position={[-5, 5, -5]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                castShadow={qualityLevel !== "low"}
                color="#ff4da6"
              />

              {/* Additional spotlight - simplified on low-end devices */}
              {qualityLevel !== "low" && (
                <spotLight
                  position={[0, 1, 0]}
                  angle={0.5}
                  penumbra={0.8}
                  intensity={2}
                  castShadow={qualityLevel === "high"}
                  color="white"
                />
              )}

              {/* Environment and atmosphere - reduced complexity on mobile */}
              <Stars
                radius={100}
                depth={40}
                count={isMobile ? 500 : 1000}
                factor={isMobile ? 2 : 4}
                saturation={0}
                fade
                speed={isMobile ? 0.5 : 1}
              />
              <Environment preset="night" />

              {/* Main content */}
              <Suspense fallback={null}>
                <TechModel isMobile={isMobile} isTablet={isTablet} />
                <HeroText isMobile={isMobile} isTablet={isTablet} />
              </Suspense>

              {/* Camera controls */}
              <CameraController isMobile={isMobile} isTablet={isTablet} />

              {/* Less dense fog on mobile */}
              <fog 
                attach="fog" 
                args={[
                  "#000036", 
                  isMobile ? 10 : 8, 
                  isMobile ? 18 : 20
                ]} 
              />
            </Canvas>
          )}
        </AdaptivePerformance>
      </ErrorBoundary>

      {/* Responsive overlay instructional text - different for touch devices */}
      <div className="absolute bottom-4 left-0 w-full text-white text-opacity-70 text-xs sm:text-sm text-center px-4">
        {isMobile ? (
          <p>Tap and drag to rotate • Pinch to zoom</p>
        ) : (
          <p>Click and drag to rotate • Scroll to zoom</p>
        )}
      </div>
    </section>

    );
}

export default Hero
