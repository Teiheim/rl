export function utilAlert() {
  document.write("this is a util function<br/>");
}
export function what() {
  console.log("How do I do this???");
}
export function Array2d(xdim,ydim) {
  let arr2=[];
  for(let y=1;y<=ydim;y++) {
    arr2.push([]);
    for(let x=1;x<=xdim;x++) {
      arr2[y].push(x);
    }
  }
  return arr2;
}
