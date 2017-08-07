import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import 'whatwg-fetch';
import cookies from 'js-cookie';

// Import components
import LoginComponent from './login/Login';
import loginReducer from './login/Login.reducer';
import NoteListComponent from './note-list/NoteList';
import noteListReducer from './note-list/NoteList.reducer';
import NoteComponent from './note/Note';
import noteReducer from './note/Note.reducer';
import HomeComponent from './home/Home';

const reducer = Redux.combineReducers({
  login: loginReducer,
  noteList: noteListReducer,
  note: noteReducer
});

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  Redux.compose(
    Redux.applyMiddleware(ReduxThunk)
  )
);

store.dispatch({
  type: 'login-token',
  token: cookies.get('authToken')
});

ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={HomeComponent}/>
        <Route path="/login" component={LoginComponent}/>
        <Route path="/notes" component={NoteListComponent}/>
        <Route path="/note/:id" component={NoteComponent}/>
      </div>
    </Router>
  </ReactRedux.Provider>
  , document.getElementById('root'));
registerServiceWorker();
