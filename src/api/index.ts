import { Message, SendMessage } from '../types/types'

const URL = 'http://localhost:8888'

export const getMessagesFetch = async (): Promise<Message[] | undefined> => {
  try {
    const response = await fetch(`${URL}/chat/messages`)
    const data: Message[] = await response.json()

    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return undefined
  }
}

export const sendMessageFetch = async (message: SendMessage): Promise<void> => {
  try {
    await fetch(`${URL}/chat/send`, {
      method: 'POST',
      body: JSON.stringify(message)
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
