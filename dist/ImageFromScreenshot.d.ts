import { Color, Image } from "./main";
declare class ImageFromScreenshot implements Image {
    width: number;
    height: number;
    private screen;
    constructor(screen: any);
    colorAt(x: number, y: number): Color;
}
export default ImageFromScreenshot;
