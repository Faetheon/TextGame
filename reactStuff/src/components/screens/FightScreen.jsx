import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import spawnedMonsters from '../../gameData/spawnedMonsters.js';

export default withRouter(({player, updateStatusText, updateEnemyStatus, history}) => {
  if (!player.isCreated) {
    history.push('/');
  } else if (!player.isFighting) {
    history.push('/acting');
  }
  return (
    <div>
      <div className="player-options">You can {player.combatMoves.reduce((acc, curr, i, arr) => acc += (i === arr.length - 1 ? ` or ${curr}` : ` ${curr},`), '')}.</div>
      <form onSubmit={(e) => {
        e.preventDefault();
        player.fight(e.target.actionName.value, updateStatusText);
        if (spawnedMonsters[0].health < 1) {
          updateStatusText(`You win!\nYou've recieved ${spawnedMonsters[0].exp} experience.`)
          history.push('/acting');
        } else {
          updateEnemyStatus(`
          You are fighting${spawnedMonsters[0].name}.
          They have ${spawnedMonsters[0].health} hp left.

          ${spawnedMonsters[0].desc || ''}
          `)
        }
        e.target.actionName.value = '';
      }}>
        <input placeholder="Enter action name" name="actionName"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
});