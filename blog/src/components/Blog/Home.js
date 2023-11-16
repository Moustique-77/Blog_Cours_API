import React from 'react'
import ArticleDisplay from './ArticleDisplay'

function Home() {




  return (
    <div className='home-page'>

      <h1>Dernière publication</h1>

      {/* Display all article with mapping */}
      <ArticleDisplay />

    </div>
  )
}

export default Home
