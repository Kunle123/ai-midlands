import { BusinessWorkspace } from "./BusinessWorkspace";
import { HeroCopy } from "./HeroCopy";
import "./hero-baseline.css";
import "./hero-workflows.css";
import "./hero-premium.css";
import "./hero-industrial-background.css";

export function Hero() {
  return (
    <section id="hero" className="aim-hero">
      <HeroCopy />
      <div className="hero-stage-shell">
        <div className="hero-stage-meta" aria-hidden="true">
          <span>Typical workflows in action</span>
          <span>See how a routine hand-off can move from an incoming enquiry to a usable record without repetitive admin.</span>
        </div>
        <BusinessWorkspace />
      </div>
    </section>
  );
}
