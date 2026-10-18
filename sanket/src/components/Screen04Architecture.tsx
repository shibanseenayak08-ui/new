import React, { useState } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Cpu, 
  GitBranch, 
  Scale, 
  UserCheck, 
  Layers, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  ChevronRight, 
  Info, 
  X, 
  Building, 
  Users2, 
  Calendar, 
  Lock, 
  Sparkles,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Screen04ArchitectureProps {
  onRestartToScreen1: () => void;
  onNextToAbout?: () => void;
}

export const Screen04Architecture: React.FC<Screen04ArchitectureProps> = ({ onRestartToScreen1, onNextToAbout }) => {
  const [selectedLayer, setSelectedLayer] = useState<'UNIFY' | 'ASSESS' | 'CONTEXTUALIZE' | 'RECOMMEND' | null>('UNIFY');
  const [showGovernanceModal, setShowGovernanceModal] = useState<boolean>(false);
  const [showToolMatrixModal, setShowToolMatrixModal] = useState<boolean>(false);
  const [showPhase2ScopeModal, setShowPhase2ScopeModal] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
      
      {/* Header Eyebrow & Pipeline Title */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <span className="inline-block text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200/80 mb-3">
          Architecture & Implementation Realism
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight mb-3">
          How SANKET Works Under the Hood
        </h1>
        <p className="text-sm md:text-base text-stone-600 font-normal leading-relaxed">
          A lightweight, explainable, and governed decision-support layer connecting fragmented data to human financial decisions.
        </p>
      </motion.div>

      {/* Hero Pipeline Visualization */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-xs mb-8 relative"
      >
        <div className="text-xs font-mono font-bold uppercase text-stone-500 mb-6 flex items-center justify-between">
          <span>End-to-End Decision Flow</span>
          <span>Click any intelligence stage to inspect</span>
        </div>

        {/* 3 Major Stages: 1. DATA -> 2. SANKET INTELLIGENCE -> 3. HUMAN FSP DECISION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch mb-8">
          
          {/* Stage 1: DATA (3 cols) */}
          <div className="lg:col-span-3 bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-stone-800 font-serif font-bold text-sm">
                <Database className="w-4 h-4 text-emerald-800" />
                <span>1. Data Ingestion</span>
              </div>
              <p className="text-[11px] text-stone-500 mb-3 leading-relaxed">
                Lightweight CSV exports & open API feeds from fragmented sources.
              </p>
              
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-white rounded-lg border border-stone-200 text-stone-700 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-emerald-700" />
                  <span>MFI Core Ledger</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200 text-stone-700 flex items-center gap-1.5">
                  <Users2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>SHG Village Registers</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-stone-200 text-stone-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>Migration Calendar</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-stone-400 mt-3 pt-2 border-t border-stone-200">
              Zero live PII storage · Tokenized identity
            </div>
          </div>

          {/* Stage 2: SANKET INTELLIGENCE (6 cols) */}
          <div className="lg:col-span-6 bg-emerald-950 text-white rounded-xl p-4 border border-emerald-900 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-emerald-300 font-serif font-bold text-sm">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span>2. SANKET Intelligence Layer</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded border border-emerald-800">
                  Deterministic MVP
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80 mb-3 leading-relaxed">
                4-step auditable pipeline transforming raw data into suitable action.
              </p>

              {/* 4 Clickable Verbs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                
                <button
                  id="btn-verb-unify"
                  onClick={() => setSelectedLayer('UNIFY')}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    selectedLayer === 'UNIFY'
                      ? 'bg-emerald-800 text-white ring-2 ring-emerald-400'
                      : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase mb-0.5">UNIFY</div>
                  <div className="text-[10px] text-emerald-200 line-clamp-1">Profile Resolution</div>
                </button>

                <button
                  id="btn-verb-assess"
                  onClick={() => setSelectedLayer('ASSESS')}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    selectedLayer === 'ASSESS'
                      ? 'bg-emerald-800 text-white ring-2 ring-emerald-400'
                      : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase mb-0.5">ASSESS</div>
                  <div className="text-[10px] text-emerald-200 line-clamp-1">4-Pillar Score</div>
                </button>

                <button
                  id="btn-verb-contextualize"
                  onClick={() => setSelectedLayer('CONTEXTUALIZE')}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    selectedLayer === 'CONTEXTUALIZE'
                      ? 'bg-emerald-800 text-white ring-2 ring-emerald-400'
                      : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase mb-0.5">CONTEXT</div>
                  <div className="text-[10px] text-emerald-200 line-clamp-1">Season Timing</div>
                </button>

                <button
                  id="btn-verb-recommend"
                  onClick={() => setSelectedLayer('RECOMMEND')}
                  className={`p-2.5 rounded-lg text-left transition-all cursor-pointer ${
                    selectedLayer === 'RECOMMEND'
                      ? 'bg-emerald-800 text-white ring-2 ring-emerald-400'
                      : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
                  }`}
                >
                  <div className="text-xs font-mono font-bold uppercase mb-0.5">ACTION</div>
                  <div className="text-[10px] text-emerald-200 line-clamp-1">5-State Engine</div>
                </button>

              </div>
            </div>

            {/* Explanatory text for selected verb */}
            <div className="mt-3 p-3 bg-emerald-900/80 rounded-lg border border-emerald-800 text-xs">
              {selectedLayer === 'UNIFY' && (
                <div>
                  <strong className="text-emerald-300 font-mono">UNIFY:</strong> Ingests fragmented CSV/API records; applies fuzzy-match entity resolution across name/village/SHG. No Aadhaar is ever stored.
                </div>
              )}
              {selectedLayer === 'ASSESS' && (
                <div>
                  <strong className="text-emerald-300 font-mono">ASSESS:</strong> Computes compact 4-pillar Financial Health profile (Spend, Save, Borrow, Plan) plus data completeness index (0–100%).
                </div>
              )}
              {selectedLayer === 'CONTEXTUALIZE' && (
                <div>
                  <strong className="text-emerald-300 font-mono">CONTEXTUALIZE:</strong> Maps scheduled repayment dates against regional crop/migration calendar to flag timing collisions.
                </div>
              )}
              {selectedLayer === 'RECOMMEND' && (
                <div>
                  <strong className="text-emerald-300 font-mono">RECOMMEND:</strong> Traverses transparent rule tree to output one of 5 suitable action states with top 3 evidence signals.
                </div>
              )}
            </div>
          </div>

          {/* Stage 3: HUMAN FSP DECISION (3 cols) */}
          <div className="lg:col-span-3 bg-stone-50 rounded-xl p-4 border border-stone-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 text-stone-800 font-serif font-bold text-sm">
                <UserCheck className="w-4 h-4 text-emerald-800" />
                <span>3. Human Decision</span>
              </div>
              <p className="text-[11px] text-stone-500 mb-3 leading-relaxed">
                Institutional loan officer retains full consequential authority.
              </p>
              
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950 font-semibold flex items-center justify-between">
                  <span>ACCEPT</span>
                  <span className="text-[10px] text-emerald-800">Confirmed</span>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 font-semibold flex items-center justify-between">
                  <span>MODIFY</span>
                  <span className="text-[10px] text-amber-800">Policy tweak</span>
                </div>
                <div className="p-2 bg-stone-100 rounded-lg border border-stone-200 text-stone-800 font-semibold flex items-center justify-between">
                  <span>OVERRIDE</span>
                  <span className="text-[10px] text-stone-600">Logged audit</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-stone-500 mt-3 pt-2 border-t border-stone-200">
              Read-only system · No auto-disbursement
            </div>
          </div>

        </div>

        {/* 3 Expandable Governance & Reality Disclosure Drawers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
          
          {/* Drawer 1: Governance is Built In */}
          <button
            id="btn-open-governance"
            onClick={() => setShowGovernanceModal(true)}
            className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-800" />
                <span className="font-serif font-bold text-xs text-stone-900">Governance is Built In</span>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-800 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Explicit consent, minimization, audit logs, fairness & anti-surveillance principles.
            </p>
          </button>

          {/* Drawer 2: Right Tool, Right Function */}
          <button
            id="btn-open-tool-matrix"
            onClick={() => setShowToolMatrixModal(true)}
            className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-stone-100 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-stone-800" />
                <span className="font-serif font-bold text-xs text-stone-900">Right Tool, Right Function</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Deterministic rules for Phase 2; GenAI for plain-language explanation only.
            </p>
          </button>

          {/* Drawer 3: Phase 2 is Small on Purpose */}
          <button
            id="btn-open-phase2-scope"
            onClick={() => setShowPhase2ScopeModal(true)}
            className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-100/60 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-800" />
                <span className="font-serif font-bold text-xs text-stone-900">Phase 2 Scope & Honesty</span>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-800 group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              No live bureau/AA claims. Clear distinction between MVP rules & Phase 3 roadmap.
            </p>
          </button>

        </div>
      </motion.div>

      {/* Five-State Action Engine Overview */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-emerald-800" />
            <span>The Five-State Suitable Action Engine</span>
          </h2>
          <span className="text-xs font-mono text-stone-500">Not just binary approve/deny</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="text-xs font-mono font-bold text-emerald-950 mb-1">1. EXTEND CREDIT</div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Healthy/manageable debt & aligned cash flow (e.g. Bikash in Kalahandi).
            </p>
          </div>

          <div className="p-3 bg-teal-50 rounded-xl border border-teal-300 ring-1 ring-teal-500/20">
            <div className="text-xs font-mono font-bold text-teal-950 mb-1">2. LEND DIFFERENTLY</div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Credit is suitable but timing or installment structure should adjust (Meena).
            </p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
            <div className="text-xs font-mono font-bold text-amber-950 mb-1">3. RECOMMEND PROTECTION</div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Additional debt worsens shock exposure; link to parametric cover (Sunita).
            </p>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <div className="text-xs font-mono font-bold text-blue-950 mb-1">4. CHECK IN</div>
            <p className="text-[11px] text-stone-600 leading-snug">
              Data incomplete (&lt;50%) or temporary shock needs field confirmation (Ramesh).
            </p>
          </div>

          <div className="p-3 bg-stone-100 rounded-xl border border-stone-300">
            <div className="text-xs font-mono font-bold text-stone-900 mb-1">5. WAIT</div>
            <p className="text-[11px] text-stone-600 leading-snug">
              High debt saturation (&gt;80% DTI); review on scheduled future date (Dileswar).
            </p>
          </div>

        </div>
      </div>

      {/* Calm Conclusion Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-emerald-950 text-white rounded-2xl p-8 text-center border border-emerald-900 shadow-md mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 text-emerald-100">
          SANKET doesn't replace the FSP's decision. <br />
          <span className="text-white underline decoration-emerald-400 underline-offset-8">
            It improves the information behind it.
          </span>
        </h2>
        <p className="text-sm font-mono text-emerald-300 tracking-wider uppercase mb-6">
          Better context → Better decision → Better financial health.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {onNextToAbout && (
            <button
              id="btn-goto-about"
              onClick={onNextToAbout}
              className="px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs tracking-wide shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Next: About SANKET</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            id="btn-restart-demo"
            onClick={onRestartToScreen1}
            className="px-5 py-3 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 text-emerald-100 font-semibold text-xs tracking-wide border border-emerald-700/80 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Restart Walkthrough</span>
          </button>
        </div>
      </motion.div>

      {/* Governance Modal */}
      <AnimatePresence>
        {showGovernanceModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-emerald-900">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Governance Architecture (Built In)
                  </h3>
                </div>
                <button onClick={() => setShowGovernanceModal(false)} className="text-stone-400 hover:text-stone-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 font-mono">1. Explicit Consent:</strong> Access requires verified SHG/household consent token; logged with timestamp & version.
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 font-mono">2. Full Provenance:</strong> Every indicator tracks source (Observed vs Inferred) and freshness (e.g. current cycle vs seasonal baseline).
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 font-mono">3. Data Minimization:</strong> Only financial health inputs captured. No caste, religion, social media scraping, or biometric data.
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 font-mono">4. Anti-Surveillance:</strong> No continuous GPS location tracking or behavioral monitoring.
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 font-mono">5. Supervisory Audit Trail:</strong> Every officer action (Accept, Modify, Override) is logged with mandatory rationale.
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <strong className="text-stone-900 font-mono">6. Fairness & Redress:</strong> Quarterly disparity reviews; borrowers can request officer re-verification upon life events.
                </div>
              </div>

              <div className="mt-5 p-3 bg-emerald-950 text-white rounded-xl text-xs font-mono">
                "SANKET is read-only. No automated loan execution occurs without human officer authorization."
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setShowGovernanceModal(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                >
                  Close Disclosure
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tool Matrix Modal */}
      <AnimatePresence>
        {showToolMatrixModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-stone-900">
                  <Scale className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Right Tool, Right Function Matrix
                  </h3>
                </div>
                <button onClick={() => setShowToolMatrixModal(false)} className="text-stone-400 hover:text-stone-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <table className="w-full text-xs border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100 font-mono text-stone-700">
                  <tr>
                    <th className="p-2.5 text-left border-b border-stone-200">Function</th>
                    <th className="p-2.5 text-left border-b border-stone-200">Phase 2 MVP</th>
                    <th className="p-2.5 text-left border-b border-stone-200">Phase 3 Production</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  <tr>
                    <td className="p-2.5 font-bold">Financial Health Scoring</td>
                    <td className="p-2.5 text-emerald-900 font-semibold">Deterministic Weighted Scoring</td>
                    <td className="p-2.5 text-stone-500">Validated ML / Longitudinal Models</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Seasonal Timing</td>
                    <td className="p-2.5 text-emerald-900 font-semibold">Corridor Calendar + Thresholds</td>
                    <td className="p-2.5 text-stone-500">Satellite / Remittance Corridor Recalibration</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Scenario Logic</td>
                    <td className="p-2.5 text-emerald-900 font-semibold">Deterministic Delta Projections</td>
                    <td className="p-2.5 text-stone-500">Validated Stochastic Stress Testing</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Explainability</td>
                    <td className="p-2.5 text-emerald-900 font-semibold">Structured Rule Trace</td>
                    <td className="p-2.5 text-stone-500">SHAP / Counterfactual Attributions</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">GenAI Role</td>
                    <td className="p-2.5 text-amber-900 font-semibold">Plain-Language Summaries Only</td>
                    <td className="p-2.5 text-stone-500">Multilingual Voice Explanation</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-4 p-3 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs">
                <strong>Critical AI Safety Rule:</strong> GenAI models NEVER make or modify the consequential financial decision.
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setShowToolMatrixModal(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                >
                  Close Matrix
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Phase 2 Scope Modal */}
      <AnimatePresence>
        {showPhase2ScopeModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-stone-900">
                  <AlertCircle className="w-5 h-5 text-amber-800" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Phase 2 Scope & Transparency
                  </h3>
                </div>
                <button onClick={() => setShowPhase2ScopeModal(false)} className="text-stone-400 hover:text-stone-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <div className="font-mono font-bold uppercase mb-1">What is Built in Phase 2:</div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Synthetic representative Odisha household dataset (Meena, Bikash, Sunita, Ramesh, Dileswar).</li>
                    <li>Transparent deterministic financial health & seasonal collision rule engine.</li>
                    <li>Interactive 4-screen FSP decision-support dashboard with scenario stress testing.</li>
                    <li>Visible data provenance, confidence bands, and human review boundaries.</li>
                  </ul>
                </div>

                <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-stone-700">
                  <div className="font-mono font-bold uppercase mb-1 text-stone-900">Explicit Phase 2 Exclusions (No False Claims):</div>
                  <ul className="list-disc list-inside space-y-1 text-stone-600">
                    <li>No live Account Aggregator or bureau API integration.</li>
                    <li>No real Aadhaar or live core banking transactions.</li>
                    <li>No autonomous loan approval, rejection, or disbursement.</li>
                    <li>No unvalidated 87% prediction accuracy marketing claims.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setShowPhase2ScopeModal(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                >
                  Close Scope
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
