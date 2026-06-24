import Link from "next/link";

const POSITIONS = [
  "President",
  "Vice President",
  "Secretary General",
  "Financial Secretary",
  "Public Relations Officer",
];

const STEPS = [
  {
    num: "01",
    title: "Login Securely",
    desc: "Enter your matric number and the password sent to your registered email address.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Review Candidates",
    desc: "Browse every candidate running for office and read their profiles before deciding.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Cast & Confirm",
    desc: "Select your preferred candidates and submit. Your vote is encrypted the moment it's sent.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: "End-to-End Encrypted",
    desc: "Every ballot is encrypted the moment you submit. Not even platform administrators can see your choices.",
    tag: "Security",
    tagClass: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    icon: (
      <svg className="w-6 h-6 text-sky-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    iconBg: "bg-sky-500/10 border-sky-500/15",
  },
  {
    title: "Completely Anonymous",
    desc: "The system records that you voted — never what you voted for. Your identity is cryptographically separated from your ballot.",
    tag: "Privacy",
    tagClass: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    icon: (
      <svg className="w-6 h-6 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    iconBg: "bg-violet-500/10 border-violet-500/15",
  },
  {
    title: "Instant Results",
    desc: "The moment polls close, results are tallied and published in real time. No delays, no gatekeeping.",
    tag: "Transparency",
    tagClass: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    icon: (
      <svg className="w-6 h-6 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    iconBg: "bg-amber-500/10 border-amber-500/15",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#060D08] text-white">

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 px-4 sm:px-6 py-3.5 pointer-events-none">
        <nav className="pointer-events-auto max-w-6xl mx-auto nav-glass border border-white/9 rounded-2xl shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between px-4 sm:px-5 py-2.5">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-ui-gold flex items-center justify-center shrink-0 shadow-md shadow-ui-gold/20 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path
                    d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z"
                    fill="#0A2E1A"
                  />
                </svg>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm leading-tight">FoodTech Voting</p>
                <p className="text-ui-gold text-[9px] leading-tight tracking-wide uppercase">University of Ibadan</p>
              </div>
            </Link>

            {/* Centre: election live status */}
            <div className="hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400/60 animate-pulse" />
              <span className="text-white/50 text-[11px] font-medium tracking-wide">
                Elections Open &nbsp;·&nbsp; 2025/2026
              </span>
            </div>

            {/* Right: CTAs */}
            <div className="flex items-center gap-1.5">
              <Link
                href="/login"
                className="px-4 py-2 text-[13px] font-medium text-white/65 hover:text-white rounded-xl hover:bg-white/7 transition-all"
              >
                Voter Login
              </Link>
              <Link
                href="/admin/login"
                className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold bg-ui-gold text-[#0A2E1A] rounded-xl hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-ui-gold/20"
              >
                Admin Portal
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden lp-grid">

        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="election-glow absolute -top-40 left-1/4 w-[600px] h-[600px]" />
          <div className="gold-glow absolute top-20 right-0 w-[400px] h-[400px]" />
          <div className="election-glow absolute -bottom-20 left-0 w-[300px] h-[300px]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-14 py-24 grid lg:grid-cols-[1fr_420px] gap-16 items-center">

          {/* ── Left: Copy ──────────────────────────────────────── */}
          <div>

            {/* Live badge */}
            <div className="badge-highlight inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-ui-gold animate-pulse" />
              ELECTIONS OPEN &nbsp;·&nbsp; 2025/2026 Session
            </div>

            {/* Headline */}
            <h1 className="font-black leading-[1.04] tracking-tight text-white mb-6">
              <span className="block text-[clamp(2.6rem,7vw,5.5rem)]">Cast Your Vote.</span>
              <span className="block text-[clamp(2.6rem,7vw,5.5rem)]">Shape Your</span>
              <span className="block text-[clamp(2.6rem,7vw,5.5rem)] bg-linear-to-r from-[#C9A84C] via-[#F5D98B] to-[#C9A84C] bg-clip-text text-transparent">
                Department.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-3 max-w-xl">
              Department of Food Technology, Faculty of Agriculture
            </p>
            <p className="text-white/80 font-semibold text-sm mb-10 max-w-xl">
              University of Ibadan &nbsp;·&nbsp; Official Electronic Voting Portal
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ui-gold text-[#0A2E1A] font-bold text-sm hover:opacity-90 transition-all hover:scale-[1.02] shadow-2xl shadow-ui-gold/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Login to Vote
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/15 text-white/80 font-semibold text-sm hover:border-white/35 hover:text-white transition-all"
              >
                How It Works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "End-to-end encrypted", icon: "🔐" },
                { label: "Anonymous ballots", icon: "🛡️" },
                { label: "Results in real time", icon: "⚡" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/8 bg-white/4 text-white/50 text-xs"
                >
                  <span>{t.icon}</span>
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Election Card ─────────────────────────── */}
          <div className="hidden lg:flex justify-center">
            <div className="election-card rounded-3xl p-6 w-full max-w-[380px] relative overflow-visible">

              {/* Glow behind card */}
              <div className="gold-glow absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-40 pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 animate-pulse" />
                    <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-widest">Election Live</span>
                  </div>
                  <p className="text-white/40 text-xs">2025/2026 Academic Session</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-ui-gold/15 border border-ui-gold/25 flex items-center justify-center">
                  <svg className="w-4 h-4 text-ui-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>

              {/* Department */}
              <p className="text-white/80 font-semibold text-sm mb-4 border-b border-white/8 pb-4">
                Dept. of Food Technology, UI
              </p>

              {/* Positions list */}
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-semibold mb-2.5">Open Positions</p>
              <div className="space-y-2 mb-5">
                {POSITIONS.map((pos, i) => (
                  <div key={pos} className="election-row rounded-xl px-3.5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-md bg-ui-gold/10 border border-ui-gold/20 flex items-center justify-center text-[9px] font-bold text-ui-gold shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/75 text-sm">{pos}</span>
                    </div>
                    <svg className="w-3.5 h-3.5 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="border-t border-white/8 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 text-xs">Participation</span>
                  <span className="text-ui-gold text-xs font-bold">74% voted</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <div className="h-full w-[74%] rounded-full bg-linear-to-r from-ui-green-mid to-ui-gold" />
                </div>
                <p className="text-white/25 text-[11px] mt-2">370 of 500 eligible voters</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#060D08] to-transparent pointer-events-none" />
      </section>

      {/* ── Stats strip ────────────────────────────────────────── */}
      <div className="border-y border-white/6 bg-[#060D08]">
        <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-3">

          <div className="text-center px-4">
            <div className="text-[clamp(2.5rem,6vw,4rem)] font-black text-white leading-none mb-2">500+</div>
            <div className="text-white/35 text-xs uppercase tracking-widest font-medium">Registered Voters</div>
          </div>

          <div className="text-center px-4 border-x border-white/7">
            <div className="text-[clamp(2.5rem,6vw,4rem)] font-black text-ui-gold leading-none mb-2">12</div>
            <div className="text-white/35 text-xs uppercase tracking-widest font-medium">Open Positions</div>
          </div>

          <div className="text-center px-4">
            <div className="text-[clamp(2.5rem,6vw,4rem)] font-black text-white leading-none mb-2">2026</div>
            <div className="text-white/35 text-xs uppercase tracking-widest font-medium">Academic Session</div>
          </div>
        </div>
      </div>

      {/* ── How it works ───────────────────────────────────────── */}
      <section id="how-it-works" className="py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 xl:gap-28 items-start">

            {/* ── Left: sticky header ──────────────────────────── */}
            <div className="lg:sticky lg:top-28">
              <span className="tag-pill bg-ui-green-light border-ui-green/20 text-ui-green text-[10px] font-bold tracking-widest inline-flex mb-6">
                Simple &amp; Secure
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-black text-gray-900 leading-[1.08] mb-5">
                Three steps to<br />your ballot
              </h2>
              <p className="text-gray-400 text-[15px] leading-relaxed mb-8 max-w-xs">
                The entire process takes under two minutes — no queues, no paperwork, no confusion.
              </p>

              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-ui-green text-white font-bold text-sm hover:bg-ui-green-mid transition-all hover:scale-[1.02] shadow-xl shadow-ui-green/25"
              >
                Start Voting Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </Link>

              {/* Security note */}
              <div className="mt-10 rounded-2xl bg-[#F0F8F3] border border-ui-green/12 p-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-ui-green/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4.5 h-4.5 text-ui-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-ui-green-dark font-bold text-sm">100% Anonymous &amp; Encrypted</p>
                    <p className="text-ui-green/55 text-xs mt-1 leading-relaxed">
                      Your vote cannot be traced back to you. The system records that you voted — never what you chose.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: vertical timeline ─────────────────────── */}
            <div className="relative">

              {/* Vertical connecting line */}
              <div className="absolute left-5 top-6 h-[calc(100%-3rem)] w-px bg-linear-to-b from-ui-green/30 via-ui-gold/25 to-transparent pointer-events-none" />

              <div className="space-y-5">
                {STEPS.map((item, i) => {
                  const circleColors = [
                    "bg-ui-green text-white shadow-ui-green/30",
                    "bg-ui-gold text-[#0A2E1A] shadow-ui-gold/30",
                    "bg-ui-green-dark text-white shadow-ui-green-dark/20",
                  ];
                  return (
                    <div key={item.num} className="relative flex gap-6 group">

                      {/* Step circle */}
                      <div className={`relative z-10 shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-lg ${circleColors[i]} group-hover:scale-110 transition-transform`}>
                        {i + 1}
                      </div>

                      {/* Card */}
                      <div className="flex-1 howto-card rounded-2xl p-6 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:border-ui-green/20 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-ui-green-light border border-ui-green/15 flex items-center justify-center text-ui-green shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] text-ui-green font-black uppercase tracking-widest mb-1.5">
                              Step {item.num}
                            </p>
                            <h3 className="font-black text-gray-900 text-lg leading-tight mb-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features / Trust ───────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#060D08] lp-grid relative overflow-hidden">

        <div className="election-glow absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="badge-highlight inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest mb-6">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Built for Trust
            </div>
            <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white leading-tight">
              Your vote. Protected.
            </h2>
            <p className="text-white/45 text-base mt-4 max-w-lg mx-auto leading-relaxed">
              We built this platform with privacy and integrity at its core — not as an afterthought.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="lp-feature-card rounded-3xl p-7 hover:bg-white/4 hover:border-white/12 group"
              >
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${f.iconBg}`}>
                  {f.icon}
                </div>
                <span className={`tag-pill mb-4 ${f.tagClass}`}>{f.tag}</span>
                <h3 className="text-white font-bold text-lg mt-3 mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────── */}
      <section className="cta-section relative overflow-hidden py-28 px-6">
        <div className="hero-dot-grid absolute inset-0 opacity-15 pointer-events-none" />
        <div className="hero-decor-circle absolute -top-20 -right-20 w-80 h-80 pointer-events-none" />
        <div className="hero-decor-circle absolute -bottom-16 -left-16 w-64 h-64 pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-ui-gold/15 border border-ui-gold/30 flex items-center justify-center mx-auto mb-8">
            <svg className="w-7 h-7 text-ui-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h2 className="text-[clamp(2.2rem,6vw,3.8rem)] font-black text-white leading-tight mb-4">
            Your voice shapes<br />this department.
          </h2>
          <p className="text-white/55 text-base leading-relaxed mb-10">
            Every election, every vote, every student matters. Log in and make yours count.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-3 px-10 py-4.5 rounded-full bg-ui-gold text-[#0A2E1A] font-black text-base hover:opacity-90 transition-all hover:scale-[1.02] shadow-2xl shadow-black/30"
          >
            Login to Vote Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="lp-footer py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-ui-gold/15 border border-ui-gold/25 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                <path
                  d="M12 2L13.09 8.26L19 6L14.74 10.74L21 12L14.74 13.26L19 18L13.09 15.74L12 22L10.91 15.74L5 18L9.26 13.26L3 12L9.26 10.74L5 6L10.91 8.26L12 2Z"
                  fill="#C9A84C"
                />
              </svg>
            </div>
            <div>
              <p className="text-white/70 text-sm font-semibold">FoodTech Student Voting Platform</p>
              <p className="text-white/30 text-xs">Dept. of Food Technology &nbsp;·&nbsp; University of Ibadan</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="text-white/35 text-xs hover:text-white/70 transition-colors">
              Voter Login
            </Link>
            <Link href="/admin/login" className="text-white/35 text-xs hover:text-white/70 transition-colors">
              Admin Portal
            </Link>
            <span className="text-white/15 text-xs">|</span>
            <p className="text-white/25 text-xs">© {new Date().getFullYear()} University of Ibadan</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
