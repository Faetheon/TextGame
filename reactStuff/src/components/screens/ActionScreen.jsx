import React from 'react';
import {withRouter} from 'react-router-dom';
import spawnedMonsters from '../../gameData/spawnedMonsters.js';

export default withRouter(({player, playerStatus, updatePlayerStatus, updateStatusText, history}) => {
  if (!player.isCreated) {
    history.push('/');
  }
  return (
    <div>
      <div className="player-options">
        You can {player.actions.reduce((acc, curr, i, arr) => acc + (i === arr.length - 1 ? ` or ${curr}` : ` ${curr},`), '')}.
        <br />
        {playerStatus}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        player.action(e.target.actionName.value, updateStatusText);
        updatePlayerStatus(`You have ${player.health} health and ${player.mana} mana.`);
        if (player.isFighting) {
          history.push('/fighting');
        }
        e.target.actionName.value = '';
      }}>
        <input placeholder="Enter action name" name="actionName"></input>
        <input type="submit"></input>
      </form>
    </div>
  )
});