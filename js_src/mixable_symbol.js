import {uniqueId} from './util.js';
import {Symbol} from './display.js';

export class mixable_symbol {
  constructor(template){
    super(template);
    this.name = template.name || 'none';
    this.attr.id = uniqueId();
    if(!template.mixins) {template.mixins=[]}
    this.mixins = [];
    this.mixins.trackter = {};
    

  }
}
