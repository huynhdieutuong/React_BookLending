import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// States
import AlertState from './contexts/alert/AlertState';
import BookState from './contexts/book/BookState';
import AuthState from './contexts/auth/AuthState';
import TransactionState from './contexts/transaction/TransactionState';
import UserState from './contexts/user/UserState';
import CartState from './contexts/cart/CartState';

// Routes
import Routes from './components/routing/Routes';

const App = () => {
  return (
    <AlertState>
      <CartState>
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
      </CartState>
    </AlertState>
  );
};

export default App;
