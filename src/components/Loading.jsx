import React from 'react';
import { Triangle } from 'react-loader-spinner';

function Loading() {
  return (
    <div
      style={{
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Triangle color="#00BFFF" height={100} width={100} />
    </div>
  );
}

export default Loading;
