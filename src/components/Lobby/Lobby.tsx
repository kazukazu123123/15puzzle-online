import { Collection } from '@discordjs/collection'
import React from 'react'
import { getSocketIO } from '../../../libs/use-socket-io'
import styles from './Lobby.module.scss'

export type RoomData = {
  id: string
  name: string
  description: string
  hasPassword: boolean
  userCount: number
  maxUserCount: number
}

interface LobbyProps {
  isVisible: boolean
  rooms: Collection<string, RoomData>
}

export const Lobby = React.memo((props: LobbyProps) => {
  function createRoom() {
    const roomcreate_roomname = (
      document.getElementById('roomcreate_roomname') as HTMLInputElement
    ).value
    const roomcreate_roomdesc = (
      document.getElementById('roomcreate_roomdesc') as HTMLInputElement
    ).value
    const roomcreate_roompassword = (
      document.getElementById('roomcreate_roompassword') as HTMLInputElement
    ).value
    getSocketIO().emit(
      'createRoom',
      roomcreate_roomname,
      roomcreate_roomdesc,
      roomcreate_roompassword
    )
  }

  function joinRoom(e: React.MouseEvent<HTMLElement>) {
    console.log(e.currentTarget)
  }

  return (
    <div className={props.isVisible ? styles.lobby : styles.hidden}>
      <div className={styles.roomcreatebox}>
        <input
          id="roomcreate_roomname"
          placeholder="Room Name"
          required
        ></input>
        <br />
        <input id="roomcreate_roomdesc" placeholder="Room Description"></input>
        <br />
        <input
          id="roomcreate_roompassword"
          type="password"
          size={128}
          placeholder="Room Password"
        ></input>
        <br />
        <button id="create_room" onClick={createRoom}>
          Create room
        </button>
      </div>
      <div className={styles.roomlist}>
        {props.rooms.map((room) => {
          return (
            <>
              <div
                data-roomid={room.id}
                className={styles.room}
                onClick={joinRoom}
              >
                <p>Name: {room.name}</p>
                <p>Description: {room.description}</p>
                <p>Has password: {room.hasPassword ? 'true' : 'false'}</p>
                <p>
                  User count: {room.userCount}/{room.maxUserCount}
                </p>
                <input
                  id="room_password"
                  type="password"
                  size={128}
                  placeholder="Room Password (if required)"
                ></input>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
})
