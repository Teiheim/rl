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
    //display.draw(dispX, dispY, this._chr, this._fg, this._bg);
    display.draw(dispX, dispY, '#');
  }
  isA() {
    return this.name == name;
  }
}

export let TILES = {
  WALL: new Tile({name:'wall',chr:'#'}),
  FLOOR: new Tile({name:'floor',chr:'.'}),
  NULLTILE: new Tile({name:'nulltile',chr:'$'})
}
