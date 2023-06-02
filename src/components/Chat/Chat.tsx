import { KeyboardEvent, useEffect, useState } from 'react'
import './Chat.css'
import { useLastMessageScroll } from '../../hooks/useLastMessageScroll'
import { ButtonSend } from '../ButtonSend/ButtonSend'
import { getTime } from '../../utils/getTime'
import { Message, SendMessage } from '../../types/types'
import clsx from 'clsx'

interface Props {
  playerName: string
  messages: Message[]
  sendMessage: (_message: SendMessage) => void
}

export const Chat = ({ playerName, messages, sendMessage }: Props) => {
  const [textMessage, setTextMessage] = useState<string>('')

  const lastMessageScroll = useLastMessageScroll({
    elementSelector: '.chat__message',
    padding: 8,
    scrollBySelector: '.chat__messages'
  })

  useEffect(() => {
    lastMessageScroll()
  }, [messages])

  const handleSend = () => {
    if (!textMessage || !playerName) {
      return
    }

    const message: SendMessage = {
      text: textMessage,
      time: new Date().getTime(),
      sender: playerName
    }

    sendMessage(message)

    setTextMessage('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='chat'>
      <div className='chat__content'>
        <ul className='chat__messages'>
          {messages.map(({ id, time, text, sender }) =>
            <li className={clsx('chat__message', { 'chat__message--yellow-color': sender === playerName })} key={id}>
              <div className='chat-message__text'>[{sender}]: {text}</div>
              <span className='chat-message__time'>{getTime(time)}</span>
            </li>
          )}
        </ul>
      </div>

      <footer className='chat__footer'>
        <textarea
          className='chat-footer__textarea'
          value={textMessage}
          onChange={(event) => setTextMessage(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <ButtonSend className='chat-footer__button' title='Отправить' onSend={handleSend} />
      </footer>
    </div>
  )
}
