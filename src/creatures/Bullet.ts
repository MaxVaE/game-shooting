import { getRandomNumber } from '../utils/getRandomNumber'
import { ConfigBullet, ConfigCreature } from './type'
import Creature from './Creature'

export default class Bullet extends Creature {
  private _minDamage: number

  private _maxDamage: number

  private _speed: number

  constructor (configSprite: ConfigCreature, { minDamage = 100, maxDamage = 200, speed = 300 }: ConfigBullet) {
    super({
      ...configSprite,
      type: 'Bullet'
    })

    this._minDamage = minDamage
    this._maxDamage = maxDamage
    this._speed = speed
  }

  public get minDamage () {
    return this._minDamage
  }

  public get maxDamage () {
    return this._maxDamage
  }

  public get speed () {
    return this._speed
  }

  public generateDamage () {
    return getRandomNumber(this._minDamage, this._maxDamage)
  }
}
