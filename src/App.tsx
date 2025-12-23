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
                                position: 'relative'
                            }}
                        >
                            <HousePicker onSelect={(id) => {
                                const house = HOUSES[id];
                                setCurrentRoom(house.rooms[house.startRoomId]);
                                setHouse(id);
                            }} />

                            {/* COPYRIGHT VERSION PICKER - Discret en bas */}
                            <Box sx={{
                                position: 'absolute', bottom: 10, opacity: 0.6,
                                display: 'flex', alignItems: 'center', gap: 1
                            }}>
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
                            {/* COPYRIGHT VERSION VIEWER - Intégré au cadre */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: isMobile ? 10 : 20,
                                right: isMobile ? 10 : 25,
                                zIndex: 2000,
                                display: 'flex', alignItems: 'center', gap: 1,
                                bgcolor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)',
                                p: isMobile ? '4px 10px' : '6px 16px',
                                borderRadius: '20px',
                                border: '1px solid rgba(0,255,204,0.2)',
                                pointerEvents: 'none'
                            }}>
                                <CodeIcon sx={{ fontSize: isMobile ? 12 : 16, color: '#00ffcc' }} />
                                <Typography sx={{ 
                                    color: 'white', fontSize: isMobile ? '0.55rem' : '0.7rem', 
                                    fontWeight: 600, whiteSpace: 'nowrap'
                                }}>
                                    Expertise <span style={{ color: '#00ffcc' }}>A. DIALLO</span>
                                </Typography>
                            </Box>

                            <Box sx={{
                                position: 'absolute', inset: 0, zIndex: 10,
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%)',
                                pointerEvents: 'none'
                            }} />

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

                            {/* TITRE PIECE - Responsive Font */}
                            <Box sx={{ 
                                position: 'absolute', top: isMobile ? 20 : 35, left: '50%', transform: 'translateX(-50%)', 
                                zIndex: 1000, textAlign: 'center', width: '60%'
                            }}>
                                <Typography sx={{ 
                                    color: 'white', fontWeight: 900, textTransform: 'uppercase', 
                                    letterSpacing: isMobile ? 1 : 3, textShadow: '0 4px 15px rgba(0,0,0,1)',
                                    fontSize: isMobile ? '0.75rem' : '1.1rem',
                                    lineHeight: 1.2
                                }}>
                                    {currentRoom?.name}
                                </Typography>
                            </Box>

                            {/* NAVIGATION ROUETTE - Mobile Optimized */}
                            <Box sx={{
                                position: 'absolute', bottom: isMobile ? 45 : 50, left: '50%', 
                                transform: 'translateX(-50%)', zIndex: 1000, 
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1
                            }}>
                                <Box sx={{
                                    display: 'flex', gap: isMobile ? 1 : 1.5, p: isMobile ? 0.8 : 1.2, px: isMobile ? 2 : 3,
                                    background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(20px)',
                                    borderRadius: '50px', border: '1px solid rgba(0,255,204,0.2)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                    maxWidth: '95vw', overflowX: 'auto',
                                    '&::-webkit-scrollbar': { display: 'none' }
                                }}>
                                    {connectedRooms.map((room) => (
                                        <Button
                                            key={room.id}
                                            onClick={() => setCurrentRoom(room)}
                                            size="small"
                                            sx={{
                                                color: 'white', bgcolor: 'rgba(255,255,255,0.1)',
                                                borderRadius: '20px', px: isMobile ? 1.5 : 3, py: isMobile ? 0.4 : 0.8,
                                                fontWeight: 800, fontSize: isMobile ? '0.6rem' : '0.75rem', 
                                                textTransform: 'none', whiteSpace: 'nowrap', minWidth: 'auto',
                                                '&:hover': { bgcolor: '#00ffcc', color: '#000' }
                                            }}
                                        >
                                            {isMobile ? room.name : `→ ${room.name}`}
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
                                    camera={{ position: [0, 0, 0.1], fov: isMobile ? 85 : 70 }} 
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