//let list = ["....#.....",".........#","..........","..#.......",".......#..","..........",".#..^.....","........#.","#.........","......#..."]
//list is list like above
function part1(list) {
  let l = structuredClone(list);
  let coords = {x:0,y:0};
  coords.y = l.indexOf(l.filter(val => val.match(/[#.]+\^[#.]+/g))[0]);
  coords.x = l[coords.y].indexOf("^");
  let dirs = [[0,-1],[1,0],[0,1],[-1,0]]
  let currentDir = 0;
  let num = 0;
  while (coords.y > -1 && coords.x > -1 && coords.y < l.length && coords.x < l[0].length) {
    num++;
    if (num > 10000) return -1;
    let v = l[coords.y].split("");
    v[coords.x] = "X";
    l[coords.y] = v.join("")
    if (l[coords.y + dirs[currentDir][1]] && l[coords.y + dirs[currentDir][1]][coords.x + dirs[currentDir][0]] == "#") {
      currentDir = (currentDir + 1) % 4;
    } else {
      coords.y += dirs[currentDir][1];
      coords.x += dirs[currentDir][0];
    }
  }
  return l.join().match(/X/g).length;
}
//inefficient code for part2 today
//theoretically works, but haven't tested yet
function part2(l) {
	let val = 0;
	for (let i = 0; i < l.length; i++) {
    for (let j = 0; j < l[0].length; j++) {
    	if (l[i][j] == "^" || l[i][j] == "#") continue;
      let newList = structuredClone(l);
      let v = newList[i].split("");
      v[j] = "#";
      newList[i] = v.join("")
      if (part1(newList) == -1) {
      	val++;
      }
    }
  }
  return val;
}
