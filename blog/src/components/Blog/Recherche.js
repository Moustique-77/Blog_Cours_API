import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Divider } from '@mui/material';

const Recherche = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {

      const response = await fetch(`http://localhost:3001/api/blog/search?term=${encodeURIComponent(searchTerm)}`);

      const data = await response.json();

      if (data.success) {
        setArticles(data.articles);
      } else {
        console.error(data.message);
        setArticles([]);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" sx={{ mt: 2, mb: 2 }}>
        Recherche d'Articles
      </Typography>
      <TextField
        fullWidth
        id="search"
        label="Rechercher par nom ou auteur"
        value={searchTerm}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading}
      >
        Rechercher
      </Button>
      {loading ? (
        <Typography variant="body1">Chargement...</Typography>
      ) : (
        <ul className="article-list">
          {articles.map((article, index) => (
            <React.Fragment key={index}>
              <li>
              <Typography variant="h6">{article.titre}</Typography>
              <Typography variant="h4">{article.contenu}</Typography>
              <Typography variant="h4">Auteur: {article.auteur}</Typography>
              <Typography variant="h4">Date de création: {article.dateCreation}</Typography>
              </li>
              {index < articles.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default Recherche;
