import React, { useContext } from 'react';
import { Table, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

import CartContext from '../../contexts/cart/cartContext';

import ChangeQuantity from './ChangeQuantity';

const Cart = () => {
  const { cart } = useContext(CartContext);

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
            <span style={{ maxWidth: '300px' }}>{item.book.title}</span>
          </Link>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => (
        <Row size='middle'>
          <Col flex='60%' style={{ marginBottom: '5px', marginRight: '5px' }}>
            <ChangeQuantity quantity={item.quantity} bookId={item.book._id} />
          </Col>
          <Col flex='30%'>
            <Button type='danger'>Delete</Button>
          </Col>
        </Row>
      ),
    },
  ];

  return <Table columns={columns} dataSource={cart} />;
};

export default Cart;
