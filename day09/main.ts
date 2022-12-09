import { exit } from "process";
import fs from "fs";

const input = fs.readFileSync("./day09/input.txt", "utf-8");
// const input = `R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`;
const lines = input.split("\n");
const directions = lines.map((line) => {
  const [dir, amt] = line.split(" ");
  return {
    dir: (dir ?? "U") as "R" | "L" | "U" | "D",
    amt: parseInt(amt ?? "0"),
  };
});

// Part 1
type Pos = {
  x: number;
  y: number;
};
let head = { x: 0, y: 0 };
let last = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
let positions: Pos[] = [];

const dirs = {
  R: ({ x, y }: Pos) => ({
    x: x + 1,
    y,
  }),
  L: ({ x, y }: Pos) => ({
    x: x - 1,
    y,
  }),
  U: ({ x, y }: Pos) => ({
    x,
    y: y + 1,
  }),
  D: ({ x, y }: Pos) => ({
    x,
    y: y - 1,
  }),
};

function add(a?: Pos) {
  if (!a) return;
  if (positions.find((p) => compare(p, a))) {
    return;
  }
  positions.push({ ...a });
}

function compare(a: Pos, b: Pos): boolean {
  return a.x == b.x && a.y == b.y;
}

function updateTail() {
  if (Math.abs(tail.x - head.x) > 1 || Math.abs(tail.y - head.y) > 1) {
    tail = last;
  }
}

directions.forEach(({ dir, amt }) => {
  const fn = dirs[dir];
  for (let i = 0; i < amt; ++i) {
    add(tail);
    last = head;
    head = fn(head);
    updateTail();
    // console.log(tail, head);
  }
});

// console.log("positions", positions);
console.log("length", positions.length);

// Part 2
const e = () => ({ x: 0, y: 0 });
positions = [];
head = e();
let longTail: Pos[] = [];
for (let i = 0; i < 9; ++i) {
  longTail.push({ x: 0, y: 0 });
}

function updateLongTail(head: Pos | undefined, t: number) {
  const tail = longTail[t];
  if (!tail || !head) return;
  if (compare(head, tail)) return;
  const haul = Math.abs(tail.x - head.x) == 1 && Math.abs(tail.y - head.y) == 1;
  const diag = Math.abs(tail.x - head.x) > 0 && Math.abs(tail.y - head.y) > 0;
  const diff = diag && !haul ? 0 : 1;
  if (head.x - tail.x > diff) {
    ++tail.x;
  }
  if (head.x - tail.x < -diff) {
    --tail.x;
  }
  if (head.y - tail.y > diff) {
    ++tail.y;
  }
  if (head.y - tail.y < -diff) {
    --tail.y;
  }
}

directions.forEach(({ dir, amt }, index) => {
  // if (index > 1) return;
  const fn = dirs[dir];
  for (let i = 0; i < amt; ++i) {
    head = fn(head);
    updateLongTail(head, 0);
    for (let j = 0; j < longTail.length - 1; ++j) {
      updateLongTail(longTail[j], j + 1);
    }
    add(longTail[8]);
  }
});

// console.log("positions", positions);
console.log("longTail", longTail);
console.log("length", positions.length);
