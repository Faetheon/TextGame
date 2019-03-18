import React, {useState} from 'react';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom';

import spawnMonster from '../functionsAndClasses/spawnMonster.js';
import FightScreen from './screens/FightScreen.jsx';
import CharacterCreationScreen from './screens/CharacterCreationScreen.jsx';
import ActionScreen from './screens/ActionScreen.jsx';
import Player from '../functionsAndClasses/PlayerClass.js';


export default () => {
  const spawnedMonsters = [];
  spawnMonster.bind(spawnedMonsters);
  const [statusText, updateStatusText] = useState('Welcome to the land of... dirt I guess ¯\\_(ツ)_/¯');
  const [player, updatePlayer] = useState(new Player());
  const [enemyStatus, updateEnemyStatus] = useState('There is no enemy... Yet >:)')
  const [playerStatus, updatePlayerStatus] = useState(`You have ${player.health} health and ${player.mana} mana.`);
  return (
      <Router>
        <div>
          <Route path='/' exact render={() => (
            <CharacterCreationScreen updateStatusText={updateStatusText} updatePlayer={updatePlayer} Player={Player}/>
          )}/>
          <Route path='/acting' render={() => (
            <ActionScreen playerStatus={playerStatus} updatePlayerStatus={updatePlayerStatus} updateStatusText={updateStatusText} updatePlayer={updatePlayer} player={player}/>
          )}/>
          <Route path='/fighting' render={() => (
            <FightScreen updatePlayer={updatePlayer} playerStatus={playerStatus} updatePlayerStatus={updatePlayerStatus} updateStatusText={updateStatusText} updatePlayer={updatePlayer} player={player} updateEnemyStatus={updateEnemyStatus}/>
          )}/>
          <Route path='/' render={() => (
            <div>
              <div className='status'>
                {statusText}
              </div>
              <div className='enemyStatus'>
                {enemyStatus}
              </div>
            </div>
          )}/>
        </div>
      </Router>
  );
};