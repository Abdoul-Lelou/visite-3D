import React, { useLayoutEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import useRoomStore from '../../store/useRoomStore';
import { Hotspot3D } from './Hotspot3D';

export const Viewer3D: React.FC = () => {
    const { currentRoom } = useRoomStore();
    const texture = useTexture(currentRoom?.panoramaUrl || "");

    useLayoutEffect(() => {
        if (texture) {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.needsUpdate = true;
        }
    }, [texture]);

    if (!currentRoom) return null;

    return (
        <group>
            <mesh scale={[-1, 1, 1]}>
                <sphereGeometry args={[500, 64, 32]} />
                <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
            </mesh>
            
            {currentRoom.hotspots.map((spot, i) => (
                <Hotspot3D 
                    key={`${currentRoom.id}-${i}`}
                    label={spot.label}
                    position={spot.pos}
                    onClick={() => {}}
                />
            ))}
        </group>
    );
};