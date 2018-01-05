import * as U from './util.js';
import ROT from 'rot-js';
import * as mode from './ui_mode.js';
//

export let Game = {
    display: {
      SPACING: 1.1,
      main: {
        w: 80,
        h: 24,
        o: null
      }
    },
    modes: {
      startup: '',
      play: '',
      win:'',
      lose:'',
    },
    curMode: '',
    init: function() {
      this._randomSeed = 5 + Math.floor(Math.random()*100000);
      //this._randomSeed = 76250;
      console.log("using random seed "+this._randomSeed);
      ROT.RNG.setSeed(this._randomSeed);
      U.what();

      this.display.main.o = new ROT.Display({
        width: this.display.main.w,
        height: this.display.main.h,
        spacing: this.display.SPACING});
        this.setupModes();
        this.switchMode('startup');
        console.log("Maybe We have StartupMode working");

    },
    bindEvent: function(eventType){
      window.addEventListener(eventType, (evt) => {
        this.eventHandler(eventType, evt);
      });
    },
    eventHandler: function (eventType, evt) {

      if (this.curMode !== null && this._curMode != '') {
        if (this.curMode.handleInput(eventType, evt)) {
          this.render();
          //Message.ageMessages();
        }
      }
    },

    setupModes: function() {
      this.modes.startup = new mode.StartupMode(this);
    },
    switchMode: function(newModeName){
      if(this.curMode){
        this.curMode.exit();
      }
      this.curMode = this.modes[newModeName];
      if(this.curMode) {
        this.curMode.enter();
      }
    },
    getDisplay: function (displayId) {
      if (this.display.hasOwnProperty(displayId)) {
        return this.display[displayId].o;
      }
      return null;
    },

    render: function() {
      this.renderMain();
    },

    renderMain: function() {
      console.log("renderMain");
      //if (this.curMode.hadOwnProperty('render')){
        this.curMode.render(this.display.main.o);
        this.curMode.handleInput()
      //}
      // let d = this.display.main.o;
      // for (let i = 0; i < 10; i++) {
      //   d.drawText(5,i+5,"hello world");
      // }
    }
};
