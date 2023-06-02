import Phaser from 'phaser'
import { GAME_SIZE } from '../utils/constants'

const textureBullet = 'bullet'

const audioRecharging = 'recharging'
const audioShot = 'shot'

const textColorBase = '#ffffff'
const textColorHover = '#ffd801'

export default class MenuScene extends Phaser.Scene {
  private _newBattle: Phaser.GameObjects.Sprite

  private _title: Phaser.GameObjects.Text

  private _text: Phaser.GameObjects.Text

  private _playerName1: string

  private _playerName2: string

  constructor () {
    super('MenuScene')
  }

  public get playerName1 () {
    return this._playerName1
  }

  public get playerName2 () {
    return this._playerName2
  }

  public preload () {
    this.load.image(textureBullet, 'assets/bullet.png')

    this.load.audio(audioRecharging, 'sounds/recharging.wav')
    this.load.audio(audioShot, 'sounds/shot.wav')
  }

  public create ({ winner }: {winner: string}) {
    this._playerName1 = 'Игрок 1'
    this._playerName2 = 'Игрок 2'

    this._createTitle(winner)
    this._createBtnNewBattle()
    this._createTextNewBattle()
  }

  private _createTitle (winner: string) {
    const text = winner ? `Победил персонаж ${winner}` : 'Игра'

    this._title = this.add.text(GAME_SIZE.width / 2, 128, text, {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: textColorBase,
      align: 'center'
    })

    this._title.setOrigin(0.5)
  }

  private _createBtnNewBattle () {
    this._newBattle = this.add.sprite(
      GAME_SIZE.width / 2,
      248,
      textureBullet
    )

    this._newBattle.setScale(0.6)
    this._newBattle.setInteractive()

    this._newBattle.on('pointerover', () => {
      this._text.setColor(textColorHover)
      this.sound.play(audioRecharging)
    })

    this._newBattle.on('pointerout', () => {
      this._text.setColor(textColorBase)
    })

    this._newBattle.on('pointerup', () => {
      this.sound.play(audioShot)
      this.scene.start('MainScene', {
        playerName1: this.playerName1,
        playerName2: this.playerName2
      })
    })
  }

  private _createTextNewBattle () {
    this._text = this.add.text(GAME_SIZE.width / 2, 248, 'Новый бой', {
      fontFamily: 'monospace',
      fontSize: 28,
      fontStyle: 'bold',
      color: textColorBase,
      align: 'center'
    })

    this._text.setOrigin(0.5)
  }
}
