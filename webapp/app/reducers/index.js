import { combineReducers } from 'redux';
import usersReducer from './users';
import exchangesReducer from './exchanges';

const rootReducer = combineReducers({
  users: usersReducer,
  exchanges: exchangesReducer,
});

export default rootReducer;

/* 
    users: {
        activeUser: 'userID',
        onlineUsers: ['userID1', 'userID2'],
    }
    exchanges: {
        <toUser>: { 
            history: [ 
                { 
                    content: hey
                    incoming: true
                },
                { 
                    content: whats up
                    incoming: false
                }
            ],
            unread: 2
        }
    }
*/
