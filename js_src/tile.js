//This is a tile class
import {Symbol} from './display.js'
class Tile extends Symbol{
  constructor(name,chr,fg,bg){
    super(chr,fg,bg);
    this.name = name;
  }
}

export let TILES = {
  WALL: new Tile('wall','#')
  FLOOR: new Tile('floor','.')
  NULLTILE: new Tile('nulltile','$')
}
