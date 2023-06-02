import { useEffect, useState } from 'react'
import MenuScene from '../scenes/MenuScene'
import phaserGame from '../PhaserGame'

export const useGameCreated = () => {
  const [gameCreated, setGameCreated] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const scene = phaserGame.scene.getScene('MenuScene') as MenuScene

      if (scene) {
        setGameCreated(true)
        clearInterval(intervalId)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return [gameCreated] as const
}
