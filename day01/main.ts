import fs from "fs";

const input = fs.readFileSync("./day01/input.txt", "utf-8");
const elves = input.split("\n\n");
const numOfElves = elves.length;
console.log("number of elves", numOfElves);

// part 1
const cals = elves
  .map((x) =>
    x
      .split("\n")
      .map((i) => (i.length > 0 ? parseInt(i) : 0))
      .reduce((p, c) => c + p, 0)
  )
  .sort((a, b) => b - a);

console.log("max", cals[0]);

// part 2
const top = cals.slice(0, 3);
console.log("top 3", top);
console.log(
  "max",
  top.reduce((p, c) => c + p, 0)
);
