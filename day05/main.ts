import fs from "fs";
import { exit } from "process";

const input = fs.readFileSync("./day05/input.txt", "utf-8");
const sections = input.split("\n\n");

const stacks = sections[0];
if (!stacks) exit();

const movementList = sections[1];
if (!movementList) exit();

const movements = movementList.split("\n").map((cmd) => {
  const cmds = cmd.split(" ");
  const move = parseInt(cmds[1] ?? "0");
  const from = parseInt(cmds[3] ?? "0") - 1;
  const to = parseInt(cmds[5] ?? "0") - 1;
  return { move, from, to };
});
console.log("movements", movements.length);

const rows = stacks.split("\n");
const parsedRows = rows.map((row) => row.split(/ {1,4}/)).reverse();
parsedRows.shift(); // remove number row

// console.log(parsedRows);
// console.log(parsedRows[0]?.length);

let columns: string[][] = new Array(parsedRows[0]?.length)
  .fill(0)
  .map(() => []);
parsedRows.forEach((row) =>
  row.forEach((col, i) => col.length > 0 && columns[i]?.push(col))
);

// crane
movements.forEach(({ move, from, to }) => {
  for (let i = 0; i < move; ++i) {
    const item = columns[from]?.pop() ?? "error";
    columns[to]?.push(item);
  }
});

console.log("columns", columns);
console.log(
  columns
    .map((col) => col.pop())
    .join("")
    .replace(/(\[|\])/g, "")
);

// Part 2
columns = new Array(parsedRows[0]?.length).fill(0).map(() => []);
parsedRows.forEach((row) =>
  row.forEach((col, i) => col.length > 0 && columns[i]?.push(col))
);

// CrateMover 9001
movements.forEach(({ move, from, to }) => {
  const item = columns[from]?.splice(-move) ?? ["error"];
  for (let i = 0; i < move; ++i) {
    columns[to]?.push(item[i] ?? "error");
  }
});

console.log("columns", columns);
console.log(
  columns
    .map((col) => col.pop())
    .join("")
    .replace(/(\[|\])/g, "")
);
