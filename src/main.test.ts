import {readImg} from './main';

test('colorAt() returns correct color string.', () => {
   const image = readImg('./assets/colorTest.png');

   expect(image.width).toBe(3);
   expect(image.height).toBe(2);
   expect(image.colorAt(0, 0)).toBe('ff0000');
   expect(image.colorAt(1, 0)).toBe('00ff00');
   expect(image.colorAt(2, 0)).toBe('0000ff');
   expect(image.colorAt(0, 1)).toBe('ffff00');
   expect(image.colorAt(1, 1)).toBe('000000');
   expect(image.colorAt(2, 1)).toBe('ffffff');

});