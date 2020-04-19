import { Color } from "./main";

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
     this.screen = screen;
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

export {Image, ImageFromScreenshot, ImageFromPng};
