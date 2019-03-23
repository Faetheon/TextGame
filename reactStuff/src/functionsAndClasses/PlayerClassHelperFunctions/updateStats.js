export default function() {
  this.maxHealth = this.stats.strength * 8;
  this.health = this.maxHealth;
  this.resist = Math.ceil(this.will * 0.25);
  this.expToNextLevel = 5 * this.level;
  this.maxMana = this.stats.intelligence + 5;
  this.mana = this.maxMana;
  this.attack = Math.floor(this.stats.strength * 1.5);
  this.critChance = Math.floor(this.stats.agility * 0.1);
}