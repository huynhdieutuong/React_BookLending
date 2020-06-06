import React, { useEffect, useContext, useState } from 'react';
import { Row, Col, PageHeader, Tabs, Button, Modal } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

import BookContext from '../../contexts/book/bookContext';
import AuthContext from '../../contexts/auth/authContext';

import Spinner from '../layouts/Spinner';
import NotFound from '../layouts/NotFound';
import DeleteBook from './DeleteBook';
import EditBook from './EditBook';

const { TabPane } = Tabs;

const SingleBook = ({ match, history }) => {
  const { book, loading, getBook } = useContext(BookContext);
  const { user } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

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
                  <Button type='primary' onClick={() => setVisible(true)}>
                    Edit
                  </Button>,
                  <DeleteBook id={_id} history={history} />,
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
