import { combineReducers } from 'redux';
import usersReducer from './users';
import messagesReducer from './messages';

const rootReducer = combineReducers({
  users: usersReducer,
  messages: messagesReducer,
});

export default rootReducer;


/* 
    users: {
        activeUser: 'userID',
        onlineUsers: ['userID1', 'userID2'],
    }
    messages: {
        <toUser>: [ 
            { 
                content: hey
                incoming: true
            },
            { 
                content: whats up
                incoming: false
            }
        ]
    }
*/
