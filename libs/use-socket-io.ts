import { io, Socket } from 'socket.io-client'
import { defineOnGlobal } from './define-on-global'

let socket: Socket

export function useSocketIO(uri = '/', option = {}) {
  if (!socket) socket = io(uri, option)
  defineOnGlobal({ socket })
  return socket
}

export function getSocketIO() {
  return socket
}
