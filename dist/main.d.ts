interface Image {
    width: number;
    height: number;
    colorAt(a: number, b: number): string;
}
declare function readImg(path: String): Image;
declare function fromScreenshot(posX: any, posY: any, width: any, height: any): Image;
export { readImg, fromScreenshot };
