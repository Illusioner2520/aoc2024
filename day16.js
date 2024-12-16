
//let l = ["###############","#.......#....E#","#.#.###.#.###.#","#.....#.#...#.#","#.###.#####.#.#","#.#.#.......#.#","#.#.#####.###.#","#...........#.#","###.#.#####.#.#","#...#.....#.#.#","#.#.#.###.#.#.#","#.....#...#.#.#","#.###.#.#.#.#.#","#S..#.....#...#","###############"]
console.log(part1(l))
function part1(l) {
  let coords = toCoordPoints(l,l.join("").indexOf("S"));
  coords.dir = 1;
  coords.pts = 0;
  let coordList = [coords]
  let allCoordList = [toUnique(l,coords)]
  let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  let minAmt = 100000;
  //dirs go in this order: NESW
  while (coordList.length > 0) {
    let coord = coordList[0];
    let dir = dirs[coord.dir];
    if (l[coord.y + dir[1]][coord.x + dir[0]] != "#" && !allCoordList.includes(toUnique(l,{x:coord.x + dir[0],y:coord.y + dir[1],dir:coord.dir}))) {
      coordList.push({x:coord.x + dir[0],y:coord.y + dir[1],dir:coord.dir,pts:coord.pts + 1 })
      allCoordList.push(toUnique(l,{x:coord.x + dir[0],y:coord.y + dir[1],dir:coord.dirs}))
    }
    if (l[coord.y + 1][coord.x] != "#" && coord.dir != 0 && !allCoordList.includes(toUnique(l,{x:coord.x,y:coord.y,dir:2}))) {
      coordList.push({x:coord.x,y:coord.y,dir:2,pts:coord.pts + 1000 })
      allCoordList.push(toUnique(l,{x:coord.x,y:coord.y,dir:2}))
    }
    if (l[coord.y - 1][coord.x] != "#" && coord.dir != 2 && !allCoordList.includes(toUnique(l,{x:coord.x,y:coord.y,dir:0}))) {
      coordList.push({x:coord.x,y:coord.y,dir:0,pts:coord.pts + 1000 })
      allCoordList.push(toUnique(l,{x:coord.x,y:coord.y,dir:0}))
    }
    if (l[coord.y][coord.x + 1] != "#" && coord.dir != 3 && !allCoordList.includes(toUnique(l,{x:coord.x,y:coord.y,dir:1}))) {
      coordList.push({x:coord.x,y:coord.y,dir:1,pts:coord.pts + 1000 })
      allCoordList.push(toUnique(l,{x:coord.x,y:coord.y,dir:1}))
    }
    if (l[coord.y][coord.x - 1] != "#" && coord.dir != 1 && !allCoordList.includes(toUnique(l,{x:coord.x,y:coord.y,dir:3}))) {
      coordList.push({x:coord.x,y:coord.y,dir:3,pts:coord.pts + 1000 })
      allCoordList.push(toUnique(l,{x:coord.x,y:coord.y,dir:3}))
    }
    if (l[coord.y][coord.x] == "E") {
      minAmt = Math.min(minAmt,coord.pts)
    }
    coordList.shift();
  }
  return minAmt;
}
function toCoordPoints(arr, n) {
    return { x: n % arr[0].length, y: Math.floor(n / arr[0].length) };
}
function toSpaceNumber(arr, n) {
    return n.y * arr[0].length + n.x;
}
function toUnique(arr,n) {
  return 4 * toSpaceNumber(arr,n) + n.dir;
}
function setValue(l, y, x, v) {
    let v1 = l[y].split("");
    v1[x] = v;
    l[y] = v1.join("")
    return l
}
