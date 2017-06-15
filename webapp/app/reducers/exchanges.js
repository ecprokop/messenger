import { SEND_MESSAGE, 
        RECEIVE_MESSAGE, 
        INCREMENT_UNREAD, 
        RESET_UNREAD } from '../actions/types';

export default function(state = {}, action) {
    const incoming = action.type === RECEIVE_MESSAGE;
    let exchange;
    let reset;
    switch(action.type) {
        case SEND_MESSAGE:
        case RECEIVE_MESSAGE:
            exchange = state[action.payload.user] || {};
            const prevHistory = exchange.history || [];

            return {
                ...state,
                [action.payload.user]: {
                    ...exchange,
                    history: [
                        ...prevHistory, 
                        { 
                            content: action.payload.content,
                            incoming
                        }
                    ],
                }
            };
        case RESET_UNREAD:
            reset = true;
        case INCREMENT_UNREAD:
            exchange = state[action.payload.user] || {};

            let unread = exchange.unread;
            if (action.payload.user !== action.payload.activeUser) {
                if (reset) {
                    unread = '';
                } else {
                    unread ? (unread = exchange.unread + 1) : (unread = 1);
                }
            }

            return {
                ...state,
                [action.payload.user]: {
                    ...exchange,
                    unread,
                }
            };
        default:
            return state;
    }
}
