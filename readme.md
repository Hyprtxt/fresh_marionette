# Fresh Marionette

A really simple test wrapper for Fresh projects.

With this you can
[Launch tests with VSCode - https://youtu.be/OG77NdqL164](https://youtu.be/OG77NdqL164)
or `deno test -A` the regualar Deno test stuff.

Use it like this:

```ts
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { Status } from "https://deno.land/std@0.192.0/http/http_status.ts";
import { freshPuppetTestWrapper } from "https://deno.land/x/fresh_marionette@v2.0.1/mod.js";

// import { BASE_URL, DENO_ENV } from "@/utils/config.js"

const BASE_URL = Deno.env.get("BASE_URL") || "http://localhost:8000";
const DENO_ENV = Deno.env.get("DENO_ENV") || "development";

const puppet_config = DENO_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true };

Deno.test(
  "Public Pages Testing",
  {
    sanitizeResources: false,
    sanitizeOps: false,
  },
  freshPuppetTestWrapper(puppet_config, async (t, page) => {
    await t.step("The homepage should work", async () => {
      const response = await page.goto(`${BASE_URL}`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), Status.OK);
    });

    await t.step("The 404 page should 404", async () => {
      const response = await page.goto(`${BASE_URL}/404`, {
        waitUntil: "networkidle2",
      });
      assertEquals(response.status(), Status.NotFound);
    });

    // More steps?
  }),
);
```

Put that in a file called `./main_test.js`, then run `deno test -A`, Install
Chromium with the provided script if it asks.

# Install

You may install it something like this:

```ts
{
  "imports": {
    "@/": "./",
    "$std/": "https://deno.land/std@0.192.0/",
    "fresh_marionette": "https://deno.land/x/fresh_marionette@v2.0.1/mod.js",
    // ...
  }
}
```

then

```ts
import { assertEquals } from "$std/testing/asserts.ts";
import { Status } from "$std/http/http_status.ts";
import { freshPuppetTestWrapper } from "fresh_marionette";
```

### Use with Github Actions

Example in this repo: https://github.com/Hyprtxt/marionette.deno.dev

https://github.com/Hyprtxt/marionette.deno.dev/actions

# Version 2 Update

`startFreshServer` is now a part of Fresh's test utils

This package has been updated to use startFreshServer. If you need custom server
options, I recommend copying pasting what you need from
[mod.js](https://deno.land/x/fresh_marionette@v2.0.1/mod.js?source).

`import { startFreshServer } from "https://deno.land/x/fresh@1.2.0/tests/test_utils.ts";`

Don't miss the examples in the docs:
https://fresh.deno.dev/docs/examples/writing-tests If you don't need puppeteer
there are faster ways to write tests.

# License

d License © Taylor Young

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The permission notice below shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. PLUR.

---

JK you can also just WTFPL
