// verify.js — replay every report in bugs.json against the ORIGINAL utils.js
// and prove each one is a genuine, reproducible bug:
//   actual !== expected  => BUG REPRODUCED (the report exposes a wrong result)
//   actual === expected  => NOT A BUG (report would not count)
// Run: node verify.js   (exit code 0 = every report reproduced a real bug)
const fs = require("fs");
const utils = require("./utils.js");

const reports = JSON.parse(fs.readFileSync("./bugs.json", "utf8"));
let reproduced = 0;

for (const r of reports) {
  const actual = utils[r.fn](...r.input);
  const isBug = JSON.stringify(actual) !== JSON.stringify(r.expected);
  if (isBug) reproduced++;
  console.log(
    `${isBug ? "BUG REPRODUCED " : "NOT A BUG      "} ${r.fn}(${r.input.map((x) => JSON.stringify(x)).join(", ")})` +
      ` => actual ${JSON.stringify(actual)}, expected ${JSON.stringify(r.expected)}`
  );
}

console.log(`\n${reproduced}/${reports.length} reports reproduced a genuine bug.`);
if (reproduced !== reports.length) {
  console.error("FAIL: some reports did not reproduce.");
  process.exit(1);
}
console.log("PASS: all reports verified against the original utils.js.");
