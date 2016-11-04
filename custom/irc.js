var webSocket = new WebSocket('ws://163.172.153.75:8080');

var state = { rooms: [] };

function WebSocketOpen() {
    'use strict';
    console.log("open");
    var nickname = 'bar';
    this.send('NICK ' + nickname + '\r\n');
    this.send('USER ' + nickname + ' * 0 :' + nickname + '\r\n');
    //JOIN('#foo');
}

function JOIN(channel) {
    'use strict';
    console.log('trying to join');
    webSocket.send('JOIN ' + channel + '\n');
    state.currentChannel = channel;
    checkroom(channel);
}
window.JOIN = JOIN;

function PART(channel) {
    'use strict';
    webSocket.send('JOIN ' + channel + '\n');
}
window.PART = PART;

function OPER(login) {
    'use strict';
    login = login || '';
    webSocket('OPER ' + login + '\n');
}
window.OPER = OPER;

function QUIT(quitmessage) {
    'use strict';
    quitmessage = quitmessage || '';
    webSocket.send('QUIT ' + quitmessage + '\n');
}
window.QUIT = QUIT;

function NICK(nickname) {
    'use strict';
    webSocket.send('NICK ' + nickname + '\r\n');
}
window.NICK = NICK;

function LIST(nickname) {
    'use strict';
    webSocket.send('LIST \n');
}
window.LIST = LIST;

function MODE(parameters) {
    'use strict';
    parameters = parameters || '';
    var appendment = (parameters[0] === '#') ? ':' : '';
    webSocket(appendment + 'MODE ' + parameters + '\n');
}
window.MODE = MODE;

function PRIVMSG(roomOrPerson, statement) {
    'use strict';
    var toSend = 'PRIVMSG ' + roomOrPerson + ' :' + statement + '\n';
    webSocket.send(toSend);
    webSocket.onmessage({
        data: toSend
    });
}
window.PRIVMSG = PRIVMSG;

function checkroom(roomname) {
    'use strict';
    if (!state.rooms[roomname]) {
        state.rooms[roomname] = {
            users: [],
            title: '',
            history: []
        };
    }
    console.log('state', state);
}
window.checkroom = checkroom;

function send(msg) {
  webSocket.send(msg + '\n');
}
window.send = send;



webSocket.onopen = WebSocketOpen;

webSocket.onerror = function(err) {
 console.log('err', err);
};

webSocket.onmessage = function(msg) {
  let ping = msg.data.indexOf('PING :');
  if (ping !== -1) {
    let pong = 'PONG ' + msg.data.slice(5, msg.length);
    console.log('ping', ping);
    console.log('pong', pong);
    webSocket.send(pong);
  }
  console.log('msg', msg.data);
}

webSocket.onclose = function() {
 console.log('close');
}

export default state;
