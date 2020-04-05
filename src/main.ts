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

function getAverageColor(arrayOfColors: string[]): string {
    const individualColors = getIndividualColor(arrayOfColors);
    let maxOccurrences = 0;
    let commonColor = '';
    individualColors.forEach(color => {
        if(getNumberOfOccurrences(color, arrayOfColors) > maxOccurrences) {
            maxOccurrences = getNumberOfOccurrences(color, arrayOfColors);
            commonColor = color;
        }
    });
    return commonColor;
}

interface Image {
    width: number;
    height: number;
    colorAt(x: number, y: number): Color
}

class ImageFromScreenshot implements Image {
    width: number;
    height: number;
    private screen: any;

    constructor(screen: any) {
        this.width = screen.width;
        this.height = screen.height;
        this.screen = screen
    }

    colorAt(x: number, y: number): Color {
        const colorString = this.screen.colorAt(x, y);
        return Color.fromString(colorString);
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

    colorAt(col: number, row: number): Color {
        const colorSize = 4;
        const startIndex = row * this.width * colorSize + col * colorSize;
        const red = this.png.data[startIndex];
        const green = this.png.data[startIndex + 1];
        const blue = this.png.data[startIndex + 2];

        return new Color(red, green, blue);
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


class Color {
    constructor( readonly r:number,
                 readonly g:number,
                 readonly b: number
    ) {}

    static fromString(colorString: string) {
        const r = parseInt(colorString.substring(0, 2), 16);
        const g = parseInt(colorString.substring(2, 4), 16);
        const b = parseInt(colorString.substring(4, 6), 16);
        return new Color(r, g, b);
    }

    isSimilar(color: Color, threshold: number) {
        const similarity = this.getSimilarity(color);
        return similarity < threshold;
    }

    getSimilarity(color: Color) {
        let r = 255 - Math.abs(color.r - this.r);
        let g = 255 - Math.abs(color.g - this.g);
        let b = 255 - Math.abs(color.b - this.b);
        r /= 255;
        g /= 255;
        b /= 255;

        return 1 - ((r + g + b) / 3);
    }
}

function getPercentageHealth(image: Image) {
    const middleRow = 5,
        borderWidth = 1,
        firstColor = image.colorAt(borderWidth, middleRow);
    let x = borderWidth + 1;

    while (firstColor.isSimilar(image.colorAt(x, middleRow), 0.02)) {
        x++;
    }

    const healthBarWidth = image.width - borderWidth * 2;
    return Math.floor(x / healthBarWidth * 100);
}

export {readImg, fromScreenshot, getPercentageHealth, Color};