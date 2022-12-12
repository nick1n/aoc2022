import fs from "fs";

const input = fs.readFileSync("./day12/input.txt", "utf-8");
// test input:
// const input = `Sabqponm
// abcryxxl
// accszExk
// acctuvwj
// abdefghi`;
const lines = input.split("\n");

// Part 1
type Pos = { x: number; y: number };
type Node = {
  h: number;
  score: number;
  pos: Pos;
  dir: string;
  parent?: Node;
};

const START = 0;
const END = 25;
let start: Pos = { x: 0, y: 0 };
let end: Pos = { x: 0, y: 0 };
let chars = [...lines];
const heights: Node[][] = lines.map((line, x) =>
  line.split("").map((c, y) => {
    const pos = { x, y };
    const parent = undefined;
    const dir = "";
    if (c == "S") {
      start = { x, y };
      return { h: START, score: 0, pos, dir: "S", parent };
    }
    const score = 999999;
    if (c == "E") {
      end = { x, y };
      return { h: END, score, pos, dir: "E", parent };
    }
    return { h: parseInt(c, 36) - 10, score, pos, dir, parent };
  })
);

// console.log(heights);
console.log(start, end);

const getNode = (p: Pos) => (heights[p.x] ?? [])[p.y];

function map(cur: Pos) {
  const node = getNode(cur);
  if (!node) {
    console.log("error");
    return;
  }

  const curHeight = node.h;
  if (cur.x == end.x && cur.y == end.y) {
    return;
  }

  goNorth(node, cur, curHeight);
  goSouth(node, cur, curHeight);
  goWest(node, cur, curHeight);
  goEast(node, cur, curHeight);
}

function goSouth(cur: Node, pos: Pos, curHeight: number) {
  const sP = { x: pos.x + 1, y: pos.y };
  const node = getNode(sP);
  if (cur && node && node.h <= curHeight + 1 && cur.score + 1 < node.score) {
    node.parent = cur;
    node.score = cur.score + 1;
    cur.dir = "v";
    map(sP);
  }
}

function goNorth(cur: Node, pos: Pos, curHeight: number) {
  const nP = { x: pos.x - 1, y: pos.y };
  const node = getNode(nP);
  if (cur && node && node.h <= curHeight + 1 && cur.score + 1 < node.score) {
    node.parent = cur;
    node.score = cur.score + 1;
    cur.dir = "^";
    map(nP);
  }
}

function goEast(cur: Node, pos: Pos, curHeight: number) {
  const eP = { x: pos.x, y: pos.y + 1 };
  const node = getNode(eP);
  if (cur && node && node.h <= curHeight + 1 && cur.score + 1 < node.score) {
    node.parent = cur;
    node.score = cur.score + 1;
    cur.dir = ">";
    map(eP);
  }
}

function goWest(cur: Node, pos: Pos, curHeight: number) {
  const wP = { x: pos.x, y: pos.y - 1 };
  const node = getNode(wP);
  if (cur && node && node.h <= curHeight + 1 && cur.score + 1 < node.score) {
    node.parent = cur;
    node.score = cur.score + 1;
    cur.dir = "<";
    map(wP);
  }
}

let count = 0;
function showMap(node?: Node) {
  let show = [...chars];

  while (node) {
    ++count;
    const p = node.pos;
    show[p.x] = show[p.x]?.slice(0, p.y) + "." + show[p.x]?.slice(p.y + 1);
    node = node.parent;
  }
  show.forEach((x) => console.log(x));
}

map(start);
showMap(getNode(end));
console.log("end score", getNode(end)?.score);

// Part 2
count = 0;
function showMap2(node?: Node) {
  let show = [...chars];

  while (node) {
    const p = node.pos;
    if (show[p.x]?.slice(p.y, p.y + 1) == "a") break;
    ++count;
    show[p.x] = show[p.x]?.slice(0, p.y) + "." + show[p.x]?.slice(p.y + 1);
    node = node.parent;
  }
  show.forEach((x) => console.log(x));
}
showMap2(getNode(end));
console.log("count", count);
