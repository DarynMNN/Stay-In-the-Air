//variables
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  //loading images
  towerImg = loadImage("bg.jpg");
  doorImg = loadImage("door.png");
  climberImg = loadImage("stoneground2.png");
  ghostImg = loadImage("polarbear.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //create the tower
  tower = createSprite(windowWidth/2,windowHeight/2);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 3;
  //creating the ghost
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.2;
  ghost.addImage("ghost",ghostImg);

  //creating the groups
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  //game will work if gamestate is play
  if(gameState === "play") {
    //Making the ghost move on space, and left and right arrow
    if(keyDown("left_arrow")) {
      ghost.x = ghost.x - 7;
    }
    if(keyDown("right_arrow")) {
      ghost.x = ghost.x + 7;
    }
    if(keyDown("space")) {
      ghost.velocityY = -7;
    }
    //give "gravity" to the ghost
    ghost.velocityY = ghost.velocityY + 0.8;
    //make the tower look like it moves forever
  if(tower.y > 400){
      tower.y = 300
  }
  //call the spawnDoors function
  spawnDoors();
  //If the ghost touches the climbers it will stop
  //if the ghost touches the invisible block or touches the bottom the game will end.
  if( ghost.y > 600) {
    ghost.destroy();
    gameState = "end";
  }
    drawSprites();
    ghost.collide(climbersGroup);
}

if(gameState === "end") {
  //create the Game Over screen
  background(200);
  stroke("white");
  fill("white");
  textSize(30);
  text("Game Over", windowWidth-900, windowHeight/2);
}
}
function spawnDoors() {
  if(frameCount%200===0) {
    //create the door, climber, and invisible block 
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    climber.scale = 0.5;
    climber.setCollider("rectangle", 0, 0, 170, 70);
    var invisibleBlock = createSprite(200,15);

    invisibleBlock.width = climber.width;
    invisibleBlock.height = -2;
    door.x = Math.round(random(windowWidth/2-650,windowWidth/2+650));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImg);
    climber.addImage(climberImg);
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    ghost.depth = door.depth;
    ghost.depth+1;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

  

  }
}
