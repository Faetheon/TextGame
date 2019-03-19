import React, {useState} from 'react';
import Tile from './Tile.jsx';

export default ({isMoving, updateIsMoving, playerPos, updatePlayerPos, line, i}) => {
  let j;
  
  return (
    <div className={`line ${i}`}
      onClick={
        (e) => {
          j = Number(e.target.classList[1]);
          if (!isMoving) {
            function yAxisMove() {
              if(i > playerPos[0]) {
                updatePlayerPos([++playerPos[0], playerPos[1]]);
              } else if(i < playerPos[0]) {
                updatePlayerPos([--playerPos[0], playerPos[1]]);
              }
              if(j !== playerPos[1]) {
                window.yAxisTimeoutClear = setTimeout(xAxisMove, 1000);
              } else if(i !== playerPos[0]) {
                window.xAxisTimeoutClear = setTimeout(yAxisMove, 1000);
              }
              if (j === playerPos[1] && i === playerPos[2]) {
                updateIsMoving(false);
              }
            }
            
            function xAxisMove() {
              if(j > playerPos[1]) {
                updatePlayerPos([playerPos[0], ++playerPos[1]]);
              } else if(j < playerPos[1]) {
                updatePlayerPos([playerPos[0], --playerPos[1]]);
              }
              if(i !== playerPos[0]) {
                window.yAxisTimeoutClear = setTimeout(yAxisMove, 1000);
              } else if(j !== playerPos[1]) {
                window.xAxisTimeoutClear = setTimeout(xAxisMove, 1000);
              }
              if (j === playerPos[1] && i === playerPos[2]) {
                updateIsMoving(false);
              }
            }
            playerPos[0] - i > playerPos[1] - j ?
              yAxisMove()
                :
              xAxisMove()
          }
          updateIsMoving(true);
        }
      }
    >
      {
        line.map((tile, j) => (
          playerPos[0] === i ?
            <Tile j={j} tile={tile} key={j} playerPos={playerPos}/>
              :
            <Tile j={j} tile={tile} key={j}/>
        ))
      }
    </div>
  );
};