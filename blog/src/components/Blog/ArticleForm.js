import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

const ArticleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    date: '',
    id_utilisateur: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the form data to the parent component for submission
    onSubmit(formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Création d'article
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="titre"
              label="Titre"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="contenu"
              label="Contenu"
              name="contenu"
              value={formData.contenu}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="date"
              label="Date"
              name="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.date}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="id_utilisateur"
              label="ID Utilisateur"
              name="id_utilisateur"
              value={formData.id_utilisateur}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Créer l'article
        </Button>
      </form>
    </Container>
  );
};

export default ArticleForm;
