class Enemy {
    constructor(x, y, path, ts, sk) {
        // this.color = [0, 0, 0];
        this.radius = 0.5; // radius in tiles
        this.sk = sk
        this.alive = true;
        this.path = path;

        this.pos = sk.createVector(x, y);
        this.vel = sk.createVector(0, 0);

        this.name = 'enemy';
        this.cash = 1;
        this.health = 2;
        this.speed = 1;
        this.ts = ts;
        this.image = sk.loadImage('../media/images/rainbow.jpg')

    }

    draw() {
        //   console.log(sk)
        this.sk.fill(150, 150, 150);
        // sk.fill(this.getColor());
        this.e = this.sk.image(this.image, this.pos.x, this.pos.y, this.radius * this.ts, this.radius * this.ts);
    }

    steer() {
        if (this.alive) {

            let t = this.sk.createVector(Math.floor(this.pos.x / this.ts), Math.floor(this.pos.y / this.ts))
            let tileOn = this.path.filter((p) => {
                return t.x === p.x && t.y === p.y
            })[0]

            let goal = this.path[this.path.indexOf(tileOn) + 1]

            if (!goal) {
                goal = this.path[this.path.indexOf(tileOn)]
                this.alive = false

            }
            // console.log(t)
            if (t.x < goal.x) {
                this.vel = this.sk.createVector(2, 0)
            }
            if (t.x > goal.x) {
                this.vel = this.sk.createVector(-2, 0)
            }
            if (t.y < goal.y) {
                this.vel = this.sk.createVector(0, 2)
            }
            if (t.y > goal.y) {
                this.vel = this.sk.createVector(0, -2)
            }

        }
    }

    move() {
        if (!this.alive) return
        this.pos.add(this.vel)
        this.draw()
    }



}

module.exports = {
    Enemy
};