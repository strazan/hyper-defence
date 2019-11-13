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
        this.cash = 10;
        this.speed = 500;
        this.step = -1;
        this.isHit = false;

        // this.ts = ts;
        this.health = 10;
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
                this.cash = 5;
                this.image.src = '../media/images/enemies/student-blue.svg'
                break;
            case 'medium':
                this.cash = 10;
                this.speed = 700;
                this.health = 20;
                this.image.src = '../media/images/enemies/student-pink.svg'
                break;
        }
    }



    // draw() {
    //   console.log(sk)
    // this.sk.fill(150, 150, 150);
    // sk.fi // steer() {
    //     if (this.alive) {

    //         let t = this.sk.createVector(Math.floor(this.pos.x / this.ts), Math.floor(this.pos.y / this.ts))
    //         let tileOn = this.path.filter((p) => {
    //             return t.x === p.x && t.y === p.y
    //         })[0]

    //         let goal = this.path[this.path.indexOf(tileOn) + 1]

    //         if (!goal) {
    //             goal = this.path[this.path.indexOf(tileOn)]
    //             this.alive = false

    //         }
    //         // console.log(t)
    //         if (t.x < goal.x) {
    //             this.vel = this.sk.createVector(2, 0)
    //         }
    //         if (t.x > goal.x) {
    //             this.vel = this.sk.createVector(-2, 0)
    //         }
    //         if (t.y < goal.y) {
    //             this.vel = this.sk.createVector(0, 2)
    //         }
    //         if (t.y > goal.y) {
    //             this.vel = this.sk.createVector(0, -2)
    //         }

    //     }
    // }

    // move() {
    //     if (!this.alive) return
    //     this.pos.add(this.vel)
    //     this.draw()
    // }ll(this.getColor());
    // this.e = this.sk.image(this.image, this.pos.x, this.pos.y, this.radius * this.ts, this.radius * this.ts);
    // }





}

module.exports = {
    Enemy
};