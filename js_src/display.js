import {Color} from './color.js'

export class Symbol {
  constructor(template){
    console.log("Tile Object");

    this.chr = template.chr || '#';
    this.fg = template.fg || Color.FG;
    this.bg = template.bg || Color.BG;
    //console.log("Symbol Object Created");


  }
  render(display,x,y){
    display.draw(x,y,this.chr,this.fg,this.bg);
  }
}
