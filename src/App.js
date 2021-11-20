import './App.css';
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider } from './AuthContext';
import EventPage from './components/EventPage/EventPage';
import ProgramForm from './components/ProgramForm/ProgramForm';
import AnnouncementPage from './components/AnnouncementPage/AnnouncementPage';
import ContactForm from './components/ContactForm/ContactForm';
import Jubo from './components/Jubo/Jubo';
import AdminHeader from './components/AdminHeader/AdminHeader';
import Account from './components/Account/Account';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Welcome from './components/Welcome/Welcome';
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Route path='/jubo/:jubo' exact>
            <Jubo></Jubo>
          </Route>
          <div className='adminWrapper'>
            <div className='adminContainer'>
              {['/admin/:userid', '/admin/:userid/account', '/admin/:userid/event/:eventid', '/admin/:userid/event/:eventid/program', '/admin/:userid/event/:eventid/contact', '/admin/:userid/event/:eventid/announcements'].map(path => {
                return(
                  <Route key={path} path={path}>
                    <AdminHeader />
                  </Route>
                )
              })}
              <Route path='/' exact>
                <Welcome/>
              </Route>
              <Route path='/login'>
                <Login/>
              </Route>
              <Route path='/signup'>
                <SignUp/>
              </Route>
              <PrivateRoute component={Dashboard} path='/admin/:userid' exact/>
              <PrivateRoute component={Account} path='/admin/:userid/account'/>
              <PrivateRoute component={EventPage} path='/admin/:userid/event/:eventid' exact />
              <PrivateRoute component={ProgramForm} path='/admin/:userid/event/:eventid/program' />
              <PrivateRoute component={AnnouncementPage} path='/admin/:userid/event/:eventid/announcements' exact/>
              <PrivateRoute component={ContactForm} path='/admin/:userid/event/:eventid/contact'/>
            </div>
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
}
export default App;
