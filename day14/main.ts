import fs from "fs";

const input = fs.readFileSync("./day14/input.txt", "utf-8");
// test input:
// const input = `498,4 -> 498,6 -> 496,6
// 503,4 -> 502,4 -> 502,9 -> 494,9`;
const lines = input.split("\n");

let minX = 999;
let maxX = 0;
let minY = 0;
let maxY = 0;
const border = 134;

const points: Pos[][] = lines.map((line) =>
  line.split(" -> ").map((point) => {
    const [x, y] = point.split(",");
    const p = { x: parseInt(x ?? "0"), y: parseInt(y ?? "0") };
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    // if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
    return p;
  })
);

type Pos = { x: number; y: number };

minX -= border;
// minY -= border;
maxX += border;
maxY += 2;

console.log(minX, maxX);
console.log(minY, maxY);

let grid: string[][] = [];

for (let y = 0; y <= maxY; ++y) {
  const row = new Array(maxX - minX + 1).fill(".");
  grid.push(row);
}

const getPoint = (x: number, y: number) => (grid[y] ?? [])[x - minX];
const setPoint = (x: number, y: number, c: string) =>
  ((grid[y] ?? [])[x - minX] = c);

function drawLines() {
  points.forEach((line) =>
    line.reduce((prev, cur) => {
      const start: Pos = {
        x: prev.x < cur.x ? prev.x : cur.x,
        y: prev.y < cur.y ? prev.y : cur.y,
      };
      const end: Pos = {
        x: prev.x > cur.x ? prev.x : cur.x,
        y: prev.y > cur.y ? prev.y : cur.y,
      };
      for (let x = start.x; x <= end.x; ++x) {
        for (let y = start.y; y <= end.y; ++y) {
          setPoint(x, y, "#");
        }
      }
      return cur;
    })
  );
}

function simulate() {
  let running = true;
  let sand = 0;
  while (running) {
    let c = { x: 500, y: 0 };
    if (getPoint(c.x, c.y) != ".") {
      running = false;
    }
    while (running) {
      if (getPoint(c.x, c.y + 1) != ".") {
        if (getPoint(c.x - 1, c.y + 1) != ".") {
          if (getPoint(c.x + 1, c.y + 1) != ".") {
            setPoint(c.x, c.y, "o");
            break;
          } else {
            ++c.x;
            ++c.y;
          }
        } else {
          --c.x;
          ++c.y;
        }
      } else {
        ++c.y;
      }
      if (c.y >= maxY) {
        running = false;
        break;
      }
    }
    ++sand;
  }
  return sand - 1;
}

// Part 1
drawLines();
let sand = simulate();
// grid.map((row) => console.log(row.join("")));
console.log("sand", sand);

// Part 2
grid = [];
for (let y = 0; y < maxY; ++y) {
  const row = new Array(maxX - minX + 1).fill(".");
  grid.push(row);
}
grid.push(new Array(maxX - minX + 1).fill("#"));
drawLines();
sand = simulate();
// grid.map((row) => console.log(row.join("")));
console.log("sand", sand);
