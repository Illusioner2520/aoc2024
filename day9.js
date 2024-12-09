//let str = "2333133121414131402";
function part1(str) {
    let numlist = str.split("");
    let files = [];
    for (let i = 0; i < numlist.length; i++) {
        for (let j = 0; j < (numlist[i] - 0); j++) {
            if (i % 2 == 0) {
                files.push(i / 2);
            } else {
                files.push(".");
            }
        }
    }
    while (files.includes(".")) {
        let i = files.indexOf(".");
        if (files[files.length - 1] != ".") {
            files[i] = files[files.length - 1];
        }
        files.pop();
    }
    let val = 0;
    for (let i = 0; i < files.length; i++) {
        val += (i * (files[i] - 0));
    }
    return val;
}
function part2(str) {

}
