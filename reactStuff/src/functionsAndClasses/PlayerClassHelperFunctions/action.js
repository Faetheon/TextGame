import spawnMonster from '../spawnMonster.js';
import monsters from '../../gameData/monsters.js';

export default function(actionName, updateStatusText) {
  if (this.exp <= this.expToNextLevel) {
    this.exp -= this.expToNextLevel;
    this.level++;
    this.skillPoints += 5;
    updateStatusText(`Congratulations! You leved up to level ${this.level}!
    How would you like to distribute your stats?
    `)
  } else {
    switch (actionName ? actionName.toLowerCase() : 'nothing') {
      case 'punch':
          updateStatusText('Your fist flies through the air.');
        break;
      case 'kick':
          updateStatusText('Your kick slices through the air.');
        break;
      case 'dodge':
          updateStatusText('You attempt a somersault... And slam your head on the ground. You lose 1 health.');
        break;
      case 'eat':
          let itemNameToEat = prompt(`What would you like to eat? You have:${this.inventory.reduce((acc, curr) => acc + ` ${curr.type === 'food' ? curr.name : ''}`, '')}`);
          if (itemNameToEat === 'apple') {
            this.inventory[0].amount--;
          }
          updateStatusText(`You ate ${itemNameToEat === this.inventory[0].name ? `an ${itemNameToEat}.` : 'nothing.'}`);
        break;
      case 'cast':
          if (this.mana > 0) {
            let answer = confirm(`This will cost ${this.spells[0].manaCost} mana.`);
            if (answer) {
              this.mana--;
              updateStatusText(`You've cast ${this.spells[0].name}!\nYou have ${this.mana} left.`);
            }
          } else {
            updateStatusText("You're out of mana.");
          }
        break;
      case 'check inventory':
        updateStatusText(`You have:${this.inventory.reduce((acc, curr, i, arr) => acc + `${i === arr.length - 1 ? ' and' : ''} ${curr.amount} ${curr.amount > 1 ? curr.name + 's' : curr.name}`, '')}.`)
        break;
      case 'find monster':
          spawnMonster(monsters[Math.floor(Math.random() * monsters.length)]);
          // $('div.enemy-stats').html(`You are fighting a ${spawnedMonsters[0].name}.<br>They have ${spawnedMonsters[0].health} health left.`);
          this.isFighting = true;
        break;
      case 'back':
          updateStatusText(`Welcome back ;)`);
        break;
  }
}

  // let fightFunction = () => {
  //   if(this.turns < 1) {
  //     this.endTurn();
  //   }
  //   if (this.health < 1) {
  //     updateStatusText('You have died.');
  //     die();
  //     createdCharacter();
  //   } else if (spawnedMonsters[0].health < 1) {
  //     $('div.enemy-stats').html('');
  //     updateStatusText(`You win!\nYou've gained ${spawnedMonsters[0].exp} experience.`);
  //     this.exp += spawnedMonsters[0].exp;
  //     spawnedMonsters.shift();
  //     createdCharacter();
  //   } else {
  //     $('div.enemy-stats').html(`You are fighting a ${spawnedMonsters[0].name}.<br>They have ${spawnedMonsters[0].health} health left.`);
  //     fightLoop = setTimeout(fightFunction, 2000);
  //   }
  // }
}