import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import spawnedMonsters from '../../gameData/spawnedMonsters.js';
import Player from '../../functionsAndClasses/PlayerClass.js';

export default withRouter(({player, updatePlayer, playerStatus, updatePlayerStatus, updateStatusText, updateEnemyStatus, history}) => {
  if (!player.isCreated) {
    history.push('/');
  } else if (!player.isFighting) {
    history.push('/acting');
  }
  updateEnemyStatus(`
    You are fighting a ${spawnedMonsters[0].name}.
    They have ${spawnedMonsters[0].health} hp left.

    ${spawnedMonsters[0].desc || ''}
  `);
  return (
    <div>
      <div className="player-options">
        You can {player.combatMoves.reduce((acc, curr, i, arr) => acc += (i === arr.length - 1 ? ` or ${curr}` : ` ${curr},`), '')}.
        <br />
        {playerStatus}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        player.fight(e.target.actionName.value, updateStatusText);
        updatePlayerStatus(`You have ${player.health} health and ${player.mana} mana.`);
        if (player.health < 1) {
          alert('You have died!!')
          updatePlayer(new Player());
          updateEnemyStatus('...');
          updateStatusText('...');
        } else if (player.isRunning) {
          updateStatusText('Coward...');
          updateEnemyStatus(`The ${spawnedMonsters[0].name} insults you.`)
          player.isRunning = false;
          history.push('/acting');
        } else if (spawnedMonsters[0].health < 1) {
          updateStatusText(`You win!\nYou've recieved ${spawnedMonsters[0].exp} experience.`)
          updateEnemyStatus(`Hmmm... I guess we wait :3`)
          history.push('/acting');
        }
        e.target.actionName.value = '';
      }}>
        <input placeholder="Enter action name" name="actionName"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
});