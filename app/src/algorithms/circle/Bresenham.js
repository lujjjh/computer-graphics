export default ({ selectedPixels }) => {
  let outline = [];
  let fills = [];

  let [start, end] = selectedPixels;

  let dx = end.x - start.x;
  let dy = end.y - start.y;
  let r=Math.sqrt(dx*dx+dy*dy);
  // ****************************算法实现****************************
  let x, y, d;

  x=0;
  y=Math.round(r);
  let e=1-r;
  outline.push(...CirclePoints({x+start.x, y+start.y}));               // 画八分对称性的其他点
  while (x<=y) {     
    if(e<0)   e+=2*x+3;             // d<0，取右侧点，d增
    else   { e+=2*(x-y)+5; y--;} // d>=0，取右下点，d增
    x++;
    outline.push(...CirclePoints({x+start.x, y-start.y}));        // 画八分对称性的其他点
  }

  console.log(outline);

  // ****************************算法实现****************************

  return { outline, fills };
}  


function CirclePoints({ x, y })
{
  let outline = [];
  outline.push({ x: x, y: y });
  outline.push({ x: y, y: x });
  outline.push({ x: -x, y: y });
  outline.push({ x: y, y: -x });
  outline.push({ x: x, y: -y });
  outline.push({ x: -y, y: x });
  outline.push({ x: -x, y: -y });
  outline.push({ x: -y, y: -x });
  return outline;
}
