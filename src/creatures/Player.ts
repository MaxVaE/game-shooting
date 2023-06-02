import MainScene from '../scenes/MainScene'
import { getRandomNumber } from '../utils/getRandomNumber'
import Phaser from 'phaser'
import { ConfigCreature, PlayerSettings } from './type'
import Creature from './Creature'
import Fire from './Fire'
import HealthProgressBar from '../progressBars/HealthProgressBar'

export default class Player extends Creature {
  private _nickName: string

  private _hp: number

  private _maxHP: number

  private _isDead: boolean = false

  private _event?: Phaser.Time.TimerEvent

  private _healthProgressBar: HealthProgressBar

  private _fire: Fire

  constructor (
    configSprite: ConfigCreature,
    { nickName, hp = 1500, fire }: PlayerSettings
  ) {
    super({
      ...configSprite,
      type: 'Player'
    })

    this._nickName = nickName
    this._hp = hp
    this._maxHP = hp

    const { scene } = configSprite

    const x = this.x - this.width / 2
    const y = this.y - this.height

    this._healthProgressBar = new HealthProgressBar(scene, x, y, this.maxHP, this.hp)

    this._fire = fire
  }

  public override update (scene: MainScene): void {
    this.shoot(scene)
  }

  public get nickName () {
    return this._nickName
  }

  public get hp () {
    return this._hp
  }

  public get maxHP () {
    return this._maxHP
  }

  public get isDead () {
    return this._isDead
  }

  private _clearEvent (scene: MainScene) {
    this._event.remove()
    scene.time.removeEvent(this._event)

    this._event = undefined
  }

  public shoot (scene: MainScene) {
    if (!this._event && !scene.gameOver) {
      const delay = getRandomNumber(2, 5) * 1000

      this._event = scene.time.addEvent({
        delay,
        callback: () => {
          scene.createBullet(this)
          this._clearEvent(scene)
          this._fire.playAnimation()
        }
      })
    } else if (this._event && scene.gameOver) {
      this._clearEvent(scene)
    }
  }

  public getDamage (damage: number, scene: MainScene) {
    const currentHP = this.hp - damage

    this._hp = currentHP > 0 ? currentHP : 0

    this.checkDeath()
    this._healthProgressBar.update(scene, damage, this.maxHP, this.hp)
  }

  public checkDeath () {
    if (this.hp <= 0) {
      this._isDead = true
    }
  }
}
