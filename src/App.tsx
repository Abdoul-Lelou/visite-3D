import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
    useMediaQuery, Box, IconButton, ThemeProvider, createTheme, 
    CssBaseline, Button, Typography 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code'; 
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';

import useRoomStore from './store/useRoomStore';
import { Viewer3D } from './components/canvas/Viewer3D';
import { HousePicker } from './components/ui/HousePicker';
import { HOUSES } from './api/mockData';

const theme = createTheme({ palette: { mode: 'dark' } });

export default function App() {
    const { currentHouseId, setHouse, currentRoom, setCurrentRoom } = useRoomStore();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [autoRotate, setAutoRotate] = useState(true);

    useEffect(() => {
        if (currentRoom) setAutoRotate(true);
    }, [currentRoom]);

    const stopRotation = () => { if (autoRotate) setAutoRotate(false); };

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
                            style={{ 
                                width: '100%', height: '100%', display: 'flex', 
                                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                position: 'relative', overflowY: 'auto'
                            }}
                        >
                            <HousePicker onSelect={(id) => {
                                const house = HOUSES[id];
                                setCurrentRoom(house.rooms[house.startRoomId]);
                                setHouse(id);
                            }} />

                            <Box sx={{ py: 3, opacity: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography sx={{ color: 'white', fontSize: '0.6rem', fontWeight: 500 }}>
                                    A. DIALLO © 2025
                                </Typography>
                            </Box>
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
                            <Box sx={{
                                position: 'absolute',
                                top: isMobile ? 'auto' : 20,
                                bottom: isMobile ? 120 : 'auto', 
                                left: isMobile ? 15 : 25,
                                zIndex: 2000,
                                display: 'flex', alignItems: 'center', gap: 1,
                                bgcolor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)',
                                p: '4px 10px', borderRadius: '15px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                pointerEvents: 'none'
                            }}>
                                <CodeIcon sx={{ fontSize: 12, color: '#00ffcc' }} />
                                <Typography sx={{ color: 'white', fontSize: '0.55rem', fontWeight: 700 }}>
                                    A. DIALLO
                                </Typography>
                            </Box>

                            <IconButton 
                                onClick={() => setHouse("")} 
                                sx={{ 
                                    position: 'absolute', top: isMobile ? 15 : 25, right: isMobile ? 15 : 25, zIndex: 1100, 
                                    bgcolor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(15px)', 
                                    color: 'white', border: '1px solid rgba(255,255,255,0.2)',
                                    p: isMobile ? 1 : 1.5
                                }}
                            >
                                <CloseIcon fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>

                            {/* NAVIGATION MOBILE */}
                            <Box sx={{
                                position: 'absolute', bottom: isMobile ? 20 : 40, left: 0, right: 0,
                                zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1
                            }}>
                                <Box sx={{
                                    display: 'flex', gap: 1, p: 1,
                                    bgcolor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(20px)',
                                    borderRadius: isMobile ? '20px' : '50px',
                                    border: '1px solid rgba(0,255,204,0.3)',
                                    maxWidth: '90vw', 
                                    overflowX: 'auto', 
                                    whiteSpace: 'nowrap',
                                    scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }
                                }}>
                                    {connectedRooms.map((room) => (
                                        <Button
                                            key={room.id}
                                            onClick={() => setCurrentRoom(room)}
                                            sx={{
                                                color: 'white', bgcolor: 'rgba(255,255,255,0.1)',
                                                borderRadius: '15px', px: 2, py: 0.5,
                                                fontWeight: 700, fontSize: isMobile ? '0.65rem' : '0.75rem', 
                                                textTransform: 'none', flexShrink: 0,
                                                '&:hover': { bgcolor: '#00ffcc', color: '#000' }
                                            }}
                                        >
                                            {room.name}
                                        </Button>
                                    ))}
                                </Box>
                                {!isMobile && (
                                    <Typography variant="caption" sx={{ color: 'white', fontWeight: 800, textShadow: '0 2px 8px rgba(0,0,0,1)' }}>
                                        DESTINATIONS ACCESSIBLES
                                    </Typography>
                                )}
                            </Box>

                            <Box sx={{ position: 'absolute', inset: 0, zIndex: 1 }} onMouseDown={stopRotation} onTouchStart={stopRotation}>
                                <Canvas 
                                    key={currentRoom?.id}
                                    camera={{ position: [0, 0, 0.1], fov: isMobile ? 90 : 70 }} 
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <React.Suspense fallback={null}>
                                        <Viewer3D />
                                        <Preload all />
                                    </React.Suspense>
                                    <OrbitControls enableZoom={true} enablePan={false} makeDefault autoRotate={autoRotate} autoRotateSpeed={0.8} />
                                </Canvas>
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </ThemeProvider>
    );
}