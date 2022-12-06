import fs from "fs";

const input = fs.readFileSync("./day06/input.txt", "utf-8");
const chars = input.split("");

const checkUnique = (arr: string[]) =>
  arr.every((val, i) => arr.indexOf(val) == i);

// Part 1
// const test = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
// const chars = test.split("");
let check = chars.slice(0, 4);

for (let i = 3; i < chars.length; ++i) {
  check.shift();
  check.push(chars[i] ?? "");
  if (checkUnique(check)) {
    console.log("first index", i + 1);
    break;
  }
}

// Part 2
const length = 14;
check = chars.slice(0, length);

for (let i = length - 1; i < chars.length; ++i) {
  check.shift();
  check.push(chars[i] ?? "");
  if (checkUnique(check)) {
    console.log("second index", i + 1);
    break;
  }
}
