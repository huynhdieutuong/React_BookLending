import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// States
import AlertState from './contexts/alert/AlertState';
import BookState from './contexts/book/BookState';
import AuthState from './contexts/auth/AuthState';
import TransactionState from './contexts/transaction/TransactionState';
import UserState from './contexts/user/UserState';

// Routes
import Routes from './components/routing/Routes';

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <UserState>
          <TransactionState>
            <BookState>
              <Router>
                <Routes />
              </Router>
            </BookState>
          </TransactionState>
        </UserState>
      </AuthState>
    </AlertState>
  );
};

export default App;
