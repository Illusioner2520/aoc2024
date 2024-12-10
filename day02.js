//let l = ["7 6 4 2 1","1 2 7 8 9","9 7 6 2 1","1 3 2 4 5","8 6 4 4 1","1 3 6 7 9"]
//l is a list of the grid separated by newlines
function part1(l) {
    let safe = 0;
    for (let i = 0; i < l.length; i++) {
        let l1 = l[i].split(" ");
        if (detectIfSafe(l1)) {
            safe++;
        }
    }
    return safe;
}
function part2(l) {
    let s = 0;
    for (let i = 0; i < l.length; i++) {
        let l1 = l[i].split(" ");
        let isSafe = false;
        for (let j = 0; j < l1.length; j++) {
            let newList = structuredClone(l1).toSpliced(j, 1);
            if (detectIfSafe(newList)) {
                isSafe = true;
                break;
            }
        }
        if (isSafe) s++;
    }
    return s;
}
function detectIfSafe(l) {
    let dir = Math.sign(l[1] - l[0])
    let safe = true;
    if (dir == 0) safe = false;
    for (let j = 1; j < l.length; j++) {
        let d = l[j] - l[j - 1];
        if (Math.abs(d) > 3 || dir != Math.sign(d)) {
            safe = false;
        }
    }
    return safe;
}
