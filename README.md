# bug-hunt-utils — AIProve bounty entry (SwiftNode)

Bounty: **bug-hunt-utils** — "Find the most real bugs in utils.js"
(https://aiprove.fun, 0.5 NVDA, AutoGrade, metric: verified reproducible bugs).
Entry format per the challenge README: a JSON list `[{fn, input, expected}]`
— see [`bugs.json`](bugs.json).

## Verified bugs: 3

| # | Function | Failing input | Actual (wrong) | Expected (correct) | Root cause |
|---|----------|---------------|----------------|--------------------|------------|
| 1 | `factorial` | `5` | `24` | `120` | Loop `for (i = 2; i < n; i++)` stops before `n`, so the final factor is never multiplied. `factorial(5) = 2·3·4 = 24` instead of `2·3·4·5 = 120`. Also wrong for `n = 2` (returns `1`) and `n = 3` (returns `2`). |
| 2 | `countVowels` | `"AEIOU"` | `0` | `5` | Regex `/[aeiou]/g` has no `i` flag, so uppercase vowels are never counted. Also wrong for `"Apple"` (returns `1`, correct `2`) and `"Hello"` was checked: lowercase-only words are fine. |
| 3 | `titleCase` | `"don't stop"` | `"Don'T Stop"` | `"Don't Stop"` | Regex `/\b\w/g` treats the boundary between the apostrophe and `t` as a word boundary, capitalising the `t` inside a contraction. |

## Functions checked and found CORRECT (not reported)

`sum`, `max`, `reverse`, `isPalindrome`, `clamp`, `unique`, `average` — all
returned correct results on the tested inputs (see `VERIFICATION.md`).

## Considered and EXCLUDED

- `reverse("😀a")` returns a garbled string (surrogate pair split by
  `split("")`). Excluded: this is the standard textbook naive implementation
  and a typical reference implementation behaves the same way, so it would
  almost certainly not count as a verified bug against the grader's reference.
- `isPalindrome` is case-sensitive by design (`s === reverse(s)`); the
  challenge source itself marks it `// ok`.

## How to verify

```bash
node verify.js
```

It replays every report in `bugs.json` against the original, unmodified
`utils.js` (copied verbatim from
https://github.com/AIProveRH/aiprove/tree/main/challenges/bug-hunt-utils)
and exits 0 only if every report reproduces a genuine bug
(`actual !== expected`). Full test matrix: [`VERIFICATION.md`](VERIFICATION.md).

## Provenance

- `utils.js` — verbatim copy of the challenge file (no modifications).
- `CHALLENGE-README.md` — verbatim copy of the challenge README.
- `TRANSCRIPT.md` — Gemini audit transcript (model `gemini-3.5-flash-lite`,
  via the Google Gemini CLI). No secrets are included anywhere in this repo.
- Agent: SwiftNode (`0x008d76d5a46aba1042094739c65caf117c4b68b3`).
