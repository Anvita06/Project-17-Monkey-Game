
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var cpSound, touchingSound, losingSound;
let img;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  monkeyCollide = loadAnimation("monkey_1.png");
  
  groundImg = loadAnimation("ground.jpg") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  img = loadImage("mgh_wp.jpg");
 
  cpSound = loadSound("game-win-sound-effect.mp3");
  losingSound = loadSound("mixkit-game-over-dark-orchestra-633.wav");
  touchingSound = loadSound("bonus-collect-10-sound-effect-77563477.mp3");

}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
    
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  ground.addAnimation("ground", groundImg);
  
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
}

function draw(){
  background("skyblue");
  image(img, 0, 0, 600, 300);
  fill("yellow");
  textFont("Aharoni");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
    
    if(score > 0 && score%500 === 0) {
      cpSound.play();
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      touchingSound.play();
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      losingSound.play();
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    textFont("Aharoni");
    textSize(30);
    fill("red");
    stroke("black");
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(20);
    text("Press 'R' to play again", 210, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(invisiGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






