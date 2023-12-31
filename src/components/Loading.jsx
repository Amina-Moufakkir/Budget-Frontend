import React from 'react';

const Loading = ({ center }) => {
  return (
    <div className={center ? 'loader loading-center' : 'loading'}>
      Loading...
    </div>
  );
};

export default Loading;
