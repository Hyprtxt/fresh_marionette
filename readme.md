# Fresh Marionette

A really simple test wrapper for Fresh projects.

With this you can
[Launch tests with VSCode - https://youtu.be/OG77NdqL164](https://youtu.be/OG77NdqL164)
or ya know... `deno test -A`

Use it like this:

```ts
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";
import { Status } from "https://deno.land/std@0.180.0/http/http_status.ts";
import { freshPuppetTestWrapper } from "https://deno.land/x/fresh_marionette@v1.1.2/mod.js";

// import { BASE_URL, DENO_ENV } from "@/utils/config.js"

const BASE_URL = Deno.env.get("BASE_URL") || "http://localhost:8000";
const DENO_ENV = Deno.env.get("DENO_ENV") || "development";

const puppet_config = DENO_ENV === "development"
  ? { headless: false, defaultViewport: null }
  : { headless: true };

Deno.test(
  "Public Pages Testing",
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

Put that in `/test/puppet.js` then run `deno test -A`, Install Chromium with the
provided script if it asks.

# Install

Even better, you may install it something like this:

```ts
{
  "imports": {
    "@/": "./",
    "$std/": "https://deno.land/std@0.180.0/",
    "fresh_marionette": "https://deno.land/x/fresh_marionette@v1.1.2/mod.js",
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

### Use without Puppeteer

The test runner can be used without puppeteer, just import `freshTestWrapper`

```ts
import { assertEquals } from "https://deno.land/std@0.180.0/testing/asserts.ts";
import { Status } from "https://deno.land/std@0.180.0/http/http_status.ts";
import { freshTestWrapper } from "https://deno.land/x/fresh_marionette@v1.1.2/mod.js";

Deno.test(
  "Some Testing",
  freshTestWrapper(async (t) => {
    // fresh has been started
    await t.step("The homepage should work (200)", async () => {
      const requestStatus = await fetch(`http://localhost:8000`).then(
        async (res) => {
          await res.text();
          return res.status;
        },
      );
      assertEquals(requestStatus, Status.OK);
    });
    // all done? Fresh will close gracefully
  }),
);
```

# License

License © Taylor Young

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
