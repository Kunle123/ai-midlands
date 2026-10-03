export function FlowCue({ direction = "down" }: { direction?: "down" | "right" }) {
  const across = direction === "right";

  return (
    <span className={`flow-cue is-${direction}`} aria-hidden="true">
      <svg width={across ? 28 : 12} height={across ? 12 : 22} viewBox={across ? "0 0 28 12" : "0 0 12 22"} fill="none">
        <path
          d={across ? "M1 6h22M19 2.5 23.5 6 19 9.5" : "M6 1v16M2.5 14 6 18.5 9.5 14"}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
