import React from 'react'
import { Link } from 'react-router-dom';

function header() {

  //Get local storage for login user
  const user = JSON.parse(localStorage.getItem('user'));

  //If user is login, logout button and create article button
  if (user) {
    return (
      <header>
        <div className='header-items'>

          <Link className='header-home' to="/">MyBlog</Link>

          <Link className="header-ArticlesForm" to="/Blog/ArticleForm">Écrire un article</Link>

          <Link className="header-connexion" to="/Blog/MyArticle">Mes articles</Link>

          <Link className="header-connexion" to="/disconnect">Déconnexion</Link>

        </div>
      </header>
    )
  }

  return (
    <header>
        <div className='header-items'>

          <Link className='header-home' to="/">MyBlog</Link>

          <Link className="header-connexion" to="/connexion">Connexion</Link>

        </div>
    </header>
  )
}

export default header