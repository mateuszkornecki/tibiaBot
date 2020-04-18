"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
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
        return new main_1.Color(red, green, blue);
    }
}
exports.default = ImageFromPng;
//# sourceMappingURL=ImageFromPng.js.map