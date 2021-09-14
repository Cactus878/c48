var imgCoin, imgRobber, imgStepCoin, imgLava;
var player, coin, stepCoin, lava;
var score = 0, steps = 50;
var tileW = 50, tileH = 50, tileMargin = 4;
var gameState = 0;

var xPos = [110,164,218,272,326,380]
var yPos = [150,204,258,312,366,420]
function preload(){
  imgCoin = loadImage("Images/Coin.png");
  imgRobber = loadImage("Images/Robber.png");
  imgStepCoin = loadImage("Images/StepCoins.png");
  imgTile = loadImage("Images/Tile.png");
  imgLava = loadImage("Images/Lava.png");
}
//(110,150) (164,150) (218,150) (272,150) (326,150) (380,150)     
//(110,204) (164,204) (218,204) (272,204) (326,204) (380,204)
//(110,258) (164,258) (218,258) (272,258) (326,258) (380,258)
//(110,312) (164,312) (218,312) (272,312) (326,312) (380,312)
//(110,366) (164,366) (218,366) (272,366) (326,366) (380,366)
//(110,420) (164,420) (218,420) (272,420) (326,420) (380,420)
function setup(){
  createCanvas(500,500);

  for(var r = 0; r<6; r++){
    for(var c = 0; c<6; c++) {
      createTile(110+c*(tileW+tileMargin),150+r*(tileH+tileMargin));
    }
  }

  coinGroup = new Group();
  lavaGroup = new Group();

  createCoin();

  player = createSprite(110,150,50,50);
  player.addImage("player", imgRobber);
  player.scale = 1.2;
}

function draw() {
  background(100);

  textSize(20);
  text("Score: "+ score,200,30);
  text("Steps: "+ steps,200,50);
  if(gameState === 0){
    if(keyWentDown(LEFT_ARROW)){
      if(player.x > 154){
        steps--;
        player.x -= 54;
      }
    }
    else if(keyWentDown(RIGHT_ARROW)){
      if(player.x < 354){
        steps--;
        player.x += 54;
      }
    }
    else if(keyWentDown(UP_ARROW)){
      if(player.y > 154){
        steps--;
        player.y -= 54;
      }
    }
    else if(keyWentDown(DOWN_ARROW)){
      if(player.y < 414){
        steps--;
        player.y += 54;
      }
    }
  }

  if(player.isTouching(coinGroup)){
    score++;
    newRound();
    createCoin();
  }
  if(player.isTouching(lavaGroup)){
    steps = steps - 5;
    lavaGroup.setLifetimeEach(0);
  }

  if(steps === 0){
    gameState = 1;
    gameOver();
  }
  
  drawSprites();


}

function createTile(x,y){
  var hw1 = createSprite(x,y-25,50,5);
  var hw2 = createSprite(x,y+25,50,5);
  var vw1 = createSprite(x-25,y,5,50)
  var vw1 = createSprite(x+25,y,5,50)
}

function randomizeCoinPos(randomNum){
  var randomXPos = Math.round(random(0,6))
  var randomYPos = Math.round(random(0,6))
  switch(randomNum){
    case 0: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 1: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 2: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 3: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 4: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    case 5: spawnCoin(xPos[randomXPos],yPos[randomYPos]); break;
    default: break;
  }
}

function randomizeLavaPos(randomNum){
  var randomXPos = Math.round(random(0,6))
  var randomYPos = Math.round(random(0,6))
  switch(randomNum){
    case 0: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 1: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 2: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 3: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 4: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    case 5: spawnLava(xPos[randomXPos],yPos[randomYPos]); break;
    default: break;
  }
}

function spawnCoin(x,y){
  coin = createSprite(x,y,50,50);
  coin.addImage("coin", imgCoin);
  coin.scale = 0.45;
  coin.lifetime = -1;
  coinGroup.add(coin);
  if(coin.y < 150 || coin.x < 110 || coin.y > 420 || coin.x > 380){
    coinGroup.setLifetimeEach(0);
    createCoin();
  }
}

function spawnLava(x,y){
  lava = createSprite(x,y,50,50);
  lava.addImage("lava", imgLava);
  lava.scale = 1.2;
  lava.lifetime = -1;
  lavaGroup.add(lava);
}

function createCoin(){
  var randomNum = Math.round(random(0,6))
  randomizeCoinPos(randomNum);
}

function createLava(amount){
  for(var r = 0; r !== amount; r++){
    var randomNum = Math.round(random(0,6))
    randomizeLavaPos(randomNum);
  }
}

function newRound(){
  coinGroup.setLifetimeEach(0);
  lavaGroup.setLifetimeEach(0);
  if(score <= 5){
    createLava(1);
  }
  else if(score <= 10 && score > 5){
    createLava(2);
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        gameState = 0;
        coinGroup.setLifetimeEach(0);
        lavaGroup.setLifetimeEach(0);
        createCoin();
        steps = 50;
        score = 0;
      }
    }
  );
}
