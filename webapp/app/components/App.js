import React from 'react';
import styles from '../styles/App.css';
import io from 'socket.io-client';
import UsersList from './users-list';
import MessageInput from './message-input';
import MessageList from './message-list';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.socket = io('http://localhost:3001'); // initialize connection to server

    this.socket.on('connect', () => {
      console.log('i am connected with ID', this.socket.id);;
    });

    this.socket.on('updateUsers', (users) => {
      this.props.updateUsers(users);
    });

    // handle incoming messages
    this.socket.on('message', (fromUser, content) => {
      console.log('received message', content);
      this.props.receiveMessage(fromUser, content);
      this.props.incrementUnread(fromUser, this.props.activeUser);
    });
  }

  getActiveMessages() {
    if (!this.props.activeUser) return undefined;
    if (!this.props.exchanges[this.props.activeUser]) return [];
    return this.props.exchanges[this.props.activeUser].history;
  }

  onUserSelect(user) {
    this.props.startChat(user);
    this.props.resetUnread(user);
  }

  render() {
    const activeMessages = this.getActiveMessages();

    if (!this.socket) return <p>Loading...</p>;
    return (
      <div>
        <UsersList 
          users={this.props.users}
          exchanges={this.props.exchanges}
          currentUser={this.socket.id} 
          onUserSelect={this.onUserSelect.bind(this)} />
        <MessageInput socket={this.socket} />
        <MessageList 
          messages={activeMessages} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.onlineUsers,
    activeUser: state.users.activeUser,
    exchanges: state.exchanges
  };
}

export default connect(mapStateToProps, actions)(App);
