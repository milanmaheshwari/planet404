//Variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var myWidth = window.innerWidth - 5;
var myHeight = window.innerHeight - 5;

var midwidth = [(myWidth + 5) / 2] - 50;
var midheight = [(myHeight + 5) / 2] - 50;

var planetx = [(myWidth + 5) / 2] - 75;
var planety = [(myHeight + 5) / 2] - 150;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

var fail = 0;

let frames = 0;

//Responsive Canvas
window.onload = function(){
  init();
  window.addEventListener('resize', init,false);
}

function init(){
  ctx.canvas.width = myWidth;
  ctx.canvas.height = myHeight;
}

//Sprite Load
const sprite = new Image();
sprite.src = "images/sprite.svg";

//SOUNDS
const score_sound = new Audio();
score_sound.src = "audio/sfx_point.wav";

const jump_sound = new Audio();
jump_sound.src = "audio/sfx_flap.wav";

const hit_sound = new Audio();
hit_sound.src = "audio/sfx_hit.wav";

const die_sound = new Audio();
die_sound.src = "audio/sfx_die.wav";

//Game State
const state = {
  current : 0,
  start : 0,
  ready : 1,
  game : 2,
  over : 3
}

//Control the Game
function event(){
  switch(state.current){
    case state.start : state.current = state.ready;
    break;
    case state.ready : state.current = state.game; planet.jump();
    break;
    case state.game : planet.jump();
    break;
    case state.over : state.current = state.ready;
    break;
  }
}

function clickevent(){
  if (state.current == state.ready || state.current == state.game) {
    if (fail == 0) {
      event();
    }
  }
}


document.getElementById("startgamebtn").addEventListener("click", event);
document.getElementById("playagainbtn").addEventListener("click", event);

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if (fail == 0) {
          event();
        }
    }
}

document.getElementById("canvas").addEventListener("click", clickevent);



function home(){
  state.current = state.start;
}




//Background image
const bg = {
  sX : 0,
  sY : 0,
  w : 1920,
  h : 1080,
  x : 50,
  y : 50,

  draw : function(){
    ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}

//Planet
const planet = {

  sX : 1930,
  sY : 0,
  w : 150,
  h : 158.5,
  x : planetx,
  y : planety,

  frame : 0,

  gravity : 0.4,
  movementup : 10,
  speed : 0,

  draw : function(){

      if (state.current == state.game){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }


  },

  jump : function(){
    this.speed = -this.movementup;
    jump_sound.play();
  },


  update: function(){

    if (state.current == state.ready) {
      this.y = planety;

    } else if (state.current == state.game) {
      if (this.y > myHeight) {
        this.speed = 0;
        this.y = myHeight;
        fail = 0;
        die_sound.play();
        state.current = state.over;
      } else if (this.y < 0 - 0.75*this.h) {
        this.y = 0 - 0.75*this.h;
        this.speed = 1;
      } else {
        this.speed += this.gravity;
        this.y += this.speed;
      }
    }
  }
}


const planet_initial = {

  sX : 1930,
  sY : 0,
  w : 150,
  h : 158.5,

  animation : [
    {x: planetx, y: planety}, {x: planetx, y: planety+1}, {x: planetx, y: planety+2}, {x: planetx, y: planety+3}, {x: planetx, y: planety+4},
    {x: planetx, y: planety+5}, {x: planetx, y: planety+6}, {x: planetx, y: planety+7}, {x: planetx, y: planety+8}, {x: planetx, y: planety+9},
    {x: planetx, y: planety+10}, {x: planetx, y: planety+11}, {x: planetx, y: planety+12}, {x: planetx, y: planety+13}, {x: planetx, y: planety+14},
    {x: planetx, y: planety+15}, {x: planetx, y: planety+16}, {x: planetx, y: planety+17}, {x: planetx, y: planety+18}, {x: planetx, y: planety+19},
    {x: planetx, y: planety+20}, {x: planetx, y: planety+21}, {x: planetx, y: planety+22}, {x: planetx, y: planety+23}, {x: planetx, y: planety+24},
    {x: planetx, y: planety+25}, {x: planetx, y: planety+26}, {x: planetx, y: planety+27}, {x: planetx, y: planety+28}, {x: planetx, y: planety+29},
    {x: planetx, y: planety+30}, {x: planetx, y: planety+31}, {x: planetx, y: planety+32}, {x: planetx, y: planety+33}, {x: planetx, y: planety+34},
    {x: planetx, y: planety+35}, {x: planetx, y: planety+36}, {x: planetx, y: planety+37}, {x: planetx, y: planety+38}, {x: planetx, y: planety+39},
    {x: planetx, y: planety+40}, {x: planetx, y: planety+39}, {x: planetx, y: planety+38}, {x: planetx, y: planety+37}, {x: planetx, y: planety+36},
    {x: planetx, y: planety+35}, {x: planetx, y: planety+34}, {x: planetx, y: planety+33}, {x: planetx, y: planety+32}, {x: planetx, y: planety+31},
    {x: planetx, y: planety+30}, {x: planetx, y: planety+29}, {x: planetx, y: planety+28}, {x: planetx, y: planety+27}, {x: planetx, y: planety+26},
    {x: planetx, y: planety+25}, {x: planetx, y: planety+24}, {x: planetx, y: planety+23}, {x: planetx, y: planety+22}, {x: planetx, y: planety+21},
    {x: planetx, y: planety+20}, {x: planetx, y: planety+19}, {x: planetx, y: planety+18}, {x: planetx, y: planety+17}, {x: planetx, y: planety+16},
    {x: planetx, y: planety+15}, {x: planetx, y: planety+14}, {x: planetx, y: planety+13}, {x: planetx, y: planety+12}, {x: planetx, y: planety+11},
    {x: planetx, y: planety+10}, {x: planetx, y: planety+9}, {x: planetx, y: planety+8}, {x: planetx, y: planety+7}, {x: planetx, y: planety+6},
    {x: planetx, y: planety+5}, {x: planetx, y: planety+4}, {x: planetx, y: planety+3}, {x: planetx, y: planety+2}, {x: planetx, y: planety+1},
    {x: planetx, y: planety},
  ],

  frame : 0,

  gravity : 0.3,
  movementup : 10,
  speed : 0,

  draw : function(){

      let planet_ready = this.animation[this.frame];

      if (state.current == state.ready){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, planet_ready.x, planet_ready.y, this.w, this.h);
    }


  },

  jump : function(){
    this.speed = -this.movementup;
  },


  update: function(){

    let planet_ready = this.animation[this.frame];
    this.frame += 1;
    this.frame = this.frame%this.animation.length;

  }
}

//Obstacles
const rock1 = {

  sX : 2100,
  sY : 0,

  position : [],
  dimension : [],
  dx : 5,

  draw : function(){

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let d = this.dimension[i];

      if (state.current == state.game){
      ctx.drawImage(sprite, this.sX, this.sY, d.w, d.h, p.x, p.y, d.w, d.h);
    }

   }

 },

  update : function(){

    if (state.current == state.ready) {


    } else if (state.current == state.game){

      if (fail == 0) {

    if ((frames+200)%400 == 0) {
      this.position.push({
        x : myWidth,
        y : ((myHeight- 95) * Math.random())
      });
      this.dimension.push({
        w : getRandomIntInclusive(1,4)*100,
        h : 100,
      });
      this.dimension.push({
        w : 100,
        h : getRandomIntInclusive(1,4)*100,
      });
    }
    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let d = this.dimension[i];
      p.x -= this.dx;

      if (p.x + d.w <= 0) {
        this.position.shift();
        this.dimension.shift();
      }

      if (planet.x + planet.w > p.x && planet.x < p.x + d.w && planet.y + planet.h > p.y + 25 && planet.y < p.y + d.h - 25) {
        fail = 1;
        hit_sound.play();
      }

    }
  }

  }


}

}


const rock2 = {

  sX : 2200,
  sY : 100,

  position : [],
  dimension : [],
  dx : 5,

  draw : function(){

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let d = this.dimension[i];

      if (state.current == state.game){
      ctx.drawImage(sprite, this.sX, this.sY, d.w, d.h, p.x, p.y, d.w, d.h);
    }

   }

 },

  update : function(){

    if (state.current == state.ready) {


    } else if (state.current == state.game){

      if (fail == 0) {

    if ((frames)%400 == 0) {
      this.position.push({
        x : myWidth,
        y : ((myHeight- 95) * Math.random())
      });
      this.dimension.push({
        w : getRandomIntInclusive(1,4)*100,
        h : 100,
      });
      this.dimension.push({
        w : 100,
        h : getRandomIntInclusive(1,4)*100,
      });
    }
    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let d = this.dimension[i];
      p.x -= this.dx;

      if (p.x + d.w <= 0) {
        this.position.shift();
        this.dimension.shift();

      }

      if (planet.x + planet.w > p.x && planet.x < p.x + d.w && planet.y + planet.h > p.y + 25 && planet.y < p.y + d.h - 25) {
        fail = 1;
        hit_sound.play();
      }
    }

  }
}

}

}


const galaxy1 = {


  origin : [],
  position : [],
  w : 200,
  h : 100,

  dx : 5,

  draw : function(){

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let o = this.origin[i];

      if (state.current == state.game){
      ctx.drawImage(sprite, o.sX, o.sY, this.w, this.h, p.x, p.y, this.w, this.h);
    }

   }

 },

  update : function(){

    if (state.current == state.ready) {


    } else if (state.current == state.game){

      if (fail == 0) {

    if ((frames+500)%800 == 0) {
      this.position.push({
        x : myWidth,
        y : ((myHeight- 95) * Math.random())
      });
      this.origin.push({
        sX : (2100 + (getRandomIntInclusive(1,2)*200)),
        sY : 200,
      });
    }
    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let o = this.origin[i];
      p.x -= this.dx;

      if (p.x + this.w <= 0) {
        this.position.shift();
        this.origin.shift();
      }

      if (planet.x + planet.w > p.x && planet.x < p.x + this.w && planet.y + planet.h > p.y + 25 && planet.y < p.y + this.h - 25) {
        fail = 1;
        hit_sound.play();
      }
    }

  }
}

}

}

const galaxy2 = {


  origin : [],
  position : [],
  w : 100,
  h : 100,

  dx : 5,

  draw : function(){

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let o = this.origin[i];

      if (state.current == state.game){
      ctx.drawImage(sprite, o.sX, o.sY, this.w, this.h, p.x, p.y, this.w, this.h);
    }

   }

 },

  update : function(){

    if (state.current == state.ready) {


    } else if (state.current == state.game){

      if (fail == 0) {

    if ((frames+100)%800 == 0) {
      this.position.push({
        x : myWidth,
        y : ((myHeight- 95) * Math.random())
      });
      this.origin.push({
        sX : 2300,
        sY : (200 + (getRandomIntInclusive(1,3)*100)),
      });
    }
    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];
      let o = this.origin[i];
      p.x -= this.dx;

      if (p.x + this.w <= 0) {
        this.position.shift();
        this.origin.shift();
      }

      if (planet.x + planet.w > p.x && planet.x < p.x + this.w && planet.y + planet.h > p.y + 25 && planet.y < p.y + this.h - 25) {
        fail = 1;
        hit_sound.play();
      }
    }

  }
}

}

}


//Collectible
const gas = {

  sX : 2400,
  sY : 300,

  position : [],
  w: 50,
  h: 50,
  dx : 5,

  draw : function(){

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];

      if (state.current == state.game){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, p.x, p.y, this.w, this.h);
    }

   }

 },

  update : function(){

    if (state.current == state.ready) {


    } else if (state.current == state.game){

      if (fail == 0) {

    if ((frames+50)%200 == 0) {
      this.position.push({
        x : myWidth,
        y : ((myHeight- 95) * Math.random())
      });
    }

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];

      p.x -= this.dx;

      if (planet.x + planet.w > p.x && planet.x < p.x + this.w && planet.y + planet.h > p.y && planet.y < p.y + this.h) {
        p.x = -100;

        score.value +=1;
        score_sound.play();
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best" , score.best);

        this.dx += 0.25;
        gas2.dx += 0.25;
        rock1.dx += 0.25;
        rock2.dx += 0.25;
        galaxy1.dx += 0.25;
        galaxy2.dx += 0.25;
      }

      if (p.x + this.w <= 0) {
        this.position.shift();
      }



    }
   }

  }


}

}

const gas2 = {

  sX : 2400,
  sY : 300,

  position : [],
  w: 50,
  h: 50,
  dx : 5,

  draw : function(){

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];

      if (state.current == state.game){
      ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, p.x, p.y, this.w, this.h);
    }

   }

 },

  update : function(){

    if (state.current == state.ready) {


    } else if (state.current == state.game){

      if (fail == 0) {

    if ((frames+150)%200 == 0) {
      this.position.push({
        x : myWidth,
        y : ((myHeight- 95) * Math.random())
      });
    }

    for(let i = 0; i < this.position.length; i++){
      let p = this.position[i];

      p.x -= this.dx;

      if (planet.x + planet.w > p.x && planet.x < p.x + this.w && planet.y + planet.h > p.y && planet.y < p.y + this.h) {
        p.x = -100;

        score.value +=1;
        score_sound.play();
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best" , score.best);

        this.dx += 0.25;
        gas.dx += 0.25;
        rock1.dx += 0.25;
        rock2.dx += 0.25;
        galaxy1.dx += 0.25;
        galaxy2.dx += 0.25;
      }

      if (p.x + this.w <= 0) {
        this.position.shift();
      }



    }
   }

  }


}

}


//Score
const score = {
  best : parseInt(localStorage.getItem("best")) || 0,
  value : 0,

  draw : function(){


    if (state.current == state.ready || state.current == state.game ) {
      //ctx.lineWidth = 2;
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 75px Montserrat";
      ctx.fillText(this.value, myWidth-145, 100);

    }
  }

}


//Draw

function draw(){

  ctx.fillStyle = "#221E38";
  ctx.fillRect(0, 0, myWidth, myHeight);
  bg.draw();
  planet_initial.draw();
  if (state.current == state.ready || state.current == state.game ){
    ctx.fillStyle = "#221E38";
    ctx.fillRect(myWidth-200, 0, 200, 150);
  }
  gas.draw();
  gas2.draw();
  rock1.draw();
  rock2.draw();
  galaxy1.draw();
  galaxy2.draw();
  planet.draw();
  score.draw();


}

//Updated

function update(){

  planet_initial.update();
  planet.update();
  gas.update();
  gas2.update();
  rock1.update();
  rock2.update();
  galaxy1.update();
  galaxy2.update();

  if (state.current != state.start){
    document.getElementById("gamestart").style.display = "none";
  } else {
    document.getElementById("gamestart").style.display = "block";
  }

  if (state.current != state.over){
    document.getElementById("gameover").style.display = "none";
  } else {
    document.getElementById("gameover").style.display = "block";
  }

  if (state.current == state.start || state.current == state.over) {
    document.getElementById("gameplay").style.display = "none";
  } else{
    document.getElementById("gameplay").style.display = "block";
    document.getElementById("gameplay").addEventListener("click", home);
  }

  if (state.current == state.over) {

    document.getElementById("gameoverscore").innerHTML = score.value;
    document.getElementById("highscore").innerHTML = score.best;

    if (score.value == score.best && score.value > 10) {
      document.getElementById("overtext").innerHTML = "Bravo! It's a new highscore!<br> Give yourself a pat on the back and buckle up again to beat that score."
    } else {
      document.getElementById("overtext").innerHTML = "Light Years to go before I rest! <br> Come on, get yourself up and ready to beat that score."
    }
  }

  if (state.current == state.ready) {

    rock1.position.length = 0;
    rock1.dimension.length = 0;
    rock2.position.length = 0;
    rock2.dimension.length = 0;
    galaxy1.position.length = 0;
    galaxy1.origin.length = 0;
    galaxy2.position.length = 0;
    galaxy2.origin.length = 0;

    gas.position.length = 0;
    gas2.position.length = 0;

    score.value = 0;
    rock2.dx = 5;
    rock1.dx = 5;
    gas.dx = 5;
    gas2.dx = 5;
    galaxy1.dx = 5;
    galaxy2.dx = 5;
  }



}

//Loop

function loop(){

  draw();
  update();
  frames++;
  requestAnimationFrame(loop);
}

loop();
