import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SubSearchBar = ({ placeholder, getData }) => {
  const [textSearch, setTextSearch] = useState(
    localStorage.getItem('textSubSearch')
  );

  return (
    <Search
      value={textSearch}
      onChange={(e) => setTextSearch(e.target.value)}
      placeholder={placeholder}
      onSearch={(text) => {
        getData(text);
        localStorage.setItem('textSubSearch', text);
      }}
      style={{ maxWidth: 200 }}
    />
  );
};

export default SubSearchBar;
