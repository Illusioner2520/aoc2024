let l = ["RRRRIICCFF", "RRRRIICCCF", "VVRRRCCFFF", "VVRCCCJFFF", "VVVVCJJCFE", "VVIVCCJJEE", "VVIIICJJEE", "MIIIIIJJEE", "MIIISIJEEE", "MMMISSJEEE"]
console.log(part1(l))
function part1(l) {
    let available = Array.from({ length: (l.length) * (l[0].length) }, (v, k) => k)
    while (available.length > 0) {
        let char = l[available[0]];
        let spacenum = available[0];
        let coords = toCoordPoints(l, spacenum);
        let coordList = [coords]
        let prevCoords = [coords]
        let area = 0;
        let perimeter = 0;
        while (coordList.length > 0) {
            let c = coordList[0]
            if (prevCoords.includes(toSpaceNumber(l,c))) continue;
            area++;
            if (l[c.y + 1] && l[c.y + 1][c.x] === char) {
                coordList.push({ x: c.x, y: c.y + 1 })
                prevCoords.push(toSpaceNumber(l,{ x: c.x, y: c.y + 1 }))
            } else {
                perimeter++;
            }
            if (l[c.y - 1] && l[c.y - 1][c.x] === char) {
                coordList.push({ x: c.x, y: c.y - 1 })
                prevCoords.push(toSpaceNumber(l,{ x: c.x, y: c.y - 1 }))
            } else {
                perimeter++;
            }
            if (l[c.y][c.x + 1] && l[c.y][c.x + 1] === char) {
                coordList.push({ x: c.x + 1, y: c.y })
                prevCoords.push(toSpaceNumber(l,{ x: c.x + 1, y: c.y }))
            } else {
                perimeter++;
            }
            if (l[c.y][c.x - 1] && l[c.y][c.x - 1] === char) {
                coordList.push({ x: c.x - 1, y: c.y })
                prevCoords.push(toSpaceNumber(l,{ x: c.x - 1, y: c.y }))
            } else {
                perimeter++;
            }
            available.splice(available.indexOf(toSpaceNumber(l, c)), 1)
            coordList.shift()
        }
        console.log("perimeter",char,perimeter);
        console.log("area",char,area);
    }
    console.log(available)
}
function toCoordPoints(arr, n) {
    return { x: n % arr[0].length, y: Math.floor(n / arr[0].length) };
}
function toSpaceNumber(arr, n) {
    return n.y * arr[0].length + n.x;
}
