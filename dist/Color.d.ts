declare class Color {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    constructor(r: number, g: number, b: number);
    static fromString(colorString: string): Color;
    isSimilar(color: Color, threshold: number): boolean;
    getSimilarity(color: Color): number;
}
export default Color;
