import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// States
import AlertState from './contexts/alert/AlertState';
import BookState from './contexts/book/BookState';
import AuthState from './contexts/auth/AuthState';
import TransactionState from './contexts/transaction/TransactionState';

// Routes
import Routes from './components/routing/Routes';

const App = () => {
  return (
    <AlertState>
      <AuthState>
        <TransactionState>
          <BookState>
            <Router>
              <Routes />
            </Router>
          </BookState>
        </TransactionState>
      </AuthState>
    </AlertState>
  );
};

export default App;
