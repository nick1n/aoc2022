import fs from "fs";

const input = fs.readFileSync("./day03/input.txt", "utf-8");
const rucksacks = input.split("\n");
const priority = "0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const sum = rucksacks.reduce((sum, r) => {
  const half = r.length / -2;
  const first = r.slice(0, half).split("");
  const second = r.slice(half);

  // console.log(r, first, second);
  const found = first.find((item) => second.includes(item));

  if (found != undefined) {
    sum += priority.indexOf(found);
  }

  return sum;
}, 0);
console.log("sum", sum);

let secondSum = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
  const found = rucksacks[i]
    ?.split("")
    .find(
      (item) =>
        rucksacks[i + 1]?.includes(item) && rucksacks[i + 2]?.includes(item)
    );

  if (found != undefined) {
    secondSum += priority.indexOf(found);
  }
}
console.log("second", secondSum);
