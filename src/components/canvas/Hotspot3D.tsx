import React, { useState } from 'react';
import { Html, Billboard } from '@react-three/drei';

interface HotspotProps {
    label: string;
    position: [number, number, number];
    onClick: () => void;
}

export const Hotspot3D: React.FC<HotspotProps> = ({ label, position, onClick }) => {
    const [hovered, setHovered] = useState(false);
    const scale = hovered ? 1.2 : 1;

    return (
        <group position={position}>
            <Billboard>
                {/* anneau extérieur pulsant */}
                <mesh onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                    <ringGeometry args={[0.4, 0.5, 32]} />
                    <meshBasicMaterial color={hovered ? "#00ffcc" : "white"} transparent opacity={0.8} />
                </mesh>

                {/* point central */}
                <mesh>
                    <circleGeometry args={[0.1, 32]} />
                    <meshBasicMaterial color={hovered ? "#00ffcc" : "white"} />
                </mesh>

                {/* Label flottant avec Glassmorphism */}
                <Html distanceFactor={10} position={[0, -0.8, 0]} center>
                    <div style={{
                        userSelect: 'none',
                        pointerEvents: 'none',
                        background: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '12px',
                        whiteSpace: 'nowrap',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        border: `1px solid ${hovered ? '#00ffcc' : 'rgba(255,255,255,0.3)'}`,
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.3s ease',
                        transform: `scale(${scale})`,
                        opacity: hovered ? 1 : 0.8
                    }}>
                        {label}
                    </div>
                </Html>
            </Billboard>
        </group>
    );
};