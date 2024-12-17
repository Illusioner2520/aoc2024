//let l = ["###############", "#.......#....E#", "#.#.###.#.###.#", "#.....#.#...#.#", "#.###.#####.#.#", "#.#.#.......#.#", "#.#.#####.###.#", "#...........#.#", "###.#.#####.#.#", "#...#.....#.#.#", "#.#.#.###.#.#.#", "#.....#...#.#.#", "#.###.#.#.#.#.#", "#S..#.....#...#", "###############"]
function part1(l) {
    let coords = toCoordPoints(l, l.join("").indexOf("S"));
    let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
    let turning = [[1, 3], [0, 2], [1, 3], [0, 2]]
    //dirs go in this order: NESW
    coords.dir = 1;
    coords.pts = 0;
    let vals = {};
    let minAmt = 10000000;
    let coordList = [coords];
    while (coordList.length > 0) {
        if (coordList.length % 100 == 0) console.log(coordList.length);
        let coord = coordList[0];
        coordList.shift();
        let dir = dirs[coord.dir];
        let turn = turning[coord.dir]
        let u = toUnique(l, coord);
        if (vals[u] && vals[u] < coord.pts) {
            continue;
        }
        if (l[coord.y][coord.x] == "E") {
            minAmt = Math.min(minAmt, coord.pts)
            continue;
        }
        if (l[coord.y][coord.x] == "#") {
            continue;
        }
        vals[u] = vals[u] ? Math.min(vals[u], coord.pts) : coord.pts;
        coordList.push({ x: coord.x + dir[0], y: coord.y + dir[1], dir: coord.dir, pts: coord.pts + 1 })
        for (let i of turn) {
            if (l[coord.y + dirs[i][1]][coord.x + dirs[i][0]] != "#") coordList.push({ x: coord.x, y: coord.y, dir: i, pts: coord.pts + 1000 })
        }
    }
    return minAmt;
}
function part2(l) {
    let coords = toCoordPoints(l, l.join("").indexOf("S"));
    console.log(l.join("").indexOf("E"))
    let dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]]
    let turning = [[1, 3], [0, 2], [1, 3], [0, 2]]
    //dirs go in this order: NESW
    coords.dir = 1;
    coords.pts = 0;
    coords.path = []
    let vals = {};
    let minAmt = 10000000;
    let coordList = [coords];
    let potentialBestPaths = []
    while (coordList.length > 0) {
        if (coordList.length % 100 == 0) console.log(coordList.length);
        let coord = coordList[0];
        coordList.shift();
        let dir = dirs[coord.dir];
        let turn = turning[coord.dir]
        let u = toUnique(l, coord);
        let u1 = toSpaceNumber(l,coord)
        if (vals[u] && vals[u] < coord.pts) {
            continue;
        }
        if (l[coord.y][coord.x] == "E") {
            minAmt = Math.min(minAmt, coord.pts)
            potentialBestPaths.push({num:coord.pts,path:coord.path.concat([u1])})
            continue;
        }
        if (l[coord.y][coord.x] == "#") {
            continue;
        }
        vals[u] = vals[u] ? Math.min(vals[u], coord.pts) : coord.pts;
        coordList.push({ x: coord.x + dir[0], y: coord.y + dir[1], dir: coord.dir, pts: coord.pts + 1, path: coord.path.concat([u1]) })
        for (let i of turn) {
            if (l[coord.y + dirs[i][1]][coord.x + dirs[i][0]] != "#") coordList.push({ x: coord.x, y: coord.y, dir: i, pts: coord.pts + 1000, path: coord.path.concat([u1]) })
        }
    }
    let paths = []
    for (let i of potentialBestPaths) {
        if (i.num == minAmt) {
            paths = paths.concat(i.path);
        }
    }
    return [...new Set(paths)].length;
}
function toCoordPoints(arr, n) {
    return { x: n % arr[0].length, y: Math.floor(n / arr[0].length) };
}
function toSpaceNumber(arr, n) {
    return n.y * arr[0].length + n.x;
}
function toUnique(arr, n) {
    return 4 * toSpaceNumber(arr, n) + n.dir;
}
function setValue(l, y, x, v) {
    let v1 = l[y].split("");
    v1[x] = v;
    l[y] = v1.join("")
    return l
}
