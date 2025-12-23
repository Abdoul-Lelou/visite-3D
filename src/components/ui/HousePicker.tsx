import React from 'react';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, Stack, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { HOUSES } from '../../api/mockData';
import { FloatingSpheres } from './FloatingSpheres';
import { Canvas } from '@react-three/fiber';

export const HousePicker: React.FC<{ onSelect: (id: string) => void }> = ({ onSelect }) => {
    const isMobile = useMediaQuery('(max-width:900px)');

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Arrière-plan */}
            <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <Canvas><FloatingSpheres /></Canvas>
            </Box>

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Stack spacing={1} alignItems="center" sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="overline" sx={{ color: '#00ffcc', fontWeight: 800, letterSpacing: 3 }}>
                        L'IMMOBILIER DE DEMAIN
                    </Typography>
                    <Typography variant={isMobile ? "h5" : "h3"} sx={{ color: 'white', fontWeight: 900 }}>
                        Villas d'Exception à 360°
                    </Typography>
                </Stack>

                <Grid container spacing={3} justifyContent="center"> 
                    {Object.values(HOUSES).map((house) => (
                        <Grid item key={house.id} xs={10} sm={6} md={4}>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                <Card onClick={() => onSelect(house.id)} sx={{ 
                                    background: 'rgba(30, 30, 30, 0.4)', 
                                    backdropFilter: 'blur(25px)',
                                    borderRadius: '30px', 
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    cursor: 'pointer', 
                                    overflow: 'hidden'
                                }}>
                                    <CardMedia 
                                        component="img" 
                                        image={house.thumbnail} 
                                        sx={{ height: 180, objectFit: 'cover' }} 
                                    />
                                    <CardContent sx={{ p: 2, color: 'white', textAlign: 'center' }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem' }}>
                                            {house.name}
                                        </Typography>
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                color: '#00ffcc', 
                                                fontWeight: 900, 
                                                mt: 1,
                                                backgroundColor: 'rgba(0, 255, 204, 0.1)',
                                                display: 'inline-block',
                                                px: 1.5,
                                                py: 0.5,
                                                borderRadius: '8px',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            {house.price} • {house.location}
                                        </Typography>
                                        
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};