import React, { useState } from 'react';
import { 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Globe2, 
  Compass, 
  CheckCircle2, 
  XCircle,
  MapPin,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface Screen05AboutProps {
  onGoToDashboard: () => void;
}

export const Screen05About: React.FC<Screen05AboutProps> = ({ onGoToDashboard }) => {
  const [isReferencesExpanded, setIsReferencesExpanded] = useState<boolean>(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 lg:py-14 space-y-16 md:space-y-24 text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* ========================================================================= */}
      {/* 1. HERO — THE IDEA, NOT THE PRODUCT MANUAL */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-4 md:pt-8"
        aria-label="About Hero"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          The Idea Behind SANKET
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] mb-6 max-w-3xl mx-auto">
          “Some of the most important financial signals are the ones we almost miss.”
        </h1>

        <p className="text-base md:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
          Somewhere between a repayment date, a savings balance, a migration cycle and a household’s lived reality, there is often a signal that conventional systems cannot see.
        </p>

        <div className="inline-block p-6 rounded-2xl bg-[#eef7f4] border border-emerald-200/90 shadow-xs max-w-xl mx-auto">
          <p className="text-sm md:text-base font-serif italic text-stone-800 mb-1">
            <span className="font-semibold not-italic font-sans text-emerald-900">“Sanket”</span> means <span className="font-semibold not-italic text-stone-900">“signal”</span> or <span className="font-semibold not-italic text-stone-900">“indication”</span>.
          </p>
          <p className="text-xs md:text-sm text-stone-500 font-medium">
            That became more than a name. It became the idea behind the platform.
          </p>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 2. WHY THE NAME “SANKET”? */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative bg-white rounded-3xl border border-stone-200/90 p-8 md:p-12 shadow-sm overflow-hidden"
        aria-label="Why the name Sanket"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-stone-100 mb-8">
          <div>
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block mb-2">
              ETYMOLOGY &amp; MEANING
            </span>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-950 tracking-tight">
                SANKET
              </h2>
              <span className="text-xl md:text-2xl font-serif text-emerald-800/80 font-normal">
                संकेत / ସଙ୍କେତ
              </span>
            </div>
          </div>
          <div className="text-xs font-mono text-stone-400 max-w-xs md:text-right">
            Sanskrit · Odia · Hindi resonance: a meaningful sign in time
          </div>
        </div>

        <div className="space-y-5 text-sm md:text-base text-stone-700 leading-relaxed max-w-2xl">
          <p>
            In Sanskrit, and in its resonance across Odia and Hindi, <strong>Sanket</strong> refers to a signal, indication or sign.
          </p>
          <p className="text-stone-600">
            Financial systems already generate countless signals:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-4 text-xs font-mono text-stone-800">
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              A repayment may be made.
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              A balance may change.
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              Savings may rise.
            </div>
            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              Income may arrive.
            </div>
          </div>
          <p>
            But a signal only becomes useful when it is understood in context.
          </p>
          <p>
            That is the idea behind Sanket. We are not trying to create another number that claims to describe a household.
          </p>
          <p className="font-medium text-stone-900">
            We are trying to make the meaningful signal visible at the moment it can help someone make a better decision.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
          <div className="font-serif italic text-xl md:text-2xl text-emerald-950 font-bold tracking-tight">
            “Not a verdict. A signal.”
          </div>
          <div className="hidden sm:flex items-center gap-1 text-emerald-700">
            <Activity className="w-5 h-5 text-emerald-600 animate-pulse" />
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 3. WHY SANKET */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
        aria-label="Why Sanket"
      >
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block mb-2">
            THE MOTIVATION
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-stone-950 tracking-tight mb-2">
            Why Sanket?
          </h2>
          <p className="text-base md:text-lg text-emerald-900 font-medium font-serif italic">
            Because financial lives rarely fit neatly into financial systems.
          </p>
        </div>

        <div className="bg-stone-50/80 rounded-3xl p-6 md:p-10 border border-stone-200 space-y-6 text-sm md:text-base text-stone-700 leading-relaxed">
          <p>
            While working through the financial-health challenge, one thing became increasingly clear: the problem was not simply a lack of data.
          </p>
          <p className="text-lg font-serif font-bold text-stone-900">
            It was the lack of context.
          </p>
          <p>
            A household could appear financially stable in one system while facing severe pressure somewhere else. A repayment record could tell us what happened, but not always why. A monthly income figure could look sufficient while completely missing the months in which cash actually arrives.
          </p>
          <p>
            That led us toward a different way of thinking.
          </p>
          
          {/* Highlighted pale editorial focus box */}
          <div className="p-6 md:p-7 rounded-2xl bg-[#f2f8f4] border border-emerald-200/90 shadow-xs ring-1 ring-emerald-900/5 transition-all">
            <p className="text-stone-950 font-serif text-base md:text-lg leading-relaxed font-medium">
              Financial health is not a single transaction, a single score, or a single moment. It is behaviour over time, shaped by timing, resilience, obligations, confidence, and the realities of everyday life.
            </p>
          </div>

          {/* 4 Evidence-Backed Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            
            <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex flex-col justify-between">
              <p className="text-xs text-stone-700 leading-relaxed mb-3">
                Research from financial diary work showed how irregular wages and lump-sum income can clash with rigid financial-product schedules.
              </p>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800">
                Design influence: Financial Diaries
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex flex-col justify-between">
              <p className="text-xs text-stone-700 leading-relaxed mb-3">
                Work on financial health measurement reinforced that access alone does not tell us whether people are actually becoming financially healthier.
              </p>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800">
                Informed by financial-health research: FinHealth Framework
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex flex-col justify-between">
              <p className="text-xs text-stone-700 leading-relaxed mb-3">
                Research around user-centred financial services showed the importance of understanding barriers such as liquidity stress, confidence, documentation and lived experience.
              </p>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800">
                Field research: User-centred financial services
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-stone-200/80 flex flex-col justify-between">
              <p className="text-xs text-stone-700 leading-relaxed mb-3">
                Work on models such as FinHealth Score and Core + Local approaches demonstrated the value of combining common financial-health dimensions with context-specific signals.
              </p>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-800">
                Core + Local methodology: Finverse alignment
              </span>
            </div>

          </div>

          <p className="pt-2 text-stone-900 font-medium font-serif italic text-base md:text-lg">
            That is why Sanket needed to exist.
          </p>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 4. A SMALL “THINKING BEHIND THE DESIGN” MOMENT */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-emerald-950 text-emerald-50 rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden"
        aria-label="Thinking Behind the Design"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl">
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-300 uppercase block mb-3">
            PARADIGM SHIFT
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
            We started asking a different question.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800/80">
              <div className="text-[11px] font-mono font-semibold text-emerald-300 uppercase mb-1">
                Instead of
              </div>
              <p className="text-base md:text-lg font-serif italic text-emerald-100">
                “Will this household repay?”
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-800/80 border border-emerald-500/50 shadow-inner">
              <div className="text-[11px] font-mono font-semibold text-emerald-200 uppercase mb-1">
                We ask
              </div>
              <p className="text-base md:text-lg font-serif italic text-white font-bold">
                “What does this household need right now?”
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-sm md:text-base text-emerald-100 font-sans leading-relaxed">
            <p className="text-emerald-200 mb-2">
              That shift changes what the system looks for:
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>It makes <strong>timing</strong> matter.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>It makes <strong>context</strong> matter.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>It makes <strong>financial health</strong> matter.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>And it makes the <strong>human decision-maker</strong> matter.</span>
            </p>
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 5. WHY ODISHA? (GEOGRAPHIC CONTEXT) */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#eef7f4] rounded-3xl border border-emerald-200/90 p-8 md:p-12 shadow-xs"
        aria-label="Why Odisha"
      >
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-emerald-800" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase">
            GEOGRAPHIC CONTEXT
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-2">
          Why Odisha?
        </h2>
        <p className="text-base md:text-lg font-serif italic text-emerald-950 mb-6 font-medium">
          “Because the problem becomes visible here.”
        </p>

        <div className="space-y-4 text-sm md:text-base text-stone-700 leading-relaxed max-w-2xl">
          <p>
            Odisha presents a vivid meeting point between high institutional financial inclusion and sharp seasonal volatility. While SHG federations and microfinance networks reach deep into the state, household financial lives remain intensely shaped by migration cycles, monsoon agriculture, and informal remittance corridors.
          </p>

          {/* Highlighted focus box with contrasting white interior */}
          <div className="p-5 md:p-6 rounded-2xl bg-white border border-stone-300/80 shadow-xs ring-1 ring-stone-900/5 my-5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              Phase 2 Evidence Base
            </div>
            <p className="text-sm md:text-base font-semibold text-stone-950 leading-snug">
              Our Phase 2 evidence base points to 700,000+ seasonal migrants across selected Odisha districts, with prominent corridors anchored in Ganjam, Kalahandi, Gajapati, and Kandhamal.
            </p>
          </div>

          <p>
            In these districts, seasonal income and remittance timing represent the single most critical blind spot for conventional credit assessment. When cash arrives in lump sums before harvest or festival seasons, uniform monthly loan obligations induce artificial distress.
          </p>

          <p className="font-serif italic text-stone-900 text-base md:text-lg pt-2">
            “Odisha gives Sanket a very specific starting point, but the underlying question is much larger: What happens when financial products are designed around smooth income, while financial lives are anything but smooth?”
          </p>

          <p className="font-mono text-xs text-emerald-900 font-bold uppercase tracking-wider pt-2">
            We start local because context matters.
          </p>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 6. WHY GFTN INDIA? (ECOSYSTEM ENABLER) */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-xs"
        aria-label="Why GFTN India"
      >
        <div className="flex items-center gap-2 mb-3">
          <Globe2 className="w-4 h-4 text-emerald-800" />
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase">
            ECOSYSTEM ENABLER
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-2">
          Why GFTN India?
        </h2>
        <p className="text-base md:text-lg font-serif italic text-emerald-950 mb-6 font-medium">
          “Because Sanket was never meant to stand alone.”
        </p>

        <div className="space-y-5 text-sm md:text-base text-stone-700 leading-relaxed max-w-2xl">
          <p>
            GFTN — the <strong>Global Finance &amp; Technology Network</strong> — is a Singapore-headquartered organisation established by the Monetary Authority of Singapore in 2024, operating as an ecosystem builder across technology, finance, policy, innovation and global collaboration.
          </p>

          <p>
            In Odisha, GFTN’s <strong>BharatNetra / I-GFTCH</strong> ecosystem connects innovation, global finance, startups, capability building, and policy institutions. In this architecture, GFTN India acts not as a frontline balance-sheet lender, but as an ecosystem catalyst connecting technology innovators with underserved communities.
          </p>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 my-4">
            <p className="text-stone-800 leading-relaxed text-xs md:text-sm">
              A traditional financial institution can build a solution around its own customers, systems and portfolio. Sanket is designed with a broader ambition: it sits one layer above the individual workflow — as an intelligence layer that can potentially help different ecosystem participants interpret financial-health signals through a common architecture while preserving the governance and context of each institution.
            </p>
          </div>
        </div>

        {/* Redesigned Purpose-Built Ecosystem Intelligence Graphic */}
        <div className="my-8 rounded-2xl bg-stone-950 text-white p-6 md:p-8 border border-stone-800 shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400">
                Ecosystem Intelligence Topology
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              GFTN India · SANKET Layer
            </span>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-stone-900/90 border border-stone-800/90 hover:border-emerald-500/40 transition-colors gap-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center font-mono text-[10px] font-bold border border-stone-700">01</span>
                <div>
                  <div className="text-xs font-bold text-stone-200">Ecosystem Enablers</div>
                  <div className="text-[11px] text-stone-400">GFTN BharatNetra / I-GFTCH Infrastructure &amp; Innovation Platforms</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-emerald-400 w-fit self-start sm:self-auto">Catalyst</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-stone-900/90 border border-stone-800/90 hover:border-emerald-500/40 transition-colors gap-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center font-mono text-[10px] font-bold border border-stone-700">02</span>
                <div>
                  <div className="text-xs font-bold text-stone-200">Institutional Participants</div>
                  <div className="text-[11px] text-stone-400">FSPs, MFIs, Rural Banks, SHG Federations &amp; Fintech Startups</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 w-fit self-start sm:self-auto">Frontline Networks</span>
            </div>

            {/* Core Layer: SANKET */}
            <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/60 shadow-md ring-1 ring-emerald-400/20">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500 text-emerald-950 flex items-center justify-center font-mono text-[10px] font-extrabold">03</span>
                  <span className="text-sm font-bold font-serif text-emerald-100">SANKET Intelligence Layer</span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-400 text-emerald-950">Active Core</span>
              </div>
              <p className="text-xs text-emerald-200/90 pl-8 leading-relaxed">
                Multidimensional financial-health evaluation combining seasonal cashflow timing, vulnerability indicators, and policy boundaries.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-stone-900/90 border border-stone-800/90 hover:border-emerald-500/40 transition-colors gap-2">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-400 flex items-center justify-center font-mono text-[10px] font-bold border border-stone-700">04</span>
                <div>
                  <div className="text-xs font-bold text-stone-200">Household Context &amp; Temporal Timing</div>
                  <div className="text-[11px] text-stone-400">Ganjam, Kalahandi, Gajapati &amp; Kandhamal migration cycles mapped</div>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 w-fit self-start sm:self-auto">Lived Realities</span>
            </div>

            {/* Step 5: Final Outcome */}
            <div className="p-3.5 rounded-xl bg-emerald-900/70 border border-emerald-600/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 flex items-center justify-center font-mono text-[10px] font-bold">05</span>
                <div className="text-xs font-bold text-emerald-100">
                  Better-Informed Human Decisions
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-300">Sustainable Health →</span>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="font-serif font-bold text-xl md:text-2xl text-stone-900">
            “GFTN provides the ecosystem. Sanket provides the signal.”
          </div>
          <p className="text-xs text-stone-500 font-mono mt-2">
            Designed for the GFTN India / BharatNetra ecosystem · Potential ecosystem deployment model
          </p>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 7. WHY SANKET IS NOT ALONE (COLLABORATIVE ARCHITECTURE) */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-stone-50 rounded-3xl border border-stone-200 p-8 md:p-12"
        aria-label="Ecosystem Collaboration"
      >
        <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block mb-2">
          COLLABORATIVE ARCHITECTURE
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-4">
          Innovation works better when it travels through an ecosystem.
        </h2>

        <p className="text-sm md:text-base text-stone-700 leading-relaxed max-w-2xl mb-8">
          Sanket is intentionally not designed as a closed product. The larger opportunity is to connect: people who understand communities, institutions that hold financial relationships, technology teams that can build infrastructure, and ecosystem organisations that can create pathways for responsible adoption.
        </p>

        {/* Compact, Premium Collaborative Infographic */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-2xs max-w-2xl mx-auto">
          <div className="text-[10px] font-mono uppercase font-bold tracking-widest text-stone-400 text-center mb-4">
            Interconnected Contributors
          </div>

          {/* 5 Interconnected Nodes */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-6">
            <span className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-700 shadow-2xs">
              Local knowledge
            </span>
            <span className="text-stone-300 font-bold">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-700 shadow-2xs">
              Financial institutions
            </span>
            <span className="text-stone-300 font-bold">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-700 shadow-2xs">
              Technology
            </span>
            <span className="text-stone-300 font-bold">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-700 shadow-2xs">
              Policy
            </span>
            <span className="text-stone-300 font-bold">+</span>
            <span className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-xs font-mono font-bold text-stone-700 shadow-2xs">
              Global networks
            </span>
          </div>

          {/* Visual Convergence Indicator */}
          <div className="flex items-center justify-center gap-2 text-stone-300 mb-5">
            <div className="h-px w-16 bg-stone-200" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold">Unites into</span>
            <div className="h-px w-16 bg-stone-200" />
          </div>

          {/* Emphasized Central Resulting Outcome */}
          <div className="p-4 rounded-xl bg-emerald-900 text-white text-center shadow-sm ring-1 ring-emerald-800">
            <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 mb-1">
              Resulting Impact
            </div>
            <div className="text-sm md:text-base font-serif font-bold text-white tracking-wide">
              Better financial health and decisions
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 8. FOUNDATIONAL PRINCIPLES / SOUND PATIENT PRESENCE */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#fdf6f5] rounded-3xl border border-rose-200/60 p-8 md:p-12 shadow-xs"
        aria-label="Sound Patient Presence & Foundational Principles"
      >
        <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-900 uppercase block mb-2">
          FOUNDATIONAL PRINCIPLES
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-8">
          Ideas that stayed with us.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-emerald-900 mb-1.5">
                Context matters.
              </div>
              <p className="text-sm text-stone-700 leading-relaxed font-serif italic">
                “Irregular income cannot always be understood through averages.”
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-emerald-900 mb-1.5">
                Health is more than access.
              </div>
              <p className="text-sm text-stone-700 leading-relaxed font-serif italic">
                “A household having financial access does not automatically mean it is financially healthy.”
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-emerald-900 mb-1.5">
                Local context belongs inside the model.
              </div>
              <p className="text-sm text-stone-700 leading-relaxed font-serif italic">
                “Common financial-health dimensions become more meaningful when combined with realities specific to the household.”
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold uppercase text-emerald-900 mb-1.5">
                People remain part of the decision.
              </div>
              <p className="text-sm text-stone-700 leading-relaxed font-serif italic">
                “Technology can surface a signal. Accountability still belongs with people.”
              </p>
            </div>
          </div>

        </div>

        <div className="text-center pt-2 border-t border-rose-200/40">
          <span className="text-[11px] font-mono text-stone-500">
            Financial Diaries · Dvara Research · CGAP · FinHealth Score
          </span>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 9. VERY LIGHT SCORING REFERENCE — DARK HIGHLIGHT BOX */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-stone-900 text-stone-100 rounded-3xl p-6 md:p-8 border border-stone-800 shadow-md max-w-2xl mx-auto text-center"
      >
        <p className="text-base md:text-lg font-serif text-white mb-4 leading-snug">
          <span className="block">Signal is a multidimensional view of financial health —</span>
          <span className="block font-medium text-emerald-300">not a single number</span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs font-mono font-bold text-stone-300 uppercase">
          <span className="px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700/80 text-emerald-400">Spend</span>
          <span className="text-stone-600">·</span>
          <span className="px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700/80 text-emerald-400">Save</span>
          <span className="text-stone-600">·</span>
          <span className="px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700/80 text-emerald-400">Borrow</span>
          <span className="text-stone-600">·</span>
          <span className="px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700/80 text-emerald-400">Plan</span>
          <span className="text-stone-600">·</span>
          <span className="px-2.5 py-1 rounded-md bg-stone-800 border border-stone-700/80 text-emerald-400">Context</span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 10. WHAT SANKET IS / WHAT SANKET IS NOT */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-xs"
        aria-label="What Sanket is and is not"
      >
        <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block mb-2">
          PRODUCT IDENTITY
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-8">
          What Sanket is.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* SANKET IS — Light teal-green background with slightly darker teal/green outline */}
          <div className="p-6 rounded-2xl bg-[#eef7f4] border-2 border-emerald-400/85 shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-950 font-serif font-bold text-lg mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>SANKET IS</span>
            </div>
            <ul className="space-y-3 text-xs md:text-sm text-stone-900 font-medium font-sans">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <span><strong>A signal</strong> — highlighting temporal liquidity opportunities and risks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <span><strong>An intelligence layer</strong> — contextualizing data across institutional silos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <span><strong>Context-aware</strong> — recognizing seasonal, crop, and migration cycles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <span><strong>Explainable</strong> — transparent rules and verifiable signal provenance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <span><strong>Human-led</strong> — designed to empower field loan officers, not replace them.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0" />
                <span><strong>Designed around financial health</strong> — prioritizing resilience over debt distress.</span>
              </li>
            </ul>
          </div>

          {/* SANKET IS NOT — Red panel and outline treatment */}
          <div className="p-6 rounded-2xl bg-[#fdf4f3] border-2 border-rose-300/90 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-950 font-serif font-bold text-lg mb-4">
              <XCircle className="w-5 h-5 text-rose-600" />
              <span>SANKET IS NOT</span>
            </div>
            <ul className="space-y-3 text-xs md:text-sm text-stone-800 font-sans">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>A lender</strong> — we hold no balance sheet and issue no loans.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>A black-box verdict</strong> — no opaque, unverifiable algorithmic scoring.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>An automated rejection engine</strong> — no automated denial of livelihoods.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>A replacement for human judgement</strong> — officers maintain final discretion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                <span><strong>A surveillance system</strong> — consent-governed and privacy-preserving.</span>
              </li>
            </ul>
          </div>

        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 11. VERY LIGHT APAC VISION */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-xs"
        aria-label="APAC Vision"
      >
        <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block mb-2">
          FUTURE PATHWAYS
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-950 tracking-tight mb-4">
          Start local. Think wider.
        </h2>

        <p className="text-sm md:text-base text-stone-700 leading-relaxed max-w-2xl mb-6">
          The architecture begins in Odisha, but the question is not uniquely Indian. Across APAC, millions of households experience income shaped by migration, remittances, seasonal work and irregular cash flows.
        </p>

        <p className="text-sm md:text-base text-stone-700 leading-relaxed max-w-2xl mb-8">
          The ambition is therefore not to copy one model from one country into another. It is to keep the core intelligence architecture while allowing local data, identity, consent, regulation and context to change.
        </p>

        {/* Minimal Visual */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-bold text-stone-800 max-w-xl mx-auto">
          <span className="text-emerald-900 bg-emerald-100 px-3 py-1 rounded-md">ODISHA</span>
          <span className="text-stone-400">→</span>
          <span className="bg-stone-100 px-3 py-1 rounded-md">PHILIPPINES</span>
          <span className="text-stone-400">→</span>
          <span className="bg-stone-100 px-3 py-1 rounded-md">INDONESIA</span>
          <span className="text-stone-400">→</span>
          <span className="text-stone-500 bg-stone-100 px-3 py-1 rounded-md">BEYOND</span>
        </div>
        <p className="text-[11px] font-mono text-stone-400 text-center mt-3">
          Future architectural portability pathway across APAC migration corridors
        </p>
      </motion.section>

      {/* ========================================================================= */}
      {/* 12. FINAL CLOSING SECTION */}
      {/* ========================================================================= */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-emerald-950 text-emerald-50 rounded-3xl p-8 md:p-14 text-center border border-emerald-900 shadow-xl relative overflow-hidden"
        aria-label="Final Closing"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-6">
            Make the signal visible.
          </h2>

          <p className="text-sm md:text-base text-emerald-100 leading-relaxed font-sans mb-8">
            Financial decisions are often made with the data we have — not the context we wish we had. Sanket is built around a simple idea: when the right signals become visible at the right moment, technology can help people make decisions that are not only more informed, but more appropriate to real financial lives.
          </p>

          <div className="py-4 px-6 rounded-2xl bg-emerald-900/80 border border-emerald-800/80 max-w-md mx-auto mb-10 font-serif italic text-lg text-emerald-200">
            “Better context. Better decisions. Better financial health.”
          </div>

          <div className="mb-8">
            <div className="font-serif font-extrabold text-2xl tracking-tight text-white mb-1">
              SANKET
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-semibold">
              Rural Financial Health Intelligence Layer
            </div>
          </div>

          <button
            id="btn-about-explore-dashboard"
            onClick={onGoToDashboard}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group"
          >
            <span>Explore the Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.section>

      {/* ========================================================================= */}
      {/* 13. SMALL FOOTNOTE / REFERENCES AREA */}
      {/* ========================================================================= */}
      <footer className="pt-6 border-t border-stone-200 text-center">
        <button
          id="btn-toggle-references"
          onClick={() => setIsReferencesExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 hover:text-stone-800 transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-stone-200/60"
        >
          <span>Inspired by research, evidence and real-world practice</span>
          {isReferencesExpanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {isReferencesExpanded && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs text-stone-600 max-w-2xl mx-auto space-y-3"
          >
            <div className="font-mono font-bold uppercase text-[11px] text-stone-700">
              Sources &amp; Inspiration
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] text-stone-600">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                Finverse / data.org
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                Dvara Research + PwC
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                CGAP
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                Financial Health Network / FinHealth Score
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                Microfinance Opportunities
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                UNCDF
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                UIDAI
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-emerald-700" />
                GFTN India / BharatNetra
              </li>
            </ul>
            <p className="text-[10px] text-stone-400 font-sans pt-1">
              SANKET Phase 2 MVP represents an interactive prototype grounded in synthetic datasets and deterministic policy logic.
            </p>
          </motion.div>
        )}
      </footer>

    </div>
  );
};

