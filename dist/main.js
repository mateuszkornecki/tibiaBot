"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", { value: true });
const robotjs_1 = __importDefault(require("robotjs"));
const ImageFromScreenshot_1 = __importDefault(require("./ImageFromScreenshot"));
const Color_1 = __importDefault(require("./Color"));
exports.Color = Color_1.default;
const ImageFromPng_1 = __importDefault(require("./ImageFromPng"));
const fs = require('fs');
const { PNG } = require('pngjs');
function readImg(path) {
    const file = fs.readFileSync(path);
    const png = PNG.sync.read(file);
    return new ImageFromPng_1.default(png);
}
exports.readImg = readImg;
function fromScreenshot(posX, posY, width, height) {
    const screen = robotjs_1.default.screen.capture(posX, posY, width, height);
    return new ImageFromScreenshot_1.default(screen);
}
exports.fromScreenshot = fromScreenshot;
function getPercentageHealth(image) {
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
exports.getPercentageHealth = getPercentageHealth;
//# sourceMappingURL=main.js.map