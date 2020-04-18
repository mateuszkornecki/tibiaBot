import Color from './Color';
interface Image {
    width: number;
    height: number;
    colorAt(x: number, y: number): Color;
}
declare function readImg(path: String): Image;
declare function fromScreenshot(posX: any, posY: any, width: any, height: any): Image;
declare function getPercentageHealth(image: Image): number;
export { readImg, fromScreenshot, getPercentageHealth, Color, Image };
