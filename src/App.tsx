import React, { useEffect, useState } from 'react'
import { useSocketIO } from '../libs/use-socket-io'
import { Collection } from '@discordjs/collection'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Connecting } from './components/Connecting/Connecting'
import { Reconnecting } from './components/Reconnecting/Reconnecting'
import { Lobby, RoomData } from './components/Lobby/Lobby'
import { Game, UserData } from './components/Game/Game'
import toast, { Toaster } from 'react-hot-toast'

export function App() {
  const [rooms, setRooms] = useState(new Collection<string, RoomData>())
  const [userData, setUserData] = useState(new Collection<string, UserData>())
  const [status, setStatus] = useState('connecting')

  type ToastType = '' | 'success' | 'error'

  const io = useSocketIO('http://kazukazu123123.f5.si:3250')
  useEffect(() => {
    io.on('connect', () => {
      //console.log('Connected')
      setStatus('lobby')
    })
      .on('disconnect', () => {
        setRooms(new Collection())
        setStatus('reconnecting')
        //console.log('Disconnected')
      })
      .on('game', (game: [string, UserData][]) => {
        setUserData(new Collection(game))
        //console.log('game', game)
      })
      .on('leaveRoom', () => {
        setUserData(new Collection())
      })
      .on('roomId', (roomId: string) => {
        console.log('roomId', roomId)
      })
      .on('rooms', (rooms: [string, RoomData][]) => {
        setRooms(new Collection(rooms))
        console.log('rooms', rooms)
      })
      .on('status', (status: string) => {
        setStatus(status)
        //console.log('status', status)
      })
      .on('toast', (type: ToastType, text: string) => {
        //console.log('toast', type, text)
        toast(text)
      })
    return () => {
      io.removeAllListeners()
    }
  }, [io])

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Header />
      <Connecting isVisible={status === 'connecting'} />
      <Reconnecting isVisible={status === 'reconnecting'} />
      <Lobby isVisible={status === 'lobby'} rooms={rooms} />
      <Game isVisible={status === 'game'} users={userData} />
      <Footer />
    </>
  )
}
