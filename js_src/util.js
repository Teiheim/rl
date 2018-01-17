export function utilAlert() {
  document.write("this is a util function<br/>");
}
export function what() {
  console.log("How do I do this???");
}
export function Array2d(xdim,ydim, tile='#') {
  var arr2 = [];
  for(var y=0;y<ydim;y++) {
    arr2.push([]);
    for(var x=0;x<xdim;x++) {
      arr2[y].push(x);
    }
  }
  return arr2;
}
export function uniqueId(){
  let randchar = '847rh872g4r76432r87grb7c6942yiwyqg987f947fg224ffhj89rhf4y7567459fggsixnmzm89x'.split();
  let id = "";
  var res = '';
  for (let i=0;i<8;i++){
      res+=randchar.random()

    }
    return res
  }
  export function init2DArray(x=1,y=1,initVal='') {
    var a = [];
    for (var xdim=0; xdim < x; xdim++) {
      a.push([]);
      for (var ydim=0; ydim < y; ydim++) {
        a[xdim].push(initVal);
      }
    }
    return a;
  }
