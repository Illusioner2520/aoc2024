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
    let numlist = str.split("");
    let files = [];
    let max = 0;
    for (let i = 0; i < numlist.length; i++) {
        for (let j = 0; j < (numlist[i] - 0); j++) {
            if (i % 2 == 0) {
                files.push(i / 2);
                max = Math.max(max,i/2)
            } else {
                files.push(".");
            }
        }
    }
    for (let i = max; i >= 0; i--) {
      let numoftimes = (files.join(",") + ",").match(new RegExp(i+",","g")).length;
      let originalindex = files.indexOf(i);
      let numofperiods = 0;
      let index = -1;
      for (let j = 0; j < files.length; j++) {
        if (files[j] == ".") {
          numofperiods++
        } else {
          numofperiods = 0;
        }
        if (numofperiods == numoftimes) {
          index = j - numofperiods + 1;
          break;
        }
      }
      if (index == -1) continue;
      if (index > originalindex) continue;
      for (let j = 0; j < numoftimes; j++) {
        files[index + j] = i;
        files[originalindex + j] = ".";
      }
    }
    let val = 0;
    for (let i = 0; i < files.length; i++) {
        if (files[i] == ".") continue;
        val += (i * (files[i] - 0));
    }
    return val;
}
