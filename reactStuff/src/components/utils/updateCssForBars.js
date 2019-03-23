export default function(player) {
  document.documentElement.style.setProperty('--health-gradient', `linear-gradient(to left, gray ${100 - (Math.floor(player.health / player.maxHealth * 100))}%, red ${100 - (Math.floor(player.health / player.maxHealth * 100))}%)`);
  document.documentElement.style.setProperty('--mana-gradient', `linear-gradient(to left, gray ${100 - (Math.floor(player.mana / player.maxMana * 100))}%, aqua ${100 - (Math.floor(player.mana / player.maxMana * 100))}%)`);
  document.documentElement.style.setProperty('--exp-gradient', `linear-gradient(to left, gray ${Math.floor((player.expToNextLevel - player.exp) / player.expToNextLevel * 100) || 100}%, yellow ${Math.floor(player.exp / player.expToNextLevel * 100) || 100}%)`);
};