var path,mainRacer;
var item1,item2;
var pathImg,mainRacerImg1,mainRacerImg2;

var potholeImg;
var bottleImg;
var gameOverImg;

var pothole;
var bottle;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("run_Frame1.png","run_Frame2.png","run_Frame3.png","run_Frame4.png","run_Frame5.png","run_Frame6.png","run_Frame7.png","run_Frame8.png");
  mainRacerImg2= loadAnimation("hurt_Runner.png");
 
  
  potholeImg = loadImage("potholes.png");
  
  bottleImg = loadImage("Bottle.png")
  
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainRacer  = createSprite(70,150);
mainRacer.addAnimation("JoeRunning",mainRacerImg1);

  
//setting collider for mainRacer
mainRacer.setCollider("rectangle",0,0,100,200);


  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
potholeGroup = new Group();
bottleGroup = new Group();
  
}

function draw() {
  background(0);
  mainRacer.scale = 0.5;
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
   distance = distance + Math.round(getFrameRate()/50);
  
   mainRacer.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainRacer.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  
  //creating continous items
  var select_item = Math.round(random(1,2));
  
  if (World.frameCount % 150 == 0) {
    if (select_item == 1) {
      potholes();
    } else if (select_item == 2) {
      bottles();
    }
  }
  
   if(potholeGroup.isTouching(mainRacer)){
     gameState = END;
     item1.velocityY = 0;
    }
    
    if(bottleGroup.isTouching(mainRacer)){
      path.velocityX = -(6 + 2*distance/150);
      item2.destroy();
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainRacer.velocityY = 0;
    mainRacer.addAnimation("JoeRunning",mainRacerImg2);
  
    potholeGroup.setVelocityXEach(0);
    potholeGroup.setLifetimeEach(-1);
  
    bottleGroup.setVelocityXEach(0);
    bottleGroup.setLifetimeEach(-1);

    if(keyDown("UP_ARROW")) {
       reset();
       path.velocityX = -5;
   }
 }
}

function potholes(){
  item1 =createSprite(1500,Math.round(random(50, 250)));
  item1.scale=0.2;
  item1.velocityX = -(6 + 2*distance/150);
  item1.addAnimation("potholes.png",potholeImg);
  item1.setLifetime=170;
  potholeGroup.add(item1);
}

function bottles(){
  item2 =createSprite(1500,Math.round(random(50, 250)));
  item2.scale=0.04;
  item2.velocityX = -(6 + 2*distance/150);
  item2.addAnimation("Bottle.png",bottleImg);
  item2.setLifetime=170;
  bottleGroup.add(item2);
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainRacer.addAnimation("JoeRunning",mainRacerImg1);
  
  potholeGroup.destroyEach();
  bottleGroup.destroyEach();
  
  distance = 0;
 }



