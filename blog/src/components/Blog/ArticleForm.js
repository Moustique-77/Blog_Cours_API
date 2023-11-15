import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Alert } from '@mui/material';

const ArticleForm = ({ onSubmit }) => {

  //Load the user id from the local storage
  const userNom = localStorage.getItem('user');

  //Transfor userId to JSON
  const userNomJson = JSON.parse(userNom);

  //Get the id from the JSON
  const userNomFinal = userNomJson['nom'];

  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    userNom: userNomFinal, 
  });
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateArticle = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titre: formData.titre,
          contenu: formData.contenu,
          userNom: formData.userNom,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ success: true, message: 'Article créé' });
        onSubmit(formData); 
      } else {
        setSubmitStatus({ success: false, message: 'Erreur lors de la création de l\'article' });
      }
    } catch (err) {
      console.log(err);
      setSubmitStatus({ success: false, message: 'Erreur lors de la création de l\'article' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateArticle();
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
          {/* Afficher un message de statut après la soumission */}
          {submitStatus.message && (
        <Alert severity={submitStatus.success ? 'success' : 'error'}>
          {submitStatus.message}
        </Alert>
      )}
    </Container>
  );
};

export default ArticleForm;