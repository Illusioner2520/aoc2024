//let str = "2333133121414131402";
//theoretically works, but haven't tested
function part1(str) {
    let numlist = str.split("");
    let files = "";
    for (let i = 0; i < numlist.length; i++) {
        for (let j = 0; j < (numlist[i] - 0); j++) {
            if (i % 2 == 0) {
                files += (i / 2);
            } else {
                files += ".";
            }
        }
    }
    let filesList = files.split("");
    while (files.search(/\./g) != -1) {
        let i = filesList.indexOf(".");
        console.log(i,filesList.length)
        if (filesList[filesList.length - 1] != ".") {
            filesList[i] = filesList[filesList.length - 1];
        }
        filesList.pop();
        files = filesList.join("");
    }
    let val = 0;
    for (let i = 0; i < filesList.length; i++) {
        val += (i * (filesList[i] - 0));
    }
    return val;
}
function part2(str) {

}
