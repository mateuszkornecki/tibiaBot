/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import robot from 'robotjs';
import ImageFromScreenshot from './ImageFromScreenshot';
import Color from './Color';
import ImageFromPng from './ImageFromPng';

const fs = require('fs');
const { PNG } = require('pngjs');

interface Image {
   width: number;
   height: number;
   colorAt(x: number, y: number): Color
}

function readImg(path: String): Image {
  const file = fs.readFileSync(path);
  const png = PNG.sync.read(file);
  return new ImageFromPng(png);
}

function fromScreenshot(posX, posY, width, height): Image {
  const screen = robot.screen.capture(posX, posY, width, height);
  return new ImageFromScreenshot(screen);
}

function getPercentageHealth(image: Image) {
  const middleRow = 5;
  const borderWidth = 1;
  const firstColor = image.colorAt(borderWidth, middleRow);
  let x = borderWidth + 1;

  while (firstColor.isSimilar(image.colorAt(x, middleRow), 0.02)) {
    x += 1;
  }

  const healthBarWidth = image.width - borderWidth * 2;
  return Math.floor((x / healthBarWidth) * 100);
}

export {
  readImg, fromScreenshot, getPercentageHealth, Color, Image
};