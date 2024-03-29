import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { delay } from "https://deno.land/std@0.192.0/async/delay.ts";
import { startFreshServer } from "https://deno.land/x/fresh@1.2.0/tests/test_utils.ts";

export const freshTestWrapper = (theTests) => async (t) => {
  const { serverProcess, lines } = await startFreshServer({
    args: ["run", "-A", "./main.ts"],
  });
  await theTests(t);
  // Stop the Server
  await lines.cancel();
  serverProcess.kill("SIGTERM");
  // await for the server to close
  await delay(100);
};

export const freshPuppetTestWrapper = (puppetConfig, theTests) =>
  freshTestWrapper(async (t) => {
    const browser = await puppeteer.launch(puppetConfig);
    const page = await browser.newPage();
    await theTests(t, page);
    await browser.close();
  });
