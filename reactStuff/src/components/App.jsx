// Library packages
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, withRouter} from 'react-router-dom';

// Screens
import FightScreen from './screens/FightScreen.jsx';
import CharacterCreationScreen from './screens/CharacterCreationScreen.jsx';
import ActionScreen from './screens/ActionScreen.jsx';

// Functions and classes
import spawnMonster from '../functionsAndClasses/spawnMonster.js';
import Player from '../functionsAndClasses/PlayerClass.js';

// Data
import map from '../gameData/map.js';

// Components
import Line from './mapComponents/Line.jsx';

export default () => {
  const spawnedMonsters = [];
  spawnMonster.bind(spawnedMonsters);
  const [statusText, updateStatusText] = useState('Welcome to the land of... grass I guess ¯\\_(ツ)_/¯');
  const [player, updatePlayer] = useState(new Player());
  const [enemyStatus, updateEnemyStatus] = useState('There is no enemy... Yet >:)')
  const [playerStatus, updatePlayerStatus] = useState(`You have ${player.health} health and ${player.mana} mana.`);
  const [playerPos, updatePlayerPos] = useState([0, 0]);
  const [isMoving, updateIsMoving] = useState(false);

  return (
      <Router>
        <div>
          <Route path='/' exact render={() => (
            <CharacterCreationScreen
              updateStatusText={updateStatusText}
              updatePlayer={updatePlayer}
              Player={Player}
            />
          )}/>
          <Route path='/acting' render={() => (
            <ActionScreen
              updatePlayerPos={updatePlayerPos}
              playerStatus={playerStatus}
              updatePlayerStatus={updatePlayerStatus}
              updateStatusText={updateStatusText}
              updatePlayer={updatePlayer}
              player={player}
            />
          )}/>
          <Route path='/fighting' render={() => (
            <FightScreen
              updatePlayer={updatePlayer}
              playerStatus={playerStatus}
              updatePlayerStatus={updatePlayerStatus}
              updateStatusText={updateStatusText}
              updatePlayer={updatePlayer} player={player}
              updateEnemyStatus={updateEnemyStatus}
            />
          )}/>
          <Route path='/' render={() => (
            <div>
              <div className='status'>
                {statusText}
              </div>
              <div className='enemyStatus'>
                {enemyStatus}
              </div>
              <div className='map'>
                {
                  map.map((line, i) => (
                    <Line isMoving={isMoving} updateIsMoving={updateIsMoving} i={i} line={line} key={i} playerPos={playerPos} updatePlayerPos={updatePlayerPos} />
                  ))
                }
              </div>
              {
                isMoving ?
                  <button onClick={() => {
                    clearTimeout(window.xAxisTimeoutClear);
                    clearTimeout(window.yAxisTimeoutClear);
                    updateIsMoving(false);
                  }}>Cancel Movement</button>
                    :
                  <div>Click to start your journey!</div>
              }
            </div>
          )}/>
        </div>
      </Router>
  );
};