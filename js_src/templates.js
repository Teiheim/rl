import {Entity} from './entity.js'

class Citizen extends Entity {

  constructor(template) {
    super(template);
    this.state = {};
    this.state.name = "";
    this.state.maxHP = 0;
    this.state.curHP = 0;
    this.state.mp = 0;
    this.state.inventory = {};
    this.state.magic = {};
    this.state.abilities = {};
    this.state.lvl=1;
    this.state.posx = 0;
    this.state.posy = 0;

    if(template.name){
      this.state.name = template.name;
    }
    if(template.maxHP){
      this.state.maxHP = template.maxHP;
    }
    if(template.curHP){
      this.state.curHP = template.curHP
    }
    if(template.mp){
      this.state.mp = template.mp;
    }
    if(template.inventory){
      this.state.inventory = template.inventory;
    }
    if(template.magic){
      this.state.magic = template.magic;
    }
    if(template.abilities){
      this.state.abilities = template.abilities;
    }
    if(template.lvl){
      this.state.lvl = template.lvl;
    }
  }
  toJson() {
    return JSON.stringify(this);
  }
  fromJson(save) {
    return JSON.parse(this);
    return new Citizen(save);
  }
}

class Fighter extends Citizen{

  constructor(template) {
    super(template);
    this.state.moves = 10;
    this.state.strength = 1;
    this.state.defense = 1;
    this.state.weapon = {};

    if(template.moves){
      this.state.moves = template.moves;
    }
    if(template.strength){
      this.state.strength = template.strength;
    if(template.defense) {
      this.state.defense = template.defense;
    }
    }
  }
}
export class Player extends Fighter{
  constructor(template){
    super(template);
    this.state.actions = {
      MOVE: /*function(map,moves,x,y,d){
        if(moves>0 && x>=0 && y>=0){
          if(map.isPositionOpen(x,y)){
            var tile = map.state.tileGrid[x][y];
            tile.colorChange("#3b45a4",x,y,d);
            console.log(`This is console actions:${this.state}`);
            console.log(this);
            this.MOVE(map,moves-1,x+1,y,d);
            this.MOVE(map,moves-1,x,y+1,d);
            this.MOVE(map,moves-1,x-1,y,d);
            this.MOVE(map,moves-1,x,y-1,d);
            return;
          }
          else{
            return;
          }

        }
      }*/"",
      ATTACK: "",
      DEFEND: "",
      MAGIC: "",
      ITEM: "",

    };
  }
  giveX(){
    return this.state.posx;
  }
  giveY(){
    return this.state.posy;
  }
}
export class Monster extends Fighter{
  constructor(template){
    super(template);
  }
}
