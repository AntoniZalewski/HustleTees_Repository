import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <Spinner
      animation='grow'
      role='status'
      className='black-spinner'
      style={{
        height: '100px',
        width: '100px',
        margin: 'auto',
        display: 'block',
      }}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
}

export default Loader;
