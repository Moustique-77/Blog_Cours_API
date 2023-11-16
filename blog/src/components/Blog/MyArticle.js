import React, { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const UserArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
 //Load the user id from the local storage
 const userNom = localStorage.getItem('user');
 const navigate = useNavigate();


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
      <Typography variant="h4" sx={{ mt: 2 }}>
        Vos articles
      </Typography>

      {loading ? (
        <Typography variant="body1">Pas d'Article</Typography>
      ) : (
        <ul className="article-list" >
          {articles.map((article) => (
            <li key={article.idArticle}>
              <Typography variant="h6">{article.titre}</Typography>
              <Typography variant="h4">{article.contenu}</Typography>
              <Typography variant="h4">Auteur: {article.auteur}</Typography>
              <Typography variant="h4">Date de création: {article.dateCreation}</Typography>
              
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
              <hr />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default UserArticles;
