import spawnedMonsters from '../gameData/spawnedMonsters.js';
import Monster from './MonsterClass.js';

export default (monsterStats) => {
  spawnedMonsters.push(new Monster(monsterStats));
}