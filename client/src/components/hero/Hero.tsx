import { BusinessWorkspace } from "./BusinessWorkspace";
import { HeroCopy } from "./HeroCopy";
import "./hero-baseline.css";

export function Hero() {
  return (
    <section id="private-ai" className="aim-hero">
      <HeroCopy />
      <BusinessWorkspace />
    </section>
  );
}
