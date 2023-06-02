import Phaser from 'phaser'
import Fire from './Fire'

export interface ConfigCreature {
  scene: Phaser.Scene
  x: number
  y: number
  texture: string | Phaser.Textures.Texture
  type?: string
}

export interface ConfigBullet {
  minDamage?: number
  maxDamage?: number
  speed?: number
}

export interface PlayerSettings {
  nickName: string
  hp?: number
  fire: Fire
}
