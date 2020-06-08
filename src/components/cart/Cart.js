import React, { useContext, Fragment, useEffect } from 'react';
import { Table, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import CartContext from '../../contexts/cart/cartContext';

import ChangeQuantity from './ChangeQuantity';
import RemoveBook from './RemoveBook';
import MakeTransaction from './MakeTransaction';
import Spinner from '../layouts/Spinner';

const Cart = () => {
  const { cart } = useContext(CartContext);

  useEffect(() => {
    localStorage.setItem('currentMenu', 'cart');
  }, []);

  const columns = [
    {
      title: 'Cover',
      key: 'cover',
      render: (item) => {
        return (
          <Link to={`/books/${item.book._id}`}>
            <img
              style={{ width: '50px' }}
              src={item.book.coverUrl}
              alt='cover'
            />
          </Link>
        );
      },
    },
    {
      title: 'Title',
      key: 'title',
      render: (item) => (
        <>
          <Link to={`/books/${item.book._id}`}>
            <span>{item.book.title}</span>
          </Link>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => (
        <Row size='middle'>
          <Col flex='45%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            <ChangeQuantity quantity={item.quantity} bookId={item.book._id} />
          </Col>
          <Col flex='45%'>
            <RemoveBook bookId={item.book._id} title={item.book.title} />
          </Col>
        </Row>
      ),
    },
  ];

  if (!cart) return <Spinner />;

  return (
    <Fragment>
      <Table columns={columns} dataSource={cart} pagination={false} />
      <MakeTransaction />
    </Fragment>
  );
};

export default Cart;
