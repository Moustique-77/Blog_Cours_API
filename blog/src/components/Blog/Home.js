import React from 'react'
import ArticleDisplay from './ArticleDisplay'
import Recherche from './Recherche'

function Home() {
  return (
    <div className='home-page'>

      <h1>Dernière publication</h1>

      <Recherche />

      {/* Display all article with mapping */}
      <ArticleDisplay />

    </div>
  )
}

export default Home
