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
   const secondDirection = directions[getRandomNumberBetween(0, directions.length - 1)];
   return [firstDirection, secondDirection];
}

class AntiIdle {
   antiIdleInterval = null;

   start() {
      const randomize = () => {
         const timeout = getRandomNumberBetween(10 * 60 * 1000, 15 * 60 * 1000),
             directions = getRandomDirections();
         
             this.idleTurn(directions[0], directions[1]);
         

         clearInterval(this.antiIdleInterval);
         this.antiIdleInterval = setInterval(randomize, timeout);
     }

     this.antiIdleInterval = setInterval(randomize, 500);
   };

   stop() {
      clearInterval(this.antiIdleInterval);
  };

   idleTurn(firstDirection, secondDirection) {
      robot.keyTap(firstDirection, 'control');
      robot.setKeyboardDelay(getRandomNumberBetween(0, 25))
      robot.keyTap(secondDirection, 'control');
      robot.setKeyboardDelay(getRandomNumberBetween(0, 25))
      robot.keyTap(firstDirection, 'control');
   };

}

const afk = new AntiIdle();
afk.start();



