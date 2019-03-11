import fight from './PlayerClassHelperFunctions/fight.js';

class Player {
  constructor(name, age, hairColor) {
    this.name = name || 'anonymous',
    this.age = age || 15,
    this.hairColor = hairColor || 'blue',
    this.health = 20,
    this.exp = 0,
    this.level = 1,
    this.attack = 1,
    this.expToNextLevel = this.level * 2,
    this.mana = 5,
    this.actions = ['punch', 'kick', 'dodge', 'cast', 'eat', 'check inventory', 'find monster'],
    this.combatMoves = ['punch', 'kick', 'dodge', 'cast', 'use item', 'skip turn'],
    this.spells = [{name: 'arcane missile', manaCost: 1}],
    this.inventory = [createItem(3, 'food', 'apple'), createItem(1, 'potion', 'health potion'), createItem(1, 'potion', 'mana potion')],
    this.turns = 2,
    this.isFighting = false,
    this.isRunning = false,
    this.hunger = 100,
    this.fight = fight.bind(this);
  }

  action = (actionName) => {
    switch (actionName ? actionName.toLowerCase() : 'nothing') {
      case 'punch':
          $('div.text').text('Your fist flies through the air.');
        break;
      case 'kick':
          $('div.text').text('Your kick slices through the air');
        break;
      case 'dodge':
          $('div.text').text('You attempt a somersault... And slam your head on the ground. You lose 1 health');
        break;
      case 'eat':
          let itemNameToEat = prompt(`What would you like to eat? You have:${this.inventory.reduce((acc, curr) => acc + ` ${curr.type === 'food' ? curr.name : ''}`, '')}`);
          if (itemNameToEat === 'apple') {
            this.inventory[0].amount--;
          }
          $('div.text').text(`You ate ${itemNameToEat === this.inventory[0].name ? `an ${itemNameToEat}.` : 'nothing.'}`);
        break;
      case 'cast':
          if (this.mana > 0) {
            let answer = confirm(`This will cost ${this.spells[0].manaCost} mana.`);
            if (answer) {
              this.mana--;
              $('div.text').text(`You've cast ${this.spells[0].name}!\nYou have ${this.mana} left.`);
            }
          } else {
            $('div.text').text("You're out of mana.");
          }
        break;
      case 'check inventory':
        $('div.text').text(`You have:${this.inventory.reduce((acc, curr, i, arr) => acc + `${i === arr.length - 1 ? ' and' : ''} ${curr.amount} ${curr.amount > 1 ? curr.name + 's' : curr.name}`, '')}.`)
        break;
      case 'find monster':
          spawnMonster(monsters[Math.floor(Math.random() * monsters.length)]);
          $('div.enemy-stats').html(`You are fighting a ${spawnedMonsters[0].name}.<br>They have ${spawnedMonsters[0].health} health left.`);
          this.isFighting = true;
        break;
    }

    let fightFunction = () => {
      if(this.turns < 1) {
        this.endTurn();
      }
      if (this.health < 1) {
        $('div.text').text('You have died.');
        this.die();
        createdCharacter();
      } else if (spawnedMonsters[0].health < 1) {
        $('div.enemy-stats').html('');
        $('div.text').text(`You win!\nYou've gained ${spawnedMonsters[0].exp} experience.`);
        this.exp += spawnedMonsters[0].exp;
        spawnedMonsters.shift();
        createdCharacter();
      } else {
        $('div.enemy-stats').html(`You are fighting a ${spawnedMonsters[0].name}.<br>They have ${spawnedMonsters[0].health} health left.`);
        fightLoop = setTimeout(fightFunction, 2000);
      }
    }

    fightFunction.bind(this);

    let fightLoop = setTimeout(fightFunction(), 2000);

    if (this.isFighting) {
      $('div.play-area').html(`<div class="player-options">You can ${player.combatMoves.reduce((acc, curr, i, arr) => acc += (i === arr.length - 1 ? ` or ${curr}` : ` ${curr},`), '')}.</div>`);
      $('div.play-area').append('<form></form>');
      $('form').append('<input placeholder="Enter action name" name="actionName"></input>');
      $('form').append('<input type="submit"></input>');
      $('form').on('submit', (e) => {
        e.preventDefault();
        player.fight(e.target.actionName.value)
        e.target.actionName.value = '';
      });
      fightFunction();
    }
  }

  endTurn = () => {
    this.turns = 2;
    // Call another function here to invoke monster turn
  }
}

function createItem(amount, type, name) {
  return {amount, type, name};
}

function die() {
  player = undefined;
  startUp();
}