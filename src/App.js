import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from 'react-router-dom';

import Header from './components/Shared/Header'
// import Home from './components/Home';
import Home from './components/Task/Home'
import SignIn from './components/Login/SignIn'
import SignUp from './components/Login/SignUp'
import PasswordReset from './components/Login/PasswordReset';


// import './App.css';  // Import the external CSS file

function App() {
  return (
    <>
      <Router>
        <div className="cont">
          <header>
            <Header />
          </header>

          <main>
            <Routes>
              <Route path="/" exact Component={Home} />
              <Route path="/signin" exact Component={SignIn} />
              <Route path="/signup" exact Component={SignUp} />
              <Route path="/reset-password" exact Component={PasswordReset} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
}

export default App;
