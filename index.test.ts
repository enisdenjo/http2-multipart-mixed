import { it } from "vitest";
import { meros } from "meros/browser";

it("should work with meros", async ({ expect }) => {
  const parts = await fetch("https://localhost:58080").then(meros);

  assertAsyncIterator(parts);
});

function assertAsyncIterator<T>(
  val: unknown
): asserts val is AsyncIterableIterator<T> {
  if (!(typeof Object(val)[Symbol.asyncIterator] === "function")) {
    throw new Error("Value is not async iterable");
  }
}
