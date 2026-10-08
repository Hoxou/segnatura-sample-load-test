# segnatura-sample-load-test

A sample load test for Segnatura My Scripts: the whole repository is
one [k6](https://k6.io) script, `load-test.js`, at the root.

It ramps up to 5 virtual users over 15s, holds for 30s and ramps down over 15s. Each iteration
loads the home page and a static asset (`/favicon.ico`), checks both, then sleeps 1s. The run
fails when p(95) request duration reaches 1500ms or more than 5% of requests fail.

## Run it

```sh
k6 run load-test.js
```

No setup step is needed; only k6 has to be installed on the machine.

In Segnatura, add it as a script with an empty folder path, no setup command and the run command
`k6 run load-test.js`. Segnatura reads the k6 `checks` summary to count passed and failed checks.

## Target

The default target is `https://test.k6.io`, which now redirects to Grafana's QuickPizza demo.
Point it elsewhere with the optional `TARGET_URL` variable. It is listed commented out in
`.env.example`, because Segnatura's machine agent treats every uncommented key there as required:

```sh
k6 run -e TARGET_URL=https://example.com load-test.js
```
