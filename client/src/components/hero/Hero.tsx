import { BusinessWorkspace } from "./BusinessWorkspace";
import { HeroCopy } from "./HeroCopy";
import "./hero-baseline.css";
import "./hero-workflows.css";

export function Hero() {
  return (
    <section id="hero" className="aim-hero">
      <HeroCopy />
      <BusinessWorkspace />
    </section>
  );
}
