import React from 'react';
import {withRouter} from 'react-router-dom';
// import map from '../gameData/map.js';

export default withRouter(({isLoggedIn, updatePlayer, Player, history}) => {
  if(!isLoggedIn) {
    history.push('/login');
  }
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        let newPlayer = new Player(e.target.characterName.value, e.target.characterAge.value, e.target.hairColor);
        newPlayer.isCreated = true;
        updatePlayer(newPlayer);
        history.push('/acting')
      }}>
        <input placeholder="Enter name" name="characterName"></input>
        <input placeholder="Enter age" name="characterAge"></input>
        <input placeholder="Enter hair color" name="hairColor"></input>
        {/* <input placeholder="Enter map size" name="mapSize"></input> */}
        <input type="submit"></input>
      </form>
    </div>
  )
});