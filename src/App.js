import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

// States
import AlertState from './contexts/alert/AlertState';
import BookState from './contexts/book/BookState';
import AuthState from './contexts/auth/AuthState';

// Routes
import DefaultLayoutRoute from './components/routing/DefaultLayoutRoute';

// Components
import Books from './components/books/Books';
import SingleBook from './components/books/SingleBook';
import Login from './components/auth/Login';

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <BookState>
          <Router>
            <Switch>
              <DefaultLayoutRoute exact path='/' component={Books} />
              <DefaultLayoutRoute
                exact
                path='/books/:id'
                component={SingleBook}
              />
              <DefaultLayoutRoute exact path='/login' component={Login} />
            </Switch>
          </Router>
        </BookState>
      </AuthState>
    </AlertState>
  );
};

export default App;
