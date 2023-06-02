import { useEffect, useState } from 'react'
import { Chat } from './components/Chat/Chat'
import { Message } from './types/types'
import phaserGame from './PhaserGame'
import MenuScene from './scenes/MenuScene'
import { useGameCreated } from './hooks/useGameCreated'
import { getMessagesFetch, sendMessageFetch } from './api'

const App = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [playerName, setPlayerName] = useState<string>('')

  const [gameCreated] = useGameCreated()

  useEffect(() => {
    if (gameCreated) {
      const scene = phaserGame.scene.getScene('MenuScene') as MenuScene

      setPlayerName(scene.playerName1)
    }
  }, [gameCreated])

  const getMessages = async () => {
    const data = await getMessagesFetch()

    if (data) {
      setMessages(data)
    }
  }

  useEffect(() => {
    getMessages()

    const intervalId = setInterval(() => {
      getMessages()
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='app'>
      <Chat
        messages={messages}
        sendMessage={sendMessageFetch}
        playerName={playerName}
      />
    </div>
  )
}

export default App
