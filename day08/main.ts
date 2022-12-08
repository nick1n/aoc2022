import fs from "fs";

const input = fs.readFileSync("./day08/input.txt", "utf-8");
// const input = `30373
// 25512
// 65332
// 33549
// 35390`;
const lines = input.split("\n");
const numbers = lines.map((line) => line.split("").map((x) => +x));

// Part 1
let visible: boolean[][] = [];
let rotate: number[][] = numbers.map(() => []);

for (let x = 0; x < numbers.length; ++x) {
  const row = numbers[x] ?? [];
  const trees = row.map(() => false);
  let max = -1;
  for (let y = 0; y < row.length; ++y) {
    const tree = row[y] ?? 0;
    if (tree > max) {
      trees[y] = true;
      max = tree;
    }
    rotate[y]?.push(tree);
  }
  max = -1;
  for (let y = row.length - 1; y >= 0; --y) {
    const tree = row[y] ?? 0;
    if (tree > max) {
      trees[y] = true;
      max = tree;
    }
  }
  visible[x] = trees;
}

for (let x = 0; x < rotate.length; ++x) {
  const row = rotate[x] ?? [];
  let max = -1;
  for (let y = 0; y < row.length; ++y) {
    const tree = row[y] ?? 0;
    const vis = visible[y] ?? [];
    if (tree > max) {
      vis[x] = true;
      max = tree;
    }
  }
  max = -1;
  for (let y = row.length - 1; y >= 0; --y) {
    const tree = row[y] ?? 0;
    const vis = visible[y] ?? [];
    if (tree > max) {
      vis[x] = true;
      max = tree;
    }
  }
}

console.log("visible trees", visible.flatMap((b) => b).filter((b) => b).length);

// Part 2
function up(x: number, y: number): number {
  const row = numbers[x] ?? [];
  const tree = row[y] ?? 0;
  let count = 0;
  for (let i = x - 1; i >= 0; --i) {
    ++count;
    const search = numbers[i] ?? [];
    const cur = search[y] ?? 0;
    if (cur >= tree) {
      return count;
    }
  }
  return count;
}

function down(x: number, y: number): number {
  const row = numbers[x] ?? [];
  const tree = row[y] ?? 0;
  let count = 0;
  for (let i = x + 1; i < numbers.length; ++i) {
    ++count;
    const search = numbers[i] ?? [];
    const cur = search[y] ?? 0;
    if (cur >= tree) {
      return count;
    }
  }
  return count;
}

function left(x: number, y: number): number {
  const row = numbers[x] ?? [];
  const tree = row[y] ?? 0;
  let count = 0;
  for (let i = y - 1; i >= 0; --i) {
    ++count;
    const search = numbers[x] ?? [];
    const cur = search[i] ?? 0;
    if (cur >= tree) {
      return count;
    }
  }
  return count;
}

function right(x: number, y: number): number {
  const row = numbers[x] ?? [];
  const tree = row[y] ?? 0;
  let count = 0;
  for (let i = y + 1; i < row.length; ++i) {
    ++count;
    const search = numbers[x] ?? [];
    const cur = search[i] ?? 0;
    if (cur >= tree) {
      return count;
    }
  }
  return count;
}

let max = 0;
const findScore = (x: number, y: number) => {
  const score = up(x, y) * down(x, y) * left(x, y) * right(x, y);
  max = Math.max(max, score);
  return score;
};

numbers.forEach((row, x) => row.forEach((_, y) => findScore(x, y)));
console.log("max scenic score", max);
