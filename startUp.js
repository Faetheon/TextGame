function startUp() {
  $('div.play-area').html('');
  $('div.play-area').append('<form></form>');
  $('form').append('<input placeholder="Enter name" name="characterName"></input>');
  $('form').append('<input placeholder="Enter age" name="characterAge"></input>');
  $('form').append('<input placeholder="Enter hair color" name="hairColor"></input>');
  $('form').append('<input type="submit"></input>');
  $('form').on('submit', (e) => {
    e.preventDefault();
    player = new Player(e.target.characterName.value, e.target.characterAge.value, e.target.hairColor);
    createdCharacter();
  });
}