import { useEffect } from 'react';
import useRoomStore from '../store/useRoomStore';
import { HOUSES } from '../api/mockData'; 

export const useRoomLoader = (houseId: string, roomId: string) => {
    const { setCurrentRoom, setIsLoading } = useRoomStore();

    useEffect(() => {
        const loadRoom = async () => {
            setIsLoading(true);
            
            // On va chercher la pièce dans la maison sélectionnée
            const house = HOUSES[houseId];
            if (house && house.rooms[roomId]) {
                const room = house.rooms[roomId];
                
                // Simulation de préchargement de la texture
                const img = new Image();
                img.src = room.panoramaUrl;
                img.onload = () => {
                    setCurrentRoom(room);
                    setIsLoading(false);
                };
            }
        };

        loadRoom();
    }, [houseId, roomId, setCurrentRoom, setIsLoading]);
};