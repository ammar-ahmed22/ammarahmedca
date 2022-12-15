import { Metric } from "web-vitals";
import ReactGA from "react-ga4";

function reportHandler({ id, name, value }: Metric) {
  ReactGA.initialize("G-JB69PRH5HQ");
  ReactGA.event("web-vitals", {
    category: "Web Vitals",
    action: name,
    value: Math.round(name === "CLS" ? value * 1000 : value),
    label: id,
    nonInteraction: true,
  });
  console.log("Vitals sent...");
}

export default reportHandler;
