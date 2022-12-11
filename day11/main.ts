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
  oper: Oper;
  num: number;
  test: number;
  t: number;
  f: number;
  inspected: number;
};

const match = (field: string[] | undefined, reg: RegExp) =>
  (((field ?? [])[1] ?? "").match(reg) ?? [])[0];

const parseNum = (field?: string[]) => +(match(field, /\d+/) ?? "0");

const init = () =>
  text.map((lines): Monkey => {
    const fields = lines.split(/\s*\n\s*/g).map((line) => line.split(/:\s+/g));
    const items = ((fields[1] ?? [])[1] ?? "").split(/,\s+/).map((x) => +x);
    let oper = (match(fields[2], /[+*]/) ?? "+") as Oper;
    let old = match(fields[2], /\d+/);
    let num = 0;
    if (old == undefined) {
      oper = "^";
      num = 2;
    } else {
      num = +old;
    }
    const test = parseNum(fields[3]);
    const t = parseNum(fields[4]);
    const f = parseNum(fields[5]);
    return { items, oper, num, test, t, f, inspected: 0 };
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
monkeys = init();
const divisibleByLCM = monkeys.reduce((mul, monkey) => mul * monkey.test, 1);

for (let round = 0; round < 10000; ++round) {
  // if (round % 1000 == 0) {
  //   const inspects = monkeys.map((x) => x.inspected);
  //   console.log(round, inspects);
  // }
  monkeys.forEach((monkey) => {
    const items = [...monkey.items];
    monkey.items = [];
    items.forEach((item) => {
      const level = performOp(item, monkey.oper, monkey.num) % divisibleByLCM;
      if (level % monkey.test == 0) {
        monkeys[monkey.t]?.items.push(level);
      } else {
        monkeys[monkey.f]?.items.push(level);
      }
    });
    monkey.inspected += items.length;
  });
}

const inspects = monkeys.map((x) => x.inspected).sort((a, z) => z - a);
console.log(inspects);
console.log((inspects[0] ?? 1) * (inspects[1] ?? 1));
