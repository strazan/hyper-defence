 /* --------------------------------------------------------------------- #5 */

 class Turret {
     constructor(x, y) {
         this.name = 'pm-one'
         this.position = {
             x: x,
             y: y,
         }

         this.radius = 3.5;
         this.shootTimer = 0
         this.damage = 4
         this.speed = 1000
         this.cost = 100
         this.fired = false

         this.image = new Image(200, 200)
         this.image.src = '../media/images/turrets/pm-pink.svg'

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
         if(template === 'eskil'){
            setInterval(() => {

                let rand = Math.floor(Math.random()*2)
                rand === 0?  this.bullet.src = '../media/images/turrets/0.svg' :  this.bullet.src = '../media/images/turrets/1.svg'
             }, 140)
         }
        
         switch (template) {
             case 'pm-two':
                 this.radius = 2.5
                 this.speed = 330
                 this.damage = 3
                 this.cost = 150
                 this.bullet.travelSpeed = 180;
                 this.image.src = '../media/images/turrets/pm-orange.svg'
                 this.bullet.src = '../media/images/turrets/post-it-information.svg'
                 break;

             case 'pm-three':
                 this.radius = 12
                 this.speed = 3000
                 this.damage = 12
                 this.cost = 200
                 this.bullet.src = '../media/images/post-it-reflection.svg'
                 this.image.src = '../media/images/turrets/pm-green.svg'
                 break;

             case 'eskil':
                 this.radius = 7
                 this.speed = 280
                 this.damage = 10
                 this.cost = 1000
                 this.bullet.travelSpeed = 160;
                 this.bullet.src = '../media/images/turrets/0.svg'
                 this.image.src = '../media/images/turrets/pm-eskil.svg'

         }
     }
 }

 module.exports = {
     Turret
 }