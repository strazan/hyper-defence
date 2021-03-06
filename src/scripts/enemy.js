 /* --------------------------------------------------------------------- #4 */

 class Enemy {
     constructor(x, y, path) {
         // this.color = [0, 0, 0];
         this.radius = 0.5; // radius in tiles
         this.isAlive = true;
         this.path = path;

         this.position = {
             x: x,
             y: y,
         }

         this.name = 'enemy';
         this.cash = 1;
         this.speed = 500;
         this.step = -1;
         this.isHit = false;

         // this.ts = ts;
         this.health = 10;
         this.hpDamage = 1;
         this.moveTimer = 450;

         // this.template = template
         this.image = new Image(200, 200)
         this.deathSound = new Audio("media/sounds/aha.wav")
         this.deathSound.volume = 0.3;

         // this.image = sk.loadImage('../media/images/rainbow.jpg')
     }

     loadFromTemplate(template) {
         switch (template) {
             case 'weak':
                 //CHANGE CASH
                 this.cash = 5;
                 this.image.src = '../media/images/enemies/student-blue.svg'
                 break;
             case 'medium':
                 this.cash = 10;
                 this.speed = 700;
                 this.health = 20;
                 this.hpDamage = 2;
                 this.image.src = '../media/images/enemies/student-pink.svg'
                 break;
             case 'hard':
                 this.cash = 15;
                 this.speed = 400;
                 this.health = 80;
                 this.hpDamage = 5;
                 this.image.src = '../media/images/enemies/student-orange.svg'
                 break;
             case 'fly':
                 this.cash = 12;
                 this.speed = 100;
                 this.health = 40;
                 this.hpDamage = 4;
                 this.image.src = '../media/images/enemies/student-purple.svg'
                 break;
             case 'boss':
                 this.cash = 40;
                 this.speed = 1200;
                 this.health = 500;
                 this.hpDamage = 10;
                 this.image.src = '../media/images/enemies/student-red.svg'
                 break;
             case 'mega-boss':
                 this.cash = 0;
                 this.speed = 1300;
                 this.health = 13000;
                 this.hpDamage = 100;
                 this.image.src = '../media/images/enemies/student-red.svg'
                 break;
         }
     }
 }

 module.exports = {
     Enemy
 };