import React from 'react';

const Sidebar = ({ selectedLocation }) => {
  if (!selectedLocation) {
    return <div style={{ padding: '10px' }}>Select a location to see details.</div>;
  }

  const { properties } = selectedLocation;

  return (
    <div style={{ padding: '10px', borderLeft: '1px solid #ccc' }}>
      <h3>Location Details</h3>
      <p><strong>Name:</strong> {properties.name}</p>
      <p><strong>Area:</strong> {properties.area}</p>
    </div>
  );
};

export default Sidebar;
