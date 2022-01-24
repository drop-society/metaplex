import { generateFieldName } from "src/reusable/Form/utils";

test.each`
  paths                  | expected
  ${[]}                  | ${""}
  ${["test", 0]}         | ${"test[0]"}
  ${["test", 0, "ooph"]} | ${"test[0].ooph"}
  ${[0, 0]}              | ${"0[0]"}
  ${["90", 0, "90"]}     | ${"90[0].90"}
`("$paths should generate $expected", ({ paths, expected }) => {
  const result = generateFieldName(...paths);
  expect(expected).toEqual(result);
});
