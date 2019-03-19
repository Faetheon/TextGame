import fight from './PlayerClassHelperFunctions/fight.js';
import action from './PlayerClassHelperFunctions/action.js';
import createItem from './creationFunctions/createItem.js';

class Player {
  constructor(name, age, hairColor) {
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
    this.health = 24,
    this.maxHealth = this.stats.strength * 8,
    this.exp = 0,
    this.level = 1,
    this.resist = this.will * .25,
    this.attack = Math.floor(this.stats.strength * 1.5),
    this.expToNextLevel = 5 * this.level,
    this.mana = this.stats.intelligence + 5,
    this.actions = ['punch', 'kick', 'dodge', 'cast', 'eat', 'check inventory', 'find monster', 'rest'],
    this.combatMoves = ['punch', 'kick', 'dodge', 'cast', 'use item', 'skip turn', 'flee'],
    this.spells = [{name: 'arcane missile', manaCost: 1}],
    this.inventory = [createItem(3, 'food', 'apple'), createItem(1, 'potion', 'health potion'), createItem(1, 'potion', 'mana potion')],
    this.turns = 2,
    this.isFighting = false,
    this.isRunning = false,
    this.isCreated = false,
    this.hunger = 100,
    this.fight = fight.bind(this),
    this.action = action.bind(this)
  }
}


export default Player;