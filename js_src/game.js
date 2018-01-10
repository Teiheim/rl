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
      message:'',
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

      this.display.left.o = new ROT.Display({
        width: this.display.left.w,
        height: this.display.left.h,
        spacing: this.display.SPACING});
        //  this.setupModes();
        //  this.switchMode('startup');
          console.log("Maybe We have StartupMode working");

      this.display.right.o = new ROT.Display({
        width: this.display.right.w,
        height: this.display.right.h,
        spacing: this.display.SPACING});
      //  this.setupModes();
      //  this.switchMode('startup');
        console.log("Maybe We have StartupMode working");

      this.display.bottom.o = new ROT.Display({
        width: this.display.bottom.w,
        height: this.display.bottom.h,
        spacing: this.display.SPACING});
      //  this.setupModes();
      //  this.switchMode('startup');
        console.log("Maybe We have StartupMode working");
        var mes = new Message;
        mes.send("bsod");
        mes.render(this.display.bottom.o);
        //var m = MapMaker(10,10);
        this.display.main.o.getOptions();
        var m = new Map(10,10);
        m.render(this.display.main.o,0,0);


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
      this._randonSeed = state.rseed;
    },
};
