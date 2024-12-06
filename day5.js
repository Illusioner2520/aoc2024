//let b = [{"before":"47","number":"53"},{"before":"97","number":"13"},{"before":"97","number":"61"},{"before":"97","number":"47"},{"before":"75","number":"29"},{"before":"61","number":"13"},{"before":"75","number":"53"},{"before":"29","number":"13"},{"before":"97","number":"29"},{"before":"53","number":"29"},{"before":"61","number":"53"},{"before":"97","number":"53"},{"before":"61","number":"29"},{"before":"47","number":"13"},{"before":"75","number":"47"},{"before":"97","number":"75"},{"before":"47","number":"61"},{"before":"75","number":"61"},{"before":"47","number":"29"},{"before":"75","number":"13"},{"before":"53","number":"13"}]
//let l = ["75,47,61,53,29","97,61,53,29,13","75,29,13","75,97,47,61,53","61,13,29","97,13,75,29,47"]
//b and l are formatted like above
function part1(b,l) {
    let val = 0;
    for (let i = 0; i < l.length; i++) {
        let arr = l[i].split(",");
        if (isCorrect(arr,b)) {
            val += (arr[arr.length / 2 - .5] - 0)
        }
    }
    return val;
}
function part2(b,l) {
    let val = 0;
    for (let i = 0; i < l.length; i++) {
        let arr = l[i].split(",");
        if (!isCorrect(arr,b)) {
            while (!isCorrect(arr,b)) {
                arr = sortByProperties(arr,b)
            }
            val += (arr[arr.length / 2 - .5] - 0)
        }
    }
    return val;
}
function isCorrect(arr,b) {
    let isCorrect = true;
    for (let j = 0; j < b.length; j++) {
        if (arr.indexOf(b[j].number) == -1 || arr.indexOf(b[j].before) == -1) {
            continue;
        }
        if (arr.indexOf(b[j].number) - arr.indexOf(b[j].before) < 0) {
            isCorrect = false;
        }
    }
    return isCorrect;
}
function sortByProperties(arr,b) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            for (let k = 0; k < b.length; k++) {
                if (arr[i] == b[k].before && arr[j] == b[k].number && i > j) {
                    arr[i] = b[k].number;
                    arr[j] = b[k].before;
                } else if (arr[j] == b[k].before && arr[i] == b[k].number && j > i) {
                    arr[j] = b[k].number;
                    arr[i] = b[k].before;
                }
            }
        }
    }
    return arr;
}