export default (action) => {
  if(this.turns < 1) {
    this.endTurn();
  }
  switch (action ? action.toLowerCase() : 'nothing') {
    case 'punch':
        $('div.text').text(`You slam your fist into the ${spawnedMonsters[0].name}s face.`);
        spawnedMonsters[0].health -= this.attack;
      break;
    case 'kick':
        $('div.text').text(`Your heel impacts the ${spawnedMonsters[0].name}s head.`);
        spawnedMonsters[0].health -= this.attack;
      break;
    case 'dodge':
        $('div.text').text('You attempt a somersault... And slam your head on the ground. You lose 1 health');
      break;
    case 'eat':
        let itemNameToEat = prompt(`What would you like to eat? You have:${this.inventory.reduce((acc, curr) => acc + ` ${curr.type === 'food' ? curr.name : ''}`, '')}`);
        if (itemNameToEat === 'apple' && this.inventory[0].amount > 0) {
          this.inventory[0].amount--;
          this.health++;
        }
        $('div.text').text(`You ate ${itemNameToEat === this.inventory[0].name ? `an ${itemNameToEat}.` : 'nothing.'}`);
      break;
    case 'cast':
        if (this.mana > 0) {
          let answer = confirm(`This will cost ${this.spells[0].manaCost} mana.`);
          if (answer) {
            this.mana--;
            $('div.text').text(`You've cast ${this.spells[0].name}!\nYou have ${this.mana} left.`);
            spawnedMonsters[0].health -= 5;
          }
        } else {
          $('div.text').text("You're out of mana.");
        }
      break;
    case 'drink':
        if (this.inventory[1].amount > 0) {
          $('div.text').text(`You drank a health potion!\nYou gained 1 health!`);
          this.inventory[1].amount--;
          this.health++;
        } else {
          $('div.text').text(`No health potions left :(`);
        }
      break;
    case 'check inventory':
        $('div.text').text(`You have:${this.inventory.reduce((acc, curr, i, arr) => acc + `${i === arr.length - 1 ? ' and' : ''} ${curr.amount} ${curr.amount > 1 ? curr.name + 's' : curr.name}`, '')}.`)
      break;
    case 'skip turn':
      this.turns--;
    break;
  }
}