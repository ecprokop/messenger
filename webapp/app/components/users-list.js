import React, { Component } from 'react';

export default class UsersList extends Component {
    constructor(props) {
        super(props);
    }

    renderList() {
        if (!this.props.users) {
            return '';
        }

        if (this.props.users.length === 1) {
            return <div>No one is online right now :(</div>;
        }
        
        const lis = this.props.users.map((user) => {
            const unread = this.props.exchanges[user] && this.props.exchanges[user].unread ? 
                            this.props.exchanges[user].unread :
                            ''; 

            if (user === this.props.currentUser) {
                return '';
            } else {
                return <li key={user}>
                            {user}
                            <button onClick={() => this.props.onUserSelect(user)}>Message</button>
                            {unread}
                        </li>;
            }
        });
        return lis;
    }

    render() {
        return (
            <div>
                <h3>Online right now:</h3>
                <ul>{this.renderList()}</ul>
            </div>
        );
    }
}
