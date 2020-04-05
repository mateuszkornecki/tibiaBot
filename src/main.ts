import robot from "robotjs";
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

function getIndividualColor(arrayOfColors: string[]): string[] {
    return [...new Set(arrayOfColors)];
}

function getNumberOfOccurrences(color: string, arrayOfColors: string[]): number {
    const numberOfOccurrences = arrayOfColors.filter(item => item === color);
    return numberOfOccurrences.length;
}

function getAvarageColor(arrayOfColors: string[]): string {
    const individualColors = getIndividualColor(arrayOfColors);
    let maxOccurrences = 0;
    let commonColor = '';
    individualColors.forEach(color => {
        if(getNumberOfOccurrences(color, arrayOfColors) > maxOccurrences) {
            maxOccurrences = getNumberOfOccurrences(color, arrayOfColors);
            commonColor = color;
        }
    })
    return commonColor;
}

interface Image {
    width: number;
    height: number;
    colorAt(a: number, b: number): string
}


class ImageFromScreenshot implements Image {
    width: number
    height: number
    private screen: any

    constructor(screen: any) {
        this.width = screen.width;
        this.height = screen.height;
        this.screen = screen
    }

    colorAt(x: number, y: number): string {
        return this.screen.colorAt(x, y)
    }
}

class ImageFromPng implements Image {
    width: number;
    height: number;
    private png: any;

    constructor (png: any) {
        this.width = png.width;
        this.height = png.height;
        this.png = png
    }

    colorAt(col: number, row: number): string {
        const colorSize = 4;
        const startIndex = row * this.width * colorSize + col * colorSize;
        const red = this.png.data[startIndex];
        const green = this.png.data[startIndex + 1];
        const blue = this.png.data[startIndex + 2];

        return this.toHexString(red) + this.toHexString(green) + this.toHexString(blue);
    }

    private toHexString(byte: number): string {
        return (byte & 0xFF).toString(16).padStart(2,'0');
    }
}

function readImg(path: String): Image {
    const file = fs.readFileSync(path);
    const png = PNG.sync.read(file);
    return new ImageFromPng(png)
}

function fromScreenshot(posX, posY, width, height): Image {
    const screen = robot.screen.capture(posX, posY, width, height);
    return new ImageFromScreenshot(screen)
}

export {readImg, fromScreenshot};