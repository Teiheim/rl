import 'babel-polyfill';
import ROT from 'rot-js';
import {Game} from './game.js';

window.onload = function() {
  console.log("starting WSRL - window loaded");
  // Check if rot.js can work on this browser
  if (!ROT.isSupported()) {
    alert("The rot.js library isn't supported by your browser.");
    return;
  }

  Game.init();

  // Add the containers to our HTML page
  document.getElementById('ws-left-display').appendChild(Game.getDisplay('left').getContainer());
  document.getElementById('ws-main-display').appendChild(Game.getDisplay('main').getContainer());
  document.getElementById('ws-right-display').appendChild(Game.getDisplay('right').getContainer());
  document.getElementById('ws-bottom-display').appendChild(Game.getDisplay('bottom').getContainer());

  Game.render();
  Game.bindEvent('keyup');
};
