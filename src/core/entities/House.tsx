import type { Room } from './Room';

export interface House {
    id: string;
    name: string;
    description: string;
    thumbnail: string; // Image pour la carte de sélection
    rooms: Record<string, Room>;
    startRoomId: string;
    location: string;
    area: string;
    price: string;
}