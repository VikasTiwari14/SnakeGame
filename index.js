var canvas = document.getElementById("gameArea");
const ground = new Image();
ground.src = "images/search.jpg";
const food = new Image();
food.src = "images/foodGame.png";
const move = new Audio();
move.src = "audio/move.mp3";
const gOver = new Audio();
gOver.src = "audio/gameOver.mp3";
const eat = new Audio();
eat.src = "audio/sound1.wav";
canvas.width = 600;
canvas.height = 600;
var c = canvas.getContext("2d");
var wh = 600;
var dm = 30;
var dx = 30;
var direction = 2;
var f = 1;
var xx = 3;
var yy = 6;
var si;
var score = 0;
var snake = [];
snake[0] = {
  x: 0,
  y: 0,
};

window.addEventListener("load", () => {
  c.drawImage(ground, 0, 0);
  document.getElementById("score").innerText = score;
});
const loadGame = () => {
  if (f == 1) {
    bodyGen();
    foodPosition();
    foodGen();
    si = setInterval(bodyMove, 100);
    f++;
  }
};

//body

const bodyGen = () => {
  for (let i = 0; i < snake.length; i++) {
    c.fillStyle = (i==0)?"red":"black";
    c.fillRect(snake[i].x, snake[i].y, dm, dm);
    c.strokeStyle = "blue";
    c.strokeRect(snake[i].x, snake[i].y, dm, dm);
  }
};

//bodyMove
const bodyMove = () => {
  var snakeX = snake[0].x;
  var snakeY = snake[0].y;
//   c.clearRect(0, 0, wh, wh);
  switch (direction) {
    case 1:
      snakeX -= dx;
      break;
    case 2:
      snakeX += dx;
      break;
    case 3:
      snakeY -= dx;
      break;
    case 4:
      snakeY += dx;
      break;
  }
  foodGen();
  bodyGen();
  document.getElementById("score").innerText = score;
  if (xx == snakeX && yy == snakeY) {
    score++;
    foodPosition();
    eat.play();
  }
  else{
      snake.pop();
  }
  let newHead = {
    x : snakeX,
    y : snakeY
}
gameOver(newHead.x,newHead.y,snake);
snake.unshift(newHead);
};

window.addEventListener("keydown", (e) => {
  move.play();
  if (e.key == "a" && direction!=2) {
    direction = 1;
  }
  if (e.key == "d" && direction!=1) {
    direction = 2;
  }
  if (e.key == "w" && direction!=4) {
    direction = 3;
  }
  if (e.key == "s" && direction!=3) {
    direction = 4;
  }
});

//food
const foodPosition = () => {
  xx = Math.floor(Math.random() * 20);
  yy = Math.floor(Math.random() * 20);
  xx = 30 * xx;
  yy = 30 * yy;
};

const foodGen = () => {
  c.drawImage(ground, 0, 0);
  c.drawImage(food, xx, yy, dm, dm);
};

//gameOver
const gameOver = (snakeX,snakeY,array) => {
    // console.log(collision());
  if (snakeX < -30 || snakeY < -30 || snakeX > wh || snakeY > wh ||collision(snakeX,snakeY,array)) {
    gOver.play();
    clearInterval(si);
    alert("Game Over");
    location.reload();
  }
};


//collision
const collision = (x,y,array) => {
    for(let i=0;i<snake.length;i++){
        console.log(x,snake[i].x,y,snake[i].y);
    if(x==snake[i].x && y==snake[i].y){
         return true;
    }
    return false;
}
}
