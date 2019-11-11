 /* --------------------------------------------------------------------- #5 */

class Turret {
    constructor(x, y) {

        this.position = {
                x: x,
                y: y,
            },
            this.shootTimer = 0

        this.damage = 2
        this.speed = 422
        this.fired = false
        this.image = new Image(200, 200)
        this.image.src = '../media/images/turrets/post-it-information.svg'
        this.bullet = new Image(200, 200)
        this.bullet.position = {
            x: x,
                y: y,
        }
        this.bullet.src = '../media/images/turrets/marshmallow.svg'
    }
}

module.exports = {
    Turret
}