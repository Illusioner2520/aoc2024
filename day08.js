//let v = ["............","........0...",".....0......",".......0....","....0.......","......A.....","............","............","........A...",".........A..","............","............"]
function part1(l) {
    let newList = structuredClone(l)
    let s = l.join("")
    let s2 = l.join("").split("");
    let uniqueChars = [...new Set(s2)];
    for (let i = 0; i < uniqueChars.length; i++) {
        if (uniqueChars[i] == ".") continue;
        let indexes = []
        for (const match of s.matchAll(uniqueChars[i])) {
            indexes.push(match.index);
        }
        let times = indexes.length;
        for (let j = 0; j < times; j++) {
            let jcoords = toCoordPoints(l,indexes[j]);
            for (let k = 0; k < times; k++) {
                let kcoords = toCoordPoints(l,indexes[k]);
                if (indexes[j] == indexes[k]) continue;
                let newcoords1 = {x:2 * jcoords.x - kcoords.x, y: 2 * jcoords.y - kcoords.y};
                let newcoords2 = {x:2 * kcoords.x - jcoords.x, y: 2 * kcoords.y - jcoords.y};
                newList = addToArray(newList,newcoords1,"!");
                newList = addToArray(newList,newcoords2,"!");
            }
        }
    }
    return newList.join("").match(/\!/g).length;
}
function toCoordPoints(arr,n) {
    return {x:n % arr[0].length,y:Math.floor(n / arr[0].length)};
}
function addToArray(l,n,c) {
    if (n.y > l[0].length - 1 || n.y < 0 || n.x > l.length - 1 || n.x < 0) return l;
    let v = l[n.y].split("");
    v[n.x] = c;
    l[n.y] = v.join("")
    return l;
}
function part2(l) {
    let newList = structuredClone(l)
    let s = l.join("")
    let s2 = l.join("").split("");
    let uniqueChars = [...new Set(s2)];
    for (let i = 0; i < uniqueChars.length; i++) {
        if (uniqueChars[i] == ".") continue;
        let indexes = []
        for (const match of s.matchAll(uniqueChars[i])) {
            indexes.push(match.index);
        }
        let times = indexes.length;
        for (let j = 0; j < times; j++) {
            let jcoords = toCoordPoints(l,indexes[j]);
            for (let k = 0; k < times; k++) {
                let kcoords = toCoordPoints(l,indexes[k]);
                if (indexes[j] == indexes[k]) continue;
                for (let m = 0; m < l[0].length; m++) {
                    let newcoords1 = {x:m * jcoords.x - (m-1)*kcoords.x, y: m * jcoords.y - (m-1)*kcoords.y};
                    let newcoords2 = {x:m * kcoords.x - (m-1)*jcoords.x, y: m * kcoords.y - (m-1)*jcoords.y};
                    newList = addToArray(newList,newcoords1,"!");
                    newList = addToArray(newList,newcoords2,"!");
                }
            }
        }
    }
    return newList.join("").match(/\!/g).length;
}
