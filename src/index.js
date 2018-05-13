import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import { logUser } from './actions';
import { Router,Route,browserHistory } from 'react-router';
import App from './components/App';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { firebaseApp } from './firebase';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if(user){
    const {email} = user;
    store.dispatch(logUser(email));
    // console.log("User has signed in or up ",user);
    browserHistory.push('/app');
  }else{
    // console.log("User has signed out or still need to sign in ");
    browserHistory.replace('/signin');
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={ browserHistory }>
      <Route path="/app" component={ App } />
      <Route path="/signin" component={ SignIn} />
      <Route path="/signup" component={ SignUp} />
    </Router>
  </Provider>,document.getElementById('root')
)
