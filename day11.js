//let str = "125 17"
function part1(str) {
  let list = str.split(" ");
  let val = 0;
  for (let ele of list) {
    val += getNumAfter(ele - 0, 25)
  }
  return val;
}
function part2(str) {
  let list = str.split(" ");
  let val = 0;
  for (let ele of list) {
    val += getNumAfter(ele - 0, 75)
  }
  return val;
}
function getNumAfter(start, iterations) {
  let s = {}
  s[start] = 1;
  let l = 0;
  for (let i = 0; i < iterations; i++) {
    let n = {}
    for (let j in s) {
      if (j == 0) {
        n[1] = n[1] ? n[1] + s[j] : s[j]
      } else if (j.toString().length % 2 === 0) {
        l = j.toString();
        n[l.substring(0, l.length / 2) - 0] = n[l.substring(0, l.length / 2) - 0] ? n[l.substring(0, l.length / 2) - 0] + s[j] : s[j]
        n[l.substring(l.length / 2, l.length) - 0] = n[l.substring(l.length / 2, l.length) - 0] ? n[l.substring(l.length / 2, l.length) - 0] + s[j] : s[j]
      } else {
        n[j * 2024] = n[j * 2024] ? n[j * 2024] + s[j] : s[j]
      }
    }
    s = n
  }
  let v = 0;
  for (let key in s) {
    v += s[key]
  }
  return v;
}
