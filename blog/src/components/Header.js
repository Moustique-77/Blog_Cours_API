import React from 'react'
import { Link } from 'react-router-dom';

function header() {
  return (
    <header>
        <div className='header-items'>

          <Link className='header-home' to="/">MyBlog</Link>

          <Link className="header-connexion" to="/connexion">Connexion</Link>

          <Link className="header-ArticlesForm" to="/Blog/ArticleForm">Créer</Link>

        </div>
    </header>
  )
}

export default header