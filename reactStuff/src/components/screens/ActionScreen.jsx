import React from 'react';
import {withRouter} from 'react-router-dom';

export default withRouter(({player, playerStatus, updatePlayerStatus, updateStatusText, history}) => {
  if (!player.isCreated) {
    history.push('/');
  }
  if (player.exp >= player.expToNextLevel) {
    player.exp -= player.expToNextLevel;
    player.level++;
    player.skillPoints += 5;
    player.stats.strength++;
    player.stats.agility++;
    player.stats.intelligence++;
    player.stats.charisma++;
    player.stats.will++;
    player.levelUp();
    updateStatusText(`Congratulations! You leved up to level ${player.level}!
    How would you like to distribute your stats? (since this is still in beta +1 to all stats :3)
    `)
    updatePlayerStatus(`You have ${player.health} health and ${player.mana} mana.`);
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