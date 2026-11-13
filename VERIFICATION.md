# Verification — executed against the ORIGINAL utils.js

Run: `node verify.js` (exit 0 = all reports reproduce a genuine bug).

## verify.js output

```
BUG REPRODUCED  factorial(5) => actual 24, expected 120
BUG REPRODUCED  countVowels("AEIOU") => actual 0, expected 5
BUG REPRODUCED  titleCase("don't stop") => actual "Don'T Stop", expected "Don't Stop"

3/3 reports reproduced a genuine bug.
PASS: all reports verified against the original utils.js.
```

## Full test matrix (all 10 functions)

| Result | Function | Input | Actual | Expected |
|--------|----------|-------|--------|----------|
| OK | sum | [1,2,3] | 6 | 6 |
| OK | sum | [-1,1] | 0 | 0 |
| OK | sum | [] | 0 | 0 |
| OK | max | [1,9,3] | 9 | 9 |
| OK | max | [-5,-1] | -1 | -1 |
| OK | reverse | "abc" | "cba" | "cba" |
| OK | reverse | "hello" | "olleh" | "olleh" |
| OK | isPalindrome | "racecar" | true | true |
| OK | isPalindrome | "hello" | false | false |
| OK | isPalindrome | "Racecar" | false | false |
| **BUG** | factorial | 5 | 24 | 120 |
| **BUG** | factorial | 2 | 1 | 2 |
| **BUG** | factorial | 3 | 2 | 6 |
| OK | factorial | 0 | 1 | 1 |
| OK | factorial | 1 | 1 | 1 |
| OK | clamp | (5,0,10) | 5 | 5 |
| OK | clamp | (-1,0,10) | 0 | 0 |
| OK | clamp | (20,0,10) | 10 | 10 |
| OK | unique | [1,1,2,2,3] | [1,2,3] | [1,2,3] |
| OK | average | [2,4,6] | 4 | 4 |
| OK | average | [10] | 10 | 10 |
| OK | titleCase | "hello world" | "Hello World" | "Hello World" |
| **BUG** | titleCase | "don't stop" | "Don'T Stop" | "Don't Stop" |
| **BUG** | titleCase | "it's a test" | "It'S A Test" | "It's A Test" |
| **BUG** | countVowels | "AEIOU" | 0 | 5 |
| **BUG** | countVowels | "Apple" | 1 | 2 |
| OK | countVowels | "Hello" | 2 | 2 |
| OK | countVowels | "aeiou" | 5 | 5 |

Conclusion: exactly 3 of the 10 functions are buggy (factorial, countVowels,
titleCase). The other 7 are correct on every tested input. The `reverse`
surrogate-pair case was deliberately excluded (see README.md).
