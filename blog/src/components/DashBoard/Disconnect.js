import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Disconnect() {

    //Remove user from local storage
    localStorage.removeItem('user');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        gap: 2, // crée un espace entre les éléments
      }}
    >
      <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
        Merci et à bientôt !
      </Typography>

      <Button variant="contained" color="primary" component={Link} to="/connexion" sx={{ mb: 2 }}>
        Reconnexion
      </Button>

      <Button variant="outlined" component={Link} to="/">
        Retour à l'accueil
      </Button>
    </Box>
  );
};
