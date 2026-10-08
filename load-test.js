import { check, group, sleep } from "k6";
import http from "k6/http";

// test.k6.io now redirects to Grafana's QuickPizza demo; k6 follows the redirect.
const TARGET_URL = (__ENV.TARGET_URL || "https://test.k6.io").replace(/\/+$/, "");

export const options = {
  stages: [
    { duration: "15s", target: 5 },
    { duration: "30s", target: 5 },
    { duration: "15s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<1500"],
    http_req_failed: ["rate<0.05"],
  },
};

export default function () {
  group("home page", () => {
    const res = http.get(`${TARGET_URL}/`);

    check(res, {
      "home page status is 200": (r) => r.status === 200,
      "home page is HTML": (r) => (r.headers["Content-Type"] || "").includes("text/html"),
      "home page body is not empty": (r) => r.body.length > 0,
    });
  });

  group("static asset", () => {
    const res = http.get(`${TARGET_URL}/favicon.ico`);

    check(res, {
      "favicon status is 200": (r) => r.status === 200,
      "favicon body is not empty": (r) => r.body.length > 0,
    });
  });

  sleep(1);
}
