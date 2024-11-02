import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three'; // Import THREE


// Tutaj trzeba będzie zaimportować model który jest idealnie na środku współrzędnych i ma odpowiednią skalę
// I żeby obracał się wokół osi Y która jest na jego środku (nie na środku sceny)

function Model({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  // Center the model and scale it up
  useEffect(() => {
    if (ref.current) {
      const box = new THREE.Box3().setFromObject(ref.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxAxis = Math.max(size.x, size.y, size.z);
      ref.current.position.sub(center); // Center the model
      ref.current.scale.setScalar(1 / maxAxis); // Scale the model
    }
  }, [scene]);

  // Rotate the model continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // Adjust the speed by changing the value
    }
  });

  return <primitive ref={ref} object={scene} />;
}

function ModelViewer({ url }) {
  return (
    <Canvas style={{ height: '400px', width: '100%' }} camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model url={url} />
        {/* Removed OrbitControls to fix the camera */}
      </Suspense>
    </Canvas>
  );
}

export default ModelViewer;
