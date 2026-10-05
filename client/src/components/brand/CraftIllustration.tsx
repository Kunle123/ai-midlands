import "./craft-illustrations.css";

type CraftIllustrationProps = {
  variant?: "connect" | "move" | "paint" | "inspect";
  className?: string;
  tone?: "light" | "dark";
};

function Worker({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g className="craft-worker" transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <circle className="craft-skin" cx="0" cy="-34" r="8" />
      <path className="craft-body" d="M-7-24h14l5 28H-12z" />
      <path className="craft-line" d="M-5 4l-8 26M6 4l8 26M-8-17l-16 17M8-17l17 12" />
      <path className="craft-accent-stroke" d="M-8-42h17M-7-43c2-8 12-8 14 0" />
    </g>
  );
}

function Ladder({ x, y, h = 112 }: { x: number; y: number; h?: number }) {
  const rungs = Array.from({ length: 6 }, (_, index) => index);
  return (
    <g transform={`translate(${x} ${y})`} className="craft-ladder">
      <path d={`M0 0L-13 ${h}M22 0L35 ${h}`} />
      {rungs.map((rung) => {
        const py = 16 + rung * ((h - 26) / 5);
        const offset = (py / h) * 13;
        return <path key={rung} d={`M${2 - offset} ${py}H${24 + offset}`} />;
      })}
    </g>
  );
}

function ConnectScene() {
  return (
    <>
      <rect className="craft-panel" x="24" y="56" width="92" height="70" rx="10" />
      <rect className="craft-panel" x="204" y="56" width="92" height="70" rx="10" />
      <path className="craft-faint" d="M42 77h56M42 92h42M222 77h56M222 92h34" />
      <path className="craft-route" d="M116 91h88" />
      <circle className="craft-accent" cx="160" cy="91" r="7" />
      <Ladder x={132} y={49} h={112} />
      <Worker x={159} y={102} />
      <Worker x={89} y={168} flip />
      <path className="craft-line" d="M76 132c22 2 35 15 42 33" />
      <rect className="craft-accent-soft" x="42" y="145" width="48" height="28" rx="6" />
      <path className="craft-faint" d="M50 154h31M50 162h23" />
    </>
  );
}

function MoveScene() {
  return (
    <>
      <path className="craft-ground" d="M20 178h280" />
      <rect className="craft-panel craft-panel-large" x="84" y="80" width="150" height="74" rx="12" />
      <rect className="craft-accent-soft" x="102" y="98" width="56" height="9" rx="4.5" />
      <path className="craft-faint" d="M102 119h108M102 134h82" />
      <Worker x={64} y={144} />
      <Worker x={253} y={144} flip />
      <path className="craft-line" d="M72 124l18-10M245 124l-16-10" />
      <path className="craft-route" d="M118 64c21-20 62-20 84 0" />
      <path className="craft-accent-stroke" d="M194 57l9 8-10 4" />
    </>
  );
}

function PaintScene() {
  return (
    <>
      <rect className="craft-panel" x="70" y="38" width="176" height="126" rx="12" />
      <rect className="craft-accent-soft" x="70" y="38" width="176" height="31" rx="12" />
      <path className="craft-faint" d="M92 91h128M92 110h90M92 129h112" />
      <Ladder x={40} y={42} h={128} />
      <Worker x={78} y={94} />
      <path className="craft-accent-stroke craft-brush" d="M88 73l26-14M110 54l12 21" />
      <rect className="craft-accent" x="118" y="49" width="44" height="7" rx="3.5" />
      <Worker x={264} y={159} flip />
      <rect className="craft-panel-small" x="245" y="126" width="38" height="28" rx="5" />
    </>
  );
}

function InspectScene() {
  return (
    <>
      <path className="craft-route" d="M38 91h62c22 0 25-28 47-28h28c22 0 25 55 47 55h60" />
      <circle className="craft-node" cx="38" cy="91" r="8" />
      <circle className="craft-accent" cx="161" cy="63" r="8" />
      <circle className="craft-node" cx="282" cy="118" r="8" />
      <Worker x={120} y={164} />
      <rect className="craft-panel-small" x="130" y="119" width="42" height="54" rx="6" />
      <path className="craft-faint" d="M138 131h26M138 141h20M138 151h24" />
      <Worker x={236} y={165} flip />
      <path className="craft-line" d="M225 143l-20-18" />
      <circle className="craft-magnifier" cx="196" cy="119" r="12" />
      <path className="craft-line" d="M205 128l11 11" />
    </>
  );
}

export function CraftIllustration({ variant = "connect", className = "", tone = "light" }: CraftIllustrationProps) {
  return (
    <svg
      className={`craft-illustration craft-${variant} craft-${tone} ${className}`}
      viewBox="0 0 320 220"
      role="img"
      aria-label="Illustration of people improving a business workflow"
    >
      <g className="craft-scene">
        {variant === "connect" && <ConnectScene />}
        {variant === "move" && <MoveScene />}
        {variant === "paint" && <PaintScene />}
        {variant === "inspect" && <InspectScene />}
      </g>
    </svg>
  );
}
