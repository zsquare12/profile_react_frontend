
import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Body from './components/body';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/header'>Header</Link></li>
          <li><Link to='/footer'>Footer</Link></li>
        </ul>
      </nav>


      <Routes>
        <Route path='/' exact Component={Body} />
        <Route path='/header' exact Component={Header} />
        <Route path='/footer' exact Component={Footer} />
      </Routes>
    </Router>
  );
}

export default App;
