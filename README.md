# Book Lending

> An ecommerce site for lending books

This is a React application. It is a small ecommerce site for lending books that includes authentication, books and transactions, profile, cart, admin.

```
Account Admin:
Please contact me
```

## Demo Live

### The App is live at [Netlify.com](https://tuong-book-lending.netlify.app/)

### The API is live at [Swagger.io](https://app.swaggerhub.com/apis/huynhdieutuong/book-lending_api/1.0.0)

---

# Functionality

## Books

- Get books & pagination
- Search books by title
- Get book by ID

## Cart (Require Login)

- Get cart
- Add to cart
- Remove book in cart
- Decrease & Increase number's book
- Make transaction

## Auth

- Register user
- Login user
- Login with Facebook & Google
- Get logged in user
- Prevent access Transactions, Profile if not log in.

## Profile (Require Login)

- Update info
- Change password (Require current password)
- Update avatar

## Transactions (Require Login)

- Get transactions by user ID
- Get transaction by ID (owner)

## Admin (Require Admin)

### Books

- Get books & pagination
- Search books by title
- Create book
- Edit book
- Delete book

### Users

- Get users & pagination
- Search users by name
- Get user by ID
- Create user
- Edit user
- Delete user
- Mark as Blocked (when fail login over 3 times) & Active

### Transactions

- Get transactions & pagination
- Search transactions by ID
- Get transaction by ID
- Create transaction
- Edit transaction
- Delete transaction
- Mark as Complete & Uncomplete

---

# Quick Start

### Install dependencies

```
npm install
```

### Build for production

```
npm run build
```

---

## App Info

### Author

Tuong Huynh

### Version

1.0.0

### License

This project is licensed under the MIT License
