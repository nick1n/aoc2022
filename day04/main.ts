import fs from "fs";

const input = fs.readFileSync("./day04/input.txt", "utf-8");
const rows = input.split("\n");

// Part 1
const total = rows.reduce((total, row) => {
  const assignments = row.split(",");
  const pairs = assignments.map((x) => x.split("-").map((i) => parseInt(i)));

  if (pairs[0] == undefined || pairs[1] == undefined) return total;

  const x1 = pairs[0][0];
  const y1 = pairs[0][1];
  const x2 = pairs[1][0];
  const y2 = pairs[1][1];

  if (x1 == undefined || y1 == undefined) return total;
  if (x2 == undefined || y2 == undefined) return total;

  if ((x1 >= x2 && y1 <= y2) || (x2 >= x1 && y2 <= y1)) total++;

  return total;
}, 0);
console.log("total", total);

// Part 2
const total2 = rows.reduce((total, row) => {
  const assignments = row.split(",");
  const pairs = assignments.map((x) => x.split("-").map((i) => parseInt(i)));

  if (pairs[0] == undefined || pairs[1] == undefined) return total;

  const x1 = pairs[0][0];
  const y1 = pairs[0][1];
  const x2 = pairs[1][0];
  const y2 = pairs[1][1];

  if (x1 == undefined || y1 == undefined) return total;
  if (x2 == undefined || y2 == undefined) return total;

  if (
    (x2 <= x1 && x1 <= y2) ||
    (x1 <= x2 && x2 <= y1) ||
    (x2 <= y1 && y1 <= y2) ||
    (x1 <= y2 && y2 <= y1)
  )
    total++;

  return total;
}, 0);
console.log("total2", total2);
