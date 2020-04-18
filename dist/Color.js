"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    static fromString(colorString) {
        const r = parseInt(colorString.substring(0, 2), 16);
        const g = parseInt(colorString.substring(2, 4), 16);
        const b = parseInt(colorString.substring(4, 6), 16);
        return new Color(r, g, b);
    }
    isSimilar(color, threshold) {
        const similarity = this.getSimilarity(color);
        return similarity < threshold;
    }
    getSimilarity(color) {
        let r = 255 - Math.abs(color.r - this.r);
        let g = 255 - Math.abs(color.g - this.g);
        let b = 255 - Math.abs(color.b - this.b);
        r /= 255;
        g /= 255;
        b /= 255;
        return 1 - ((r + g + b) / 3);
    }
}
exports.default = Color;
//# sourceMappingURL=Color.js.map