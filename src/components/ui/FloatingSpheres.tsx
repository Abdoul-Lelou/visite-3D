import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

export const FloatingSpheres = () => {
    const group = useRef<THREE.Group>(null!);
    const colors = ['#00ffcc', '#ff0077', '#0077ff', '#ffcc00', '#00ff55'];

    const sphereData = useMemo(() => {
        return Array.from({ length: 25 }).map((_, i) => ({
            position: [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8
            ] as [number, number, number],
            // Variation de taille : entre 0.05 et 0.3
            scale: 0.05 + Math.random() * 0.25,
            color: colors[i % colors.length],
            // Vitesse de flottement unique
            speed: 1 + Math.random() * 2
        }));
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Rotation douce du groupe
        group.current.rotation.y = Math.sin(t * 0.1) * 0.2;
        group.current.rotation.x = Math.cos(t * 0.1) * 0.1;
    });

    return (
        <group ref={group}>
            {/* Environnement étoilé discret */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
            
            {/* Éclairage optimisé pour le rendu transparent */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00ffcc" />
            
            {sphereData.map((data, i) => (
                <Float 
                    key={i} 
                    speed={data.speed} 
                    rotationIntensity={1.5} 
                    floatIntensity={2}
                >
                    <mesh position={data.position}>
                        {/* Utilisation de la taille générée aléatoirement */}
                        <sphereGeometry args={[data.scale, 32, 32]} />
                        
                        <meshPhysicalMaterial 
                            color={data.color}
                            emissive={data.color}
                            emissiveIntensity={0.4}
                            
                            // Paramètres de transparence type "Verre/Bulle"
                            transparent={true}
                            opacity={0.6}           
                            transmission={0.9}      
                            thickness={0.5}         
                            roughness={0.1}        
                            metalness={0.2}
                            clearcoat={1}          
                            clearcoatRoughness={0}
                        />
                    </mesh>
                </Float>
            ))}
        </group>
    );
};