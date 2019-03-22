import spawnMonster from '../spawnMonster.js';

export default function(actionName, updateStatusText) {
  switch (actionName ? actionName.toLowerCase() : 'nothing') {
    case 'punch':
        updateStatusText('Your fist flies through the air.');
      break;
    case 'kick':
        updateStatusText('Your kick slices through the air.');
      break;
    case 'dodge':
        updateStatusText('You attempt a somersault... And slam your head on the ground. You lose 1 health.');
        this.health--;
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
        spawnMonster();
        this.isFighting = true;
      break;
    case 'back':
        updateStatusText(`Welcome back ;)`);
      break;
    case 'rest':
        if (this.health < this.maxHealth) {
          this.health += Math.floor(this.maxHealth * 0.25);
        }
      break;
  }
}