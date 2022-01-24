import { getEnv, getEnvBetaToProd } from "src/reusable/utilities/getEnv";

test.each`
  host                          | env
  ${"infr.prod.bloomberg.com"}  | ${"prod"}
  ${"infr.beta.bloomberg.com"}  | ${"beta"}
  ${"infr.dev.bloomberg.com"}   | ${"dev"}
  ${"sdfs.sdfsd.bloomberg.com"} | ${"dev"}
  ${""}                         | ${"dev"}
`("host: $host -> env: $env", ({ host, env }) => {
  const windowLocation = JSON.stringify(window.location);
  delete window.location;
  Object.defineProperty(window, "location", {
    value: JSON.parse(windowLocation),
    configurable: true,
  });
  Object.defineProperty(window.location, "host", {
    writable: true,
    value: host,
  });

  expect(getEnv()).toEqual(env);
});

test.each`
  host                          | env
  ${"infr.prod.bloomberg.com"}  | ${"prod"}
  ${"infr.beta.bloomberg.com"}  | ${"prod"}
  ${"infr.dev.bloomberg.com"}   | ${"dev"}
  ${"sdfs.sdfsd.bloomberg.com"} | ${"dev"}
  ${""}                         | ${"dev"}
`("host: $host -> env: $env", ({ host, env }) => {
  const windowLocation = JSON.stringify(window.location);
  delete window.location;
  Object.defineProperty(window, "location", {
    value: JSON.parse(windowLocation),
    configurable: true,
  });
  Object.defineProperty(window.location, "host", {
    writable: true,
    value: host,
  });

  expect(getEnvBetaToProd()).toEqual(env);
});
