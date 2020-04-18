"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", { value: true });
const robotjs_1 = __importDefault(require("robotjs"));
let Directions;
(function (Directions) {
    Directions[Directions["up"] = 0] = "up";
    Directions[Directions["down"] = 1] = "down";
    Directions[Directions["left"] = 2] = "left";
    Directions[Directions["right"] = 3] = "right";
})(Directions || (Directions = {}));
const antiIdle = {
    intervalId: 0,
    start() {
        const randomize = () => {
            const randomNumber = Math.round(Math.random() * 3);
            const firstDirection = Directions[randomNumber];
            const secondDirection = Directions[randomNumber > 0 ? randomNumber - 1 : randomNumber + 1];
            robotjs_1.default.keyTap(firstDirection, 'control');
            robotjs_1.default.setKeyboardDelay(Math.round(Math.random() * 25));
            robotjs_1.default.keyTap(secondDirection, 'control');
            robotjs_1.default.setKeyboardDelay(Math.round(Math.random() * 25));
            robotjs_1.default.keyTap(firstDirection, 'control');
            const rand = Math.round(Math.random() * 4 * 60 * 1000) + (10 * 60 * 1000);
            console.log((new Date), firstDirection, secondDirection, rand);
            clearInterval(this.intervalId);
            this.i = setInterval(randomize, rand);
        };
        this.intervalId = setInterval(randomize, 500);
    },
    stop() {
        clearInterval(this.intervalId);
    },
};
antiIdle.start();
//# sourceMappingURL=idle.js.map