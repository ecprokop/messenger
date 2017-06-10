import React from 'react';
import css from '../styles/message-list.css';

export default (props) => {
    if (!props.messages) return <div></div>;
    if (!props.messages.length) return <p>You haven't started a conversation yet.</p>;

    let key = 0;
    console.log('css', css);
    const messages = props.messages.map((message) => {
    // styleName={message.incoming ? 'incoming' : 'outgoing'}
        
        return (
            <li 
                key={key++} 
                className={message.incoming ? css.incoming : css.outgoing}>
                {message.content}
            </li>
        );
    });
    return <ul style={css}>{messages}</ul>;
};
