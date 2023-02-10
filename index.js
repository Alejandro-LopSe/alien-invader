import EnemyController from "./EnemyController.js"
import Nave from "./Nave.js"
import BulletController from "./BulletController.js"


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = "images/fondo.png";

const nave_disp= new BulletController(canvas,10,"yellow",true)
const enem_c= new EnemyController(canvas, nave_disp);
const nave=new Nave(canvas,3,nave_disp);


let GameOver = false;
let win = false;

function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!GameOver) {
      enem_c.draw(ctx)
      nave.draw(ctx)
      nave_disp.draw(ctx)
    }
  }

  function displayGameOver() {
    if (GameOver) {
      let text = win? "Ganaste!" : "Game Over";
      let textOffset = win ? 3.5 : 5;
      ctx.fillStyle = "green";
      ctx.font = "70px Franklin Gothic Medium";
      ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
  }


  function checkGameOver() {
    if (GameOver) {
      displayGameOver();
      return;
    }
  
    if (enem_c.collideWith(nave)) {
      GameOver = true;
    }
  
    if (enem_c.e_row.length === 0) {
      win = true;
      GameOver = true;
    }
  }
  

setInterval(game,1000/60);