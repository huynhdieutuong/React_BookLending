import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = () => {
  return (
    <Search
      placeholder="Type book's title"
      onSearch={(value) => console.log(value)}
      style={{ width: 250 }}
    />
  );
};

export default SearchBar;
