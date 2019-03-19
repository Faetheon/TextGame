import React from 'react';

export default ({playerPos, tile, j}) => (
  playerPos ?
    playerPos[1] === j ?
      <div className={`tile ${j} player ${tile}`}></div>
        :
      <div className={`tile ${j} ${tile}`}></div>
      :
    <div className={`tile ${j} ${tile}`}></div>
);