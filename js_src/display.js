import {color} from './color.js'

export let symbol {
  constructor(chr,fg,bg){
    this.chr = chr || '#';
    this.fg = fg || Color.FG;
    this.bg = bg || Color.BG;

  }
  render(display,console_x,console_y){
    display.draw(x,y,this.chr,this.fg,this.bg)
  }
}
