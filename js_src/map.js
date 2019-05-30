//im the map
import ROT from 'rot-js'
import {TILES} from './tile.js'
import {Array2d,uniqueId} from './util.js'
import {DATASTORE} from './datastore.js';

export class Map{
  constructor(xdim,ydim){
    this.state = {};
    this.state.id = uniqueId();
    this.state.xdim = xdim || 1;
    this.state.ydim = ydim || 1;
    this.state.tileGrid = Array2d(this.state.xdim,this.state.ydim,TILES.NULLTILE);
    this.state.mapPosToEntityId = {};
    this.state.entityIdtoMapPos = {};
    this.state.entities = [];
    this.basicCaves();

    //this.state.focus = {x:0,y=0};

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
    console.log(`xstart:${xstart},xend:${xend},ystart:${ystart},yend:${yend}`);
    for(let xi=xstart;xi<xend;xi++){
      for(let yi=ystart;yi<yend;yi++){
        //console.log(`This is tileGrid on position (${xi},${yi})`);
        //console.dir(this.state.tileGrid);
        //console.dir(this.state.tileGrid[xi][yi]);
        //this.state.tileGrid[xi][yi].display.render(display,cx,cy);
        //console.log("about to Draw On");
        let tile = this.getTile(xi, yi);
        //console.dir(tile);
        if (tile.isA(TILES.NULLTILE)) {
          tile = TILES.WALL;
        }
        tile.drawOn(display,cx,cy)

        //.draw()


        cy++;
      }
      cx++;
      cy=0;
    }

    //for testing, will seperate later
    var xx = -1;
    var yy = -1;
    while(!this.isTileWall(xx-1,yy-1)){
     xx = Math.floor((Math.random() * 30) + 1);
     yy = Math.floor((Math.random() * 30) + 1);
     console.log(`xx:${xx},yy:${yy}`);
    //display.draw(xx+40,yy+12,"@","#f00", "#009");
    display.draw(xx+40,yy+12,"@");
    }
    for(var i = 0;i<this.state.xdim;i++){
      for(var j = 0;j<this.state.ydim;j++){
        if(this.state.tileGrid[i][j].chr=='#'){
          var test = this.state.tileGrid[i][j].chr;
          console.log(`Rejected - i:${i},j:${j}, This is the chr: ${test}`);
          console.dir(this.state.tileGrid[i][j]);
        }
        else{
          console.log(`Accepted - i:${i},j:${j}`);
          //display.draw(i+40,j+12,"@","#f00", "#009");
          display.draw(i+40,j+12,"@");
        return;
      }
      }
    }
  }

  renderEnt(ent,x,y,cx,cy){

  }
  /*getTile(x,y) {
    if ((x < 0) || (x >= this.attr.xdim) || (y<0) || (y >= this.attr.ydim)) {
      return TILES.NULLTILE;
    }
  return this.state.tileGrid[x][y] || TILES.NULLTILE;
} */


  addEntityAt(ent,mapx,mapy){
    this.state.entities.mapx.mapy = ent;
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
      console.log(`This is mapx:${mapx}`);
      console.log(`This is mapy:${mapy}`);
      console.log(this.state.tileGrid);
      console.log(this.state.tileGrid[mapx][mapy].isAWall());
      if (this.state.tileGrid[mapx][mapy].isAWall()){
        console.log("This Grid is open!");
        return true;
      }
        return false;
    }

    basicCaves(){
      console.log("We have entered the basic Caves loop");
      let gen = new ROT.Map.Cellular(this.state.xdim,this.state.ydim, {connected:true});
      //let tg = Array2d(this.state.xdim,this.state.ydim);
      let tg = Array2d(gen._map[0].length,gen._map.length);
      gen.randomize(.49);
      gen.create();
      gen.create();
      gen.create();
      gen.connect();
      //gen.connect();
      //gen.connect();
      //gen._map = tg;
      console.log('Below is the map');
      console.dir(gen._map);
      for(var x=0;x<gen._map.length;x++) {
        console.log(`we are on loop ${x}`);
        for(var y=0;y<gen._map[x].length;y++) {
        console.log(`we are on 2nd loop ${y}`)
          if(gen._map[x][y]==0){
            console.dir(TILES.WALL);
            console.log(`This is x:${x} and this is y:${y} and here is tileGrid`);
            console.dir(this.state.tileGrid);
            this.state.tileGrid[x][y] == gen._map[x][y];
            this.state.tileGrid[x][y] = TILES.FLOOR;
          }
          else if (gen._map[x][y]==1) {
            this.state.tileGrid[x][y] = TILES.WALL;
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
    if(mapx < 0 || mapx > this.state.xdim-1 || mapy < 0 || mapy > this.state.ydim-1) {
      return TILES.NULLTILE;
    }
    return this.state.tileGrid[mapx][mapy];
}

getID(){return this.id;}

setID(newId) {return this.id=newId;}

isTileWall(mapx,mapy){
  if(mapx < 0 || mapx > this.state.xdim-1 || mapy < 0 || mapy > this.state.ydim-1) {
    return false;
  }
  if(!this.state.tileGrid[mapx][mapy].chr=='#'){
    return false;
  }
  return true;
}

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
