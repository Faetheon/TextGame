import React from 'react';
import {withRouter} from 'react-router-dom';

export default withRouter(function({updateIsLoggedIn, history}) {

  return (
    <div>
      <form onSubmit={(e) => {
        updateIsLoggedIn(true);
        history.push('/');
      }}>
        <input type='text' placeholder='Username' name='username'></input>
        <input type='password' placeholder='password' name='password'></input>
        <input type='submit'></input>
      </form>
    </div>
  );
});