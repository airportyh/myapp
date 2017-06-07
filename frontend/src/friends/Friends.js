import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from './Friends.actions';

class Friends extends React.Component {
  componentDidMount() {
    if (this.props.authToken) {
      this.props.fetchFriends(this.props.authToken);
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.authToken !== this.props.authToken) {
      this.props.fetchFriends(newProps.authToken);
    }
  }
  render() {
    return (
      <div>
        <h1>Friends</h1>
        <ul>
          {this.props.friends.map(friend =>
            <li key={friend.id}>
              {friend.first_name} {friend.last_name}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const FriendsContainer = ReactRedux.connect(
  state => ({
    authToken: state.login.token,
    ...state.friends
  }),
  actions
)(Friends);

export default FriendsContainer;
