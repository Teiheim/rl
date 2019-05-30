//This is a tile class
import {Symbol} from './display.js'
export class Tile extends Symbol{
  constructor(template){
    console.log("Symbol Object");
    super(template);
    this.name = template.name;
    console.log("Symbol Object Created");
  }
  drawOn(display,dispX,dispY){

    display.draw(dispX, dispY, this.chr, this.fg, this.bg);

    //display.draw(dispX, dispY, '#');
  }
  isA() {
    return this.name == name;
  }
  isAWall(){
    console.log(`The Character in this space is ${this.chr}`);
    if(this.chr != '.'){
      return false;
    }
    else{
      return true;
    }
  }
  colorChange(color,x,y,display){
    this.bg = color;
    this.drawOn(display,x,y);
  }
  switchChar(){
    if(this.chr=='#'){
      this.chr = '.';
    }
    else if (this.chr=='.') {
      this.chr = '#';
    }
  }
}

export let TILES = {
  WALL: new Tile({name:'wall',chr:'#'}),
  FLOOR: new Tile({name:'floor',chr:'.'}),
  NULLTILE: new Tile({name:'nulltile',chr:'$'})
}
