import { BusinessWorkspace } from "./BusinessWorkspace";
import { HeroCopy } from "./HeroCopy";

export function Hero() {
  return (
    <section id="private-ai" className="container pb-16 pt-8 md:pb-20 md:pt-10 xl:pb-20 xl:pt-12">
      <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,24.5rem)_minmax(0,1fr)] xl:gap-8">
        <HeroCopy />
        <BusinessWorkspace />
      </div>
    </section>
  );
}
