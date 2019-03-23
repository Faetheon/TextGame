import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import spawnedMonsters from '../../gameData/spawnedMonsters.js';
import Player from '../../functionsAndClasses/PlayerClass.js';
import updateCssForBars from '../utils/updateCssForBars.js';

export default withRouter(({updateIsMoving, player, updatePlayer, playerStatus, updatePlayerStatus, updateStatusText, updateEnemyStatus, history}) => {
  const [lastAction, updateLastAction] = useState('');
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
        player.fight(e.target.actionName.value.length > 0 ? e.target.actionName.value : lastAction, updateStatusText);
        updateLastAction(e.target.actionName.value.length > 0 ? e.target.actionName.value : lastAction);
        updatePlayerStatus(`You have ${player.health} health and ${player.mana} mana.`);
        updateEnemyStatus(`
          You are fighting a ${spawnedMonsters[0].name}.
          They have ${spawnedMonsters[0].health} hp left.

          ${spawnedMonsters[0].desc || ''}
        `);
        if (player.health < 1) {
          alert('You have died!!')
          updatePlayer(new Player());
          updateIsMoving(false);
          updateEnemyStatus('...');
          updateStatusText('...');
        } else if (player.isRunning) {
          updateStatusText('Coward...');
          player.isRunning = false;
          player.isFighting = false;
          updateIsMoving(false);
          updateEnemyStatus('...');
          history.push('/acting');
        } else if (spawnedMonsters[0].health < 1) {
          player.exp += spawnedMonsters[0].exp;
          player.isFighting = false;
          updateIsMoving(false);
          updateStatusText(`You win!\nYou've recieved ${spawnedMonsters[0].exp} experience.`)
          updateEnemyStatus(`Hmmm... I guess we wait :3`)
          spawnedMonsters.pop();
          history.push('/acting');
        }
        updatePlayer(player);
        updateCssForBars(player);
        e.target.actionName.value = '';
      }}>
        <input placeholder={lastAction || 'Action name'} name="actionName"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
});