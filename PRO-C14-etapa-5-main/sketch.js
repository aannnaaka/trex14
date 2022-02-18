var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var clow, clowMove;
var cactus, cactus1, cactus2, cactus3, cactus4, cactus5, cactus6;

var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  clowMove = loadImage("cloud.png");
  
  cactus1 = loadImage("obstacle1.png");
  cactus2 = loadImage("obstacle2.png");
  cactus3 = loadImage("obstacle3.png");
  cactus4 = loadImage("obstacle4.png");
  cactus5 = loadImage("obstacle5.png");
  cactus6 = loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //crear grupos de obstáculos y nubes
  
  score = 0;
}

function draw() {
  background(180);
  //mostrar la puntuación
  text("Puntuación: "+ score, 500,50);
  
    ground.velocityX = -4;

    //puntuación
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //hacer que el Trex salte al presionar la barra espaciadora
    if(keyDown("space")&& trex.y >= 130) {
        trex.velocityY = -10;
    }
    
    //agregar gravedad
    trex.velocityY = trex.velocityY + 0.8
  
    //aparecer nubes
    spawnClouds();
  
    //aparecer obstáculos en el suelo
    spawnObstacles();
 
  //evitar que el Trex caiga
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var cactus = createSprite(400,165,10,40);
   cactus.velocityX = -6;
   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cactus.addImage(cactus1);
              break;
      case 2: cactus.addImage(cactus2);
              break;
      case 3: cactus.addImage(cactus3);
              break;
      case 4: cactus.addImage(cactus4);
              break;
      case 5: cactus.addImage(cactus5);
              break;
      case 6: cactus.addImage(cactus6);
              break;
      default: break;
    }
   
    //asignar escala y ciclo de vida al obstáculo          
    cactus.scale = 0.5;
    cactus.lifetime = 300;
   
   //agregar cada obstáculo al grupo
    
 }
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
   if (frameCount % 60 === 0) {
    clow = createSprite(600,100,40,10);
    clow.y = Math.round(random(10,60));
    clow.addImage(clowMove);
    clow.scale = 0.5;
    clow.velocityX = -3;
    
     //asignar ciclo de vida a la variable
    clow.lifetime = 220;
    
    //ajustar la profundidad
    clow.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //agregar nube al grupo
    }
}

