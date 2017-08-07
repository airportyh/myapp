import React from 'react';
import cookies from 'js-cookie';

class Home extends React.Component {
  componentDidMount() {
    let token = cookies.get('authToken');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/notes');
    }
  }
  render() {
    return (
      <div className="home">
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
