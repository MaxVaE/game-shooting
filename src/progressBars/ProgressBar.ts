import Phaser from 'phaser'

const widthProgressBox = 75
const heightProgressBox = 10

const boxColor = 0x990f02
const barColor = 0x3cb043

export default class ProgressBar {
  private _progressBar: Phaser.GameObjects.Graphics

  private _progressBox: Phaser.GameObjects.Graphics

  private _widthProgressBar: number

  private _x: number

  private _y: number

  constructor (scene: Phaser.Scene, x: number, y: number, value: number) {
    this._x = x
    this._y = y
    this._widthProgressBar = value / widthProgressBox

    this._progressBox = scene.add.graphics()
    this._progressBox.fillStyle(boxColor, 1)
    this._progressBox.fillRect(this._x, this._y, widthProgressBox, heightProgressBox)

    this._progressBar = scene.add.graphics()
    this._changeProgressBar(value)
  }

  public get x () {
    return this._x
  }

  public get y () {
    return this._y
  }

  private _changeProgressBar (value: number) {
    this._progressBar.clear()
    this._progressBar.fillStyle(barColor, 1)
    this._progressBar.fillRect(this._x, this._y, value / this._widthProgressBar, heightProgressBox)
  }

  public updateProgressBar (value: number) {
    this._changeProgressBar(value)
  }
}
