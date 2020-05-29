import React, { useContext } from 'react';
import { Input } from 'antd';
import BookContext from '../../contexts/book/bookContext';

const { Search } = Input;

const SearchBar = () => {
  const { getBooks, setTextSearch } = useContext(BookContext);

  return (
    <Search
      placeholder="Type book's title"
      onSearch={(text) => {
        getBooks(text);
        setTextSearch(text);
      }}
      style={{ maxWidth: 250 }}
    />
  );
};

export default SearchBar;
