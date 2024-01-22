import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
  return (
    <div className='loading-container' style={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Spinner animation='grow' />
    </div>
  )
}

export default Loading;