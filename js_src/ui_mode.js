import ROT from 'rot-js';
import {Map} from './map.js';
import {Symbol} from './display.js';
import {Entities} from './entity.js';
import {DATASTORE} from './datastore.js';
import {Player} from './templates.js';
import {verbose} from './util.js'
import {Message} from './message.js';


class UIMode {
  constructor(thegame){
    console.log("Created "+this.constructor.name);
    console.dir(thegame);
    this._STATE = {};
    this._STATE.game = thegame;
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
    //this._STATE = {};
    console.log("THis is the game");
    console.dir(this._STATE.game);
    this._STATE.cameraMapLoc = {};
    this._STATE.cameraMapLoc.x = 0;
    this._STATE.cameraMapLoc.y = 0;
    this._STATE.gameMap = undefined;
    this._STATE.players = {};
    this._STATE.commandDeck = "";
    this._STATE.activeCharacter = '';
    this.msg = new Message();
    this.mDisp = this._STATE.game.getDisplay("bottom");

  }
  enter(){
    if (!this._STATE.gameMap) {
      this._STATE.map = new Map(60,60);
      var mc = new Player({
        chr:'T',
        name: "Tashina",
        maxHP: 10,
        curHP: 6,
        mp: 10,
        posx:1,
        posy:1,

      })
      console.log(`This is the TileGrid and MC`);
      console.dir(this._STATE.map.state.tileGrid);
      console.dir(mc);
      //this._STATE.map.state.tileGrid[mc.giveX()][mc.giveY()].chr = mc.chr;
      //map.state.entities.p1 = mc;
      this._STATE.map.render(this._STATE.game.getDisplay("main"),0,0);

      var mc = new Player({
        chr:'T',
        name: "Tashina",
        maxHP: 10,
        curHP: 10,
        mp: 10,
        posx:0,
        posy:0,

      })
      var mc2 = new Player({
        name: "Demery Innes",
        maxHP: 12,
        curHP: 12,
        mp: 10,

      })
      mc.render(this._STATE.game.getDisplay("main"),mc.posx,mc.posy);
      this._STATE.players[0]=mc;
      this._STATE.players[1]=mc2;
      this.renderPlayers();
      this._STATE.commandDeck = "Party";
      this.enterParty();
      console.dir(this._STATE.game.getDisplay("main"));
      console.dir(mc);
      mc.render(this._STATE.game.getDisplay("main"),mc.posx,mc.posy);
      //m.render(this.display.main.o,0,0);
    }
  }
  render(display,x,y){
    //console.log("Rendering Play Mode");
    //display.drawText(2,2,"Play Up Mode");
    this._STATE.map.render(display,x,y)
    //display.draw(0,0,'$');
  }
  renderPlayers(){
    console.log('This is players');
    console.dir(Object.keys(this._STATE.players).length);
    console.dir(this._STATE.players[0]);
    var renderPos = 1;
    var renderOPos = 1;
    var leftDisp = this._STATE.game.getDisplay("left");
    for(var k = 0; k<Object.keys(this._STATE.players).length;k++){
      var chara = this._STATE.players;

      verbose(chara[k],"Characters");
      leftDisp.drawText(1,renderPos,chara[k].state.name);
      renderPos++;
      //var bar = parseInt(leftDisp.width)*parseInt(chara[k].state.curHP)/parseInt(chara[k].state.maxHP);
      for(var i = 1;i<(leftDisp._options.width)*9/10;i++){
        leftDisp.draw(i,renderPos,"0","#006400	","#006400");
      }
      for(var j = 1;j<((leftDisp._options.width*9/10*chara[k].state.curHP)/chara[k].state.maxHP);j++){
        leftDisp.draw(j,renderPos,"0","#00FF00","#00FF00");
      }
      renderPos++;
    }
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
        this.moveBy(0,-1);
      }
      else if (inputData.key == 'ArrowDown') {
        this.moveBy(0,1);
      }
    if(this._STATE.commandDeck == "Party") {
      //console.dir(mDisp);
      if(inputType == 'keyup'){
        if (inputData.key == '1') {
          if(this._STATE.players[0]){
            console.log("activeCharacter is set to:");
            console.log(this._STATE.players[0]);
            this._STATE.activeCharacter = this._STATE.players[0];
            console.log(this._STATE.activeCharacter);
            this.enterCommands(this._STATE.players[0]);
          }
          else{

          }
          //this.moveBy(-1,0);
        }
        else if (inputData.key == '2') {
          if(this._STATE.players[1]){

            this.enterCommands(this._STATE.players[1]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp)
          }
          //this.moveBy(1,0);
        }
        else if (inputData.key == '3') {
          if(this._STATE.players[2]){
            this.enterCommands(this._STATE.players[2]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp);
          }
          //this.moveBy(0,-1);
        }
        else if (inputData.key == '4') {
          if(this._STATE.players[3]){
            this.enterCommands(this._STATE.players[3]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp);
          }
          //this.moveBy(0,1);
        }
        else if (inputData.key == '5') {
          if(this._STATE.players[4]){
            this.enterCommands(this._STATE.players[4]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp);
          }
          //this.moveBy(0,1);
        }
        else if (inputData.key == '6') {
          if(this._STATE.players[5]){
            this.enterCommands(this._STATE.players[5]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp);
          }
          //this.moveBy(0,1);
        }
        else if (inputData.key == '7') {
          if(this._STATE.players[6]){
            this.enterCommands(this._STATE.players[6]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp);
          }
          //this.moveBy(0,1);
        }
        else if (inputData.key == '8') {
          if(this._STATE.players){
            this.enterCommands(this._STATE.player[7]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp);
          }
          //this.moveBy(0,1);
        }
        else if (inputData.key == '9') {
          if(this._STATE.players){
            this.enterCommands(this._STATE.player[8]);
          }
          else{
            this.msg.send("There is no else in your Party!");
            this.msg.render(this.mDisp);
          }
          //this.moveBy(0,1);
        }
        else if (inputData.key == '0') {
          if(this._STATE.players){
          this.enterCommands(this._STATE.player[9]);
        }
        else{
          this.msg.send("There is no else in your Party!");
          this.msg.render(this.mDisp);
        }
          //this.moveBy(0,1);
        }
      }
    }
    if(this._STATE.commandDeck == "Commands"){
      if(inputType == 'keyup'){
        if (inputData.key == '1') {
          //this.moveBy(-1,0);
          var chara = this._STATE.activeCharacter;
          //chara.state.actions.MOVE(this._STATE.map,chara.state.moves,chara.state.posx,chara.state.posy,this._STATE.game.getDisplay("main"));
          this._STATE.commandDeck = "move"
        }
        else if (inputData.key == '2') {
          //this.moveBy(1,0);
        }
        else if (inputData.key == '3') {
          //this.moveBy(0,-1);
        }
        else if (inputData.key == '4') {
          //this.moveBy(0,1);
        }
        else if (inputData.key == '5') {
        //  this.moveBy(0,1);
        }
        else if (inputData.key == '6') {
          //this.moveBy(0,1);
        }
        else if (inputData.key == '7') {
          //this.moveBy(0,1);
        }
        else if (inputData.key == '9') {
          //this.moveBy(0,1);
        }
        else if (inputData.key == '0') {
          console.log("This is the escape func");
          this.enterParty();
          //this.moveBy(0,1);
        }
        else if (inputData.keyCode == 27) {
          //this.moveBy(0,1);
          console.log("This is the escape func");
          this.enterParty();
        }
      }
    }
    if(this._STATE.commandDeck == "move"){
      if(inputType == 'keyup'){
        console.log("The input is Down");
          var c = this._STATE.activeCharacter;
          var t = this._STATE.map.state.tileGrid;
          var disp = this._STATE.game.getDisplay("main");
          var o = disp.getOptions();
          var tx = c.giveX()-this._STATE.cameraMapLoc.x+Math.trunc(o.width/2);
          var ty = c.giveY()-this._STATE.cameraMapLoc.y+Math.trunc(o.height/2);
          console.dir(c);
          console.dir(t);
          console.dir(disp);
          console.dir(tx);
          console.dir(ty);
        if(inputData.key == 'd'){
          console.log("The input is Down");
          //t.switchChar();
          console.log(`Condition 1:${c.giveX()>=0}, Condition 2:${c.giveY()>=0}, Condition 3:${t[c.giveX()][c.giveY()].isAWall()}, Condition 4:${c.giveX()+1>=0}`);
          if((t[c.giveX()][c.giveY()].isAWall()) && c.giveX()+1 >= 0){
            t[c.giveX()][c.giveY()].switchChar();
            console.log(`Condition 3:${t[c.giveX()][c.giveY()].isAWall()}`);
            t[c.giveX()+1][c.giveY()].switchChar();
            disp.draw(tx+1,ty,c.chr);
            this._STATE.activeCharacter.state.posx = c.giveX()+1;
          }
          else{
            this.msg.send("You cannot move here");
            this.msg.render(this.mDisp);
          }
        }
      }
    }
    return false;
  }
  }

  enterParty(){
    var menu = this._STATE.game.getDisplay("right");
    this._STATE.commandDeck = "Party"
    menu.clear();
    for(var i = 0;i<Object.keys(this._STATE.players).length+1;i++){
      if(i<Object.keys(this._STATE.players).length){
        console.log("Player Object here")
        console.dir(Object.keys(this._STATE.players)[i]);
        menu.drawText(2,2+i,`${i+1}.${this._STATE.players[i].state.name}`);
      }
        //menu.drawText("ESC. Go Back ↪️");
    }
  }
  enterCommands(player){
    console.log("Entering Command Deck");
    this._STATE.commandDeck = "Commands";
    console.dir(player.state.actions);
    var menu = this._STATE.game.getDisplay("right");
    menu.clear();
    for(var i = 0;i<Object.keys(player.state.actions).length+1;i++){
      if(i<Object.keys(player.state.actions).length){
        menu.drawText(2,2+i,`${i+1}.${Object.keys(player.state.actions)[i]}`);
      }
      else{
        console.dir(this._STATE.commandDeck);
        console.log("Do we ever enter");
        menu.drawText(2,2+i,"0.Go Back");
      }
    }
  }


  moveBy(x,y) {
  let newX = this._STATE.cameraMapLoc.x + x;
  let newY = this._STATE.cameraMapLoc.y + y;
  //if (newX < 0 || newX > DATASTORE.MAPS[this._STATE.curMapId].getXDim() - 1) { return; }
  //if (newY < 0 || newY > DATASTORE.MAPS[this._STATE.curMapId].getYDim() - 1) { return; }
  this._STATE.cameraMapLoc.x = newX;
  this._STATE.cameraMapLoc.y = newY;
  console.dir(this._STATE.game);
  this.render(this._STATE.game.getDisplay('main'),this._STATE.cameraMapLoc.x,this._STATE.cameraMapLoc.y);
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
