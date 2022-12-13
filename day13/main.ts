import fs from "fs";

const input = fs.readFileSync("./day13/input.txt", "utf-8");
// test input:
// const input = `[1,1,3,1,1]
// [1,1,5,1,1]

// [[1],[2,3,4]]
// [[1],4]

// [9]
// [[8,7,6]]

// [[4,4],4,4]
// [[4,4],4,4,4]

// [7,7,7,7]
// [7,7,7]

// []
// [3]

// [[[]]]
// [[]]

// [1,[2,[3,[4,[5,6,7]]]],8,9]
// [1,[2,[3,[4,[5,6,0]]]],8,9]`;
const lines = input.split("\n\n");
const arrays: number[][] = lines.map((line) =>
  line.split("\n").map((x) => JSON.parse(x))
);

// Part 1
enum Trinary {
  T, // true
  N, // neutral
  F, // false
}

function compare(
  left?: number | number[] | number[][],
  right?: number | number[] | number[][]
): Trinary {
  // console.log(left, "-", right);
  if (left == undefined) return Trinary.T;
  if (right == undefined) return Trinary.F;
  if (typeof left == "number" && typeof right == "number") {
    if (left == right) {
      return Trinary.N;
    } else if (left < right) {
      return Trinary.T;
    }
    return Trinary.F;
  }
  if (typeof left == "object" && typeof right == "object") {
    const length = left.length > right.length ? left.length : right.length;
    for (let i = 0; i < length; ++i) {
      const ret = compare(left[i], right[i]);
      if (ret != Trinary.N) {
        return ret;
      }
    }
  }
  if (typeof left == "object" && typeof right == "number") {
    return compare(left, [right]);
  }
  if (typeof left == "number" && typeof right == "object") {
    return compare([left], right);
  }
  return Trinary.N;
}

const indices: number[] = [];
arrays.forEach((pair, index) => {
  const [left, right] = pair;
  if (compare(left, right) != Trinary.F) {
    indices.push(index + 1);
  }
});
console.log("indices", indices);
console.log(indices.reduce((sum, x) => sum + x));

// Part 2
const sort: number[][][] = lines.flatMap((line) =>
  line.split("\n").map((x) => JSON.parse(x))
);
const two = [[2]];
const six = [[6]];
sort.push(two);
sort.push(six);
sort.sort((left, right) => (compare(left, right) == Trinary.T ? -1 : 1));
const i2 = sort.findIndex((x) => x === two) + 1;
const i6 = sort.findIndex((x) => x === six) + 1;
console.log("key", i2, "*", i6, "=", i2 * i6);
