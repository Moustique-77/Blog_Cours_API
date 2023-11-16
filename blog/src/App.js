import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Connexion from './components/DashBoard/AuthFrom.js';
import Home from './components/Blog/Home.js';
import ArticleForm from './components/Blog/ArticleForm.js';
import Disconnect from './components/DashBoard/Disconnect.js';
import MyArticle from './components/Blog/MyArticle.js';
import ModifyArticle from './components/Blog/ModifyArticle.js';
import Recherche from './components/Blog/Recherche.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/connexion" element={<Connexion/>} />
          <Route path="/disconnect" element={<Disconnect/>} />
          <Route path="/Blog/ArticleForm" element={<ArticleForm/>} />
          <Route path="/Blog/MyArticle" element={<MyArticle/>} />
          <Route path="/ModifyArticle/:id" element={<ModifyArticle/>} />
          <Route path="/Recherche" element={<Recherche/>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
