import { SEND_MESSAGE, RECEIVE_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
    const incoming = action.type === RECEIVE_MESSAGE;
    switch(action.type) {
        case SEND_MESSAGE:
        case RECEIVE_MESSAGE:
            const prevMessages = state[action.payload.user] || [];
            return {
                ...state,
                [action.payload.user]: [
                    ...prevMessages, 
                    { 
                        content: action.payload.content,
                        incoming
                    }
                ]
            };
        default:
            return state;
    }
}
