/* eslint-disable no-undef */
import React, { useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import {
  BrowserRouter as Router, Link, NavLink, Route, Switch
} from 'react-router-dom';

import SMTP from './pages/SMTP'
import MailSendTest from './pages/MailSendTest'
import SnackMsg from './components/Childs/SnackMsg'
import './resources/sass/app.scss'
import Others from './pages/Others'
import { Toaster } from 'react-hot-toast';

function App() {
  const [snack, setsnack] = useState({ show: false })
  return (

    <div>
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <Toaster
        position="bottom-right"
        containerStyle={{ inset: '-25px 30px 20px -10px' }}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            bottom: 40,
            padding: '15px 18px',
            boxShadow: '0 0px 7px rgb(0 0 0 / 30%), 0 3px 30px rgb(0 0 0 / 20%)',
          },
        }}
      />
      <Router basename={typeof bit_wp_smtp !== 'undefined' ? bit_wp_smtp.baseURL : '/'}>
        <div id="btcd-app">
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
                  to="/others"
                  activeClassName="app-link-active"
                >
                  Others
              </NavLink>
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
            <Route path="/others">
              <Others />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
