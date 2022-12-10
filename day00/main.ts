import fs from "fs";

const input = fs.readFileSync("./day00/input.txt", "utf-8");
// test input:
// const input = ``;
const lines = input.split("\n");
const chars = lines.map((line) => line.split(""));
