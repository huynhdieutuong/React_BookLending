import React, { useEffect, useContext } from 'react';
import { Row, Col, PageHeader, Tabs, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import BookContext from '../../contexts/book/bookContext';
import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import NotFound from '../layouts/NotFound';

const { TabPane } = Tabs;

const SingleBook = ({ match }) => {
  const { book, loading, getBook } = useContext(BookContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getBook(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  if (!book) return <NotFound />;

  const { _id, coverUrl, title, description } = book;

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
            user.isAdmin
              ? [
                  <Button key='3' type='primary'>
                    Edit
                  </Button>,
                  <Button key='2' type='danger'>
                    Delete
                  </Button>,
                ]
              : [
                  <Button
                    icon={<ShoppingCartOutlined />}
                    key='1'
                    type='primary'
                  >
                    Pick to Borrow
                  </Button>,
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
    </Row>
  );
};

export default SingleBook;
