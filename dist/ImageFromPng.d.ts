import { Color, Image } from './main';
declare class ImageFromPng implements Image {
    width: number;
    height: number;
    private png;
    constructor(png: any);
    colorAt(col: number, row: number): Color;
}
export default ImageFromPng;
