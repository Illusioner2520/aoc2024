//let l = ["Button A: X+94, Y+34", "Button B: X+22, Y+67", "Prize: X=8400, Y=5400", "", "Button A: X+26, Y+66", "Button B: X+67, Y+21", "Prize: X=12748, Y=12176", "", "Button A: X+17, Y+86", "Button B: X+84, Y+37", "Prize: X=7870, Y=6450", "", "Button A: X+69, Y+23", "Button B: X+27, Y+71", "Prize: X=18641, Y=10279"]
function part1(l) {
    let val = 0;
    for (let i = 0; i < l.length / 4; i++) {
        let s = 4 * i;
        let t = l[s].split(": ")[1].split(", ")
        let t1 = l[s + 1].split(": ")[1].split(", ")
        let t2 = l[s + 2].split(": ")[1].split(", ")
        let a = { x: t[0].split("+")[1] - 0, y: t[1].split("+")[1] - 0 }
        let b = { x: t1[0].split("+")[1] - 0, y: t1[1].split("+")[1] - 0 }
        let goal = { x: t2[0].split("=")[1] - 0, y: t2[1].split("=")[1] - 0 }
        for (let j = 0; j < 101; j++) {
            let n = j * a.x;
            if ((goal.x - n) % b.x != 0) {
                continue;
            }
            let nb = (goal.x - n) / b.x;
            if ((j * a.y) + (nb * b.y) != goal.y) {
                continue;
            }
            val += (3 * j) + nb;
            console.log(j,nb)
            break;
        }
    }
    return val;
}
