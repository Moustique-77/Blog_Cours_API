import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    titre: '',
    contenu: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/articles/${id}`);
        const data = await response.json();

        if (data.success) {
          setArticle({
            titre: data.article.titre,
            contenu: data.article.contenu,
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({ ...prevArticle, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/articles/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });
      const data = await response.json();
      if (data.success) {
        navigate('/');
      } else {
        alert('Erreur lors de la mise à jour de l\'article');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour de l\'article');
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Modifier l'Article
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          required
          fullWidth
          id="titre"
          label="Titre"
          name="titre"
          value={article.titre}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          multiline
          rows={4}
          id="contenu"
          label="Contenu"
          name="contenu"
          value={article.contenu}
          onChange={handleChange}
          sx={{ mt: 2, mb: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Mettre à jour l'Article
        </Button>
      </form>
    </Container>
  );
};

export default EditArticle;
