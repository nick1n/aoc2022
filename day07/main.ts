import fs from "fs";

const input = fs.readFileSync("./day07/input.txt", "utf-8");

// const test = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`;
const lines = input.split("\n");

let cur: string[] = [];
let dirs: { [key: string]: number } = {};

lines.forEach((line) => {
  const words = line.split(" ");
  if (words[0] == "$") {
    if (words[1] == "cd") {
      if (words[2] == "..") {
        cur.pop();
      } else {
        cur.push(words[2] ?? "");
      }
    }
  } else if (words[0] != "dir") {
    const size = parseInt(words[0] ?? "0");
    cur.reduce((path, dir) => {
      path += ":" + dir;
      dirs[path] = (dirs[path] ?? 0) + size;
      return path;
    }, "");
  }
});

// console.log(dirs);

// Part 1
const sizes = Object.values(dirs);
console.log(
  "sum",
  sizes.filter((size) => size <= 100_000).reduce((sum, val) => sum + val, 0)
);

// Part 2
const sorted = sizes.sort((a, b) => a - b);
const smallestSize = (sorted.at(-1) ?? 0) - (70_000_000 - 30_000_000);
console.log(
  "total size",
  sorted.find((size) => size >= smallestSize)
);
