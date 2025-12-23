import React from 'react';
import { 
    Box, Typography, Button, Stack, Chip, 
    CircularProgress, Backdrop, Paper 
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useRoomStore from '../../store/useRoomStore';

interface OverlayProps {
    onNavigate: (id: string) => void;
}

export const Overlay: React.FC<OverlayProps> = ({ onNavigate }) => {
    const { currentRoom, isLoading } = useRoomStore();

    return (
        <>
            <Backdrop
                sx={{ color: '#00ffcc', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'rgba(0,0,0,0.9)' }}
                open={isLoading}
            >
                <Stack alignItems="center" spacing={2}>
                    <CircularProgress color="inherit" size={60} thickness={2} />
                    <Typography variant="h6" sx={{ letterSpacing: 3 }}>OPTIMISATION DE LA VUE 360...</Typography>
                </Stack>
            </Backdrop>

            <Box sx={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none', zIndex: 10, p: 4,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
                
                <Box sx={{ pointerEvents: 'auto' }}>
                    <Paper elevation={0} sx={{
                        p: 2, display: 'inline-block',
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 2, color: 'white'
                    }}>
                        <Typography variant="h4" fontWeight="bold">
                            {currentRoom?.name || "Projet Conakry"}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1, opacity: 0.8 }}>
                            <LocationOnIcon fontSize="small" />
                            <Typography variant="body2">Dixinn, Conakry, Guinée</Typography>
                            <Chip label="Luxe" size="small" color="primary" sx={{ ml: 2, height: 20 }} />
                        </Stack>
                    </Paper>
                </Box>

                <Box sx={{
                    display: 'flex', justifyContent: 'center', pb: 4,
                    pointerEvents: 'auto'
                }}>
                    <Paper elevation={10} sx={{
                        p: 1.5, borderRadius: 10,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <Stack direction="row" spacing={2}>
                            {currentRoom?.hotspots.map((spot) => (
                                <Button
                                    key={spot.target}
                                    variant="contained"
                                    startIcon={spot.target === 'salon' ? <HomeIcon /> : null}
                                    onClick={() => onNavigate(spot.target)}
                                    sx={{
                                        borderRadius: 8,
                                        px: 3,
                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                        color: 'black',
                                        '&:hover': { backgroundColor: '#00ffcc', color: 'black' },
                                        transition: '0.3s'
                                    }}
                                >
                                    {spot.label}
                                </Button>
                            ))}
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </>
    );
};