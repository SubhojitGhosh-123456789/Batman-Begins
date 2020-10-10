class createDrop {
    constructor(x, y,radius) {
      var options = {
          friction:0.1,
          density:1.2
      }
      this.radius= radius;
      this.body = Bodies.circle(x, y, this.radius, options);
    
      World.add(world, this.body);

      this.image = loadImage("drop.png");
    }
    update(){
        if(this.body.position.y > height){
            Matter.Body.setPosition(this.body, {x:random(0,400),y:random(0,400)})
        }
    }
    display(){
      var pos =this.body.position;
      var angle =this.body.angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      noStroke();
      fill("blue");
      imageMode(CENTER);
      image(this.image,pos.x, pos.y, this.radius, this.radius);
      pop();          
    }
  };
  