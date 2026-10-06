import type { SVGProps } from "react";
import "./editorial-illustrations.css";

type Variant = "process" | "handoff" | "review";
type Hair = "close" | "crop" | "wave" | "bun" | "bob";
type Pose = "present" | "point" | "review" | "type" | "stand";
type Point = [number, number];

type CharacterProps = {
  x: number;
  y: number;
  scale?: number;
  skin: string;
  top: string;
  bottom: string;
  hair: Hair;
  pose: Pose;
  jacket?: string;
  seated?: boolean;
};

type ArmPose = { ls: Point; le: Point; lh: Point; rs: Point; re: Point; rh: Point };

const ARM_POSES: Record<Pose, ArmPose> = {
  present: { ls: [29, 66], le: [20, 72], lh: [15, 88], rs: [57, 66], re: [68, 59], rh: [84, 43] },
  point: { ls: [29, 66], le: [21, 65], lh: [8, 57], rs: [57, 66], re: [69, 65], rh: [83, 70] },
  review: { ls: [29, 66], le: [23, 76], lh: [31, 88], rs: [57, 66], re: [63, 76], rh: [54, 88] },
  type: { ls: [29, 66], le: [27, 77], lh: [39, 84], rs: [57, 66], re: [59, 77], rh: [48, 84] },
  stand: { ls: [29, 66], le: [25, 81], lh: [27, 97], rs: [57, 66], re: [61, 81], rh: [59, 97] },
};

function limbPath(a: Point, b: Point) {
  return `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`;
}

function Character({ x, y, scale = 1, skin, top, bottom, hair, pose, jacket, seated = false }: CharacterProps) {
  const arms = ARM_POSES[pose];
  const sleeve = jacket ?? top;
  const hairShape: Record<Hair, React.ReactNode> = {
    close: <path d="M26 29c2-9 8-14 17-14 9 0 15 6 16 15-5-3-10-5-17-5-6 0-11 1-16 4Z" fill="#17191f" />,
    crop: <path d="M25 31c0-10 6-17 17-17 10 0 17 7 17 17-6-4-11-6-17-6-7 0-12 2-17 6Z" fill="#2a211f" />,
    wave: <><path d="M23 32c0-12 7-20 19-20 11 0 19 8 19 20-6-6-12-8-19-8-8 0-13 2-19 8Z" fill="#2b2024" /><path d="M24 31c-4 12-1 23 6 31l7-14Z" fill="#2b2024" /></>,
    bun: <><circle cx="53" cy="11" r="9" fill="#272129" /><path d="M23 32c0-12 7-20 19-20 11 0 19 8 19 20-6-6-12-8-19-8-8 0-13 2-19 8Z" fill="#272129" /></>,
    bob: <path d="M22 34c0-15 8-23 21-23 13 0 21 9 21 23v17c-6 3-11 4-16 4l-4-19c-4 4-11 6-22 7Z" fill="#342527" />,
  };

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="aim-editorial-person">
      {seated && <><path d="M19 116h50v9H19z" fill="#d9d2ca" /><path d="M27 124v30M61 124v30" stroke="#9a9188" strokeWidth="5" strokeLinecap="round" /></>}

      {/* sleeves first so the torso covers the shoulder joins */}
      <path d={limbPath(arms.ls, arms.le)} stroke={sleeve} strokeWidth="12" strokeLinecap="round" />
      <path d={limbPath(arms.rs, arms.re)} stroke={sleeve} strokeWidth="12" strokeLinecap="round" />

      <ellipse cx="43" cy="39" rx="18" ry="20" fill={skin} />
      <ellipse cx="26" cy="41" rx="3" ry="5" fill={skin} />
      <ellipse cx="60" cy="41" rx="3" ry="5" fill={skin} />
      {hairShape[hair]}
      <circle cx="36" cy="40" r="1.35" fill="#1e2430" /><circle cx="50" cy="40" r="1.35" fill="#1e2430" />
      <path d="M40 49c3 2 6 2 9 0" stroke="#81533f" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M39 56h8v10h-8z" fill={skin} />

      <path d="M28 64 C33 59 52 59 57 64 L62 109 L23 109 Z" fill={top} />
      {jacket && <><path d="M28 64 38 72l-7 37H20l4-37Z" fill={jacket} /><path d="m57 64-10 8 7 37h11l-4-37Z" fill={jacket} /><path d="M43 72v35" stroke="#f4eee7" strokeWidth="1.5" opacity=".65" /></>}

      {/* visible forearms and hands are separate from sleeves: no floating/broken arms */}
      <path d={limbPath(arms.le, arms.lh)} stroke={skin} strokeWidth="8" strokeLinecap="round" />
      <path d={limbPath(arms.re, arms.rh)} stroke={skin} strokeWidth="8" strokeLinecap="round" />
      <circle cx={arms.lh[0]} cy={arms.lh[1]} r="4.3" fill={skin} />
      <circle cx={arms.rh[0]} cy={arms.rh[1]} r="4.3" fill={skin} />

      {seated
        ? <path d="M28 109 21 134h13l9-19 8 19h14l-8-25Z" fill={bottom} />
        : <path d="M26 109 24 151h13l6-34 5 34h13l-1-42Z" fill={bottom} />}
      <path d={seated ? "M20 136h16M50 136h17" : "M22 151h18M46 151h18"} stroke="#151923" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function OfficePlant({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M28 47c-1-19 3-31 12-43M28 44c-9-16-15-26-25-31M30 39c10-15 19-23 31-26" stroke="#6d8067" strokeWidth="3" strokeLinecap="round" /><ellipse cx="10" cy="15" rx="9" ry="5" transform="rotate(32 10 15)" fill="#9aad8d" /><ellipse cx="46" cy="10" rx="10" ry="5" transform="rotate(-32 46 10)" fill="#819a79" /><ellipse cx="57" cy="19" rx="9" ry="5" transform="rotate(-18 57 19)" fill="#a9b99a" /><path d="M12 47h34l-5 29H17Z" fill="#d8a36f" /></g>;
}

function ProcessScene() {
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="A diverse team mapping a business process before automation" className="aim-editorial-svg">
      <rect x="36" y="38" width="688" height="392" rx="32" fill="#f7f3ed" />
      <rect x="140" y="66" width="478" height="246" rx="20" fill="#fff" stroke="#d9d1c9" />
      <text x="170" y="98" className="aim-editorial-caption">MAP THE WORK BEFORE CHOOSING THE TECHNOLOGY</text>
      <rect x="170" y="124" width="112" height="82" rx="14" fill="#f4eee7" stroke="#d8d0c8" />
      <rect x="324" y="116" width="112" height="98" rx="14" fill="#111b31" />
      <rect x="478" y="124" width="112" height="82" rx="14" fill="#f4eee7" stroke="#d8d0c8" />
      <text x="226" y="148" textAnchor="middle" className="aim-editorial-label">CURRENT WORK</text>
      <text x="380" y="143" textAnchor="middle" className="aim-editorial-label aim-editorial-label-light">AUTOMATION</text>
      <text x="534" y="148" textAnchor="middle" className="aim-editorial-label">OUTCOME</text>
      <path d="M282 165h42M436 165h42" stroke="#c83927" strokeWidth="4" strokeLinecap="round" />
      <circle cx="303" cy="165" r="5" fill="#c83927" /><circle cx="457" cy="165" r="5" fill="#c83927" />
      <path d="M193 170h66M193 187h47" stroke="#8c99aa" strokeWidth="5" strokeLinecap="round" />
      <path d="M347 151h66M347 169h54M347 187h71" stroke="#71809a" strokeWidth="5" strokeLinecap="round" />
      <circle cx="534" cy="168" r="22" fill="#fff" stroke="#d9d1c9" /><path d="m523 168 8 8 17-19" stroke="#c83927" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="225" y="329" width="325" height="21" rx="10.5" fill="#c9b8aa" /><path d="M255 349v42M518 349v42" stroke="#8d8075" strokeWidth="8" strokeLinecap="round" />
      <rect x="341" y="308" width="82" height="23" rx="5" fill="#29344a" /><path d="M381 308v-24" stroke="#29344a" strokeWidth="5" />
      <rect x="342" y="276" width="79" height="41" rx="6" fill="#fff" stroke="#d5cdc5" /><path d="M355 289h53M355 301h37" stroke="#c83927" strokeWidth="3" strokeLinecap="round" />
      <Character x={52} y={198} scale={0.92} skin="#6e4332" top="#efe8df" bottom="#223046" hair="close" pose="present" jacket="#25395d" />
      <Character x={565} y={190} scale={0.88} skin="#d6a17e" top="#f0c9b7" bottom="#2f3f52" hair="bob" pose="point" jacket="#be4b38" />
      <Character x={235} y={276} scale={0.76} skin="#b97958" top="#758467" bottom="#2a3445" hair="bun" pose="type" seated />
      <Character x={456} y={274} scale={0.78} skin="#e1b18f" top="#ece7df" bottom="#3a4b59" hair="crop" pose="review" seated jacket="#536e78" />
      <OfficePlant x={640} y={307} scale={0.8} />
    </svg>
  );
}

function HandoffScene() {
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="A team connecting CRM and finance systems with a visible automated hand-off" className="aim-editorial-svg">
      <rect x="34" y="42" width="692" height="386" rx="32" fill="#f8f4ef" />
      <rect x="84" y="104" width="218" height="184" rx="22" fill="#fff" stroke="#d6cec6" />
      <rect x="458" y="104" width="218" height="184" rx="22" fill="#101a31" />
      <text x="112" y="137" className="aim-editorial-label">CRM</text><text x="488" y="137" className="aim-editorial-label aim-editorial-label-light">FINANCE</text>
      <rect x="113" y="158" width="83" height="10" rx="5" fill="#24324a" /><rect x="113" y="181" width="136" height="7" rx="3.5" fill="#c6bfb8" /><rect x="113" y="203" width="92" height="7" rx="3.5" fill="#c6bfb8" /><rect x="113" y="236" width="80" height="22" rx="6" fill="#f5e9e3" />
      <rect x="488" y="158" width="88" height="10" rx="5" fill="#f4b7a8" /><rect x="488" y="181" width="132" height="7" rx="3.5" fill="#64748b" /><rect x="488" y="203" width="91" height="7" rx="3.5" fill="#64748b" /><rect x="488" y="235" width="102" height="24" rx="6" fill="#223250" />
      <path d="M302 174 C346 146 413 146 458 174" fill="none" stroke="#c83927" strokeWidth="5" strokeLinecap="round" /><path d="m445 162 13 12-17 4" fill="none" stroke="#c83927" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M458 232 C413 260 346 260 302 232" fill="none" stroke="#8491a3" strokeWidth="3" strokeDasharray="8 8" />
      <circle cx="380" cy="150" r="15" fill="#c83927" /><circle cx="380" cy="255" r="10" fill="#101a31" />
      <rect x="342" y="184" width="76" height="48" rx="10" fill="#fff7f2" stroke="#e1c8bd" /><text x="380" y="201" textAnchor="middle" className="aim-editorial-small">INVOICE</text><path d="M357 214h47M357 223h31" stroke="#c83927" strokeWidth="3" strokeLinecap="round" />
      <rect x="207" y="329" width="356" height="21" rx="10.5" fill="#c8b7aa" /><path d="M239 349v45M532 349v45" stroke="#8b7f76" strokeWidth="8" strokeLinecap="round" />
      <Character x={31} y={215} scale={0.86} skin="#d8a27c" top="#e7e0d6" bottom="#263547" hair="bun" pose="point" jacket="#566f6d" />
      <Character x={570} y={204} scale={0.9} skin="#6d432f" top="#ece4da" bottom="#202d3e" hair="close" pose="present" jacket="#a84a38" />
      <Character x={319} y={286} scale={0.75} skin="#b87756" top="#d9b05b" bottom="#273547" hair="wave" pose="review" seated />
      <OfficePlant x={655} y={320} scale={0.72} />
      <text x="380" y="78" textAnchor="middle" className="aim-editorial-caption">ONE BUSINESS EVENT → NEXT ACTION → CONFIRMATION BACK</text>
    </svg>
  );
}

function ReviewScene() {
  return (
    <svg viewBox="0 0 760 470" role="img" aria-label="A team reviewing an automated workflow while keeping a human approval point" className="aim-editorial-svg">
      <rect x="33" y="43" width="694" height="384" rx="32" fill="#17233b" stroke="#2d3d5b" />
      <rect x="88" y="86" width="406" height="225" rx="22" fill="#fff" />
      <text x="116" y="118" className="aim-editorial-label">REVIEW BEFORE RELEASE</text>
      <rect x="116" y="139" width="162" height="9" rx="4.5" fill="#24324a" />
      <rect x="116" y="166" width="324" height="7" rx="3.5" fill="#d5cec7" />
      <rect x="116" y="187" width="278" height="7" rx="3.5" fill="#d5cec7" />
      <rect x="116" y="224" width="132" height="55" rx="12" fill="#f8e7df" /><path d="m142 251 12 12 29-35" fill="none" stroke="#c83927" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="276" y="224" width="146" height="55" rx="12" fill="#f2efeb" /><text x="349" y="257" textAnchor="middle" className="aim-editorial-small">HUMAN APPROVAL</text>
      <path d="M494 193h75" stroke="#c83927" strokeWidth="5" strokeLinecap="round" /><path d="m556 182 14 11-17 6" fill="none" stroke="#c83927" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="569" y="148" width="104" height="100" rx="18" fill="#223250" stroke="#41516c" /><circle cx="621" cy="183" r="19" fill="#c83927" /><path d="m612 183 7 7 14-17" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><text x="621" y="223" textAnchor="middle" className="aim-editorial-label aim-editorial-label-light">READY</text>
      <rect x="234" y="334" width="330" height="21" rx="10.5" fill="#6f7785" opacity=".72" /><path d="M267 354v39M530 354v39" stroke="#4e596b" strokeWidth="8" strokeLinecap="round" />
      <Character x={43} y={224} scale={0.86} skin="#8a563e" top="#e8e1d8" bottom="#243249" hair="crop" pose="present" jacket="#455f82" />
      <Character x={544} y={242} scale={0.82} skin="#d7a17c" top="#d9b05b" bottom="#273547" hair="bob" pose="review" />
      <Character x={330} y={290} scale={0.73} skin="#68402f" top="#efe8df" bottom="#243146" hair="close" pose="type" seated jacket="#a84837" />
      <OfficePlant x={660} y={314} scale={0.72} />
      <text x="380" y="73" textAnchor="middle" className="aim-editorial-caption aim-editorial-caption-light">AUTOMATION DOES THE REPEATABLE WORK. PEOPLE KEEP THE DECISION.</text>
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
