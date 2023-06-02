import Phaser from 'phaser'

import MainScene from './scenes/MainScene'
import { GAME_SIZE } from './utils/constants'
import MenuScene from './scenes/MenuScene'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-container',
  backgroundColor: '#232232',
  autoFocus: true,
  disableContextMenu: true,
  scale: {
    width: GAME_SIZE.width,
    height: GAME_SIZE.height
  },
  physics: { default: 'arcade' },
  scene: [
    MenuScene,
    MainScene
  ]
}

export default new Phaser.Game(config)
