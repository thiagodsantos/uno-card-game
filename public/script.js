var socket;
var connected = false;

function getInputValue(inputName, label) {
  const name = `${inputName}_name`;
  const input = document.getElementById(`input_${name}`);
  if (!input) {
    console.error(`Missing ${inputName} input`);
    return;
  }

  const value = input.value;
  if (!value) {
    console.error(`${label} name required`);
    return;
  }

  return value;
}

function getPlayerName() {
  return getInputValue('player');
}

function getRoomName() {
  return getInputValue('room');
}

async function getSocketServer() {
  if (socket) {
    return socket;
  }

  socket = await io('http://localhost:8003');

  socket.on('connect', () => {
    connected = true;
    console.info('Connected...');
  });

  socket.on('disconnect', () => {
    console.info('Disconnected...');
  });

  socket.on('exception', data => {
    console.error('Exception: ', data);
  });

  return socket;
}

async function socketEmit({ channel, event, data, callback }) {
  socket = await getSocketServer();

  if (socket.id) {
    return socket.emit(channel, { event, data, socketId: socket.id }, response => callback ? callback(response) : console.log(response));
  }

  const loop = setInterval(() => {
    if (socket.id) {
      clearInterval(loop);
      return socket.emit(channel, { event, data, socketId: socket.id }, response => callback ? callback(response) : console.log(response));
    }
  }, 2000);
}

function emitRoomEvent({ data, callback }) {
  const emit = (eventName) => {
    const channel = 'room';
    const event   = channel + '.' + eventName;

    return socketEmit({ event, channel, data, callback });
  }

  return {
    createRoom: () => {
      return emit('create');
    },
    joinRoom: () => {
      return emit('join');
    }
  }
}

function roomEvent({ callback } = {}) {
  const roomName = getRoomName();
  if (!roomName) {
    return;
  }

  const playerName = getPlayerName();
  if (!playerName) {
    return;
  }

  const room   = { name: roomName };
  const player = { name: playerName };

  return emitRoomEvent({ data: { room, player }, callback });
}

function emitMatchEvent({ data, callback }) {
  const emit = (ev) => {
    const channel = 'match';
    const event   = channel + '.' + ev;

    return socketEmit({ event, channel, data, callback });
  }

  return {
    startMatch: () => {
      return emit('start');
    }
  }
}

function matchEvent({ callback } = {}) {
  const roomName = getRoomName();
  if (!roomName) {
    return;
  }

  const room = { name: roomName };

  return emitMatchEvent({ data: { room }, callback });
}

const textCreatedRoom = document.getElementById("room_created");
if (!textCreatedRoom) {
  console.error('Missing text to room name');
}

const buttonCreateRoom = document.getElementById("button_create_room");
if (!buttonCreateRoom) {
  console.error('Missing create room button');
}
buttonCreateRoom.addEventListener('click', () => {
  const callback = (response) => {
    if (response.name) {
      textCreatedRoom.innerText = response.name;
    }
  }

  roomEvent({ callback }).createRoom();
});

const buttonJoinRoom = document.getElementById("button_join_room");
if (!buttonJoinRoom) {
  console.error('Missing join room button');
}
buttonJoinRoom.addEventListener('click', async () => {
  const callback = (response) => {
    if (response.name) {
      textCreatedRoom.innerText = response.name;
    }
  }

  await roomEvent({ callback }).joinRoom();
});

const buttonStartMatch = document.getElementById('button_start_match');
if (!buttonStartMatch) {
  console.error('Missing start match button');
}
buttonStartMatch.addEventListener('click', async () => {
  const callback = (response) => {
    console.info(response);
  }

  await matchEvent({ callback }).startMatch();
});

const buttonSocketEmit = document.getElementById('button_socket_emit');
if (!buttonSocketEmit) {
  console.error('Missing socket emit button');
}
buttonSocketEmit.addEventListener('click', async () => {
  const channel    = document.getElementById('socket_emit_channel').value;
  const rawMessage = document.getElementById('socket_emit_message').value;

  console.log(rawMessage);
  const message = JSON.parse(rawMessage);

  await socketEmit({ channel, ...message });
});