"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
class ImageFromScreenshot {
    constructor(screen) {
        this.width = screen.width;
        this.height = screen.height;
        this.screen = screen;
    }
    colorAt(x, y) {
        const colorString = this.screen.colorAt(x, y);
        return main_1.Color.fromString(colorString);
    }
}
exports.default = ImageFromScreenshot;
//# sourceMappingURL=ImageFromScreenshot.js.map