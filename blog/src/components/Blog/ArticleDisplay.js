import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';

const ArticleDisplay = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/articles');
        const data = await response.json();

        if (data.success) {
          setArticles(data.articles);
          setLoading(false);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Liste des Articles
      </Typography>

      {loading ? (
        <Typography variant="body1">Chargement...</Typography>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.idArticle}>
              <Typography variant="h6">{article.titre}</Typography>
              <Typography variant="body2">{article.contenu}</Typography>
              <Typography variant="caption">Auteur: {article.auteur}</Typography>
              <Typography variant="caption">Date de création: {article.dateCreation}</Typography>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ArticleDisplay;
