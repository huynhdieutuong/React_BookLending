import React, { useContext, useState, useEffect } from 'react';
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';

import BookContext from '../../contexts/book/bookContext';

const { Search } = Input;

const SearchBar = ({ history, location }) => {
  const { getBooks } = useContext(BookContext);

  const [textSearch, setTextSearch] = useState(
    localStorage.getItem('textSearch')
  );

  useEffect(() => {
    if (location.pathname !== '/search') {
      setTextSearch('');
    }
  }, [location]);

  return (
    <Search
      value={textSearch}
      onChange={(e) => setTextSearch(e.target.value)}
      placeholder="Type book's title"
      onSearch={(text) => {
        history.push('/search');
        getBooks(text);
        localStorage.setItem('textSearch', text);
      }}
      style={{ maxWidth: 250 }}
    />
  );
};

export default withRouter(SearchBar);
