//im the map
import ROT from './ROT.js'
import {Tile} from './tile.js'
import {Array2d} from './util.js'

class Map{
  constructor(xdim,ydim){
    this.xdim = xdim || 1;
    ths.ydim = ydim || 1;
    this.tileGrid = Array2d(this.xdim,this.ydim,TILES.NULLTILE);
  }
  render(display,camera_x, camera_y){
    let cx=0;
    let cy=0;
    let xstart = camera_map_x - Math.trunc(display.getOptions().width()/2);
    let xend = xstart + display.getOptions().width;
    let ystart = camera_map_y - Math.trunc(display.getOptions().height()/2);
    let yend = ystart + display.getOptions().height;

    for(let xi=xstart;xi<xend;xi++){
      for(let yi=ystart;yi<yend;yi++){
        this.tileGrid[xi][yi].display.render(display,cx,cy);
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

let TILE_GRID_GENERATOR = {
  'basicCaves': function(xd,yd);
  {
    let tg = Array2d(xd,yd,TILES.NULLTILE);
    let gen = new ROT.Map.Cellular(xdim,ydim, {connected: true});
    gen.randomize(.49);
    gen.create();
    gen.create();
    gen.create();
    gen.connect(function(x,y,isWall)) {
    tg[x][y] = (isWall || x==0 || y==0 || x==dim-1 || y ==ydim-1)? TILES.WALL : TILES.FLOOR;
    }
  }
}
}
