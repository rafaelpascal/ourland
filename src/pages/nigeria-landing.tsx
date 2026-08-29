import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

interface Institution {
  icon: string;
  name: string;
  desc: string;
}

interface Pillar {
  num: string;
  title: string;
  desc: string;
}

interface NewsItem {
  bg: string;
  category: string;
  title: string;
  desc: string;
  tag: string;
}

interface Value {
  icon: string;
  title: string;
  desc: string;
}

interface TeamMember {
  initial: string;
  name: string;
  role: string;
}

// ── Data ──────────────────────────────────────────────────────────────
const INSTITUTIONS: Institution[] = [
  {
    icon: "🗳️",
    name: "INEC",
    desc: "Independent National Electoral Commission must conduct elections free from executive interference, funding manipulation, or partisan bias.",
  },
  {
    icon: "⚖️",
    name: "The Judiciary",
    desc: "Courts must dispense justice without fear or favour — free from political appointments that compromise their impartiality.",
  },
  {
    icon: "🔍",
    name: "EFCC",
    desc: "The Economic and Financial Crimes Commission must investigate corruption across all parties — not selectively target political opponents.",
  },
  {
    icon: "🛡️",
    name: "ICPC",
    desc: "The Independent Corrupt Practices Commission must operate without direction from the Presidency or any political interest.",
  },
  {
    icon: "🏛️",
    name: "National Assembly",
    desc: "Nigeria's Senate and House of Representatives must exercise genuine legislative independence and oversight over the Executive.",
  },
  {
    icon: "📋",
    name: "State Assemblies",
    desc: "State Houses of Assembly must be empowered to hold Governors to account and resist executive bulldozing of democratic processes.",
  },
  {
    icon: "📢",
    name: "Media & Civil Society",
    desc: "A free press and vibrant civil society are essential checks on power — we advocate for their protection and legal empowerment.",
  },
  {
    icon: "🏦",
    name: "CBN & Financial Bodies",
    desc: "Financial regulatory institutions must maintain policy independence to serve the Nigerian economy, not political expedience.",
  },
];

const PILLARS: Pillar[] = [
  {
    num: "01",
    title: "Civic Education",
    desc: "We empower Nigerian citizens with knowledge of their constitutional rights, the role of each institution, and how to demand accountability from their representatives.",
  },
  {
    num: "02",
    title: "Legislative Advocacy",
    desc: "We engage lawmakers at federal and state levels, presenting evidence-based proposals to strengthen institutional independence through law and regulation.",
  },
  {
    num: "03",
    title: "Institutional Monitoring",
    desc: "We track, document, and publicly report on interference, undue influence, and departures from the rule of law in our key national institutions.",
  },
  {
    num: "04",
    title: "Coalition Building",
    desc: "We unite civil society groups, professional bodies, religious organisations, and concerned citizens across Nigeria into a powerful, non-partisan chorus for reform.",
  },
];

const NEWS_ITEMS: NewsItem[] = [
  {
    bg: "from-emerald-950 to-green-950",
    category: "Electoral Reform",
    title: "Why INEC Independence is Non-Negotiable for Free Elections",
    desc: "When electoral commissioners answer to those in power, the vote of every Nigerian is devalued. Here's what genuine INEC independence looks like in practice.",
    tag: "Civic Education",
  },
  {
    bg: "from-slate-950 to-indigo-950",
    category: "Judiciary",
    title: "Judicial Appointments: How Politics Corrupts the Bench",
    desc: "A deep look at how executive influence in judicial appointments undermines the principle that no man is above the law — and what reforms are needed.",
    tag: "Analysis",
  },
  {
    bg: "from-amber-950 to-orange-950",
    category: "Anti-Corruption",
    title: "Selective Justice: When Anti-Corruption Becomes a Political Weapon",
    desc: "The EFCC and ICPC should be feared by every corrupt official regardless of party. We examine the gap between this ideal and current reality.",
    tag: "Accountability",
  },
];

const VALUES: Value[] = [
  {
    icon: "⚖️",
    title: "Fairness & Equal Justice",
    desc: "The law must apply equally to every Nigerian, regardless of rank, party, or privilege.",
  },
  {
    icon: "🔍",
    title: "Transparency & Accountability",
    desc: "Public institutions must open their operations to public scrutiny and answer for their decisions.",
  },
  {
    icon: "🤝",
    title: "Non-Partisanship",
    desc: "We call out wrongdoing across all party lines — APC, PDP, Labour, or any other. Power must always be checked.",
  },
  {
    icon: "🌍",
    title: "Pan-Nigerian Unity",
    desc: "North or South, Christian or Muslim, Igbo, Hausa, or Yoruba — institutional independence benefits every single Nigerian.",
  },
];

const TEAM: TeamMember[] = [
  { initial: "A", name: "Agahiu Amos", role: "National Coordinator" },
  { initial: "M", name: "Musa Abubakar", role: "Northern Region Lead" },
  { initial: "T", name: "Tokunbo Fasanya", role: "Legal Advisor" },
  { initial: "C", name: "Chidi Eze", role: "Communications Director" },
];

const MARQUEE_ITEMS = [
  "Independent INEC",
  "Free Judiciary",
  "Accountable EFCC",
  "Transparent ICPC",
  "Sovereign Legislature",
  "Justice for All Nigerians",
  "No Executive Interference",
  "Citizens-Powered Democracy",
];

// ── Hooks ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Sub-components ──────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      }}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}
    >
      {centered && <span className="h-px w-10 bg-emerald-600 block" />}
      <span className="text-emerald-500 text-xs font-bold tracking-[0.22em] uppercase">
        {children}
      </span>
      <span className="h-px w-10 bg-emerald-600 block" />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Mission", href: "#mission" },
    { label: "Institutions", href: "#institutions" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950 border-b-2 border-amber-500">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-black text-lg tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          <span className="text-amber-400">FOI</span>
          <span className="text-white"> Nigeria</span>
        </a>
        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-neutral-400 hover:text-amber-300 text-xs font-semibold tracking-[0.12em] uppercase transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold tracking-[0.1em] uppercase px-5 py-2.5 rounded-sm transition-colors"
            >
              Join Us
            </a>
          </li>
        </ul>
        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
          <span className="block w-6 h-0.5 bg-white" />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-neutral-950 border-t border-amber-500/30 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-neutral-400 hover:text-amber-300 text-sm font-semibold tracking-widest uppercase transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-amber-500 text-neutral-950 text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-sm text-center"
          >
            Join Us
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen bg-neutral-950 flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center overflow-hidden">
      {/* Horizontal rules background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, #fff 39px, #fff 40px)",
        }}
      />
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-700 via-amber-400 to-emerald-700" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Tag */}
        <div
          className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-bold tracking-[0.18em] uppercase px-4 py-2 rounded-sm mb-8"
          style={{ animation: "fadeUp 0.8s 0.1s both" }}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Nigeria Citizens Movement
        </div>

        <h1
          className="text-white font-black leading-[1.05] mb-6"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            animation: "fadeUp 0.8s 0.25s both",
          }}
        >
          Free Our
          <br />
          Institutions.
          <br />
          <span className="text-amber-400">Reclaim Our Future.</span>
        </h1>

        <div
          className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-400 mx-auto mb-8"
          style={{ animation: "fadeUp 0.8s 0.4s both" }}
        />

        <p
          className="text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontStyle: "italic",
            animation: "fadeUp 0.8s 0.5s both",
          }}
        >
          Working together to ensure INEC, EFCC, ICPC, the Judiciary, and our
          National Assemblies are fully independent — free from executive
          control, party manipulation, and personal interference.
        </p>

        <div
          className="flex flex-wrap gap-4 justify-center"
          style={{ animation: "fadeUp 0.8s 0.65s both" }}
        >
          <button
            onClick={() => navigate(ROUTES.FORM)}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-sm transition-all hover:-translate-y-0.5"
          >
            Sumit Information
          </button>
          <a
            href="#mission"
            className="border border-white/25 hover:border-amber-400 text-white hover:text-amber-400 text-sm font-semibold tracking-widest uppercase px-8 py-4 rounded-sm transition-all"
          >
            Our Mission
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-600">
        <div className="w-px h-10 bg-gradient-to-b from-neutral-600 to-transparent animate-pulse" />
        <span className="text-[10px] tracking-[0.18em] uppercase">Scroll</span>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="bg-emerald-700 overflow-hidden py-3">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 30s linear infinite" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-white/90 text-xs font-bold tracking-[0.18em] uppercase mx-8 flex-shrink-0"
          >
            <span className="text-amber-300 mr-2">★</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  );
}

function Mission() {
  return (
    <section
      id="mission"
      className="bg-stone-50 border-t-[6px] border-neutral-950 py-24 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <FadeIn>
          <SectionEyebrow>Our Mission</SectionEyebrow>
          <h2
            className="font-black leading-tight text-neutral-900 mb-6"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
            }}
          >
            Building A Nigeria Where Institutions Serve the People
          </h2>
          <p
            className="text-neutral-600 leading-relaxed mb-4"
            style={{ fontFamily: "'Georgia', serif", fontSize: "1.02rem" }}
          >
            We are a citizens-driven movement united by one purpose: to ensure
            that Nigeria's critical national institutions operate with complete
            independence from the Executive, political parties, and any form of
            personal influence or manipulation.
          </p>
          <p
            className="text-neutral-600 leading-relaxed mb-4"
            style={{ fontFamily: "'Georgia', serif", fontSize: "1.02rem" }}
          >
            True democracy requires that electoral bodies, anti-corruption
            agencies, the judiciary, and our legislative assemblies answer to
            the Constitution and the Nigerian people — not to whoever holds
            power at any given moment.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              ["36+", "States Active"],
              ["7", "Institutions Monitored"],
              ["100K+", "Citizens Engaged"],
            ].map(([num, lbl]) => (
              <div
                key={lbl}
                className="bg-white border border-stone-200 p-4 text-center"
              >
                <span
                  className="block text-3xl font-black text-emerald-700"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {num}
                </span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider mt-1 block">
                  {lbl}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="bg-neutral-950 border-l-4 border-amber-500 p-8 relative">
            <span
              className="absolute -top-6 left-6 font-black text-8xl text-amber-500/20 leading-none select-none"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              "
            </span>
            <p
              className="text-white font-bold leading-relaxed text-lg relative z-10"
              style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}
            >
              No nation can thrive when its referees are owned by the players.
              Independence is not a privilege — it is the foundation of justice.
            </p>
            <cite className="block mt-5 text-amber-400 text-xs font-bold tracking-widest uppercase not-italic">
              — FOI Nigeria Founding Charter
            </cite>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Institutions() {
  return (
    <section id="institutions" className="bg-neutral-950 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-12">
            <SectionEyebrow centered>Institutions We Champion</SectionEyebrow>
            <h2
              className="font-black text-white leading-tight"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              }}
            >
              Every Institution. Fully Independent. Accountable to Nigerians.
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {INSTITUTIONS.map((inst, i) => (
            <FadeIn key={inst.name} delay={i * 0.07}>
              <div className="group bg-neutral-950 p-7 border border-white/5 hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden cursor-default h-full">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-11 h-11 flex items-center justify-center bg-amber-500/10 border border-amber-500/25 rounded-sm mb-5 text-lg">
                  {inst.icon}
                </div>
                <h3 className="text-amber-300 font-bold text-base mb-3 tracking-wide">
                  {inst.name}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {inst.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="bg-stone-100 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-xl mx-auto mb-14">
            <SectionEyebrow centered>How We Work</SectionEyebrow>
            <h2
              className="font-black text-neutral-900 leading-tight"
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              }}
            >
              Our Four Pillars of Action
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PILLARS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.1}>
              <div className="border-t-[3px] border-emerald-600 pt-7">
                <div
                  className="text-6xl font-black text-emerald-600/15 leading-none mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {p.num}
                </div>
                <h3
                  className="font-bold text-xl text-neutral-900 mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  return (
    <section
      id="updates"
      className="bg-white border-t border-stone-200 py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionEyebrow>Information & Updates</SectionEyebrow>
          <h2
            className="font-black text-neutral-900 mb-10"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            }}
          >
            Sharing What Nigerians Need to Know
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.12}>
              <div className="group cursor-pointer">
                <div
                  className={`aspect-video bg-gradient-to-br ${item.bg} flex items-center justify-center relative mb-5 overflow-hidden`}
                >
                  <span className="absolute top-4 left-4 bg-amber-500 text-neutral-900 text-[10px] font-bold tracking-widest uppercase px-2 py-1">
                    {item.category}
                  </span>
                  <span className="text-4xl opacity-25">📰</span>
                </div>
                <h3
                  className="font-bold text-neutral-900 leading-snug mb-3 text-lg border-b border-transparent group-hover:border-emerald-600 group-hover:text-emerald-800 transition-all pb-1"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider mt-4 font-semibold">
                  {item.tag} • Read More →
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <div className="bg-emerald-700 relative overflow-hidden py-20 px-6 text-center">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 30px, #fff 30px, #fff 31px)",
        }}
      />
      <div className="relative max-w-xl mx-auto">
        <h2
          className="font-black text-white mb-4"
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          }}
        >
          Nigeria Belongs to All of Us.
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Join thousands of citizens speaking up for institutional independence,
          accountability, and justice.
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-emerald-800 font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm hover:bg-stone-100 transition-colors"
        >
          Become a Member Today
        </a>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="bg-neutral-950 py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <FadeIn>
          <SectionEyebrow>About Us</SectionEyebrow>
          <h2
            className="font-black text-white leading-tight mb-6"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            }}
          >
            Who We Are &amp; Why We Fight
          </h2>
          <p className="text-neutral-400 leading-relaxed mb-4 text-sm">
            We are a non-partisan, non-governmental citizens movement founded by
            Nigerians who believe that the health of our democracy depends on
            the true independence of our national institutions.
          </p>
          <p className="text-neutral-400 leading-relaxed mb-4 text-sm">
            Our founders span diverse backgrounds — lawyers, teachers, market
            traders, civil servants, journalists, and students — all united by
            the conviction that Nigeria's institutions must serve the
            Constitution, not the convenient interests of those temporarily in
            power.
          </p>
          <p className="text-neutral-400 leading-relaxed mb-8 text-sm">
            We are not affiliated with any political party. We hold no brief for
            any administration. Our only loyalty is to the Nigerian people and
            the principles of accountability, fairness, and equal justice before
            the law.
          </p>
          <div className="divide-y divide-white/5">
            {VALUES.map((v, i) => (
              <div key={i} className="flex gap-4 py-4">
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-emerald-700/20 rounded-sm text-base">
                  {v.icon}
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">
                    {v.title}
                  </h4>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h3 className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-6">
            Our Leadership Team
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {TEAM.map((member, i) => (
              <div
                key={i}
                className="bg-white/[0.04] border border-white/[0.08] border-t-2 border-t-amber-500 p-5"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl text-white mb-4"
                  style={{
                    background: "linear-gradient(135deg, #005A2B, #C8992A)",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  {member.initial}
                </div>
                <h4 className="text-white text-sm font-bold mb-1">
                  {member.name}
                </h4>
                <span className="text-amber-400 text-[11px] uppercase tracking-wider">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 bg-emerald-700/10 border border-emerald-700/25 border-l-2 border-l-emerald-500">
            <p className="text-neutral-400 text-sm leading-relaxed">
              <strong className="text-white">Our Commitment:</strong> All
              decisions are made collectively by a national steering committee.
              We publish annual reports and financial disclosures to ensure full
              transparency to our members and the public.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fname, lname, email, subject, message } = form;
    if (!fname || !lname || !email || !subject || !message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 bg-stone-100 border border-stone-200 text-neutral-800 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-100 transition-all rounded-none";
  const labelClass =
    "block text-[11px] font-bold tracking-widest uppercase text-neutral-400 mb-2";

  return (
    <section id="contact" className="bg-stone-100 py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
        {/* Info */}
        <FadeIn className="lg:col-span-2">
          <SectionEyebrow>Contact Us</SectionEyebrow>
          <h2
            className="font-black text-neutral-900 leading-tight mb-5"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
            }}
          >
            Get Involved. Make Your Voice Heard.
          </h2>
          <p className="text-neutral-500 text-sm leading-relaxed mb-6">
            Whether you want to join the movement, share information, report
            institutional abuse, or partner with us — we want to hear from you.
            Every voice strengthens our collective demand for change.
          </p>
          {[
            {
              icon: "✉️",
              label: "Email Us",
              value: "save.our.land.ng@gmail.com",
            },
            {
              icon: "📱",
              label: "WhatsApp Hotline",
              value: "+234 8053280920",
            },
            {
              icon: "📍",
              label: "National Office",
              value: "Abuja, FCT — Nigeria",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 items-start py-4 border-t border-stone-200"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-neutral-950 text-amber-400 rounded-sm">
                {item.icon}
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold mb-0.5">
                  {item.label}
                </div>
                <div className="text-neutral-900 text-sm font-bold">
                  {item.value}
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 p-4 bg-amber-50 border-l-2 border-amber-400">
            <p className="text-amber-800 text-xs leading-relaxed">
              <strong>Share Information Safely:</strong> If you have credible
              information about interference in any national institution,
              contact us via our secure channel. Your identity will be
              protected.
            </p>
          </div>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.15} className="lg:col-span-3">
          <div className="bg-white border-t-4 border-emerald-600 shadow-sm p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <h3
                  className="font-black text-2xl text-emerald-700 mb-3"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Message Received!
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. Our team will get back to you
                  within 48 hours. Together, we will build the Nigeria we
                  deserve.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="font-black text-xl text-neutral-900 mb-6"
                  style={{ fontFamily: "'Georgia', serif" }}
                >
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={labelClass}>First Name *</label>
                      <input
                        name="fname"
                        value={form.fname}
                        onChange={handleChange}
                        placeholder="Emeka"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name *</label>
                      <input
                        name="lname"
                        value={form.lname}
                        onChange={handleChange}
                        placeholder="Okafor"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className={labelClass}>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-4">
                    <label className={labelClass}>Phone / WhatsApp</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234 801 234 5678"
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-4">
                    <label className={labelClass}>Subject *</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">-- Select a topic --</option>
                      <option>Join the Movement</option>
                      <option>Share Information / Report</option>
                      <option>Media Enquiry</option>
                      <option>Partnership & Collaboration</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className={labelClass}>Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us how you'd like to get involved, or share what's on your mind…"
                      className={inputClass + " resize-none"}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-neutral-950 hover:bg-emerald-800 text-white text-sm font-bold tracking-widest uppercase py-4 transition-colors"
                  >
                    Send Message →
                  </button>
                </form>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a0a08] border-t-[3px] border-amber-500 pt-14 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <h3
            className="font-black text-xl text-white mb-3"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            <span className="text-amber-400">FOI</span> Nigeria
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed">
            Free Our Institutions Nigeria is a non-partisan citizens movement
            dedicated to ensuring the independence, accountability, and
            integrity of Nigeria's national institutions.
          </p>
          <div className="flex gap-1 mt-4">
            {["#008751", "#FFFFFF", "#008751"].map((c, i) => (
              <div key={i} className="w-2 h-5" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 list-none">
            {[
              ["#mission", "Our Mission"],
              ["#institutions", "Institutions"],
              ["#updates", "Updates"],
              ["#about", "About Us"],
              ["#contact", "Contact"],
            ].map(([href, label]) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-neutral-500 hover:text-white text-sm transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            Get Involved
          </h4>
          <ul className="space-y-2 list-none">
            {[
              "Join the Movement",
              "Share Information",
              "Volunteer",
              "Donate",
              "Partner With Us",
            ].map((label) => (
              <li key={label}>
                <a
                  href="#contact"
                  className="text-neutral-500 hover:text-white text-sm transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-neutral-600 text-xs">
          © {new Date().getFullYear()} Free Our Institutions Nigeria. All rights
          reserved. Non-partisan. Citizens-powered.
        </p>
        <p className="text-neutral-600 text-xs">
          Built for the Nigerian people. 🇳🇬
        </p>
      </div>
    </footer>
  );
}

// ── Main App ──────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Nav />
      <Hero />
      <Marquee />
      <Mission />
      <Institutions />
      <Pillars />
      <NewsSection />
      <CTABanner />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
