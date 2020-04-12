import { Color, Image } from "./main";

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

export default ImageFromScreenshot;
