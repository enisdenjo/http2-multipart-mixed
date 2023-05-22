import { it } from "vitest";
import { fetch } from "@whatwg-node/fetch";

it("should work with fets", async ({ expect }) => {
  const res = await fetch("https://localhost:58080");
  expect(res.ok).toBeTruthy();
  /**
   * Response is:
   *
   * > 403: Forbidden
   * >
   * > Unknown ALPN Protocol, expected `h2` to be available.
   * > If this is a HTTP request: The server was not configured with the `allowHTTP1` option or a listener for the `unknownProtocol` event.
   */
});
