import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArticleDisplay = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Charger l'utilisateur depuis le localStorage
  const userStored = localStorage.getItem('user');
  const user = userStored ? JSON.parse(userStored) : null;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/articles');
        const data = await response.json();

        if (data.success) {
          setArticles(data.articles);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/articles/delete/${id}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (data.success) {
          // Mettre à jour l'état des articles après la suppression
          setArticles(articles.filter((article) => article.idArticle !== id));
          alert('Article supprimé avec succès');
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert('Erreur lors de la suppression de l\'article');
      }
    }
  };

  return (
    <Container>
      {loading ? (
        <Typography variant="body1">Chargement...</Typography>
      ) : (
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article.idArticle}>
              <Typography variant="h6">{article.titre}</Typography>
              <Typography variant="h4">{article.contenu}</Typography>
              <Typography variant="h4">Auteur: {article.auteur}</Typography>
              <Typography variant="h4">Date de création: {article.dateCreation}</Typography>
              {/* Vérifier si l'utilisateur est l'auteur pour chaque article */}
              {user && user.nom === article.auteur && (
                <>
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/ModifyArticle/${article.idArticle}`)}>
                    Modifier
                  </Button>

                  <Button variant="contained" color="primary" onClick={() => handleDelete(article.idArticle)}>
                    Supprimer
                  </Button>
                </div>
                </>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default ArticleDisplay;
