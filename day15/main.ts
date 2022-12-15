import { exit } from "process";
import fs from "fs";

const input = fs.readFileSync("./day15/input.txt", "utf-8");
// test input:
// const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
// Sensor at x=9, y=16: closest beacon is at x=10, y=16
// Sensor at x=13, y=2: closest beacon is at x=15, y=3
// Sensor at x=12, y=14: closest beacon is at x=10, y=16
// Sensor at x=10, y=20: closest beacon is at x=10, y=16
// Sensor at x=14, y=17: closest beacon is at x=10, y=16
// Sensor at x=8, y=7: closest beacon is at x=2, y=10
// Sensor at x=2, y=0: closest beacon is at x=2, y=10
// Sensor at x=0, y=11: closest beacon is at x=2, y=10
// Sensor at x=20, y=14: closest beacon is at x=25, y=17
// Sensor at x=17, y=20: closest beacon is at x=21, y=22
// Sensor at x=16, y=7: closest beacon is at x=15, y=3
// Sensor at x=14, y=3: closest beacon is at x=15, y=3
// Sensor at x=20, y=1: closest beacon is at x=15, y=3`;
const lines = input.split("\n");

let minX = 999999999;
let maxX = 0;

type Pos = { x: number; y: number };
type Sensor = { sensor: Pos; beacon: Pos; dist: number };

const sensors: Sensor[] = lines.map((line) => {
  const [sensor, beacon] = line.split(":").map((str) => {
    const [x, y] = str.match(/-?\d+/g) ?? [];
    const p = { x: parseInt(x ?? "0"), y: parseInt(y ?? "0") };
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    return p;
  });
  if (!sensor || !beacon) {
    console.error("error sensor or beacon not read", sensor, beacon);
    return { sensor: { x: 0, y: 0 }, beacon: { x: 0, y: 0 }, dist: 0 };
  }
  const dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
  return { sensor, beacon, dist };
});

console.log(minX, maxX);

// Part 1
function part1scan(row: number) {
  let grid: { [key: string]: boolean } = {};
  let remove: { [key: string]: boolean } = {};

  const setPoint = (x: number, y: number, c: string) => {
    if (y != row) return;
    if (c != "#") {
      // console.log("delete", x, y);
      remove[x + "," + y] = true;
    } else {
      grid[x + "," + y] = true;
    }
  };

  sensors.forEach(({ sensor, beacon, dist }) => {
    const rowDist = Math.abs(sensor.y - row);

    setPoint(sensor.x, sensor.y, "S");
    setPoint(beacon.x, beacon.y, "B");

    if (rowDist > dist) return;

    for (let x = 0; x <= dist - rowDist; ++x) {
      setPoint(sensor.x - x, sensor.y - rowDist, "#");
      setPoint(sensor.x + x, sensor.y - rowDist, "#");
      setPoint(sensor.x - x, sensor.y + rowDist, "#");
      setPoint(sensor.x + x, sensor.y + rowDist, "#");
    }
  });

  // console.log(grid);
  const removed = Object.keys(remove);
  console.log("remove", removed, removed.length);
  const count = Object.keys(grid).length;
  console.log("positions", count - removed.length);
}

// part1scan(10); // test
part1scan(2_000_000);

// Part 2
// const MAX_X = 20; // test
const MAX_X = 4_000_000;

for (let y = 0; y <= MAX_X; ++y) {
  if (y % 200000 == 0) console.log(new Date(), y);
  for (let x = 0; x <= MAX_X; ++x) {
    const one = sensors.some(({ sensor, dist }) => {
      const yDist = Math.abs(sensor.y - y);
      if (yDist > dist) return false;
      const xDist = sensor.x - x;
      if (Math.abs(xDist) + yDist <= dist) {
        // console.log(x, y, dist, xDist, yDist);
        x += dist - yDist + xDist;
        return true;
      }
      return false;
    });
    if (!one) {
      console.log("pos", x, y);
      console.log("frequency", x * MAX_X + y);
      exit();
    }
  }
}
