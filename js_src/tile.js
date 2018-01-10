//This is a tile class
import {Symbol} from './display.js'
export class Tile extends Symbol{
  constructor(name,chr,fg,bg){
    console.log("Symbol Object");
    super(chr,fg,bg);
    this.name = name;
    console.log("Symbol Object Created");
  }
}

export let TILES = {
  WALL: new Tile('wall','#'),
  FLOOR: new Tile('floor','.'),
  NULLTILE: new Tile('nulltile','$')
}
