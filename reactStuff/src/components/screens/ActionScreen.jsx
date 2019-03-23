import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import updateCssForBars from '../utils/updateCssForBars.js';

export default withRouter(({player, updatePlayer, playerStatus, updatePlayerStatus, updateStatusText, history}) => {
  const [lastAction, updateLastAction] = useState('');
  if (!player.isCreated) {
    history.push('/');
  }
  while (player.exp >= player.expToNextLevel) {
    player.exp -= player.expToNextLevel;
    player.level++;
    player.skillPoints += 5;
    player.updateStats();
  }
  if (player.skillPoints > 0) {
    updateStatusText(`Congratulations! You leved up to level ${player.level}!
    How would you like to distribute your stats?
    `);
  }
  updatePlayerStatus(`You have ${player.health} health and ${player.mana} mana.`);
  updateCssForBars(player);
  return (
    <div>
      <div className="player-options">
        You can {player.actions.reduce((acc, curr, i, arr) => acc + (i === arr.length - 1 ? ` or ${curr}` : ` ${curr},`), '')}.
        <br />
        {playerStatus}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        player.action(e.target.actionName.value.length > 0 ? e.target.actionName.value : lastAction, updateStatusText);
        updateLastAction(e.target.actionName.value.length > 0 ? e.target.actionName.value : lastAction);
        updatePlayerStatus(`You have ${player.health} health and ${player.mana} mana.`);
        if (player.isFighting) {
          history.push('/fighting');
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