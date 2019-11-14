 /* --------------------------------------------------------------------- #5 */

 class Turret {
     constructor(x, y) {
        this.name = 'pm one'
         this.position = {
             x: x,
             y: y,
         }

         this.radius = 5;
         this.shootTimer = 0
         this.damage = 5
         this.speed = 1000
         this.cost = 100
         this.fired = false

         this.image = new Image(200, 200)
         this.image.src = '../media/images/turrets/monster.svg'

         this.bullet = new Image(200, 200)
         this.bullet.position = {
             x: x,
             y: y,
         }
         this.bullet.target = null
         this.bullet.travelSpeed = 180;
         this.bullet.src = '../media/images/turrets/post-it-why.svg'
     }
     loadFromTemplate(template) {
        this.name = template
         switch (template) {
             case 'pm-two':
                 this.radius = 2
                 this.speed = 300
                 this.damage = 2
                 this.cost = 150
                 this.bullet.travelSpeed = 180;
                 this.bullet.src = '../media/images/turrets/rick.png'
                 break;

             case 'pm-three':
                 this.radius = 12
                 this.speed = 3000
                 this.damage = 12
                 this.cost = 200
                 break;

             case 'eskil':
                 this.radius = 7
                 this.speed = 300
                 this.damage = 10
                 this.cost = 1000
                 this.bullet.travelSpeed = 160;
                 this.bullet.src = '../media/images/turrets/zero.svg'

         }
     }
 }

 module.exports = {
     Turret
 }