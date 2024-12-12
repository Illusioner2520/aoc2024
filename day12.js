//let l = ["RRRRIICCFF","RRRRIICCCF","VVRRRCCFFF","VVRCCCJFFF","VVVVCJJCFE","VVIVCCJJEE","VVIIICJJEE","MIIIIIJJEE","MIIISIJEEE","MMMISSJEEE"]
function part1(l) {
  let available = Array.from({ length: (l.length) * (l[0].length) }, (v, k) => k)
  let val = 0;
  while (available.length > 0) {
    let spacenum = available[0];
    let coords = toCoordPoints(l, spacenum);
    let char = l[coords.y][coords.x];
    let coordList = [coords]
    let prevCoords = [coords]
    let area = 0;
    let perimeter = 0;
    while (coordList.length > 0) {
      let c = coordList[0]
      if (prevCoords.includes(toSpaceNumber(l, c))) {
        coordList.shift();
        continue
      };
      prevCoords.push(toSpaceNumber(l, c));
      area++;
      if (l[c.y + 1] && l[c.y + 1][c.x] == char) {
        coordList.push({ x: c.x, y: c.y + 1 })
      } else {
        perimeter++;
      }
      if (l[c.y - 1] && l[c.y - 1][c.x] == char) {
        coordList.push({ x: c.x, y: c.y - 1 })
      } else {
        perimeter++;
      }
      if (l[c.y][c.x + 1] && l[c.y][c.x + 1] == char) {
        coordList.push({ x: c.x + 1, y: c.y })
      } else {
        perimeter++;
      }
      if (l[c.y][c.x - 1] && l[c.y][c.x - 1] == char) {
        coordList.push({ x: c.x - 1, y: c.y })
      } else {
        perimeter++;
      }
      available.splice(available.indexOf(toSpaceNumber(l, c)), 1)
      coordList.shift()
    }
    console.log(char, area, perimeter)
    val += (area * perimeter)
  }
  return val;
}
function part2(l) {
  let available = Array.from({ length: (l.length) * (l[0].length) }, (v, k) => k)
  let val = 0;
  while (available.length > 0) {
    let spacenum = available[0];
    let coords = toCoordPoints(l, spacenum);
    let char = l[coords.y][coords.x];
    let coordList = [coords]
    let prevCoords = [coords]
    let area = 0;
    let perimeterList = [];
    let perimeter = 0;
    while (coordList.length > 0) {
      let c = coordList[0]
      if (prevCoords.includes(toSpaceNumber(l, c))) {
        coordList.shift();
        continue
      };
      prevCoords.push(toSpaceNumber(l, c));
      area++;
      if (l[c.y + 1] && l[c.y + 1][c.x] == char) {
        coordList.push({ x: c.x, y: c.y + 1 })
      } else {
        perimeterList.push(uniqueForPerimeter(l, { x: c.x, y: c.y, dir: 1 }));
        if (!perimeterList.includes(uniqueForPerimeter(l, { x: c.x - 1, y: c.y, dir: 1 })) && !perimeterList.includes(uniqueForPerimeter(l, { x: c.x + 1, y: c.y, dir: 1 }))) {
          perimeter++;
        }
      }
      if (l[c.y - 1] && l[c.y - 1][c.x] == char) {
        coordList.push({ x: c.x, y: c.y - 1 })
      } else {
        perimeterList.push(uniqueForPerimeter(l, { x: c.x, y: c.y, dir: 2 }));
        if (!perimeterList.includes(uniqueForPerimeter(l, { x: c.x - 1, y: c.y, dir: 2 })) && !perimeterList.includes(uniqueForPerimeter(l, { x: c.x + 1, y: c.y, dir: 2 }))) {
          perimeter++;
        }
      }
      if (l[c.y][c.x + 1] && l[c.y][c.x + 1] == char) {
        coordList.push({ x: c.x + 1, y: c.y })
      } else {
        perimeterList.push(uniqueForPerimeter(l, { x: c.x, y: c.y, dir: 3 }));
        if (!perimeterList.includes(uniqueForPerimeter(l, { x: c.x, y: c.y - 1, dir: 3 })) && !perimeterList.includes(uniqueForPerimeter(l, { x: c.x, y: c.y + 1, dir: 3 }))) {
          perimeter++;
        }
      }
      if (l[c.y][c.x - 1] && l[c.y][c.x - 1] == char) {
        coordList.push({ x: c.x - 1, y: c.y })
      } else {
        perimeterList.push(uniqueForPerimeter(l, { x: c.x, y: c.y, dir: 4 }));
        if (!perimeterList.includes(uniqueForPerimeter(l, { x: c.x, y: c.y - 1, dir: 4 })) && !perimeterList.includes(uniqueForPerimeter(l, { x: c.x, y: c.y + 1, dir: 4 }))) {
          perimeter++;
        }
      }
      available.splice(available.indexOf(toSpaceNumber(l, c)), 1)
      coordList.shift()
    }
    val += (area * Math.floor(perimeter / 2) * 2)
  }
  return val;
}
function toCoordPoints(arr, n) {
  return { x: n % arr[0].length, y: Math.floor(n / arr[0].length) };
}
function toSpaceNumber(arr, n) {
  return n.y * arr[0].length + n.x;
}
function uniqueForPerimeter(arr, n) {
  return toSpaceNumber(arr, n) + (100000000 * n.dir);
}
