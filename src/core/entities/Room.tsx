export interface Hotspot {
    label: string;
    target: string;
    pos: [number, number, number];
}

export interface Room {
    id: string;
    name: string;
    icon: string; // Identifiant de l'icône (ex: 'bed', 'kitchen')
    panoramaUrl: string;
    hotspots: Hotspot[];
}