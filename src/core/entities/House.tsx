import type { Room } from './Room';

export interface House {
    id: string;
    name: string;
    description: string;
    thumbnail: string; 
    rooms: Record<string, Room>;
    startRoomId: string;
    location: string;
    area: string;
    price: string;
}