import React from 'react';
import {withRouter} from 'react-router-dom';
import Tile from './Tile.jsx';

// Functions
import spawnMonster from '../../functionsAndClasses/spawnMonster.js';

export default withRouter(({history, player, isMoving, updateIsMoving, playerPos, updatePlayerPos, line, i}) => {
  let j;
  
  return (
    <div className={`line ${i}`}
      onClick={
        (e) => {
          j = Number(e.target.classList[1]);
          if (!isMoving && !player.isFighting) {
            function yAxisMove() {
              if (player.isFighting) {
                return;
              }
              if(i > playerPos[0]) {
                updatePlayerPos([++playerPos[0], playerPos[1]]);
              } else if(i < playerPos[0]) {
                updatePlayerPos([--playerPos[0], playerPos[1]]);
              }
              let encounter = Math.floor(Math.random() * 10);
              if (encounter === 1) {
                player.isFighting = true;
                spawnMonster();
                history.push('/fighting');
                updateIsMoving(false);
                } else {
                if(j !== playerPos[1]) {
                  window.yAxisTimeoutClear = setTimeout(xAxisMove, 1000);
                } else if(i !== playerPos[0]) {
                  window.xAxisTimeoutClear = setTimeout(yAxisMove, 1000);
                }
                if (j === playerPos[1] && i === playerPos[0]) {
                  updateIsMoving(false);
                }
              }
            }
            
            function xAxisMove() {
              if (player.isFighting) {
                return;
              }
              if(j > playerPos[1]) {
                updatePlayerPos([playerPos[0], ++playerPos[1]]);
              } else if(j < playerPos[1]) {
                updatePlayerPos([playerPos[0], --playerPos[1]]);
              }
              let encounter = Math.floor(Math.random() * 10);
              if (encounter === 1) {
                player.isFighting = true;
                spawnMonster();
                history.push('/fighting');
                updateIsMoving(false);
                } else {
                if(i !== playerPos[0]) {
                  window.yAxisTimeoutClear = setTimeout(yAxisMove, 1000);
                } else if(j !== playerPos[1]) {
                  window.xAxisTimeoutClear = setTimeout(xAxisMove, 1000);
                }
                if (j === playerPos[1] && i === playerPos[0]) {
                  updateIsMoving(false);
                }
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
});