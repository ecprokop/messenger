import { UPDATE_USERS, START_CHAT } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case UPDATE_USERS:
            return {...state, onlineUsers: [...action.payload] };
        case START_CHAT:
            return {...state, activeUser: action.payload };
        default:
            return state;
    }
}
