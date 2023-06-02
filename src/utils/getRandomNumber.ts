import Phaser from 'phaser'

export const getRandomNumber = (min: number, max: number) =>
  Phaser.Math.Between(min, max)
