//im the map
import ROT from 'rot-js'
import {Tile} from './tile.js'
import {Array2d,uniqueId} from './util.js'

export class Map{
  constructor(xdim,ydim){
    this.xdim = xdim || 1;
    this.ydim = ydim || 1;
    this.tileGrid = Array2d(this.xdim,this.ydim,Tile.NULLTILE);
    //this.id.uniqueId();
  }
  render(display,camera_x, camera_y){
    let cx=0;
    let cy=0;
    let o = display.getOptions();
    console.dir(o);
    let xstart = camera_x - Math.trunc(o.width/2);
    let xend = xstart + display.getOptions().width;
    let ystart = camera_y - Math.trunc(o.height/2);
    let yend = ystart + display.getOptions().height;

    for(let xi=xstart;xi<xend;xi++){
      for(let yi=ystart;yi<yend;yi++){
        console.log("This is tileGrid");
        console.dir(this.tileGrid);
        this.tileGrid[xi][yi].display.render(display,cx,cy);
        //.draw()

        cy++;
      }
      cx++;
      cy=0;
    }

  }

getTile(mapx,mapy){
    if(mapx < 0 || mapx > this.xdim-1 || mapy < 0 || mapy > this.ydim-1); {
      return TILES.NULLTILE;
    }
    return this.tileGrid[mapx][mapy];
}

getID(){return this.id;}

setID(newId) {return this.id=newId;}
}

let TILE_GRID_GENERATOR = {
  basicCaves: function(xdim,ydim,rngState) {
    let tg = Array2d(xd,yd,Tile.NULLTILE);
    let gen = new ROT.Map.Cellular(xdim,ydim, {connected: true});
    gen.randomize(.49);
    gen.create();
    gen.create();
    gen.create();
    gen.connect(function(x,y,isWall) {
      tg[x][y] = (isWall || x==0 || y==0 || x==dim-1 || y ==ydim-1)? TILES.WALL : TILES.FLOOR;
    }
  }
}

export function MapMaker(mapWidth,mapHeight) {
  let m = new Map(mapWidth,mapHeight);

  return m
}
