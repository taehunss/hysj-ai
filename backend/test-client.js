/*
  간단 테스트 방법:
  1) 백엔드 실행 후 (ws 네임스페이스, socket.io path 기준)
  2) node test-client.js
*/
const { io } = require('socket.io-client');

const url = process.env.WS_URL || 'http://localhost:3333/ws';
const socket = io(url, {
  path: '/socket.io',
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('[client] connected:', socket.id);
  socket.emit('event', { event: 'chat', payload: { message: '안녕!' } });
});

socket.on('chat:delta', (data) => {
  console.log('[client] chat:delta', data);
});

socket.on('chat:response', (data) => {
  console.log('[client] chat:response', data);
});

socket.on('connect_error', (err) => {
  console.error('[client] connect_error', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('[client] disconnected:', reason);
});
