import robot from 'robotjs';
import { fromScreenshot, getPercentageColor } from './main';

interface Character {
   percentageHealth: number;
   setPercentageHealth(): void;
   getPercentageHealth(): number;
}

class Character implements Character {
   percentageHealth = 0;
   healingInterval = null;
   
   setPercentageHealth() {
      const hp = fromScreenshot(1527, 67, 93, 10);
      this.percentageHealth = getPercentageColor(hp);
   }

   healBelow(percentageHealthToHeal) {
      if(this.percentageHealth < percentageHealthToHeal) {
         robot.keyTap('f6');
      }
   }

   healing() {
      this.healingInterval = setInterval(()=>{
         this.setPercentageHealth();
         this.healBelow(50)
      },250)
   }

}

const raszuje = new Character();
raszuje.healing();
