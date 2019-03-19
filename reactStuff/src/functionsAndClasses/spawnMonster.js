import spawnedMonsters from '../gameData/spawnedMonsters.js';
import Monster from './MonsterClass.js';
import monsters from '../gameData/monsters.js';

export default () => {
  spawnedMonsters.push(new Monster(monsters[Math.floor(Math.random() * monsters.length)]));
};