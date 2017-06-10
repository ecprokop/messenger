import { UPDATE_USERS } from './types';
import { SEND_MESSAGE } from './types';
import { RECEIVE_MESSAGE } from './types';
import { START_CHAT } from './types';

export function updateUsers(users) {
    return {
        type: UPDATE_USERS,
        payload: users,
    };
}

export function startChat(toUser) {
    return {
        type: START_CHAT,
        payload: toUser,
    };
}

export function sendMessage(socket, toUser, content) {
    // use socket to send message to server
    console.log('sending message', content);
    socket.send(toUser, content);

    // TODO: only return this action when the message is sent.. maybe return error otherwise
    return {
        type: SEND_MESSAGE,
        payload: {
            user: toUser,
            content,
        }
    };
}

export function receiveMessage(fromUser, content) {
    return {
        type: RECEIVE_MESSAGE,
        payload: {
            user: fromUser,
            content,
        },
    };
}

