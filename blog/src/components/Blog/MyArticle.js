import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';

const UserArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
 //Load the user id from the local storage
 const userNom = localStorage.getItem('user');

 //Transfor userId to JSON
 const userNomJson = JSON.parse(userNom);

 //Get the id from the JSON
 const userNomFinal = userNomJson['nom'];

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/articles/user/${userNomFinal}`);
        const data = await response.json();

        if (data.success) {
          setArticles(data.articles);
          setLoading(false);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user articles:', error);
        setLoading(false);
      }
    };

    fetchUserArticles();
  }, [userNomFinal]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Articles de l'utilisateur
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

export default UserArticles;
