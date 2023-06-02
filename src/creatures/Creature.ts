import Phaser from 'phaser'
import { ConfigCreature } from './type'

export default class Creature extends Phaser.Physics.Arcade.Sprite {
  constructor ({ scene, x, y, texture, type = 'Sprite' }: ConfigCreature) {
    super(scene, x, y, texture)

    scene.add.existing(this)
    scene.physics.world.enableBody(this, 0)
    this.type = type
  }
}
