import React from 'react';

export default function({player}) {

  return (
    <div className='attribute-card'>
      <div className='bars'>
        <div className='health bar'>{player.health}/{maxHealth}</div>
        <div className='mana bar'>{player.mana}/{player.maxMana}</div>
        <div className='exp bar'>{player.exp}/{expToNextLevel}</div>
      </div>
      <div className='player-data'>
        <p className='stats'>
          {`Strength: ${player.stats.strength}`}
          <br />
          {`Agility: ${player.stats.agility}`}
          <br />
          {`Intelligence: ${player.stats.intelligence}`}
          <br />
          {`Will: ${player.stats.will}`}
        </p>
      </div>
      <div className='inventory'></div>
    </div>
  );
}