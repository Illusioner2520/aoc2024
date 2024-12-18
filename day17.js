//let a = 2024n;
//let b = 0n;
//let c = 0n;
//let program = "0,3,5,4,3,0"
let l = program.split(",");
console.log(part1(a,b,c,l))
console.log(part2(b,c,l))
function part1(a,b,c,l) {
    let index = 0;
    let output = [];
    while (index < l.length) {
        let incrementIndex = true;
        let v = l[index] - 0;
        let x = l[index + 1] - 0;
        if (v == 0) {
            a = a >> combo(a,b,c,x)
        } else if (v == 1) {
            b = b ^ BigInt(x);
        } else if (v == 2) {
            b = combo(a,b,c,x) % 8n;
        } else if (v == 3) {
            if (a != 0) {
                index = x;
                incrementIndex = false;
            }
        } else if (v == 4) {
            b = b ^ c;
        } else if (v == 5) {
            output.push(combo(a,b,c,x) % 8n)
        } else if (v == 6) {
            b = a >> combo(a,b,c,x)
        } else if (v == 7) {
            c = a >> combo(a,b,c,x)
        }
        if (incrementIndex) index += 2;
    }
    return output.join(",")
}
function part2(b,c,l) {
    // I brute forced it up to 1 billion then gave up on brute forcing
    // I looked at other people's solutions to figure it out
    // Don't quite understand it
    // shoutout to u/genabasov and u/BIGJRA on r/adventofcode, whose solutions helped me come up with this one.
    return search(0n,0,b,c,structuredClone(l),l.reverse())
}
function search(input,index,b,c,l1,l) {
    if (index == l.length) return input;
    for (let i = 7n; i >= 0n; i--) {
        let a = input * 8n + i;
        let v = part1(a,b,c,l1).split(",")
        if (v[0] == l[index]) {
            let min = search(a,index + 1,b,c,l1,l);
            if (min) return min;
        }
    }
}
function combo(a,b,c,x) {
    if (x < 4) return BigInt(x);
    if (x == 4) return a;
    if (x == 5) return b;
    if (x == 6) return c;
    return null;
}
