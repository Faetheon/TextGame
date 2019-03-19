import React from 'react';
import Tile from './Tile.jsx';

export default ({playerPos, updatePlayerPos, line, i}) => {
  let yAxisTimeoutClear;
  let xAxisTimeoutClear;
  let j;

  return (
    <div className={`line ${i}`}
      onClick={
        (e) => {

          clearTimeout(yAxisTimeoutClear);
          clearTimeout(xAxisTimeoutClear);
          
          j = Number(e.target.classList[1]);

          function yAxisMove() {
            if(i > playerPos[0]) {
              updatePlayerPos([++playerPos[0], playerPos[1]]);
            } else if(i < playerPos[0]) {
              updatePlayerPos([--playerPos[0], playerPos[1]]);
            }
            if(j !== playerPos[1]) {
              yAxisTimeoutClear = setTimeout(xAxisMove, 1000);
            } else if(i !== playerPos[0]) {
              xAxisTimeoutClear = setTimeout(yAxisMove, 1000);
            }
          }
          
          function xAxisMove() {
            if(j > playerPos[1]) {
              updatePlayerPos([playerPos[0], ++playerPos[1]]);
            } else if(j < playerPos[1]) {
              updatePlayerPos([playerPos[0], --playerPos[1]]);
            }
            if(i !== playerPos[0]) {
              xAxisTimeoutClear = setTimeout(yAxisMove, 1000);
            } else if(j !== playerPos[1]) {
              xAxisTimeoutClear = setTimeout(xAxisMove, 1000);
            }
          }

          yAxisMove();
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