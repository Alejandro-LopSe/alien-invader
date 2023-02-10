import Enemy from "./Enemy.js";
import direccion from "./Movimiento.js"



export default class EnemyController{


    e_map =[
        [0,2,1,1,1,1,2,0],
        [1,2,3,3,3,3,2,1],
        [2,1,2,3,3,2,1,2],
        [0,2,1,1,1,1,2,0]
    ];

    e_row=[];
    dir_actual=direccion.right;
    vel_x=0;
    vel_y=0;
    vel_x_def=1;
    vel_y_def=1;
    moveDownTimerDefault=50;
    moveDownTimer=this.moveDownTimerDefault;


    constructor(canvas,playerBulletController){
        this.canvas=canvas;
        this.createEnemies();
        this.playerBulletController = playerBulletController;

        
    };

    draw(ctx){
        this.decrementMoveDownTimer();
        this.update();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.reset();
    };

    collisionDetection() {
    this.e_row.forEach((enemyRow) => {
      enemyRow.forEach((enemy, enemyIndex) => {
        if (this.playerBulletController.collideWith(enemy)) {
          
          enemyRow.splice(enemyIndex, 1);
        }
      });
    });

    this.e_row = this.e_row.filter((enemyRow) => enemyRow.length > 0);
  }

  


    reset() {
        if (this.moveDownTimer <= 0) {
          this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer() {
        if (
          this.dir_actual === direccion.downLeft ||
          this.dir_actual === direccion.downRight
        ) {
          this.moveDownTimer--;
        }
      }

   

    update() {
        for (const enemyRow of this.e_row) {
          if (this.dir_actual == direccion.right) {
            this.vel_x = this.vel_x_def;
            this.vel_y = 0;
            const rightMostEnemy = enemyRow[enemyRow.length - 1];
            if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
              this.dir_actual = direccion.downLeft;
              break;
            }
          } else if (this.dir_actual === direccion.downLeft) {
            if (this.moveDown(direccion.left)) {
              break;
            }
          } else if (this.dir_actual === direccion.left) {
            this.vel_x = -this.vel_x_def;
            this.vel_y = 0;
            const leftMostEnemy = enemyRow[0];
            if (leftMostEnemy.x <= 0) {
              this.dir_actual = direccion.downRight;
              break;
            }
          } else if (this.dir_actual === direccion.downRight) {
            if (this.moveDown(direccion.left)) {
              break;
            }
          }
        }
    }

    moveDown(newDirection) {
        this.vel_x = 0;
        this.vel_y = this.vel_y_def;
        if (this.moveDownTimer <= 0) {
          this.dir_actual = newDirection;
          return true;
        }
        return false;
    }

    drawEnemies(ctx){
        this.e_row.flat().forEach(enemy => {
            enemy.move(this.vel_x,this.vel_y);
            enemy.draw(ctx);
        });
    };

    createEnemies(){
        this.e_map.forEach((row, row_i) => {
            this.e_row[row_i]=[];
            row.forEach((e_number,e_i)=>{
                if(e_number>0) this.e_row[row_i].push(new Enemy(e_i* 55,row_i*40,e_number));
            });
        });
    }

    collideWith(sprite) {
      return this.e_row.flat().some((enemy) => enemy.collideWith(sprite));
    }
}