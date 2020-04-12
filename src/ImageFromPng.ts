import { Color, Image } from './main';

class ImageFromPng implements Image {
   width: number;

   height: number;

   private png: any;

   constructor(png: any) {
      this.width = png.width;
      this.height = png.height;
      this.png = png;
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

export default ImageFromPng;
