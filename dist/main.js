"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const robot = require("robotjs");
const fs = require('fs');
const PNG = require('pngjs').PNG;
function getArrayOfColors(posX, posY, width, height) {
    const img = robot.screen.capture(posX, posY, width, height);
    const colors = [];
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            const hex = img.colorAt(i, j);
            colors.push(hex);
        }
    }
    return colors;
}
function getInvidualColor(arrayOfColors) {
    return [...new Set(arrayOfColors)];
}
function getNumberOfOccurrences(color, arrayOfColors) {
    const numberOfOccurrences = arrayOfColors.filter(item => item === color);
    return numberOfOccurrences.length;
}
function getAvarageColor(arrayOfColors) {
    const invidualColors = getInvidualColor(arrayOfColors);
    let maxOccurances = 0;
    let commonColor = '';
    invidualColors.forEach(color => {
        if (getNumberOfOccurrences(color, arrayOfColors) > maxOccurances) {
            maxOccurances = getNumberOfOccurrences(color, arrayOfColors);
            commonColor = color;
        }
    });
    return commonColor;
}
class ImageFromScreenshot {
    constructor(screen) {
        this.width = screen.width;
        this.height = screen.height;
        this.screen = screen;
    }
    colorAt(x, y) {
        return this.screen.colorAt(x, y);
    }
}
class ImageFromPng {
    constructor(png) {
        this.width = png.width;
        this.height = png.height;
        this.png = png;
    }
    colorAt(col, row) {
        const colorSize = 4;
        const startIndex = row * this.width * colorSize + col * colorSize;
        const red = this.png.data[startIndex];
        const green = this.png.data[startIndex + 1];
        const blue = this.png.data[startIndex + 2];
        return this.toHexString(red) + this.toHexString(green) + this.toHexString(blue);
    }
    toHexString(byte) {
        return (byte & 0xFF).toString(16).padStart(2, '0');
    }
}
function readImg(path) {
    const file = fs.readFileSync(path);
    const png = PNG.sync.read(file);
    return new ImageFromPng(png);
}
exports.readImg = readImg;
function fromScreenshot(posX, posY, width, height) {
    const screen = robot.screen.capture(posX, posY, width, height);
    return new ImageFromScreenshot(screen);
}
exports.fromScreenshot = fromScreenshot;
//# sourceMappingURL=main.js.map