import ROT from 'rot-js';
import {MapMaker} from './map.js'
import {Symbol} from './display.js'
import {Entities} from './entity.js'


class UIMode {
  constructor(thegame){
    console.log("Created "+this.constructor.name);
    console.dir(thegame);
    this.game = thegame;
    this._STATE = {};
    console.log(`Tell me if the Game Exists: ${thegame}`);


  }
  enter(){
    console.log("Entering "+this.constructor.name);
  }
  exit(){
    console.log("Exiting "+this.constructor.name);
  }

  //render() {
  //DATASTORE.MAPS[this._STATE.curMapId].renderOn(this.display,
  //this._STATE.cameraMapLoc.x,this._STATE.cameraMapLoc.y);
  //this.avatarSymbol.drawOn(this.display,this._STATE.cameraDisplayLoc.x,this._STATE.cameraDisplayLoc.y);
  //}

  clear(){

  }

  render(display){
    console.log("Rendering "+this.constructor.name);
  }

}

export class StartupMode extends UIMode {
  render(display){
    console.log("Rendering StartupMode");
    //display.drawText(2,2,"Start Up Mode");
    //display.draw(0,0,'$');
  }

//  handleInput(eventType, evt){
//    if (eventType == keyup) {

//    }
//  }

}
export class playMode extends UIMode {
  constructor(thegame) {
    super(thegame);
    this._STATE = {};
    this._STATE.cameraMapLoc = {};
    this._STATE.cameraMapLoc.x = 0;
    this._STATE.cameraMapLoc.y = 0;
  }
  enter(){
    if (!this.map) {
      this.map = MapMaker(300,160);
    }
  }
  render(display){
    console.log("Rendering Play Mode");
    display.drawText(2,2,"Play Up Mode");

    //display.draw(0,0,'$');
  }
  moveAvatar(dx,dy) {
  this.getAvatar().moveBy(dx,dy);
  }
  setupNewGame() {
    let m = MapMaker({xdim:0})
    let a = new entity(ENTITIES.avatar);
  }
  handleInput(inputType, inputData){
    console.log("Input "+this.constructor.name);
    console.log(`Event Type is ${inputType}`);
    console.log(`Event Data is ${inputData}`);
    console.dir(inputData);
    if (inputType == 'keyup') {
      if (inputData.key == 'ArrowLeft') {
        this.moveBy(-1,0);
      }
      else if (inputData.key == 'ArrowRight') {
        this.moveBy(1,0);
      }
      else if (inputData.key == 'ArrowUp') {
        this.moveBy(0,1);
      }
      else if (inputData.key == 'ArrowDown') {
        this.moveBy(0,-1);
      }


    return false;
  }
  }
  moveBy(x,y) {
  let newX = this._STATE.cameraMapLoc.x + x;
  let newY = this._STATE.cameraMapLoc.y + y;
  //if (newX < 0 || newX > DATASTORE.MAPS[this._STATE.curMapId].getXDim() - 1) { return; }
  //if (newY < 0 || newY > DATASTORE.MAPS[this._STATE.curMapId].getYDim() - 1) { return; }
  this._STATE.cameraMapLoc.x = newX;
  this._STATE.cameraMapLoc.y = newY;
  console.dir(this.game);
  this.render(this.game.getDisplay().main.o,this._STATE.cameraMapLoc.x,this._STATE.cameraMapLoc.y);
  }

}
export class winMode extends UIMode {
  render(display){
    console.log("Rendering Win Mode");
    display.drawText(2,2,"Start Up Mode");
  }
}
export class loseMode extends UIMode {
  render(display){
    console.log("Rendering Lose Mode");
    display.drawText(2,2,"Start Up Mode");
  }
}
export class persistMode extends UIMode {
  render(display) {
    display.clear();
    display.drawText(33,2,"N for a new game");
    display.drawText(33,2,"S for save game");
    display.drawText(33,2, "L to load previously saved game");
  }
  handleInput(inputType,inputData) {

  }
  haveSave() {
    console.log('save game');
    if(! this.localStorageAvailable()){
      return false;
    }
    window.localStorage.setItem('weedstrikegame',this.game.toJson);
  }
  handleLoad() {
    console.log('load game');
    if (! this.localStorageAvailable()){
      return false;
    }
    let restorationString = window.localStorage.getItem('weedstrikegame');
    this.game.fromJson(restorationString);
  }
  localStorageAvailable(){
    try{
      var x = '__storage_test__';
      window.localStorage.setItem( x, x);
      window.localStorage.removeItem(x);
      return true;
    }
    catch(e) {
      this.game.messageHandler.send('Sorry, no local data storage is available for this browser so game save/load is not possible');
      return false;
    }
  }
}
