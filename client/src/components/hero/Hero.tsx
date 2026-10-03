import { BusinessAutomationVisual } from "./BusinessAutomationVisual";
import { HeroCopy } from "./HeroCopy";

export function Hero() {
  return (
    <section id="private-ai" className="container pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] xl:items-center xl:gap-16">
        <HeroCopy />
        <BusinessAutomationVisual />
      </div>
    </section>
  );
}
