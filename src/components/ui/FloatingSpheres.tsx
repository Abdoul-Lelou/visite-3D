import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingSpheres = () => {
    const group = useRef<THREE.Group>(null!);
    const colors = ['#00ffcc', '#ff0077', '#0077ff', '#ffcc00', '#00ff55'];

    useFrame((state) => {
        group.current.rotation.y += 0.002;
    });

    return (
        <group ref={group}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            
            {Array.from({ length: 20 }).map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={[
                        (Math.random() - 0.5) * 10, 
                        (Math.random() - 0.5) * 10, 
                        (Math.random() - 0.5) * 5
                    ]}>
                        <sphereGeometry args={[0.15, 32, 32]} />
                        <meshStandardMaterial 
                            color={colors[i % colors.length]} 
                            emissive={colors[i % colors.length]}
                            emissiveIntensity={1}
                            metalness={1}
                            roughness={0}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};