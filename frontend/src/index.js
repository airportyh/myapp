import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReduxPromise from 'redux-promise';
import 'whatwg-fetch';
import * as ReduxPersist from 'redux-persist';

// Import components
import LoginComponent from './login/Login';
import loginReducer from './login/Login.reducer';
import FriendsComponent from './friends/Friends';
import friendsReducer from './friends/Friends.reducer';

const reducer = Redux.combineReducers({
  login: loginReducer,
  friends: friendsReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(
    Redux.applyMiddleware(ReduxPromise),
    ReduxPersist.autoRehydrate()
  )
);

ReduxPersist.persistStore(store);

const HomeComponent = () =>
  <h1>Home</h1>;

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/friends">Friends</Link></li>
          </ul>
        </nav>
        <Route exact path="/" component={HomeComponent}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/friends"
        component={FriendsComponent}/>
      </div>
    </Router>
  </ReactRedux.Provider>
  , document.getElementById('root'));
registerServiceWorker();
