//im the map
import ROT from 'rot-js'
import {TILES} from './tile.js'
import {Array2d,uniqueId} from './util.js'

export class Map{
  constructor(xdim,ydim){
    this.state = {};
    this.state.id = uniqueId();
    this.state.xdim = xdim || 1;
    this.state.ydim = ydim || 1;
    this.state.tileGrid = Array2d(this.state.xdim,this.state.ydim,TILES.NULLTILE);
    this.state.mapPosToEntityId = {};
    this.state.entityIdtoMapPos = {};

    //this.id.uniqueId();
  }

  render(display,camera_x, camera_y){
    let cx=0;
    let cy=0;
    let o = display.getOptions();
    console.log(`This is width ${o.width}`);
    let xstart = camera_x - Math.trunc(o.width/2);
    let xend = xstart + display.getOptions().width;
    let ystart = camera_y - Math.trunc(o.height/2);
    let yend = ystart + display.getOptions().height;
    this.basicCaves();

    for(let xi=xstart;xi<xend;xi++){
      for(let yi=ystart;yi<yend;yi++){
        console.log(`This is tileGrid ${this.state.tileGrid} on position (${xi},${yi})`);
        console.dir(this.state.tileGrid);
        //console.dir(this.state.tileGrid[xi][yi]);
        //this.state.tileGrid[xi][yi].display.render(display,cx,cy);
        console.log("about to Draw On");
        let tile = this.getTile(xi+xstart, yi+ystart);
        if (tile.isA(TILES.NULLTILE)) {
          tile = TILES.WALL;
        }
        tile.drawOn(display,xi,yi)

        //.draw()


        cy++;
      }
      cx++;
      cy=0;
    }

  }

  getTile(x,y) {
    if ((x < 0) || (x >= this._attr.xdim) || (y<0) || (y >= this._attr.ydim)) {
      return TILES.NULLTILE;
    }
  return this.state.tileGrid[x][y] || TILES.NULLTILE;
  }

  addEntityAt(ent,mapx,mapy){
    ent.setX(mapx);
    ent.sety(mapy);
  }

  updateEntityPosition(ent,newMapX,newMapY){
    let oldPos = this.state.entityIdToMapPos[ent.getId()];
    delete this.state.mapPosToEntityId[oldPos];
    this.state.mapPosToEntityId[ent.getId()] = `${newMapX},${newMapY}`;
    this.state.entityIdtoMapPos[`${newMapX},${newMapY}`] = ent.getId();

  }

  getRandomOpenPosition(){
    let x = Math.trunc(ROT.RNG.getUniform()*this.state.xdim);
    let y = Math.trunc(ROT.RNG.getUniform()*this.state.ydim);
    if (this.isPositionOpen(x,y)){
      return `${x}${y}`;
    }
      return this.getRandomOpenPosition();
  }
    isPositionOpen(mapx,mapy){
      if (this.state.tileGrid[x][y].isA('floor')){
        return true;
      }
        return false;
    }

    basicCaves(){
      console.log("We have entered the basic Caves loop");
      let tg = Array2d(this.state.xdim,this.state.ydim);
      let gen = new ROT.Map.Cellular(this.state.xdim,this.state.ydim, {connected:true});
      gen.randomize(.49);
      gen.create();
      gen.create();
      gen.create();
      //gen._map = tg;
      console.dir(gen._map);
      for(var x=0;x<gen._map.length;x++) {
        console.log(`we are on loop ${x}`);
        for(var y=0;y<gen._map[x].length;y++) {
        console.log(`we are on 2nd loop ${y}`)
          if(gen._map[x][y]==0){
            console.dir(TILES.WALL);
            this.state.tileGrid[x][y] = TILES.WALL;
          }
          else if (gen._map[x][y]) {
            this.state.tileGrid[x][y] = TILES.FLOOR;
          }
          else {
            this.state.tileGrid[x][y] = TILES.NULLTILE;
          }
        }
      }
      console.log("This is this.state.tileGrid");
      console.dir(this.state.tileGrid);
      return false;
      //this.state.tileGrid = tg;
    }

getTile(mapx,mapy){
    if(mapx < 0 || mapx > this.state.xdim-1 || mapy < 0 || mapy > this.state.ydim-1); {
      return TILES.NULLTILE;
    }
    return this.state.tileGrid[mapx][mapy];
}

getID(){return this.id;}

setID(newId) {return this.id=newId;}
}

/*let TILE_GRID_GENERATOR = {
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
} */

let TILE_GRID_GENERATOR = {
  basicCaves(xdim,ydim){
    let tg = Array2d(xdim,ydim);
    let gen = new ROT.Map.Cellular(xdim,ydim, {connected:true});
    gen.randomize(.49);
    gen.create();
    gen.create();
    gen.create();
    gen._map = tg;
    for(var x=0;x<gen._map.length;x++) {
      for(var y=0;x<gen._map[x].length;y++)
        if(gen._map[x][y]==0){
          gen._map[x][y] = TILES.WALL;
        }
        else if (true) {
          gen._map[x][y] = TILES.FLOOR;
        }
    }

  }

}



export function MapMaker(mapWidth,mapHeight) {
  let m = new Map(mapWidth,mapHeight);

  return m
}
//  add entityAtP(){
//    let pos = '[][]'"";
//    this.state
//  }
