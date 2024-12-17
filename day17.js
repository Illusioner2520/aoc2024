let a = 729;
let b = 0;
let c = 0;
let program = "0,1,5,4,3,0";
let instructionPointer = 0;
let output = [];

let programList = program.split(",");

while (instructionPointer < programList.length - 1) {
  let currentInstruction = programList[instructionPointer] - 0;
  let opcode = programList[instructionPointer + 1] - 0;
  console.log(a)
  if (currentInstruction == 0) {
    a = adv(a,b,c,opcode);
  } else if (currentInstruction == 1) {
    b = bxl(b, opcode);
  } else if (currentInstruction == 2) {
    b = bst(a,b,c,opcode);
  } else if (currentInstruction == 3) {
    if (jnz(a,opcode)) {
      instructionPointer = jnz(a,opcode)
    }
  } else if (currentInstruction == 4) {
    b = bxc(b,c)
  } else if (currentInstruction == 5) {
    output.push(combo(a,b,c,opcode) % 8)
  } else if (currentInstruction == 6) {
    b = adv(a,b,c,opcode);
  } else if (currentInstruction == 7) {
    c = adv(a,b,c,opcode);
  }
  instructionPointer += 2;
}
console.log(output)

function adv(a,b,c,x) {
  return Math.floor(a / (2 ** combo(a,b,c,x)));
}
function bxl(b,x) {
  return b ^ x;
}
function bst(a,b,c,x) {
  return combo(a,b,c,x) % 8;
}
function jnz(a,x) {
  if (a == 0) return null;
  return x;
}
function bxc(b,c) {
  return b ^ c;
}
function combo(a,b,c,x) {
  if (x < 4) return x;
  if (x == 4) return a;
  if (x == 5) return b;
  if (x == 6) return c;
  return null;
}
