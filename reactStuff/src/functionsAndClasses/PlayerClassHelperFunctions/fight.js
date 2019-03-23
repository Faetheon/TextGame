import spawnedMonsters from '../../gameData/spawnedMonsters.js';

export default function(action, updateStatusText) {
  let crit = false;
  if(this.turns < 1) {
    this.endTurn();
  }
  if(this.critChance >= Math.floor(Math.random() * 100)) {
    crit = true;
  }
  switch (action ? action.toLowerCase() : 'nothing') {
    case 'punch':
        updateStatusText(`You slam your fist into the ${spawnedMonsters[0].name}s face.`);
        spawnedMonsters[0].health -= crit ? Math.floor(this.attack * 1.5) : this.attack;
      break;
    case 'kick':
        updateStatusText(cirt ? `Critical Hit! Your heel smashes the ${spawnedMonsters[0].name}s head.` : `Your heel impacts the ${spawnedMonsters[0].name}s head.`);
        spawnedMonsters[0].health -= crit ? Math.floor(this.attack * 1.5) : this.attack;
      break;
    case 'dodge':
        let didDodge = Math.floor(Math.random() * 100);
        if (didDodge >= 50) {
          updateStatusText(`
          You attempt a somersault... And slam your head on the ground. You lose 1 health.
          And now the ${spawnedMonsters[0].name} has stabbed your spleen for ${spawnedMonsters[0].attack} damage.
          `);
          this.health -= spawnedMonsters[0].attack + 1;
        } else {
          updateStatusText('Wow, you actually dodged an attack...');
        }
      break;
    case 'eat':
        let itemNameToEat = prompt(`What would you like to eat? You have:${this.inventory.reduce((acc, curr) => acc + ` ${curr.type === 'food' ? curr.name : ''}`, '')}`);
        if (itemNameToEat === 'apple' && this.inventory[0].amount > 0) {
          this.inventory[0].amount--;
          this.health++;
        }
        updateStatusText(`You ate ${itemNameToEat === this.inventory[0].name ? `an ${itemNameToEat}.` : 'nothing.'}`);
      break;
    case 'cast':
        let spell = prompt(`Available spells are ${this.spells.reduce((acc, curr, i) => acc + (i === this.spells.length - 1 ? ` and ${curr.name}` : `, ${curr.name}`), '')}.`)
        let i = 0;
        for(i; i < this.spells.length; i++) {
          if(spell === this.spells[i].name) {
            break;
          }
        }
        if (this.mana > 0) {
          let answer = confirm(`This will cost ${this.spells[i].manaCost} mana.`);
          if (answer) {
            this.mana--;
            updateStatusText(`You've cast ${this.spells[i].name}!\nYou have ${this.mana} mana left.`);
            spawnedMonsters[0].health -= this.spells[i].baseDamage + Math.floor(this.spells[i].baseDamage * (this.stats.intelligence * 0.1));
          }
        } else {
          updateStatusText("You're out of mana.");
        }
      break;
    case 'drink':
        if (this.inventory[1].amount > 0 && this.health < this.maxHealth) {
          updateStatusText(`You drank a health potion!\nYou gained 1 health!`);
          this.inventory[1].amount--;
          this.health += 5;
          if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
          }
        } else {
          this.health < maxHealth ?
            updateStatusText(`No health potions left :(`)
              :
            updateStatusText(`Why would you drink a potion when you have full health?`)
        }
      break;
    case 'check inventory':
        updateStatusText(`You have:${this.inventory.reduce((acc, curr, i, arr) => acc + `${i === arr.length - 1 ? ' and' : ''} ${curr.amount} ${curr.amount > 1 ? curr.name + 's' : curr.name}`, '')}.`)
      break;
    case 'flee':
        this.isRunning = true;
        spawnedMonsters.pop();
      break;
    case 'skip turn':
        this.turns--;
      break;
  }
}