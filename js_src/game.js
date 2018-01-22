import * as U from './util.js';
import ROT from 'rot-js';
import * as mode from './ui_mode.js';
import {Message} from './message.js'
import {Map} from './map.js'
//

export let Game = {
    display: {
      SPACING: 1.1,
      main: {
        w: 80,
        h: 24,
        o: null
      },
      left: {
        w: 24,
        h: 20,
        o: null
      },
      right: {
        w: 24,
        h: 20,
        o: null
      },
      bottom: {
        w: 130,
        h: 6,
        o: null
      }
    },
    modes: {
      startup: '',
      play: '',
      win:'',
      lose:'',
      persist:'',
    },
    curMode: '',
    mode: {},
    init: function() {
      this._randomSeed = 5 + Math.floor(Math.random()*100000);
      //this._randomSeed = 76250;
      console.log("using random seed "+this._randomSeed);
      ROT.RNG.setSeed(this._randomSeed);
      U.what();
      let gameMap = undefined;

      this.display.main.o = new ROT.Display({
        width: this.display.main.w,
        height: this.display.main.h,
        spacing: this.display.SPACING});

        //console.log("Maybe We have StartupMode working");

      this.display.left.o = new ROT.Display({
        width: this.display.left.w,
        height: this.display.left.h,
        spacing: this.display.SPACING});
        //  this.setupModes();
        //  this.switchMode('startup');
        //  console.log("Maybe We have StartupMode working");

      this.display.right.o = new ROT.Display({
        width: this.display.right.w,
        height: this.display.right.h,
        spacing: this.display.SPACING});
      //  this.setupModes();
      //  this.switchMode('startup');
        //console.log("Maybe We have StartupMode working");

      this.display.bottom.o = new ROT.Display({
        width: this.display.bottom.w,
        height: this.display.bottom.h,
        spacing: this.display.SPACING});
      //  this.setupModes();
      //  this.switchMode('startup');
        //console.log("Maybe We have StartupMode working");
        //var map = new ROT.Map.Cellular(50, 50, { connected: true });
        //map.randomize(0.5);
        //map.create();
        //console.dir(map);
        //console.log(`Leggo! ${Object.keys(map)}`);
        //console.log(`Does this work? ${Object.values(map._map[5])}`);
        //var mes = new Message;
        //mes.send("bsod");
        //mes.render(this.display.bottom.o);
        //var m = MapMaker(10,10);
        //this.display.main.o.getOptions();
        var m = new Map(30,30);
        gameMap = m;
        m.render(this.display.main.o,0,0);
        this.display.main.o.draw(5,  4, "@");
        this.setupModes();
        //this.switchMode('startup');
        this.switchMode('play');
        //test, meant to be moved later
        let menu = ["attack","defend","item","magic"]
        var space = 0;
        for (var i = 0;i<menu.length;i++) {
        console.dir(menu[i]);
        this.display.bottom.o.drawText(2,i,menu[i]);
        space++;
      }

    },

    bindEvent: function(eventType){
      console.log("bindEvent has opened")
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

    getDisplay: function() {
      return this.display;
    },

    setupModes: function() {
      this.modes.startup = new mode.StartupMode(this);
      this.modes.play = new mode.playMode(this);
      this.modes.win = new mode.winMode(this);
      this.modes.lose = new mode.loseMode(this);
      this.modes.persist = new mode.persistMode(this);
      //Creates all the different
    },
    /*switchMode: function(newModeName, m){
      if(this.curMode){
        this.curMode.exit();
      }
      this.curMode = newModeName;
      this.mode = m;
      if(this.curMode) {
        this.curMode.enter();
      }
    }, */
    switchMode: function (newMode) {
      if (typeof newMode == 'string' || newMode instanceof String) {
      if (this.modes.hasOwnProperty(newMode)) {
        newMode = this.modes[newMode];}
      else {
      return;
    }
  }
      if (this.curMode !== null && this.curMode != '') {
        this.curMode.exit();
  }
      this.curMode = newMode;
      if (this.curMode !== null && this.curMode != '') {
        this.curMode.enter();
      }
      this.render();
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
        //this.curMode.render(this.display.main.o);
        this.curMode.handleInput()
      //}
      // let d = this.display.main.o;
      // for (let i = 0; i < 10; i++) {
      //   d.drawText(5,i+5,"hello world");
      // }
    },
    renderMessage: function() {

    },
    renderMap: function(){
      //this.mp.render(this.display.main.o)
    },
    setupNewGame: function() {

    },
    toJson: function() {
      letJson = '';
      json = JSON.stringify({rseed: this_randomSeed});
      return json;

    },
    fromJson: function() {
      let state = JSON.parse(json);
      this._randomSeed = state.rseed;
    },
};
