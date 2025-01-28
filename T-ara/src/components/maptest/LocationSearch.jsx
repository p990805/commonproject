import React, { useState } from 'react';

const LocationSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div style={{ padding: '10px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location"
        style={{ width: '80%', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ padding: '5px', marginLeft: '5px' }}>
        Search
      </button>
    </div>
  );
};

export default LocationSearch;
