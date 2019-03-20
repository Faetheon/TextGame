import fight from './PlayerClassHelperFunctions/fight.js';
import action from './PlayerClassHelperFunctions/action.js';
import createItem from './creationFunctions/createItem.js';
import levelUp from './PlayerClassHelperFunctions/levelUp.js';

class Player {
  constructor(name, age, hairColor, isCreated=false) {
    this.stats = {
      strength: 3,
      agility: 3,
      intelligence: 3,
      charisma: 3,
      will: 3
    },
    this.skillPoints = 0,
    this.name = name || 'anonymous',
    this.age = age || 15,
    this.hairColor = hairColor || 'blue',
    this.maxHealth = this.stats.strength * 8,
    this.health = this.maxHealth,
    this.exp = 0,
    this.level = 1,
    this.resist = Math.ceil(this.will * 0.25),
    this.attack = Math.floor(this.stats.strength * 1.5),
    this.expToNextLevel = 5 * this.level,
    this.maxMana = this.stats.intelligence + 5,
    this.mana = this.maxMana,
    this.actions = ['punch', 'kick', 'dodge', 'cast', 'eat', 'check inventory', 'find monster', 'rest'],
    this.combatMoves = ['punch', 'kick', 'dodge', 'cast', 'use item', 'skip turn', 'flee'],
    this.spells = [{name: 'arcane missile', manaCost: 1}],
    this.inventory = [createItem(3, 'food', 'apple'), createItem(1, 'potion', 'health potion'), createItem(1, 'potion', 'mana potion')],
    this.turns = 2,
    this.isFighting = false,
    this.isRunning = false,
    this.isCreated = isCreated,
    this.hunger = 100,
    this.fight = fight.bind(this),
    this.action = action.bind(this),
    this.levelUp = levelUp.bind(this)
  }
}


export default Player;