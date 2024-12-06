//let l1 = [3,4,2,1,3,3]
//let l2 = [4,3,5,3,9,3]
//l1 is the list on the left; l2 is the one on the right
function part1(l1,l2) {
    l1 = l1.sort();
    l2 = l2.sort();
    let d = 0;
    for (let i = 0; i < l1.length; i++) {
        d += Math.abs(l1[i] - l2[i]);
    }
    return d;
}
function part2(l1,l2) {
    let n = 0;
    for (let i = 0; i < l1.length; i++) {
        n += l1[i] * l2.filter(v => v == l1[i]).length;
    }
    return n;
}