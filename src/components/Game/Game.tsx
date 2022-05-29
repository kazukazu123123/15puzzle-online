import { Collection } from '@discordjs/collection'
import React, { CSSProperties } from 'react'
import { globalState } from '../../../libs/global-state'
import { getSocketIO } from '../../../libs/use-socket-io'
import styles from './Game.module.scss'
const { useGlobalState } = globalState

type PuzzleData = {
  pieces: [PieceData[]]
}

type PieceData = {
  x: number
  y: number
  index: number
  id: number
}

export type UserData = {
  socketid: string
  name: string
  color: string
  puzzle: PuzzleData
}

interface GameProps {
  isVisible: boolean
  users: Collection<string, UserData>
}

export const Game = React.memo((props: GameProps) => {
  const [roomId] = useGlobalState('roomId')

  const tapPiece = (e: React.MouseEvent<HTMLElement>) => {
    const tapX = Number(e.currentTarget.dataset.x)
    const tapY = Number(e.currentTarget.dataset.y)
    getSocketIO().emit('tap', roomId, tapX, tapY)
  }

  return (
    <div className={props.isVisible ? styles.lobby : styles.hidden}>
      <div className={styles.game}>
        {props.users.map((user) => {
          return (
            <>
              <div className={styles.puzzleContainer}>
                <p style={{ color: user.color }}>{user.name}</p>
                <div className={styles.puzzle}>
                  {user.puzzle.pieces
                    .flat()
                    .sort((p1, p2) => p1.id - p2.id)
                    .map((piece) => {
                      return (
                        <div
                          id={'piece-' + piece.index}
                          style={
                            { '--x': piece.x, '--y': piece.y } as CSSProperties
                          }
                          data-x={piece.x}
                          data-y={piece.y}
                          className={
                            piece.index + 1 === piece.id
                              ? styles.piece + ' ' + styles.correct
                              : styles.piece
                          }
                          onClick={tapPiece}
                        >
                          <div className={styles.content}>
                            {piece.id !== 0 ? piece.id : ''}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
})
