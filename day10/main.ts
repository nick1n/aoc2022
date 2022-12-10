import fs from "fs";

const input = fs.readFileSync("./day10/input.txt", "utf-8");
// const input = `addx 15
// addx -11
// addx 6
// addx -3
// addx 5
// addx -1
// addx -8
// addx 13
// addx 4
// noop
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx 5
// addx -1
// addx -35
// addx 1
// addx 24
// addx -19
// addx 1
// addx 16
// addx -11
// noop
// noop
// addx 21
// addx -15
// noop
// noop
// addx -3
// addx 9
// addx 1
// addx -3
// addx 8
// addx 1
// addx 5
// noop
// noop
// noop
// noop
// noop
// addx -36
// noop
// addx 1
// addx 7
// noop
// noop
// noop
// addx 2
// addx 6
// noop
// noop
// noop
// noop
// noop
// addx 1
// noop
// noop
// addx 7
// addx 1
// noop
// addx -13
// addx 13
// addx 7
// noop
// addx 1
// addx -33
// noop
// noop
// noop
// addx 2
// noop
// noop
// noop
// addx 8
// noop
// addx -1
// addx 2
// addx 1
// noop
// addx 17
// addx -9
// addx 1
// addx 1
// addx -3
// addx 11
// noop
// noop
// addx 1
// noop
// addx 1
// noop
// noop
// addx -13
// addx -19
// addx 1
// addx 3
// addx 26
// addx -30
// addx 12
// addx -1
// addx 3
// addx 1
// noop
// noop
// noop
// addx -9
// addx 18
// addx 1
// addx 2
// noop
// noop
// addx 9
// noop
// noop
// noop
// addx -1
// addx 2
// addx -37
// addx 1
// addx 3
// noop
// addx 15
// addx -21
// addx 22
// addx -6
// addx 1
// noop
// addx 2
// addx 1
// noop
// addx -10
// noop
// noop
// addx 20
// addx 1
// addx 2
// addx 2
// addx -6
// addx -11
// noop
// noop
// noop`;
const lines = input.split("\n");
const instructions = lines.flatMap((line) => line.split(" "));

// Part 1
let x = 1;
let reg: "noop" | "addx" | undefined = undefined;
let cycle = 0;
let sum = 0;

instructions.forEach((instruction) => {
  ++cycle;
  if ((cycle - 20) % 40 == 0) {
    sum += cycle * x;
  }
  if (instruction == "noop") return;
  if (reg == "addx") {
    const add = +instruction;
    x += add;
    reg = undefined;
  } else {
    reg = "addx";
  }
});

// console.log(instructions);
console.log("sum", sum);

// Part 2
const crt: string[] = new Array(240).fill(".");
x = 1;
reg = undefined;
cycle = 0;

instructions.forEach((instruction) => {
  ++cycle;
  const pixel = (cycle - 1) % 40;
  if (x - 1 <= pixel && pixel <= x + 1) {
    crt[cycle - 1] = "#";
  }
  if (instruction == "noop") {
  } else if (reg == "addx") {
    const add = +instruction;
    x += add;
    reg = undefined;
  } else {
    reg = "addx";
  }
  // console.log("cycle", cycle);
  // console.log("x", x);
});

console.log("x", x);
console.log("cycle", cycle);
console.log(crt.join("").match(/.{40,40}/g));
