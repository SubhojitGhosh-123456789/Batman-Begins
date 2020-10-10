const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.body;

var main, mainImg;
var start, startImg;
var story, sB, storyImg, storyB;
var person, person_walking;
var maxDrops = 100;
var ground, groundImg;
var drops = [];
var light, l1, l2, l3, l4;
var g1 = "main";
var thunder;

function preload(){
    thunder = loadSound("Thunder.mp3");
    mainImg = loadImage("start.jpg");
    startImg = loadImage("startB.jpg");
    storyImg = loadImage("story.jpg");
    storyB = loadImage("storyB.jpg");
    person_walking = loadAnimation("walking_8.png","walking_7.png","walking_6.png","walking_5.png","walking_4.png","walking_3.png","walking_2.png","walking_1.png");
    groundImg = loadImage("ground.png");
    l1 = loadImage("1.png");
    l2 = loadImage("2.png");
    l3 = loadImage("3.png");
    l4 = loadImage("4.png");
}

function setup(){

    createCanvas(900, 650);

    engine = Engine.create();
   	world = engine.world;

  main = createSprite(450,300,900,600);
  main.addImage(mainImg);
  main.visible = true;
 
  start = createSprite(450,500,70,100);
  start.addImage(startImg);
  start.visible = true;

  story = createSprite(450,300,900,600);
  story.addImage(storyImg);
  story.scale = 0.9;
  story.visible = false;
 
  sB = createSprite(750,490,70,100);
  sB.addImage(storyB);
  sB.visible = false;

  person = createSprite(450,410,80,10);
  person.addAnimation("Walking",person_walking);
  person.scale = 0.5;
  person.visible = false;
   
  ground = createSprite(450,595,910,50);
  ground.addImage(groundImg);
  ground.scale = 1.5;
  ground.visible=false;

  for( i = 0; i<maxDrops; i++){
    drops.push(new createDrop(random(0,400), random(0,400), 13));
  }

}

function draw(){

    background(0);

    Engine.update(engine);
    
    if(g1 === "main"){

        if(mousePressedOver(start)){
            startState(); 
        }

        if(mousePressedOver(sB)){
            storyState(); 
        }
    } 

    if(g1 === "play"){

    ground.depth = person.depth;
    person.depth = person.depth + 1;

    ground.visible = true;
    person.visible = true;

    for( i = 0; i<maxDrops; i++){
      drops[i].update();
      drops[i].display();
    }
      lightning();
    
   }
     
    drawSprites();
    
}  

function startState(){
    main.visible = false;
    start.visible = false;

    story.visible = true;
    sB.visible = true;
}

function storyState(){
    story.visible = false;
    sB.visible = false;
    g1 = "play";
}

function lightning() {
    if(frameCount % 150 === 0) {
      var light = createSprite(random(50,850),80,10,40);
      thunder.play();

      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: light.addImage(l1);
                break;
        case 2: light.addImage(l2);
                break;
        case 3: light.addImage(l3);
                break;
        case 4: light.addImage(l4);
                break;
        default: break;
      }
       
      light.scale = 0.3;
      light.lifetime = 50;
    }
  }

