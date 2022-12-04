import fs from "fs";

const input = fs.readFileSync("./day02/input.txt", "utf-8");
const strats = input.split("\n");

// A - X - Rock - 1
// B - Y - Paper - 2
// C - Z - Scissors - 3
const L = 0;
const T = 3;
const W = 6;

const guide = {
  A: {
    X: T,
    Y: W,
    Z: L,
  },
  B: {
    X: L,
    Y: T,
    Z: W,
  },
  C: {
    X: W,
    Y: L,
    Z: T,
  },
} as const;

const picks = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

const score = strats.reduce((score, game) => {
  const choice = game.split(" ")[0] as "A" | "B" | "C";
  const pick = game.split(" ")[1] as "X" | "Y" | "Z";

  return score + picks[pick] + guide[choice][pick];
}, 0);
console.log("score", score);

const guide2 = {
  A: {
    X: "C",
    Y: "A",
    Z: "B",
  },
  B: {
    X: "A",
    Y: "B",
    Z: "C",
  },
  C: {
    X: "B",
    Y: "C",
    Z: "A",
  },
} as const;

const winLose = {
  X: L,
  Y: T,
  Z: W,
} as const;

const pts = {
  A: 1,
  B: 2,
  C: 3,
} as const;

const score2 = strats.reduce((score, game) => {
  const choice = game.split(" ")[0] as "A" | "B" | "C";
  const pick = game.split(" ")[1] as "X" | "Y" | "Z";

  const strat = guide2[choice][pick];
  return score + winLose[pick] + pts[strat];
}, 0);
console.log("2nd score", score2);
