export interface Message {
  text: string
  time: number
  id: string
  sender: string
}

export type SendMessage = Omit<Message, 'id'>

export interface MainSceneCreateData {
  playerName1: string
  playerName2: string
}
