import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Connexion from './components/DashBoard/AuthFrom.js';
import Home from './components/Blog/Home.js';
import ArticleForm from './components/Blog/ArticleForm.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/connexion" element={<Connexion/>} />
          <Route path="/article" element={<ArticleForm/>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
