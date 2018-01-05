import ROT from 'rot-js';

class UIMode {
  constructor(thegame){
    console.log("Created "+this.constructor.name);
    this.game = thegame;
    

  }
  enter(){
    console.log("Entering "+this.constructor.name);
  }
  exit(){
    console.log("Exiting "+this.constructor.name);
  }
  handleInput(){
    console.log("Input "+this.constructor.name);
    console.log(`Event Type is ${eventType}`)
    return false;
  }
  render(display){
    console.log("Rendering "+this.constructor.name);
  }
}

export class StartupMode extends UIMode {
  constructor() {
    super();
  }
  render(display){
    console.log("Rendering StartupMode");
    display.drawText(2,2,"Start Up Mode");
  }
//  handleInput(eventType, evt){
//    if (eventType == keyup) {

//    }
//  }

}
export class playMode extends UIMode {
  constructor() {
    super();
  }
  render(display){
    console.log("Rendering Play Mode");
    display.drawText(2,2,"Start Up Mode");
  }
}
export class winMode extends UIMode {
  constructor() {
    super();
  }
  render(display){
    console.log("Rendering Win Mode");
    display.drawText(2,2,"Start Up Mode");
  }
}
export class loseMode extends UIMode {
  constructor() {
    super();
  }
  render(display){
    console.log("Rendering Lose Mode");
    display.drawText(2,2,"Start Up Mode");
  }
}
