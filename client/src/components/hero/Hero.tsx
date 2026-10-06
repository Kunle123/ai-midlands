import { BusinessWorkspace } from "./BusinessWorkspace";
import { HeroCopy } from "./HeroCopy";
import "./hero-baseline.css";
import "./hero-workflows.css";
import "./hero-premium.css";

export function Hero() {
  return (
    <section id="hero" className="aim-hero">
      <HeroCopy />
      <div className="hero-stage-shell">
        <div className="hero-stage-meta" aria-hidden="true">
          <span>Business automation, shown working</span>
          <span>4 live examples</span>
        </div>
        <BusinessWorkspace />
      </div>
    </section>
  );
}
