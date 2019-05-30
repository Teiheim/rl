//A base class that defines all entities
import {uniqueId} from './util.js';
import {Symbol} from './display.js';
import {DATASTORE} from './datastore.js';

export class Entity extends Symbol {
  constructor(template) {
    super(template);
    this.name = template.name;
    this.state = {};
    this.state.x=0;
    this.state.y=0;
    this.state.mapId = 0;
    this.state.id=uniqueId();
  }
  getName() {return this.state.name;}
  setName(newName) {this.state.name = newName;}
  getX() {return this.state.x;}
  setX(newName) {this.state.x = newName;}
  getY() {return this.state.y;}
  setY(newName) {this.state.y = newName;}
  getMapId() {return this.state.MapId;}
  setMapId(newName) {this.state.MapId = newName;}
  getId() {return this.state.id;}
  setId(newName) {this.state.id = newName;}

  toJson(){
    return JSON.stringify(this.state);
  }
  moveBy(dx,dy){
    let newX = this.state.x += Number(dx);
    let newY = this.state.y += Number(dy);


    this.getMap().updateEntityPosition(this,this.state.x,this.state.y);

  }
  restoreFromState(s){
    this.state = s;
  }
}
