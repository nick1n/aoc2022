import fs from "fs";

const input = fs.readFileSync("./day11/input.txt", "utf-8");
// test input:
// const input = `Monkey 0:
// Starting items: 79, 98
// Operation: new = old * 19
// Test: divisible by 23
//   If true: throw to monkey 2
//   If false: throw to monkey 3

// Monkey 1:
// Starting items: 54, 65, 75, 74
// Operation: new = old + 6
// Test: divisible by 19
//   If true: throw to monkey 2
//   If false: throw to monkey 0

// Monkey 2:
// Starting items: 79, 60, 97
// Operation: new = old * old
// Test: divisible by 13
//   If true: throw to monkey 1
//   If false: throw to monkey 3

// Monkey 3:
// Starting items: 74
// Operation: new = old + 3
// Test: divisible by 17
//   If true: throw to monkey 0
//   If false: throw to monkey 1`;
const text = input.split("\n\n");

type Oper = "+" | "*" | "^";

type Monkey = {
  items: number[];
  bigItems: bigint[];
  oper: Oper;
  num: number;
  test: number;
  t: number;
  f: number;
  inspected: number;
};

const init = () =>
  text.map((lines): Monkey => {
    const fields = lines.split(/\s*\n\s*/g).map((line) => line.split(/:\s+/g));
    const items = ((fields[1] ?? [])[1] ?? "").split(/,\s+/).map((x) => +x);
    const bigItems = items.map((x) => BigInt(x));
    let oper = ((((fields[2] ?? [])[1] ?? "").match(/[+*]/) ?? [])[0] ??
      "+") as Oper;
    let old = (((fields[2] ?? [])[1] ?? "").match(/\d+/) ?? [])[0];
    let num = 0;
    if (old == undefined) {
      oper = "^";
      num = 2;
    } else {
      num = +old;
    }
    const test = +((((fields[3] ?? [])[1] ?? "").match(/\d+/) ?? [])[0] ?? "0");
    const t = +((((fields[4] ?? [])[1] ?? "").match(/\d+/) ?? [])[0] ?? "0");
    const f = +((((fields[5] ?? [])[1] ?? "").match(/\d+/) ?? [])[0] ?? "0");
    return { items, bigItems, oper, num, test, t, f, inspected: 0 };
  });

// Part 1
let monkeys = init();

const performOp = (input: number, op: Oper, num: number) => {
  if (op == "*") return input * num;
  if (op == "+") return input + num;
  return input * input;
};

for (let round = 0; round < 20; ++round) {
  monkeys.forEach((monkey) => {
    const items = [...monkey.items];
    monkey.items = [];
    items.forEach((item) => {
      const level = Math.floor(performOp(item, monkey.oper, monkey.num) / 3);
      if (level % monkey.test == 0) {
        monkeys[monkey.t]?.items.push(level);
      } else {
        monkeys[monkey.f]?.items.push(level);
      }
    });
    monkey.inspected += items.length;
  });
}

const inspected = monkeys.map((x) => x.inspected).sort((a, z) => z - a);
console.log(inspected);
console.log((inspected[0] ?? 1) * (inspected[1] ?? 1));

// Part 2
const performBigOp = (input: bigint, op: Oper, num: number) => {
  if (op == "*") return input * BigInt(num);
  if (op == "+") return input + BigInt(num);
  return input * input;
};

monkeys = init();

for (let round = 0; round < 10000; ++round) {
  if (round % 1000 == 0) {
    const inspects = monkeys.map((x) => x.inspected);
    console.log(round, inspects);
  }
  monkeys.forEach((monkey) => {
    const items = [...monkey.bigItems];
    monkey.bigItems = [];
    items.forEach((item) => {
      const level = performBigOp(item, monkey.oper, monkey.num) % 9699690n;
      if (level % BigInt(monkey.test) == 0n) {
        monkeys[monkey.t]?.bigItems.push(level);
      } else {
        monkeys[monkey.f]?.bigItems.push(level);
      }
    });
    monkey.inspected += items.length;
  });
}

const inspects = monkeys.map((x) => x.inspected).sort((a, z) => z - a);
console.log(inspects);
console.log((inspects[0] ?? 1) * (inspects[1] ?? 1));
