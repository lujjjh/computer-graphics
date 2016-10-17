const invk = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => {
  let dx = x1 - x2;
  let dy = y1 - y2;
  return dx / dy;
};

module.exports = ({ selectedPixels }) => {
  let outline = [];
  let fills = [];

  let et = [];
  let etLength = 0;
  let initialY = Infinity;

  // 1. set up ET
  let startPixel = selectedPixels[0];
  for (let i = 0, j = 1, len = selectedPixels.length - 1; j < len; i++, j++) {
    let pixels = [
      selectedPixels[i],
      selectedPixels[j]
    ];
    if (selectedPixels[j].x === startPixel.x && selectedPixels[j].y === startPixel.y) {
      i++;
      j++;
      startPixel = selectedPixels[j];
    }
    pixels.sort(({ y: y1 }, { y: y2 }) => y1 - y2);
    let [ymin, ymax] = [pixels[0].y, pixels[1].y];
    // skip horizontal line
    if (ymin === ymax) continue;
    let edge = {
      ymax,
      x: pixels[0].x,
      deltax: invk(pixels[0], pixels[1]),
      next: null
    };
    if (ymin < initialY) initialY = ymin;
    // push into ET
    if (!et[ymin]) {
      et[ymin] = edge;
      etLength++;
    } else {
      let insertAfter = { next: et[ymin] };
      for (; insertAfter.next !== null; insertAfter = insertAfter.next) {
        if (edge.x < insertAfter.next.x) break;
        if (edge.x === insertAfter.next.x && edge.deltax < insertAfter.next.deltax) break;
      }
      edge.next = insertAfter.next;
      if (edge.next === et[ymin]) {
        et[ymin] = edge;
      } else {
        insertAfter.next = edge;
      }
    }
  }

  // 2. assign initial value for y
  let y = initialY;

  // 3. assign AEL as empty
  let ael = null;

  // 4. loop until et and ael are both empty
  while (!(etLength === 0 && ael === null)) {
    // 4.1. move all the edges in ET[y] to AEL if ET[y] is nonempty
    // 4.2. sort edges in AEL if there is at least one new edge
    let edge = et[y];
    if (edge) {
      if (ael === null) {
        ael = edge;
      } else {
        let insertAfter = { next: ael };
        while (edge !== null) {
          let next = edge.next;
          // insert into AEL and keep the order
          for (; insertAfter.next !== null; insertAfter = insertAfter.next) {
            if (edge.x < insertAfter.next.x) break;
            if (edge.x === insertAfter.next.x && edge.deltax < insertAfter.next.deltax) break;
          }
          edge.next = insertAfter.next;
          if (edge.next === ael) {
            ael = edge;
          } else {
            insertAfter.next = edge;
          }
          edge = next;
        }
      }
      etLength--;
    }
    // 4.3. pair and fill
    for (let edge1 = ael; edge1 !== null; edge1 = edge1.next.next) {
      let edge2 = edge1.next;
      for (let x = Math.round(edge1.x); x <= Math.round(edge2.x) - 1; x++) {
        fills.push({ x, y });
      }
    }
    // 4.4. increase y
    y++;
    // 4.5. remove all edges whose ymax === y
    // 4.6. apply x += deltax to each edges in AEL
    for (let edge = ael, prev = null; edge !== null; edge = edge.next) {
      if (edge.ymax === y) {
        if (edge === ael) {
          ael = edge.next;
        } else {
          prev.next = edge.next;
        }
        continue;
      } else {
        edge.x += edge.deltax;
      }
      prev = edge;
    }
  }

  return { outline, fills };
};
