import MainScene from '../scenes/MainScene'
import ProgressBar from './ProgressBar'
import Phaser from 'phaser'

export default class HealthProgressBar extends ProgressBar {
  private _textOnProgressBar: Phaser.GameObjects.Text

  constructor (scene: Phaser.Scene, x: number, y: number, maxHP: number, hp: number) {
    super(scene, x, y, maxHP)

    this._textOnProgressBar = scene.add.text(x + 10, y, `${hp} / ${maxHP}`, {
      fontFamily: 'monospace',
      fontSize: 10,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    })
  }

  private _generateDamageText (scene: MainScene, damage: number) {
    const text = scene.add.text(this.x, this.y, `-${damage}`, {
      fontFamily: 'monospace',
      fontSize: 12,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    })

    const timer = scene.time.addEvent({
      delay: 100,
      repeat: 20,
      callback: () => {
        text.setX(text.x - 2)
        text.setY(text.y - 2)

        if (timer.repeatCount === 0) {
          text.destroy()
          timer.destroy()
        }
      }
    })
  }

  public update (scene: MainScene, damage: number, maxHP: number, hp: number) {
    this._generateDamageText(scene, damage)

    this.updateProgressBar(hp)
    this._textOnProgressBar.text = `${hp} / ${maxHP}`
  }
}
