import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

// States
import BookState from './contexts/book/BookState';

// Routes
import DefaultLayoutRoute from './components/routing/DefaultLayoutRoute';

// Components
import Books from './components/books/Books';
import Login from './components/auth/Login';

const App = () => {
  return (
    <BookState>
      <Router>
        <Switch>
          <DefaultLayoutRoute exact path='/' component={Books} />
          <DefaultLayoutRoute exact path='/login' component={Login} />
        </Switch>
      </Router>
    </BookState>
  );
};

export default App;
