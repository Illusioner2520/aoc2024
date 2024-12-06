//let l = ["MMMSXXMASM","MSAMXMSMSA","AMXSXMAAMM","MSAMASMSMX","XMASAMXAMM","XXAMMXXAMA","SMSMSASXSS","SAXAMASAAA","MAMMMXMMMM","MXMXAXMASX"]
//l is list of grid separated by newlines
function part1(l) {
    let vertical = []
    let diagonal1 = []
    let diagonal2 = []
    for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l[0].length; j++) {
            let v = i + j;
            diagonal1[v] = diagonal1[v] ? diagonal1[v] + l[i][j] : l[i][j];
            let v1 = j - i + l.length - 1;
            diagonal2[v1] = diagonal2[v1] ? diagonal2[v1] + l[i][j] : l[i][j];
            vertical[j] = vertical[j] ? vertical[j] + l[i][j] : l[i][j];
        }
    }
    let str = l.concat(vertical).concat(diagonal1).concat(diagonal2).join(",");
    return str.match(/SAMX/g).length + str.match(/XMAS/g).length
}
function part2(l) {
    let val = 0;
    for (let i = 0; i < l.length - 2; i++) {
        for (let j = 0; j < l[0].length - 2; j++) {
            let outer = l[i][j] + l[i][j+2] + l[i+2][j+2] + l[i+2][j];
            if (l[i+1][j+1] == "A" && ["MMSS","SMMS","SSMM","MSSM"].includes(outer)) {
                val++;
            }
        }
    }
    return val;
}