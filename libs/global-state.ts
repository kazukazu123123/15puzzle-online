import { createGlobalState } from 'react-hooks-global-state'

export const GameStatus = [
  'connecting',
  'reconnecting',
  'disconnected',
  'lobby',
  'game',
] as const
export type GameStatus = typeof GameStatus[number]

export const globalState = createGlobalState({
  roomId: '',
  gameStatus: <GameStatus>'connecting',
})
