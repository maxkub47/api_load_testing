import http from "k6/http";
import { sleep, check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

/*
VUs = (numHourlySessions * avgSessionDurationInSecs)/3600
example: 10,000 sessions in an hour
that each session last 10 second => 10000 * 10/ 3600 = 27 virtual users

Use data from different times to:
- Simulate regular traffic
- Simulate busiest/peak hour
- Stress test your system
*/

export let options = {
  vus: 1000,
  duration: "1m",
  //   stages: [
  //     { duration: "1m", target: 10 },
  //     { duration: "1m", target: 100 },
  //     { duration: "1m", target: 500 },
  //     { duration: "1m", target: 1000 },
  //   ],
};

export default function () {
  const res = http.get("http://172.16.1.240:8088/maxtool/testphp.php");
  sleep(1);
  check(res, {
    "is status 200": (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
