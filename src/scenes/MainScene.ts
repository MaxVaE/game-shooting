import Phaser from 'phaser'
import Player from '../creatures/Player'
import Bullet from '../creatures/Bullet'
import { getRandomNumber } from '../utils/getRandomNumber'
import { GAME_SIZE } from '../utils/constants'
import Fire from '../creatures/Fire'
import { MainSceneCreateData } from '../types/types'

const texturePlayer1 = 'player'
const texturePlayer2 = 'player2'
const textureBullet = 'bullet'
const textureBackground = 'background'
const textureFire = 'fire'

const audioShot = 'shot'

export default class MainScene extends Phaser.Scene {
  private _player1: Player

  private _player2: Player

  private _gameOver: boolean = false

  constructor () {
    super('MainScene')
  }

  public get gameOver () {
    return this._gameOver
  }

  public preload () {
    this._gameOver = false

    this.load.image(textureBackground, 'assets/background.png')

    this.load.image(texturePlayer1, 'assets/player1.png')
    this.load.image(texturePlayer2, 'assets/player2.png')

    this.load.image(textureBullet, 'assets/bullet.png')

    this.load.spritesheet(
      textureFire,
      'assets/fire.png',
      {
        frameWidth: 70,
        frameHeight: 150
      }
    )

    this.load.audio(audioShot, 'sounds/shot.wav')
  }

  public create ({ playerName1, playerName2 }: MainSceneCreateData) {
    this.add.image(GAME_SIZE.width / 2, GAME_SIZE.height / 2, textureBackground)

    this._createPlayers(playerName1, playerName2)
  }

  public override update (): void {
    this._player1.update(this)
    this._player2.update(this)
  }

  private _checkGameOver () {
    if (this._player1.isDead || this._player2.isDead) {
      this._gameOver = true

      if (this._player1.isDead) {
        this._onDestroy(this._player2)
      }

      if (this._player2.isDead) {
        this._onDestroy(this._player1)
      }
    }
  }

  private _onDestroy (winner: Player) {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.start('MenuScene', { winner: winner.nickName })
      }
    })
  }

  private _playerTakesDamage (player: Player, bullet: Bullet) {
    if (!this._gameOver) {
      player.getDamage(bullet.generateDamage(), this)

      this._checkGameOver()
    }

    bullet.destroy()
  }

  private _createPlayers (PlayerName1: string, PlayerName2: string) {
    const firePlayer1 = new Fire({
      scene: this,
      x: 140,
      y: GAME_SIZE.height - 90,
      texture: textureFire
    })

    firePlayer1.setScale(0.2)

    this._player1 = new Player(
      {
        scene: this,
        x: 100,
        y: GAME_SIZE.height - 80,
        texture: texturePlayer1
      },
      {
        nickName: PlayerName1,
        fire: firePlayer1
      }
    )

    const firePlayer2 = new Fire({
      scene: this,
      x: GAME_SIZE.width - 140,
      y: GAME_SIZE.height - 86,
      texture: textureFire
    })

    firePlayer2.setRotation(3.14)
    firePlayer2.setScale(0.2)

    this._player2 = new Player(
      {
        scene: this,
        x: GAME_SIZE.width - 100,
        y: GAME_SIZE.height - 80,
        texture: texturePlayer2
      },
      {
        nickName: PlayerName2,
        fire: firePlayer2
      }

    )
  }

  public createBullet (player: Player) {
    const isSecondPlayer = this._player2.nickName === player.nickName

    const x = isSecondPlayer
      ? player.x - player.width / 2
      : player.x + player.width / 2

    const y = player.y + getRandomNumber(-5, 5)

    const bullet = new Bullet({
      scene: this,
      x,
      y,
      texture: textureBullet
    },
    { speed: 400 })

    const velocityX = isSecondPlayer ? -bullet.speed : bullet.speed

    bullet.setScale(0.02)
    bullet.body.velocity.x = velocityX

    if (isSecondPlayer) {
      bullet.setRotation(3.14)
    }

    this.sound.play(audioShot)

    const playerTakingDamage = isSecondPlayer ? this._player1 : this._player2

    this.physics.add.overlap(playerTakingDamage, bullet, this._playerTakesDamage, null, this)
  }
}
