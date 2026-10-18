import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Sliders, 
  RefreshCw, 
  FileCheck, 
  Info, 
  ChevronRight, 
  X, 
  Clock,
  UserCheck,
  Edit3,
  Ban,
  ArrowUpRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EvidenceSignalData, HouseholdData, OfficerDecisionRecord } from '../types';
import { calculateScenarioDelta, ScenarioResult } from '../logic/decisionEngine';

interface Screen03DecisionProps {
  household: HouseholdData;
  onNext: () => void;
  officerDecision: OfficerDecisionRecord;
  onUpdateOfficerDecision: (record: OfficerDecisionRecord) => void;
  onSelectHousehold: (household: HouseholdData) => void;
}

export const Screen03Decision: React.FC<Screen03DecisionProps> = ({
  household,
  onNext,
  officerDecision,
  onUpdateOfficerDecision,
  onSelectHousehold,
}) => {
  const [selectedSignal, setSelectedSignal] = useState<EvidenceSignalData | null>(null);
  const [activeScenario, setActiveScenario] = useState<'NORMAL' | 'DELAYED_6W' | 'LOWER_INFLOW'>('NORMAL');
  const [showCounterfactualDrawer, setShowCounterfactualDrawer] = useState<boolean>(false);
  const [showOverrideModal, setShowOverrideModal] = useState<boolean>(false);
  const [showModifyModal, setShowModifyModal] = useState<boolean>(false);
  const [overrideReason, setOverrideReason] = useState<string>('Household information differs');
  const [overrideNotes, setOverrideNotes] = useState<string>('');
  const [modifiedScheduleNotes, setModifiedScheduleNotes] = useState<string>('Flexible harvest-aligned grace of 4 weeks');

  const scenarioResult: ScenarioResult = calculateScenarioDelta(household, activeScenario);

  const handleAccept = () => {
    onUpdateOfficerDecision({
      decision: 'accepted',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      officerNotes: 'SANKET evidence aligned with household confirmation.',
    });
  };

  const handleConfirmOverride = () => {
    onUpdateOfficerDecision({
      decision: 'overridden',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      overrideReason,
      officerNotes: overrideNotes || 'Institutional credit policy override applied.',
    });
    setShowOverrideModal(false);
  };

  const handleConfirmModify = () => {
    onUpdateOfficerDecision({
      decision: 'modified',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
      modifiedAction: modifiedScheduleNotes,
      officerNotes: 'Officer modified schedule according to branch policy.',
    });
    setShowModifyModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
      
      {/* Hero Decision Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 text-xs font-mono font-bold uppercase mb-3 border border-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-800" />
          <span>Suitable Action Recommendation · Human Review</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-2">
          {household.recommendation}
        </h1>
        
        <p className="text-sm md:text-base text-stone-600 font-normal">
          {household.suggestedActionDetail.headline}
        </p>
      </motion.div>

      {/* Main Grid: Left Central Card & Evidence vs Right Scenario & Human Decision */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* ================= LEFT COLUMN: HERO ACTION & 3 EVIDENCE SIGNALS (7 cols) ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Central Recommendation Card */}
          <div className="bg-white rounded-2xl border border-emerald-800/30 p-6 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-800" />
            
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-700 animate-pulse" />
                <span className="font-mono text-xs font-bold uppercase text-emerald-950">
                  Advisory Recommendation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 font-bold border border-amber-300">
                  {household.seasonalConfidence.toUpperCase()} CONFIDENCE
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200">
                  {(household.dataCompleteness * 100).toFixed(0)}% DATA COMPLETE
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 mb-5">
              <h3 className="text-sm font-serif font-bold text-emerald-950 mb-1">
                Suggested Operational Structure:
              </h3>
              <p className="text-xs text-emerald-900 leading-relaxed font-sans mb-3">
                {household.suggestedActionDetail.structure}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-emerald-950 pt-2 border-t border-emerald-200/60">
                <div><strong>Timeline:</strong> {household.suggestedActionDetail.timeline}</div>
                <div><strong>Requirement:</strong> Household verification required</div>
              </div>
            </div>

            {/* Exactly THREE Evidence Signals */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700">
                  Top 3 Contributing Evidence Signals
                </h3>
                <span className="text-[11px] text-stone-400 font-mono">Click any signal for full provenance</span>
              </div>

              <div className="space-y-3">
                {household.evidenceSignals.map((signal) => (
                  <button
                    key={signal.id}
                    id={`btn-signal-${signal.id}`}
                    onClick={() => setSelectedSignal(signal)}
                    className="w-full text-left p-4 rounded-xl border border-stone-200 bg-stone-50/40 hover:bg-stone-100/70 hover:border-emerald-700 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-900 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                          {signal.number}
                        </span>
                        <span className="text-sm font-bold text-stone-900 group-hover:text-emerald-950 font-serif">
                          {signal.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                    </div>

                    <p className="text-xs text-stone-600 mb-2 pl-7 leading-relaxed">
                      {signal.description}
                    </p>

                    {/* 4-Part Provenance Line: SOURCE · FRESHNESS · STATUS · CONFIDENCE */}
                    <div className="pl-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-mono text-stone-500">
                      <span><strong>Source:</strong> {signal.source}</span>
                      <span>•</span>
                      <span><strong>Freshness:</strong> {signal.freshness}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.2 rounded bg-stone-200 text-stone-700 font-semibold">
                        {signal.status}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-800 font-semibold">{signal.confidence} Conf.</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Confidence & Verification Warning Strip */}
            <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold font-mono">Verification Requirement: </span>
                Household-specific remittance timing requires confirmation before legal contract generation.
              </div>
            </div>

          </div>

        </div>

        {/* ================= RIGHT COLUMN: SCENARIO STRESS TEST & HUMAN DECISION BOUNDARY (5 cols) ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Scenario / Counterfactual Stress Test */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-800" />
                <h3 className="font-serif font-bold text-sm text-stone-900">
                  Scenario Stress Testing
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-500 uppercase bg-stone-100 px-2 py-0.5 rounded">
                Deterministic Delta
              </span>
            </div>

            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Test how shifting repayment timing or income shocks alters cash flow trajectory:
            </p>

            {/* 3 Scenario Switch Buttons */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-100 rounded-xl mb-4">
              <button
                id="btn-scenario-normal"
                onClick={() => setActiveScenario('NORMAL')}
                className={`py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  activeScenario === 'NORMAL'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Normal
              </button>
              
              <button
                id="btn-scenario-delayed"
                onClick={() => setActiveScenario('DELAYED_6W')}
                className={`py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  activeScenario === 'DELAYED_6W'
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-emerald-950 hover:bg-emerald-100/50'
                }`}
              >
                +6 Weeks
              </button>

              <button
                id="btn-scenario-lower"
                onClick={() => setActiveScenario('LOWER_INFLOW')}
                className={`py-1.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                  activeScenario === 'LOWER_INFLOW'
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'text-amber-950 hover:bg-amber-100/50'
                }`}
              >
                -30% Inflow
              </button>
            </div>

            {/* Scenario Impact Output */}
            <div className={`p-4 rounded-xl border transition-colors ${
              activeScenario === 'DELAYED_6W'
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : activeScenario === 'LOWER_INFLOW'
                ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                : 'bg-stone-50 border-stone-200 text-stone-800'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold uppercase">
                  Timing Risk Level:
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  scenarioResult.timingRiskLevel === 'LOW'
                    ? 'bg-emerald-200 text-emerald-950'
                    : 'bg-red-200 text-red-950'
                }`}>
                  {scenarioResult.timingRiskLevel} RISK
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-3">
                <div>
                  <span className="text-stone-500 block text-[10px]">Sep Net Buffer:</span>
                  <span className={`font-bold ${scenarioResult.projectedSeptemberBuffer < 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                    ₹{scenarioResult.projectedSeptemberBuffer.toLocaleString('en-IN')}
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">Oct Post-Remittance:</span>
                  <span className="font-bold text-emerald-700">
                    +₹{scenarioResult.projectedOctoberBuffer.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-xs leading-relaxed font-sans border-t border-stone-200/60 pt-2 text-stone-600">
                {scenarioResult.explanation}
              </p>
            </div>

            <button
              onClick={() => setShowCounterfactualDrawer(true)}
              className="w-full mt-3 text-center text-xs font-mono text-emerald-900 hover:underline cursor-pointer"
            >
              Open counterfactual comparison table →
            </button>
          </div>

          {/* RESPONSIBLE DECISION BOUNDARY: SANKET RECOMMENDS | FSP OFFICER DECIDES */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                <UserCheck className="w-4 h-4" />
                <span>Human Decision Boundary</span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">Institutional Officer in Control</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed mb-5">
              Recommendation is advisory. Final decision remains with the financial institution. Record your institutional review action:
            </p>

            {/* Accept / Modify / Override Actions */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              
              <button
                id="btn-officer-accept"
                onClick={handleAccept}
                className={`py-3 px-2 rounded-xl text-xs font-bold font-mono transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  officerDecision.decision === 'accepted'
                    ? 'bg-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                    : 'bg-emerald-950 text-emerald-100 hover:bg-emerald-900 border border-emerald-800'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>ACCEPT</span>
              </button>

              <button
                id="btn-officer-modify"
                onClick={() => setShowModifyModal(true)}
                className={`py-3 px-2 rounded-xl text-xs font-bold font-mono transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  officerDecision.decision === 'modified'
                    ? 'bg-amber-500 text-amber-950 ring-2 ring-amber-300'
                    : 'bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>MODIFY</span>
              </button>

              <button
                id="btn-officer-override"
                onClick={() => setShowOverrideModal(true)}
                className={`py-3 px-2 rounded-xl text-xs font-bold font-mono transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  officerDecision.decision === 'overridden'
                    ? 'bg-red-500 text-red-950 ring-2 ring-red-300'
                    : 'bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-700'
                }`}
              >
                <Ban className="w-4 h-4" />
                <span>OVERRIDE</span>
              </button>

            </div>

            {/* Officer Action Log Status */}
            {officerDecision.decision !== 'pending' && (
              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-xs text-stone-300 font-mono">
                <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                  <span>Action Logged: {officerDecision.decision.toUpperCase()}</span>
                  <span>{officerDecision.timestamp}</span>
                </div>
                {officerDecision.overrideReason && (
                  <div>Reason: {officerDecision.overrideReason}</div>
                )}
                {officerDecision.modifiedAction && (
                  <div>Modified: {officerDecision.modifiedAction}</div>
                )}
                <div className="text-[10px] text-stone-500 mt-1">Audit trail logged to FSP supervisory ledger.</div>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-tight">
              SANKET is read-only. No recommendation triggers disbursement or denial without explicit officer authorization.
            </div>
          </div>

          {/* Primary CTA Block to advance to Screen 4 */}
          <div className="bg-emerald-900 rounded-2xl p-5 text-white flex items-center justify-between gap-4 shadow-md">
            <div>
              <div className="text-xs font-mono uppercase text-emerald-300 font-bold">
                Next: Architecture & Governance
              </div>
              <div className="text-sm font-serif font-bold">
                Inspect how SANKET works under the hood
              </div>
            </div>

            <button
              id="btn-inspect-architecture"
              onClick={onNext}
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs tracking-wide shadow-md transition-all flex items-center gap-1.5 group cursor-pointer shrink-0"
            >
              <span>See Architecture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>

      {/* Counterfactual Comparison Drawer */}
      <AnimatePresence>
        {showCounterfactualDrawer && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Counterfactual Trajectory Comparison
                  </h3>
                </div>
                <button onClick={() => setShowCounterfactualDrawer(false)} className="text-stone-400 hover:text-stone-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                    <div className="font-mono font-bold text-red-900 uppercase mb-1">Status Quo (Sep EMI)</div>
                    <div className="text-red-700 font-bold text-base mb-1">-₹2,900 Deficit</div>
                    <p className="text-stone-600">Forces distress borrowing from informal moneylenders to meet rigid bank installment.</p>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="font-mono font-bold text-emerald-900 uppercase mb-1">SANKET (+6 Weeks Alignment)</div>
                    <div className="text-emerald-800 font-bold text-base mb-1">+₹9,300 Surplus</div>
                    <p className="text-stone-600">Aligns payment with ₹22,000 festival remittance; preserves 100% on-time credit record.</p>
                  </div>
                </div>

                <div className="p-3 bg-stone-100 rounded-lg text-stone-600 text-[11px]">
                  <strong>Note:</strong> Illustrative deterministic projection for hackathon demo. Not a probabilistic machine-learning forecast.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setShowCounterfactualDrawer(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                >
                  Close Comparison
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Signal Evidence Deep Dive Drawer */}
      <AnimatePresence>
        {selectedSignal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                    {selectedSignal.number}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {selectedSignal.title} Evidence Details
                  </h3>
                </div>
                <button onClick={() => setSelectedSignal(null)} className="text-stone-400 hover:text-stone-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-mono font-bold text-stone-900 uppercase mb-1">Signal Provenance</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-stone-600">
                    <div><strong>Source:</strong> {selectedSignal.source}</div>
                    <div><strong>Freshness:</strong> {selectedSignal.freshness}</div>
                    <div><strong>Status:</strong> {selectedSignal.status}</div>
                    <div><strong>Confidence:</strong> {selectedSignal.confidence}</div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="font-mono font-bold text-emerald-950 uppercase mb-1">Observed Field Inputs</div>
                  <ul className="list-disc list-inside space-y-1 text-emerald-900 text-[11px]">
                    {selectedSignal.details.observedInputs.map((inp, i) => (
                      <li key={i}>{inp}</li>
                    ))}
                  </ul>
                </div>

                {selectedSignal.details.inferredInputs && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="font-mono font-bold text-amber-950 uppercase mb-1">Inferred Regional Inputs</div>
                    <ul className="list-disc list-inside space-y-1 text-amber-900 text-[11px]">
                      {selectedSignal.details.inferredInputs.map((inp, i) => (
                        <li key={i}>{inp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <p className="text-[11px] text-stone-500 italic">
                  Note: {selectedSignal.details.notes}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setSelectedSignal(null)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800"
                >
                  Close Signal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Override Structured Reason Modal */}
      <AnimatePresence>
        {showOverrideModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-red-700">
                  <Ban className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Record Officer Override
                  </h3>
                </div>
                <button onClick={() => setShowOverrideModal(false)} className="text-stone-400 hover:text-stone-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-mono font-bold text-stone-700 uppercase block mb-1">
                    Structured Override Reason:
                  </label>
                  <select
                    value={overrideReason}
                    onChange={(e) => setOverrideReason(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-800 font-medium bg-stone-50"
                  >
                    <option value="Household information differs">Household information differs</option>
                    <option value="Field verification changed the context">Field verification changed the context</option>
                    <option value="FSP policy requires a different action">FSP policy requires a different action</option>
                    <option value="Other institutional reason">Other institutional reason</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono font-bold text-stone-700 uppercase block mb-1">
                    Officer Notes for Supervisory Audit:
                  </label>
                  <textarea
                    rows={3}
                    value={overrideNotes}
                    onChange={(e) => setOverrideNotes(e.target.value)}
                    placeholder="Enter supervisory notes for quarterly governance audit..."
                    className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-800 text-xs"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowOverrideModal(false)}
                  className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOverride}
                  className="px-4 py-2 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800"
                >
                  Log Override Action
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modify Action Modal */}
      <AnimatePresence>
        {showModifyModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2 text-amber-700">
                  <Edit3 className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Modify Recommended Schedule
                  </h3>
                </div>
                <button onClick={() => setShowModifyModal(false)} className="text-stone-400 hover:text-stone-700 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-mono font-bold text-stone-700 uppercase block mb-1">
                    Select Modified Structure:
                  </label>
                  <select
                    value={modifiedScheduleNotes}
                    onChange={(e) => setModifiedScheduleNotes(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-stone-300 text-stone-800 font-medium bg-stone-50"
                  >
                    <option value="Flexible harvest-aligned grace of 4 weeks">Flexible harvest-aligned grace of 4 weeks</option>
                    <option value="Bi-monthly balloon installment post-remittance">Bi-monthly balloon installment post-remittance</option>
                    <option value="Split EMI: 25% in Sep + 75% in Oct">Split EMI: 25% in Sep + 75% in Oct</option>
                    <option value="Verification hold pending borrower physical meeting">Verification hold pending borrower physical meeting</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowModifyModal(false)}
                  className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmModify}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900"
                >
                  Confirm Modified Terms
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
