export default class Enemy{
    constructor(x,y,img){
        this.x=x;
        this.y=y;
        this.width=44;
        this.height=44;


        this.image=new Image();
        this.image.src=`images/alien_${img}.png`;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(vel_x,vel_y){
        this.x +=vel_x;
        this.y +=vel_y
    }

    collideWith(sprite) {
        if (
          this.x + this.width > sprite.x &&
          this.x < sprite.x + sprite.width &&
          this.y + this.height > sprite.y &&
          this.y < sprite.y + sprite.height
        ) {
          return true;
        } else {
          return false;
        }
      }
}