var socket;

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

function getSocketServer() {
  if (socket) {
    return socket;
  }

  socket = io('http://localhost:8003');

  socket.on('connect', () => {
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

function socketEmit({ channel, event, data, callback }) {
  socket = getSocketServer();
  return socket.emit(channel, { event, data }, response => callback ? callback(response) : console.log(response));
}

function emitRoomEvent({ data, callback }) {
  const emit = (ev) => {
    const channel = 'room';
    const event   = channel + '.' + ev;

    return socketEmit({ event, channel, data, callback });
  }

  return {
    createRoom: () => {
      return emit('create');
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