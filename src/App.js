import React from "react";
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Article from './components/article.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Article />} />
      </Routes>
    </Router>
  );
}

export default App;
