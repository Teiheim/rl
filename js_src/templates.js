class citizen {
  this.name = "";
  this.maxHP = 0;
  this.curHP = 0;
  this.mp = 0;
  this.inventory = {};
  this.magic = {};
  this.abilities = {};
  this.posx = 0;
  this.posy = 0;

  constructor(template) {
    if(template.name){
      this.name = template.name;
    }
    if(template.maxHP){
      this.maxHP = template.maxHP;
    }
    if(template.curHP){
      this.curHP = template.curHP
    }
    if(template.mp){
      this.mp = template.mp;
    }
    if(template.inventory){
      this.inventory = template.inventory;
    }
    if(template.magic){
      this.magic = template.magic;
    }
    if(template.abilities){
      this.abilities = template.abilities;
    }
  }
  toJson() {
    return JSON.stringify(this);
  }
  fromJson(save) {
    return JSON.parse(this);
    return new citizen(save);
  }
}

class fighter extends citzen{
  this.moves = 1;
  this.strength = 1;
  this.defense = 1;
  this.weapon = '';

  constructor(template) {
    super();
    if(template.moves){
      this.moves = template.moves;
    }
    if(template.strength){
      this.strength = template.strength;
    if(template.defense) {
      this.defense = template.defense;
    }
    }
  }
}
class player extends fighter{
  constructor(template){
    super();
  }
}
class monster extends fighter{
  constructor(template){
    super();
  }
}
