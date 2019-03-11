function createdCharacter() {
  $('div.play-area').html(`<div class="player-options">You can ${player.actions.reduce((acc, curr, i, arr) => acc += (i === arr.length - 1 ? ` or ${curr}` : ` ${curr},`), '')}.</div>`);
  $('div.play-area').append('<form></form>');
  $('form').append('<input placeholder="Enter action name" name="actionName"></input>');
  $('form').append('<input type="submit"></input>');
  $('form').on('submit', (e) => {
    e.preventDefault();
    player.action(e.target.actionName.value);
    e.target.actionName.value = '';
  });
}