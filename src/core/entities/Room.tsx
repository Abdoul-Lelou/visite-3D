export interface Hotspot {
    label: string;
    target: string;
    pos: [number, number, number];
}

export interface Room {
    id: string;
    name: string;
    icon: string; 
    panoramaUrl: string;
    hotspots: Hotspot[];
}