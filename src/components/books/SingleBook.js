import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, PageHeader, Tabs, Button, Modal, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import BookContext from '../../contexts/book/bookContext';
import AuthContext from '../../contexts/auth/authContext';
import CartContext from '../../contexts/cart/cartContext';

import Spinner from '../layouts/Spinner';
import NotFound from '../layouts/NotFound';
import DeleteBook from './DeleteBook';
import EditBook from './EditBook';

const { TabPane } = Tabs;

const SingleBook = ({ match, history }) => {
  const { book, loading, getBook } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    getBook(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  if (!book) return <NotFound />;

  const { _id, coverUrl, title, description } = book;

  const onPickToBorrow = async () => {
    const hide = message.loading('Action in progress..', 0);
    setDisabled(true);

    await addToCart(_id);

    setTimeout(hide, 0);
    message.success(`${title} added to cart`);
    setDisabled(false);
  };

  return (
    <Row>
      <Col span={8}>
        <img style={{ width: '100%' }} src={coverUrl} alt={title} />
      </Col>
      <Col span={16}>
        <PageHeader
          className='site-page-header-responsive'
          onBack={() => window.history.back()}
          title={title}
          extra={
            user && user.isAdmin
              ? [
                  <Button type='primary' onClick={() => setVisible(true)}>
                    Edit
                  </Button>,
                  <DeleteBook id={_id} history={history} />,
                ]
              : [
                  user ? (
                    <Button
                      icon={<ShoppingCartOutlined />}
                      type='primary'
                      onClick={onPickToBorrow}
                      disabled={disabled}
                    >
                      Pick to Borrow
                    </Button>
                  ) : (
                    <Link to='/login'>
                      <Button icon={<ShoppingCartOutlined />} type='primary'>
                        Pick to Borrow
                      </Button>
                    </Link>
                  ),
                ]
          }
          footer={
            <Tabs defaultActiveKey='1'>
              <TabPane tab='Details' key='1' />
              <TabPane tab='Reviews' key='2' />
            </Tabs>
          }
        >
          {description}
        </PageHeader>
      </Col>
      <Modal
        title='Edit Book'
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <EditBook setVisible={setVisible} single={true} />
      </Modal>
    </Row>
  );
};

export default SingleBook;
