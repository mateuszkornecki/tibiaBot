import robot from 'robotjs';

enum Directions {
    up = 'up',
    down = 'down',
    left = 'left',
    right = 'right'
}

function getRandomNumberBetween(min, max): number {
    return Math.round(Math.random() * (max - min)) + min;
}

function getRandomDirections(): Array<Directions> {
    const directions = [Directions.up, Directions.down, Directions.left, Directions.right],
        firstPosition = getRandomNumberBetween(0, directions.length - 1),
        firstDirection = directions[firstPosition];

    directions.splice(firstPosition, 1);
    console.log(directions.length)
    const secondDirection = directions[getRandomNumberBetween(0, directions.length - 1)];
    return [firstDirection, secondDirection];
}

const antiIdle = {
    intervalId: 0,
    start() {
        const randomize = () => {
            const timeout = getRandomNumberBetween(10 * 60 * 1000, 15 * 60 * 1000),
                directions = getRandomDirections();

            robot.keyTap(directions[0], 'control');
            robot.setKeyboardDelay(getRandomNumberBetween(0, 25))
            robot.keyTap(directions[1], 'control');
            robot.setKeyboardDelay(getRandomNumberBetween(0, 25))
            robot.keyTap(directions[0], 'control');

            console.log((new Date), directions, timeout);
            clearInterval(this.intervalId);
            this.intervalId = setInterval(randomize, timeout);
        }

        this.intervalId = setInterval(randomize, 500);
    },
    stop() {
        clearInterval(this.intervalId);
    },
}

antiIdle.start();

