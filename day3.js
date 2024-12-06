//let s = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
//s is the corrupted string from the problem
function part1(s) {
    let list = s.match(/mul\(\d+,\d+\)/g);
    let val = 0;
    for (let i = 0; i < list.length; i++) {
        let nums = list[i].match(/\d+/g);
        val += nums[0] * nums[1]
    }
    return val;
}
function part2(s) {
    let val = 0;
    let indexes = []
    let indexesForDosAndDonts = []
    for (const match of s.matchAll(/mul\(\d+,\d+\)/g)) {
        indexes.push({"index":match.index,"value":match[0]});
    }
    for (const match of s.matchAll(/(do|don\'t)\(\)/g)) {
        indexesForDosAndDonts.push({"index":match.index,"value":match[0]});
    }
    for (let i = 0; i < indexes.length; i++) {
        let doOrDontValue = "";
        for (let j = -1; j < indexesForDosAndDonts.length; j++) {
            doOrDontValue = j < 0 ? "do()" : indexesForDosAndDonts[j].value;
            if (indexesForDosAndDonts[j + 1] && indexesForDosAndDonts[j + 1].index > indexes[i].index) {
                break;
            }
        }
        if (doOrDontValue == "do()") {
            let nums = indexes[i].value.match(/\d+/g);
            console.log("multiplying",nums[0],nums[1],nums[0] * nums[1])
            val += nums[0] * nums[1]
        }
    }
    return val;
}