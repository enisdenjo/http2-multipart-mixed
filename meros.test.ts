import { it } from "vitest";

// TODO: node version of meros does not support http2.ClientHttp2Stream, so we test in browser
import { meros } from "meros/browser";

it("should work with meros", async ({ expect }) => {
  const parts = await fetch("https://localhost:58080").then(meros);

  assertAsyncIterator(parts);

  await expect(parts.next()).resolves.toEqual({
    done: false,
    value: {
      headers: { "content-type": "application/json; charset=utf-8" },
      json: true,
      body: {
        part: 1,
      },
    },
  });

  await expect(parts.next()).resolves.toEqual({
    done: false,
    value: {
      headers: { "content-type": "application/json; charset=utf-8" },
      json: true,
      body: {
        part: 2,
      },
    },
  });

  await expect(parts.next()).resolves.toEqual({
    done: false,
    value: {
      headers: { "content-type": "application/json; charset=utf-8" },
      json: true,
      body: {
        part: 3,
      },
    },
  });

  await expect(parts.next()).resolves.toEqual({
    done: true,
    value: undefined,
  });
});

function assertAsyncIterator<T>(
  val: unknown
): asserts val is AsyncIterableIterator<T> {
  if (!(typeof Object(val)[Symbol.asyncIterator] === "function")) {
    throw new Error("Value is not async iterable");
  }
}
