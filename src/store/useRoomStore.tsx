import { create } from 'zustand';
import type { Room } from '../core/entities/Room';

interface RoomState {
    currentHouseId: string | null; 
    currentRoom: Room | null;
    isLoading: boolean;
    setHouse: (houseId: string) => void; 
    setCurrentRoom: (room: Room) => void;
    setIsLoading: (loading: boolean) => void;
}

const useRoomStore = create<RoomState>((set) => ({
    currentHouseId: null,
    currentRoom: null,
    isLoading: false,
    setHouse: (id) => set({ currentHouseId: id }),
    setCurrentRoom: (room) => set({ currentRoom: room }),
    setIsLoading: (loading) => set({ isLoading: loading }),
}));

export default useRoomStore;