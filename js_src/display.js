import {Color} from './color.js'

export class Symbol {
  constructor(chr,fg,bg){
    console.log("Tile Object ");

    this.chr = chr || '#';
    this.fg = fg || Color.FG;
    this.bg = bg || Color.BG;
    console.log("Symbol Object Created");


  }
  render(display,console_x,console_y){
    display.draw(x,y,this.chr,this.fg,this.bg)
  }
}
