import React, {useState} from 'react';

export default function({player}) {
  const [strength, updateStrength] = useState(player.stats.strength);
  const [agility, updateAgility] = useState(player.stats.agility);
  const [intelligence, updateIntelligence] = useState(player.stats.intelligence);
  const [will, updateWill] = useState(player.stats.will);
  return (
    <div className='attribute-card'>
      <div className='bars'>
        <div className='health bar'>{player.health}/{player.maxHealth}</div>
        <div className='mana bar'>{player.mana}/{player.maxMana}</div>
        <div className='exp bar'>{player.exp}/{player.expToNextLevel}</div>
      </div>
      <div className='player-data'>
        <p className='stats'>
          {`Strength: ${strength}`}
        {
          player.skillPoints > 0 ?
            <button onClick={() => {
              player.stats.strength++;
              player.skillPoints--;
              player.updateStats();
              updateStrength(player.stats.strength);
            }}>+</button>
              :
            ''
        }
        <br />
          {`Agility: ${agility}`}
        {
          player.skillPoints > 0 ?
            <button onClick={() => {
              player.stats.agility++;
              player.skillPoints--;
              player.updateStats();
              updateAgility(player.stats.agility);
            }}>+</button>
              :
            ''
        }
          <br />
          {`Intelligence: ${intelligence}`}
        {
          player.skillPoints > 0 ?
            <button onClick={() => {
              player.stats.intelligence++;
              player.skillPoints--;
              player.updateStats();
              updateIntelligence(player.stats.intelligence);
            }}>+</button>
              :
            ''
        }
          <br />
          {`Will: ${will}`}
        {
          player.skillPoints > 0 ?
            <button onClick={() => {
              player.stats.will++;
              player.skillPoints--;
              player.updateStats();
              updateWill(player.stats.will);
            }}>+</button>
              :
            ''
        }
        </p>
      </div>
      <div className='inventory'></div>
    </div>
  );
}