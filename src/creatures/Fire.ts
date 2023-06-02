import Creature from './Creature'
import { ConfigCreature } from './type'

export default class Fire extends Creature {
  constructor (configCreature: ConfigCreature) {
    super({
      ...configCreature,
      type: 'Fire'
    })

    this.visible = false

    this.anims.create({
      key: 'fireShot',
      frames: this.anims.generateFrameNumbers(configCreature.texture as string, {
        start: 0,
        end: 3
      }),
      frameRate: 12,
      hideOnComplete: true
    })
  }

  public playAnimation () {
    this.visible = true
    this.anims.play('fireShot', true)
  }
}
