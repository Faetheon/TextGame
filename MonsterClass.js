const monsters = [{name: 'goblin', health: 20, attack: 1, exp: 2}, {name: 'orc', health: 40, attack: 3, exp: 2}];

class Monster {
  constructor({name, health, exp, attack}) {
    this.name = name,
    this.health = health,
    this.attack = attack,
    this.exp = exp
  }
}

const spawnedMonsters = [];
function spawnMonster(monsterStats) {
  spawnedMonsters.push(new Monster(monsterStats));
}