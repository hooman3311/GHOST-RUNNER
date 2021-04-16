var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost=createSprite(300,500)
  ghost.addImage(ghostImg)
  ghost.scale = 0.55
}

function draw()
{
  background(0);
  if (gameState === "play")
  {
    
    if (tower.y>600){
      tower.y = tower.width/2;
    }
    
   ghost.x=mouseX

    spawnDoors()
    if (ghost.isTouching(invisibleBlockGroup)){
      gameState = "end"
    }
    
    drawSprites();
}
  
  if (gameState === "end")
  {
    
    
    tower.velocityY = 0;
    ghost.velocityX = 0;
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
    invisibleBlockGroup.setVelocityYEach(0);
      textSize(50)
    fill("red")
    text("game over",300,300)
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = false;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

