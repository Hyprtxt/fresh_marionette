# Fresh Marionette

A really simple test wrapper for Fresh projects. Use it like this:

```
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { freshPuppetTestWrapper } from "https://deno.land/x/fresh_marionette@v1.0.2/mod.js";

// import { BASE_URL } from "@/utils/config.js"

const BASE_URL = Deno.env.get("BASE_URL") || "http://localhost:8000";

Deno.test(
  "Public Pages Testing",
  freshPuppetTestWrapper(async (t, page) => {
    await t.step("The homepage should work", async () => {
      const response = await page.goto(`${BASE_URL}`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), 200);
    });

    await t.step("The 404 page should 404", async () => {
      const response = await page.goto(`${BASE_URL}/404`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), 404);
    });

    // More steps?
  }),
);
```

Put that in `/test` then run `deno test -A`, Install Chromium with the provided
script if it asks.

# Install

Even better install it something like this:

```
{
  "imports": {
    "@/": "./",
    "$std/": "https://deno.land/std@0.178.0/",
    "marionette": "https://deno.land/x/fresh_marionette@v1.0.2/mod.js",
    "puppeteer": "https://deno.land/x/puppeteer@16.2.0/mod.ts",
  }
}
```

then

```
import { assertEquals } from "$std/testing/asserts.ts";
import { freshPuppetTestWrapper } from "marionette";
```

### Also

(Launch tests with VSCode)[https://youtu.be/OG77NdqL164]
