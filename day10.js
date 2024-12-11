//let l = ["89010123","78121874","87430965","96549874","45678903","32019012","01329801","10456732"]
function part1(l) {
  let zeroIndexes = [];
  for (const match of m.join("").matchAll(/0/g)) {
    zeroIndexes.push(match.index);
  }
  let val = 0;
  for (let i = 0; i < zeroIndexes.length; i++) {
    let zCoords = toCoordPoints(l, zeroIndexes[i]);
    let coordList = [zCoords];
    let nines = [];
    while (coordList.length > 0) {
      let c = coordList[0];
      let v = l[c.y][c.x];
      if (l[c.y + 1] && l[c.y + 1][c.x] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x, y: c.y + 1 })
      }
      if (l[c.y - 1] && l[c.y - 1][c.x] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x, y: c.y - 1 })
      }
      if (l[c.y][c.x + 1] && l[c.y][c.x + 1] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x + 1, y: c.y })
      }
      if (l[c.y][c.x - 1] && l[c.y][c.x - 1] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x - 1, y: c.y })
      }
      if (v === "9") {
        nines.push(c.y * l[0].length + c.x);
      }
      coordList.shift();
    }
    let numofnines = [...new Set(nines)].length;
    console.log(numofnines)
    val += numofnines;
  }
  return val;
}
function toCoordPoints(arr, n) {
  return { x: n % arr[0].length, y: Math.floor(n / arr[0].length) };
}
function part2(l) {
  let zeroIndexes = [];
  for (const match of m.join("").matchAll(/0/g)) {
    zeroIndexes.push(match.index);
  }
  let val = 0;
  for (let i = 0; i < zeroIndexes.length; i++) {
    let zCoords = toCoordPoints(l, zeroIndexes[i]);
    let coordList = [zCoords];
    let nines = [];
    while (coordList.length > 0) {
      let c = coordList[0];
      let v = l[c.y][c.x];
      if (l[c.y + 1] && l[c.y + 1][c.x] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x, y: c.y + 1 })
      }
      if (l[c.y - 1] && l[c.y - 1][c.x] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x, y: c.y - 1 })
      }
      if (l[c.y][c.x + 1] && l[c.y][c.x + 1] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x + 1, y: c.y })
      }
      if (l[c.y][c.x - 1] && l[c.y][c.x - 1] - 0 === v - 0 + 1) {
        coordList.push({ x: c.x - 1, y: c.y })
      }
      if (v === "9") {
        nines.push(c);
      }
      coordList.shift();
    }
    let numofnines = [...new Set(nines)].length;
    console.log(numofnines)
    val += numofnines;
  }
  return val;
}
