import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleChange(e) {
        this.setState({ message: e.target.value });
    }

    sendMessage(e) {
        e.preventDefault();
        if (!this.state.message) return;
        this.props.sendMessage(
            this.props.socket, 
            this.props.activeUser, 
            this.state.message
        );
        this.setState({ message: '' });
    }

    render() {
        if (!this.props.activeUser) return null;
        return (
            <div>
                <form onSubmit={this.sendMessage}>
                <input 
                    type="text" 
                    value={this.state.message} 
                    onChange={this.handleChange}/>
                <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.users.activeUser,
    }
}

export default connect(mapStateToProps, actions)(MessageInput);
