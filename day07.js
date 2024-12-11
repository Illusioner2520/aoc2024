//let l = ["190: 10 19","3267: 81 40 27","83: 17 5","156: 15 6","7290: 6 8 6 15","161011: 16 10 13","192: 17 8 14","21037: 9 7 18 13","292: 11 6 16 20"]
function part1(l) {
    let val = 0;
    for (let i = 0; i < l.length; i++) {
        let equation = l[i].split(": ");
        let result = equation[0] - 0;
        let inputs = equation[1].split(" ")
        if (checkIfPossible(result, inputs)) val += result;
    }
    return val;
}
function checkIfPossible(result, inputs) {
    for (let i = 0; i < (2 ** (inputs.length - 1)); i++) {
        let str = "";
        for (let j = 0; j < inputs.length; j++) {
            str = "(" + str
            str += inputs[j] + ")";
            let mask = 1 << j;
            if (j != inputs.length - 1) str += ((i & mask) !== 0) ? "+" : "*";
        }
        let num = eval(str) - 0;
        if (num == result) {
            return true;
        }
    }
    return false;
}
function part2(l) {
    let val = 0;
    for (let i = 0; i < l.length; i++) {
        let equation = l[i].split(": ");
        let result = equation[0] - 0;
        let inputs = equation[1].split(" ")
        if (checkIfPossibleButNowWithConcatenation(result, inputs)) val += result;
    }
    return val;
}
function checkIfPossibleButNowWithConcatenation(result, inputs) {
    for (let i = 0; i < (3 ** (inputs.length - 1)); i++) {
        let val = inputs[0];
        let b3 = i.toString(3).split("");
        while (b3.length < inputs.length - 1) {
            b3 = ['0'].concat(b3)
        }
        for (let j = 1; j < inputs.length; j++) {
            if (b3[j - 1] == "0") {
                val = (val - 0) + (inputs[j] - 0);
            } else if (b3[j - 1] == "1") {
                val = (val - 0) * (inputs[j] - 0);
            } else if (b3[j - 1] == "2") {
                val = val.toString() + inputs[j];
            }
        }
        if (result == (val - 0)) {
            return true;
        }
    }
    return false;
}
