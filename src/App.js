import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';  // Import the external CSS file

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <header>
            <Header />
          </header>

          <main>
            <Routes>
              <Route path="/" exact Component={Home} />
              <Route path="/login" exact Component={Login} />
              <Route path="/register" exact Component={Register} />
            </Routes>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
