import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
    useMediaQuery, Box, IconButton, ThemeProvider, createTheme, 
    CssBaseline, Button, Typography 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';

import useRoomStore from './store/useRoomStore';
import { Viewer3D } from './components/canvas/Viewer3D';
import { HousePicker } from './components/ui/HousePicker';
import { HOUSES } from './api/mockData';

const theme = createTheme({ palette: { mode: 'dark' } });

export default function App() {
    const { currentHouseId, setHouse, currentRoom, setCurrentRoom } = useRoomStore();
    const isMobile = useMediaQuery('(max-width:900px)');
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        if (currentRoom) setAutoRotate(true);
    }, [currentRoom]);

    const stopRotation = () => { if (autoRotate) setAutoRotate(false); };

    // Logique de navigation guidée
    const connectedRooms = currentHouseId && currentRoom 
        ? currentRoom.hotspots.map(spot => HOUSES[currentHouseId].rooms[spot.target]).filter(Boolean)
        : [];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            
            <Box sx={{ 
                position: 'fixed', inset: 0, bgcolor: '#000', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                overflow: 'hidden', touchAction: 'none'
            }}>
                <AnimatePresence mode="wait">
                    
                    {!currentHouseId ? (
                        <motion.div 
                            key="picker"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <HousePicker onSelect={(id) => {
                                const house = HOUSES[id];
                                setCurrentRoom(house.rooms[house.startRoomId]);
                                setHouse(id);
                            }} />
                        </motion.div>
                    ) : (
                        
                        <motion.div 
                            key="viewer"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ 
                                width: isMobile ? '100%' : '94%', 
                                height: isMobile ? '100%' : '88%', 
                                borderRadius: isMobile ? '0px' : '40px', 
                                position: 'relative', 
                                overflow: 'hidden',
                                background: '#111' 
                            }}
                        >
                            {/* 1. DÉGRADÉ DE PROTECTION (Vignettage) pour la lisibilité sur fond blanc */}
                            <Box sx={{
                                position: 'absolute', inset: 0, zIndex: 10,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.6) 100%)',
                                pointerEvents: 'none'
                            }} />

                            {/* 2. BOUTON FERMER RENFORCÉ */}
                            <IconButton 
                                onClick={() => setHouse("")} 
                                sx={{ 
                                    position: 'absolute', top: 25, right: 25, zIndex: 1100, 
                                    bgcolor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)', 
                                    color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                                    '&:hover': { bgcolor: '#ff3b30' }
                                }}
                            >
                                <CloseIcon />
                            </IconButton>

                            {/* 3. TITRE AVEC OMBRAGE PORTÉ */}
                            <Box sx={{ 
                                position: 'absolute', top: 35, left: '50%', transform: 'translateX(-50%)', 
                                zIndex: 1000, textAlign: 'center'
                            }}>
                                <Typography sx={{ 
                                    color: 'white', fontWeight: 900, textTransform: 'uppercase', 
                                    letterSpacing: 3, textShadow: '0 4px 15px rgba(0,0,0,1)',
                                    fontSize: isMobile ? '0.9rem' : '1.2rem'
                                }}>
                                    {currentRoom?.name}
                                </Typography>
                            </Box>

                            {/* 4. ROUE DE NAVIGATION (CONTRASTE ÉLEVÉ) */}
                            <Box sx={{
                                position: 'absolute', bottom: isMobile ? 40 : 50, left: '50%', 
                                transform: 'translateX(-50%)', zIndex: 1000, 
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5
                            }}>
                                <Box sx={{
                                    display: 'flex', gap: 1.5, p: 1.2, px: 3,
                                    // Fond plus sombre et flou plus fort
                                    background: 'rgba(0, 0, 0, 0.5)', 
                                    backdropFilter: 'blur(30px) saturate(150%)',
                                    borderRadius: '50px', 
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                                    maxWidth: '90vw', overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' }
                                }}>
                                    {connectedRooms.map((room) => (
                                        <Button
                                            key={room.id}
                                            onClick={() => setCurrentRoom(room)}
                                            sx={{
                                                color: 'white', 
                                                bgcolor: 'rgba(255,255,255,0.15)',
                                                borderRadius: '25px', px: 3, fontWeight: 800, 
                                                fontSize: '0.75rem', textTransform: 'none', whiteSpace: 'nowrap',
                                                '&:hover': { bgcolor: '#00ffcc', color: '#000' }
                                            }}
                                        >
                                            → {room.name}
                                        </Button>
                                    ))}
                                </Box>
                                <Typography variant="caption" sx={{ 
                                    color: 'white', fontWeight: 800, 
                                    textShadow: '0 2px 8px rgba(0,0,0,1)',
                                    letterSpacing: 1
                                }}>
                                    DESTINATIONS ACCESSIBLES
                                </Typography>
                            </Box>

                            {/* 5. CANVAS 3D */}
                            <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }} onMouseDown={stopRotation} onTouchStart={stopRotation}>
                                <Canvas 
                                    key={currentRoom?.id}
                                    camera={{ position: [0, 0, 0.1], fov: isMobile ? 80 : 70 }} 
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <React.Suspense fallback={null}>
                                        <Viewer3D />
                                        <Preload all />
                                    </React.Suspense>
                                    <OrbitControls 
                                        enableZoom={true} enablePan={false} makeDefault 
                                        autoRotate={autoRotate} autoRotateSpeed={0.8}
                                    />
                                </Canvas>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </ThemeProvider>
    );
}