/* eslint-disable no-undef */
import React, { useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import {
  BrowserRouter as Router, Link, NavLink, Route, Switch
} from 'react-router-dom';

import SMTP from './pages/SMTP'
import MailSendTest from './pages/MailSendTest'
import LogTable from './pages/LogTable'
import EmailControl from './pages/EmailControl'
// import About from './pages/About'
import SnackMsg from './components/Childs/SnackMsg'
import bitLogo from './resources/img/logo.png'
import './resources/sass/app.scss';

function App() {
  const [snack, setsnack] = useState({ show: false })
  return (

    <div>
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <Router basename={typeof bit_wp_smtp !== 'undefined' ? bit_wp_smtp.baseURL : '/'}>
        <div id="btcd-app">
          <div className="top-header">
            <span>Developed by&nbsp;</span>
            <a href="https://www.bitpress.pro" target="_blank" rel="noreferrer">
              <img src={bitLogo} alt="BitPress" />
            </a>
          </div>
          <div className="nav-wrp">
            <div className="flx">
              <div className="logo flx" title="Bit Form">
                <Link to="/" className="flx" activeClassName="app-link-active">
                  <span className="ml-2">General</span>
                </Link>
              </div>
              <nav className="top-nav ml-2">
                <NavLink
                  to="/test-email"
                  activeClassName="app-link-active"
                >
                  Email Test
              </NavLink>
                <NavLink
                  to="/email-log"
                  activeClassName="app-link-active"
                >
                  Email Log
              </NavLink>
                <NavLink
                  to="/email-control"
                  activeClassName="app-link-active"
                >
                  Email Controls
              </NavLink>
                {/* <NavLink
                  to="/about-us"
                  activeClassName="app-link-active"

                >
                  About Us
              </NavLink> */}
              </nav>
            </div>
          </div>
          <Switch>
            <Route exact path="/">
              <SMTP setsnack={setsnack} />
            </Route>
            <Route path="/test-email">
              <MailSendTest setsnack={setsnack} />
            </Route>
            <Route path="/email-log">
              <LogTable />
            </Route>
            <Route path="/email-control">
              <EmailControl />
            </Route>
            {/* <Route path="/about-us">
              <About />
            </Route> */}

          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
