import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

// States
import AlertState from './contexts/alert/AlertState';
import BookState from './contexts/book/BookState';
import AuthState from './contexts/auth/AuthState';
import TransactionState from './contexts/transaction/TransactionState';

// Routes
import DefaultLayoutRoute from './components/routing/DefaultLayoutRoute';
import PrivateDefaultLayoutRoute from './components/routing/PrivateDefaultLayoutRoute';
import PublicDefaultLayoutRoute from './components/routing/PublicDefaultLayoutRoute';

// Components
import Books from './components/books/Books';
import SingleBook from './components/books/SingleBook';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import Transactions from './components/transaction/Transactions';
import SingleTransaction from './components/transaction/SingleTransaction';

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <TransactionState>
          <BookState>
            <Router>
              <Switch>
                <DefaultLayoutRoute exact path='/' component={Books} />
                <DefaultLayoutRoute exact path='/search' component={Books} />
                <DefaultLayoutRoute
                  exact
                  path='/books/:id'
                  component={SingleBook}
                />
                <PublicDefaultLayoutRoute
                  exact
                  path='/login'
                  component={Login}
                />
                <PublicDefaultLayoutRoute
                  exact
                  path='/register'
                  component={Register}
                />
                <PrivateDefaultLayoutRoute
                  exact
                  path='/profile'
                  component={Profile}
                />
                <PrivateDefaultLayoutRoute
                  exact
                  path='/transactions'
                  component={Transactions}
                />
                <PrivateDefaultLayoutRoute
                  exact
                  path='/transactions/:id'
                  component={SingleTransaction}
                />
              </Switch>
            </Router>
          </BookState>
        </TransactionState>
      </AuthState>
    </AlertState>
  );
};

export default App;
