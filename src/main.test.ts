import { readImg, getPercentageColor, Color } from './main';

test('colorAt() returns correct color string.', () => {
   const image = readImg('./assets/colorTest.png');

   expect(image.width).toBe(3);
   expect(image.height).toBe(2);
   expect(image.colorAt(0, 0)).toStrictEqual(Color.fromString('ff0000'));
   expect(image.colorAt(1, 0)).toStrictEqual(Color.fromString('00ff00'));
   expect(image.colorAt(2, 0)).toStrictEqual(Color.fromString('0000ff'));
   expect(image.colorAt(0, 1)).toStrictEqual(Color.fromString('ffff00'));
   expect(image.colorAt(1, 1)).toStrictEqual(Color.fromString('000000'));
   expect(image.colorAt(2, 1)).toStrictEqual(Color.fromString('ffffff'));
});

test('getPercentageColor() should return correct number', () => {
   const image = readImg('./assets/percentageTest.png');

   expect(getPercentageColor(image)).toBe(Math.floor((1160 / 1545) * 100));
});

test('isSimilar() should return correct value', () => {
   const darkRed = Color.fromString('bf4040');
   const lightRed = Color.fromString('d38585');
   const darkBlue = Color.fromString('44516c');

   expect(darkRed.isSimilar(lightRed, 0.25)).toBe(true);
   expect(lightRed.isSimilar(darkBlue, 0.25)).toBe(false);
});
