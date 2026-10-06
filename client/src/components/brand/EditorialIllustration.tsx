import type { SVGProps } from "react";
import "./editorial-illustrations.css";

type Variant = "process" | "handoff" | "review";
type Pose = "point" | "carry" | "type" | "review" | "stand";
type Hair = "short" | "wave" | "bun" | "close";

type PersonProps = {
  x: number;
  y: number;
  scale?: number;
  skin: string;
  shirt: string;
  trousers: string;
  hair: Hair;
  pose: Pose;
  accent?: string;
};

function Person({ x, y, scale = 1, skin, shirt, trousers, hair, pose, accent = "#c83927" }: PersonProps) {
  const arms: Record<Pose, [string, string]> = {
    point: ["M31 47 C43 43 51 38 59 32", "M25 48 C18 58 17 66 19 74"],
    carry: ["M31 48 C43 53 48 58 54 65", "M24 49 C17 55 14 61 13 68"],
    type: ["M31 48 C42 55 47 60 49 66", "M24 49 C18 55 20 61 24 66"],
    review: ["M31 48 C40 53 43 59 45 65", "M24 49 C16 53 14 58 16 64"],
    stand: ["M31 48 C38 57 39 64 38 72", "M24 49 C19 58 18 65 19 73"],
  };

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="aim-editorial-person">
      <ellipse cx="27" cy="28" rx="11" ry="12.5" fill={skin} />
      {hair === "short" && <path d="M17 27c1-10 6-14 13-14 7 0 10 5 10 11-4-3-7-4-12-4-4 0-8 2-11 7Z" fill="#1b2230" />}
      {hair === "wave" && <path d="M16 28c0-11 5-16 13-16 9 0 14 6 13 17-4-6-7-8-13-8-5 0-9 2-13 7Zm2 2c-2 7-1 14 4 18l3-9Z" fill="#2b1f2d" />}
      {hair === "bun" && <><circle cx="34" cy="11" r="7" fill="#2a2430" /><path d="M16 29c0-11 5-16 13-16 8 0 13 5 13 15-4-5-8-7-13-7-5 0-9 2-13 8Z" fill="#2a2430" /></>}
      {hair === "close" && <path d="M17 23c2-7 6-10 12-10 7 0 11 4 12 10-4-2-8-3-12-3-5 0-8 1-12 3Z" fill="#17191e" />}
      <path d="M18 43 C21 38 34 38 37 43 L42 78 L13 78 Z" fill={shirt} />
      <path d="M21 78 L19 110 L27 110 L30 82 L33 110 L41 110 L39 78 Z" fill={trousers} />
      <path d={arms[pose][0]} stroke={skin} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d={arms[pose][1]} stroke={skin} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M18 44 C21 39 34 39 37 44" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity=".75" />
      <path d="M19 110h10M32 110h11" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function ProcessScene() {
  return (
    <svg viewBox="0 0 720 430" role="img" aria-label="A team mapping a business process before automation" className="aim-editorial-svg">
      <rect x="70" y="72" width="580" height="274" rx="28" fill="#fffdf9" stroke="#dfd6ce" />
      <path d="M134 213h105" stroke="#d6cec6" strokeWidth="3" strokeDasharray="7 9" />
      <path d="M290 213h110" stroke="#c83927" strokeWidth="4" strokeLinecap="round" />
      <path d="m390 205 12 8-12 8" fill="none" stroke="#c83927" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M450 213h110" stroke="#d6cec6" strokeWidth="3" strokeDasharray="7 9" />
      <rect x="105" y="166" width="104" height="94" rx="18" fill="#f5efe8" stroke="#d9cfc6" />
      <rect x="262" y="146" width="112" height="134" rx="18" fill="#101a31" />
      <rect x="427" y="166" width="104" height="94" rx="18" fill="#f5efe8" stroke="#d9cfc6" />
      <rect x="124" y="188" width="66" height="8" rx="4" fill="#8c99aa" />
      <rect x="124" y="207" width="49" height="7" rx="3.5" fill="#c3bcb5" />
      <rect x="124" y="226" width="58" height="7" rx="3.5" fill="#c3bcb5" />
      <rect x="281" y="171" width="74" height="8" rx="4" fill="#f4b7a8" />
      <rect x="281" y="194" width="52" height="7" rx="3.5" fill="#64748b" />
      <rect x="281" y="215" width="66" height="7" rx="3.5" fill="#64748b" />
      <rect x="281" y="236" width="44" height="7" rx="3.5" fill="#64748b" />
      <circle cx="480" cy="211" r="25" fill="#fff" stroke="#d9cfc6" />
      <path d="m468 211 8 8 18-20" fill="none" stroke="#c83927" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <Person x={38} y={220} skin="#8f5a3f" shirt="#536e9b" trousers="#263247" hair="wave" pose="point" />
      <Person x={538} y={215} skin="#d9a17a" shirt="#d6a23d" trousers="#314154" hair="short" pose="review" />
      <Person x={286} y={288} scale={0.88} skin="#6f432f" shirt="#7f5da8" trousers="#222a38" hair="close" pose="stand" />
      <circle cx="598" cy="106" r="34" fill="#f8e7df" />
      <path d="M586 106h25M598 94v25" stroke="#c83927" strokeWidth="4" strokeLinecap="round" />
      <text x="104" y="126" className="aim-editorial-label">CURRENT WORK</text>
      <text x="263" y="126" className="aim-editorial-label aim-editorial-label-accent">AUTOMATION</text>
      <text x="428" y="126" className="aim-editorial-label">OUTCOME</text>
    </svg>
  );
}

function HandoffScene() {
  return (
    <svg viewBox="0 0 720 430" role="img" aria-label="Business information moving between connected systems" className="aim-editorial-svg">
      <rect x="55" y="68" width="610" height="286" rx="30" fill="#fffdf9" stroke="#dfd6ce" />
      <rect x="103" y="128" width="164" height="144" rx="20" fill="#fff" stroke="#d7cfc8" />
      <rect x="454" y="128" width="164" height="144" rx="20" fill="#101a31" />
      <text x="128" y="161" className="aim-editorial-label">CRM</text>
      <text x="479" y="161" className="aim-editorial-label aim-editorial-label-light">FINANCE</text>
      <rect x="128" y="180" width="83" height="10" rx="5" fill="#23324c" />
      <rect x="128" y="203" width="110" height="7" rx="3.5" fill="#c6bfb8" />
      <rect x="128" y="223" width="71" height="7" rx="3.5" fill="#c6bfb8" />
      <rect x="479" y="182" width="87" height="10" rx="5" fill="#f4b7a8" />
      <rect x="479" y="206" width="103" height="7" rx="3.5" fill="#64748b" />
      <rect x="479" y="226" width="63" height="7" rx="3.5" fill="#64748b" />
      <path d="M267 201 C323 173 396 173 454 201" fill="none" stroke="#c83927" strokeWidth="5" strokeLinecap="round" />
      <path d="m441 190 13 11-17 5" fill="none" stroke="#c83927" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M454 238 C396 267 324 267 267 238" fill="none" stroke="#8c99aa" strokeWidth="3" strokeDasharray="8 8" />
      <circle cx="360" cy="181" r="14" fill="#c83927" />
      <circle cx="344" cy="252" r="10" fill="#101a31" />
      <rect x="326" y="194" width="68" height="42" rx="10" fill="#fff7f2" stroke="#e4c5b9" />
      <path d="M341 207h38M341 218h27" stroke="#c83927" strokeWidth="3" strokeLinecap="round" />
      <Person x={25} y={220} skin="#e0b28b" shirt="#45746d" trousers="#24323c" hair="bun" pose="carry" />
      <Person x={293} y={284} scale={0.9} skin="#5f3a2b" shirt="#c83927" trousers="#222a38" hair="close" pose="type" />
      <Person x={575} y={215} skin="#b97857" shirt="#6d78a7" trousers="#2c3545" hair="short" pose="point" />
      <text x="298" y="105" className="aim-editorial-caption">ONE EVENT → NEXT ACTION → CONFIRMATION</text>
    </svg>
  );
}

function ReviewScene() {
  return (
    <svg viewBox="0 0 720 430" role="img" aria-label="A team reviewing an automated workflow with human approval" className="aim-editorial-svg">
      <rect x="65" y="62" width="590" height="300" rx="30" fill="#101a31" />
      <rect x="115" y="108" width="318" height="196" rx="20" fill="#fff" />
      <rect x="141" y="137" width="116" height="10" rx="5" fill="#1f2d46" />
      <rect x="141" y="164" width="245" height="8" rx="4" fill="#d4cec7" />
      <rect x="141" y="185" width="204" height="8" rx="4" fill="#d4cec7" />
      <rect x="141" y="220" width="96" height="50" rx="12" fill="#f8e7df" />
      <path d="m163 244 12 12 28-34" fill="none" stroke="#c83927" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="273" y="220" width="123" height="50" rx="12" fill="#f4f1ed" />
      <text x="293" y="251" className="aim-editorial-small">APPROVE</text>
      <path d="M433 188h94" stroke="#c83927" strokeWidth="4" strokeLinecap="round" />
      <path d="m515 180 13 8-13 8" fill="none" stroke="#c83927" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="527" y="145" width="82" height="88" rx="18" fill="#1b2944" stroke="#31415e" />
      <circle cx="568" cy="178" r="17" fill="#c83927" opacity=".95" />
      <path d="m560 178 6 6 12-14" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <text x="543" y="214" className="aim-editorial-label aim-editorial-label-light">READY</text>
      <Person x={418} y={235} skin="#7b4b36" shirt="#d1a244" trousers="#202b3b" hair="wave" pose="review" />
      <Person x={538} y={247} scale={0.9} skin="#e0ae86" shirt="#5d6f9e" trousers="#283344" hair="bun" pose="stand" />
      <Person x={77} y={250} scale={0.82} skin="#b77c5c" shirt="#3f756e" trousers="#273240" hair="short" pose="point" />
      <text x="117" y="92" className="aim-editorial-caption aim-editorial-caption-light">AUTOMATION DOES THE REPEATABLE WORK. PEOPLE KEEP THE DECISION.</text>
    </svg>
  );
}

export function EditorialIllustration({ variant, className = "", ...props }: SVGProps<HTMLDivElement> & { variant: Variant }) {
  return (
    <div className={`aim-editorial ${className}`} {...props}>
      {variant === "process" && <ProcessScene />}
      {variant === "handoff" && <HandoffScene />}
      {variant === "review" && <ReviewScene />}
    </div>
  );
}
