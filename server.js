import fs from "node:fs";
import http2 from "node:http2";

const server = http2.createSecureServer({
  key: fs.readFileSync("localhost-privkey.pem"),
  cert: fs.readFileSync("localhost-cert.pem"),
});

server.on("stream", async (stream) => {
  stream.respond({
    ":status": 200,
    "content-type": 'multipart/mixed; boundary="-"',
  });

  // begin
  stream.write("\r\n---");

  // part 1
  stream.write(
    `\r\ncontent-type: application/json; charset=utf-8\r\n\r\n${JSON.stringify({
      part: 1,
    })}\r\n---`
  );
  await new Promise((resolve) => setTimeout(resolve, 300));

  // part 2
  stream.write(
    `\r\ncontent-type: application/json; charset=utf-8\r\n\r\n${JSON.stringify({
      part: 2,
    })}\r\n---`
  );
  await new Promise((resolve) => setTimeout(resolve, 300));

  // part 3
  stream.write(
    `\r\ncontent-type: application/json; charset=utf-8\r\n\r\n${JSON.stringify({
      part: 3,
    })}\r\n---`
  );

  // end
  stream.end("--\r\n");
});

server.listen(58080);

console.log("Server listening to port 58080");
