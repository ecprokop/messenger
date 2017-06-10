const socketio = require('socket.io');

module.exports.init = function(httpServer) {
    const io = socketio(httpServer);
    const namespace = io.of('/');

    io.on('connection', function(socket){
        console.log('A user with id ' + socket.id + ' connected.\n');

        updateUsersEvent(io, 'user connected');

        socket.on('disconnect', function(reason){
            updateUsersEvent(io, 'user disconnect due to ' + reason);
        });

        // handle incoming messages
        socket.on('message', function(recipientID, content) {
            console.log('received a message!');
            const recipientSocket = io.of('/').connected[recipientID];
            if (recipientSocket) {
                console.log('sending message:', content);
                recipientSocket.send(socket.id, content);
            }
            // TODO: handle error
        });



    });



    function updateUsersEvent(io, logMsg) {
        io.of('/').clients(function(error, clients) {
            if (logMsg) console.log(logMsg);
            console.log('The id\'s of all connected clients:\n');
            console.log(clients);
            io.emit('updateUsers', clients);
        });
    }
};
