//let l = ["5,4", "4,2", "4,5", "3,0", "2,1", "6,3", "2,4", "1,5", "0,6", "3,3", "2,6", "5,1", "1,2", "5,5", "2,5", "6,5", "1,4", "0,4", "6,4", "1,1", "6,1", "1,0", "0,5", "1,6", "2,0"]
//let n = 1024
function part1(l,n) {
  let start = { x: 0, y: 0, n: 0 };
  let maze = []
  for (let i = 0; i < 71; i++) {
    maze[i] = "";
    for (let j = 0; j < 71; j++) {
      maze[i] += ".";
    }
  }
  let coordList = [start]
  let alreadyDone = [toSpaceNumber(maze, start)]
  let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  for (let i = 0; i < n; i++) {
    let nums = l[i].match(/\d+/g)
    maze = setValue(maze, nums[1] - 0, nums[0] - 0, "#")
  }
  while (coordList.length > 0) {
    let coord = coordList[0]
    for (let dir of dirs) {
      if (maze[coord.y + dir[1]] && maze[coord.y + dir[1]][coord.x + dir[0]] == "." && !alreadyDone.includes(toSpaceNumber(maze, { x: coord.x + dir[0], y: coord.y + dir[1] }))) {
        coordList.push({ x: coord.x + dir[0], y: coord.y + dir[1], n: coord.n + 1 });
        alreadyDone.push(toSpaceNumber(maze, { x: coord.x + dir[0], y: coord.y + dir[1] }))
      }
    }
    coordList.shift();
    if (coord.y == maze.length - 1 && coord.x == maze[0].length - 1) {
      return coord.n;
    }
  }
}
function part2(l) {
  for (let i = 0; i < l.length; i++) {
    if (part1(l,i) == null) {
      return l[i - 1]
    }
  }
}
function setValue(l, y, x, v) {
  let v1 = l[y].split("");
  v1[x] = v;
  l[y] = v1.join("")
  return l
}
function toCoordPoints(arr, n) {
  return { x: n % arr[0].length, y: Math.floor(n / arr[0].length) };
}
function toSpaceNumber(arr, n) {
  return n.y * arr[0].length + n.x;
}
