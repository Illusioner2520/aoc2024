//let l = ["##########", "#..O..O.O#", "#......O.#", "#.OO..O.O#", "#..O@..O.#", "#O#..O...#", "#O..O..O.#", "#.OO.O.OO#", "#....O...#", "##########"]
//let l1 = "<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^"
function part1(l, l1) {
    let coords = toCoordPoints(l, l.join("").indexOf("@"));
    let val = 0;
    for (let i = 0; i < l1.length; i++) {
        let v = l1[i];
        let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
        let chars = "^>v<";
        let dir = dirs[chars.indexOf(v)];
        l = setValue(l, coords.y, coords.x, ".")
        coords.x += dir[0];
        coords.y += dir[1];
        if (l[coords.y][coords.x] == "O") {
            let success = false;
            for (let j = 0; j < l.length; j++) {
                if (l[coords.y + j * dir[1]] && l[coords.y + j * dir[1]][coords.x + j * dir[0]] == ".") {
                    l = setValue(l, coords.y + j * dir[1], coords.x + j * dir[0], "O")
                    success = true;
                    break;
                }
                if (l[coords.y + j * dir[1]] && l[coords.y + j * dir[1]][coords.x + j * dir[0]] == "#") {
                    break;
                }
            }
            if (!success) {
                coords.x -= dir[0];
                coords.y -= dir[1];
            }
        }
        if (l[coords.y][coords.x] == "#") {
            coords.x -= dir[0];
            coords.y -= dir[1];
        }
        l = setValue(l, coords.y, coords.x, "@")
    }
    let str = l.join("")
    let g = str.match(/O/g).length
    for (let i = 0; i < g; i++) {
        let v = str.indexOf("O");
        let coords = toCoordPoints(l, v);
        val += 100 * coords.y + coords.x
        let s = str.split("")
        s[v] = "."
        str = s.join("")
    }
    return val;
}
function part2(l, l1) {
    //i hate grids
    for (let i = 0; i < l.length; i++) {
        l[i] = l[i].replaceAll("#", "##").replaceAll(".", "..").replaceAll("O", "[]").replaceAll("@", "@.")
    }
    let coords = toCoordPoints(l, l.join("").indexOf("@"));
    let val = 0;
    for (let i = 0; i < l1.length; i++) {
        let v = l1[i];
        let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
        let chars = "^>v<";
        let dir = dirs[chars.indexOf(v)];
        l = setValue(l, coords.y, coords.x, ".")
        coords.x += dir[0];
        coords.y += dir[1];
        if (l[coords.y][coords.x] == "]" || l[coords.y][coords.x] == "[") {
            let success = false;
            let successval = { x: 0, y: 0 }
            for (let j = 0; j < l.length; j++) {
                if (l[coords.y + j * dir[1]] && l[coords.y + j * dir[1]][coords.x + j * dir[0]] == ".") {
                    success = true;
                    successval.x = coords.x + j * dir[0];
                    successval.y = coords.y + j * dir[1];
                    break;
                }
                if (l[coords.y + j * dir[1]] && l[coords.y + j * dir[1]][coords.x + j * dir[0]] == "#") {
                    break;
                }
            }
            if (!success) {
                coords.x -= dir[0];
                coords.y -= dir[1];
            } else {
                if (v == ">" || v == "<") {
                    l = shiftHorizontally(l, successval.y, successval.x, coords.x, ".")
                } else {
                    if (l[coords.y][coords.x] == "[") {
                        let temp = shiftBoxVertically(l, coords.x, coords.y, v == "^" ? -1 : 1);
                        if (temp == null) {
                            coords.x -= dir[0];
                            coords.y -= dir[1];
                        } else {
                            l = temp;
                        }
                    } else if (l[coords.y][coords.x] == "]") {
                        let temp = shiftBoxVertically(l, coords.x - 1, coords.y, v == "^" ? -1 : 1);
                        if (temp == null) {
                            coords.x -= dir[0];
                            coords.y -= dir[1];
                        } else {
                            l = temp;
                        }
                    }
                }
            }
        }
        if (l[coords.y][coords.x] == "#") {
            coords.x -= dir[0];
            coords.y -= dir[1];
        }
        l = setValue(l, coords.y, coords.x, "@")
    }
    let str = l.join("")
    let g = str.match(/\[\]/g).length
    for (let i = 0; i < g; i++) {
        let v = str.indexOf("[]");
        let coords = toCoordPoints(l, v);
        val += 100 * coords.y + coords.x
        let s = str.split("")
        s[v] = "."
        s[v + 1] = "."
        str = s.join("")
    }
    return val;
}
function toCoordPoints(arr, n) {
    return { x: n % arr[0].length, y: Math.floor(n / arr[0].length) };
}
function toSpaceNumber(arr, n) {
    return n.y * arr[0].length + n.x;
}
function setValue(l, y, x, v) {
    let v1 = l[y].split("");
    v1[x] = v;
    l[y] = v1.join("")
    return l
}
function shiftHorizontally(l, y, x, x1, v) {
    let v1 = l[y].split("");
    v1.splice(x, 1);
    let d = Math.sign(x - x1)
    v1.splice(x1 - d, 0, [v])
    l[y] = v1.join("")
    return l;
}
function shiftBoxVertically(l, x, y, dir) {
    console.log(x, y)
    if (l && l[y + dir] && l[y + dir][x] == "[") {
        l = shiftBoxVertically(structuredClone(l), x, y + dir, dir);
    }
    if (l && l[y + dir] && l[y + dir][x] == "]") {
        l = shiftBoxVertically(structuredClone(l), x - 1, y + dir, dir);
    }
    if (l && l[y + dir] && l[y + dir][x + 1] == "[") {
        l = shiftBoxVertically(structuredClone(l), x + 1, y + dir, dir);
    }
    if (!l || !l[y + dir] || l[y + dir][x] == "#" || l[y + dir][x + 1] == "#") {
        return null;
    }
    if (l == null) return null;
    l = setValue(l, y + dir, x, "[");
    l = setValue(l, y + dir, x + 1, "]");
    l = setValue(l, y, x, ".");
    l = setValue(l, y, x + 1, ".");
    return l;
}
