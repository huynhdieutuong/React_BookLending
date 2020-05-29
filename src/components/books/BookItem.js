import React from 'react';
import { Col, Card } from 'antd';

const BookItem = ({ book }) => {
  const { title, coverUrl, _id } = book;

  return (
    <Col span={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Card
        hoverable
        style={{ width: 200, height: 300, margin: '8px 0' }}
        cover={<img style={{ height: 300 }} alt={title} src={coverUrl} />}
      />
    </Col>
  );
};

export default BookItem;
