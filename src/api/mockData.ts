import type { House } from '../core/entities/House';
import type { Room } from '../core/entities/Room';

// --- VILLA 1 : ARCHITECTURE EN "ÉTOILE" VIA LE COULOIR ---
const ROOMS_VILLA_1: Record<string, Room> = {
    // ÉTAPE 1 : ENTREE / RECEPTION
    "salon": {
        id: "salon",
        name: "Salon Principal",
        icon: "weekend",
        panoramaUrl: "/textures/villa1-salon-1.webp",
        hotspots: [
            { label: "Cuisine", target: "cuisine", pos: [12, -1, 2] },
            { label: "Salle à Manger", target: "salle_manger", pos: [-15, -1, -5] },
            { label: "Accès Couloir", target: "couloir", pos: [0, -1, 15] } // Unique accès vers le reste
        ]
    },
    "cuisine": {
        id: "cuisine",
        name: "Cuisine Équipée",
        icon: "kitchen",
        panoramaUrl: "/textures/villa1-cuisine-1.webp",
        hotspots: [{ label: "Retour Salon", target: "salon", pos: [-12, -1, 0] }]
    },
    "salle_manger": {
        id: "salle_manger",
        name: "Salle à Manger",
        icon: "restaurant",
        panoramaUrl: "/textures/villa1-salle-manger-1.webp",
        hotspots: [{ label: "Retour Salon", target: "salon", pos: [12, -1, 0] }]
    },
    // ÉTAPE 2 : LE HUB DE DISTRIBUTION
    "couloir": {
        id: "couloir",
        name: "Couloir des Suites",
        icon: "straighten",
        panoramaUrl: "/textures/villa1-couloir-1.webp",
        hotspots: [
            { label: "Retour Salon", target: "salon", pos: [0, -1, -15] },
            { label: "Entrer Suite Parentale", target: "chambre", pos: [15, -1, 0] },
            { label: "Chambre Invités", target: "chambre4", pos: [-15, -1, 5] },
            { label: "Bibliothèque", target: "biblio", pos: [5, -1, 15] }
        ]
    },
    // ÉTAPE 3 : PIÈCES PRIVÉES (Accessibles uniquement via Couloir)
    "chambre": {
        id: "chambre",
        name: "Suite Parentale",
        icon: "bed",
        panoramaUrl: "/textures/villa1-chambre-1.webp",
        hotspots: [
            { label: "Salle de Bain", target: "sale1", pos: [8, -1, 12] }, // Logique : Bain dans Chambre
            { label: "Sortir au Couloir", target: "couloir", pos: [-15, -1, 0] }
        ]
    },
    "sale1": {
        id: "sale1",
        name: "Salle de Bain Privée",
        icon: "shower",
        panoramaUrl: "/textures/villa1-salle-bain-1.webp",
        hotspots: [{ label: "Retour Chambre", target: "chambre", pos: [0, -1, -15] }]
    },
    "biblio": {
        id: "biblio",
        name: "Bibliothèque",
        icon: "menu_book",
        panoramaUrl: "/textures/villa1-biblio-1.webp",
        hotspots: [
            { label: "Entrer Salle de Sport", target: "sport", pos: [10, -1, 0] },
            { label: "Retour Couloir", target: "couloir", pos: [0, -1, -15] }
        ]
    },
    "sport": {
        id: "sport",
        name: "Salle de Sport",
        icon: "fitness_center",
        panoramaUrl: "/textures/villa1-salle-sport-1.webp",
        hotspots: [{ label: "Retour Bibliothèque", target: "biblio", pos: [-10, -1, 0] }]
    }
};

// --- LOGIQUE VILLA 2 : NAVIGATION EN ENFILADE ---
const ROOMS_VILLA_2: Record<string, Room> = {
    // HUB CENTRAL
    "invite": {
        id: "invite",
        name: "Salon d'Honneur",
        icon: "weekend",
        panoramaUrl: "/textures/villa1-salle-rencontre-1.webp",
        hotspots: [
            { label: "Suite Diamant", target: "chambre_v2", pos: [15, -1, 0] },
            { label: "Atelier d'Art", target: "atelier", pos: [-15, -1, -5] },
            { label: "Vers Buanderie", target: "machine", pos: [0, -1, 15] }
        ]
    },
    // AILE PRIVÉE
    "chambre_v2": {
        id: "chambre_v2",
        name: "Suite Diamant",
        icon: "bed",
        panoramaUrl: "/textures/villa2-chambre-1.webp",
        hotspots: [
            { label: "Salle de Bain", target: "bain_v2", pos: [10, -1, 10] },
            { label: "Dressing", target: "dressing", pos: [-10, -1, 5] },
            { label: "Retour Salon", target: "invite", pos: [0, -1, -15] }
        ]
    },
    "bain_v2": {
        id: "bain_v2",
        name: "Salle de Bain",
        icon: "bathtub",
        panoramaUrl: "/textures/villa2-salle-bain-1.webp",
        hotspots: [{ label: "Retour Suite", target: "chambre_v2", pos: [0, -1, 15] }]
    },
    // AILE CRÉATIVE ET SPIRITUELLE
    "atelier": {
        id: "atelier",
        name: "Atelier Créatif",
        icon: "brush",
        panoramaUrl: "/textures/villa2-atelier.webp",
        hotspots: [
            { label: "Accès Chapelle", target: "eglise", pos: [15, -1, 0] },
            { label: "Retour Salon", target: "invite", pos: [-15, -1, 0] }
        ]
    },
    "eglise": {
        id: "eglise",
        name: "Église Privée",
        icon: "church",
        panoramaUrl: "/textures/eglise.webp",
        hotspots: [{ label: "Sortir vers Atelier", target: "atelier", pos: [-15, -1, 0] }]
    }
};

export const HOUSES: Record<string, House> = {
    "maison-01": {
        id: "maison-01",
        name: "Villa Horizon Grand Large",
        description: "L'excellence architecturale face à l'Océan. Cette villa dispose d'une salle de sport et d'une bibliothèque.",
        thumbnail: "/textures/villa1-salon-1.webp",
        startRoomId: "salon",
        location: "Kipé, Conakry",
        area: "580 m²",
        price: "12 500 000 000 GNF",
        rooms: ROOMS_VILLA_1
    },
    "maison-02": {
        id: "maison-02",
        name: "Palais Diamant City",
        description: "Le summum du luxe urbain avec atelier d'artiste, dressing majestueux et chapelle privée.",
        thumbnail: "/textures/villa1-salle-rencontre-1.webp", 
        startRoomId: "invite",
        location: "Kaloum, Conakry",
        area: "720 m²",
        price: "18 000 000 000 GNF",
        rooms: ROOMS_VILLA_2
    }
};