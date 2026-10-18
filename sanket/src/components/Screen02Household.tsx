import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  AlertCircle, 
  Calendar, 
  ShieldAlert, 
  CheckCircle, 
  HelpCircle, 
  TrendingUp, 
  TrendingDown, 
  Info, 
  Database, 
  FileText, 
  ChevronRight, 
  X,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HouseholdData, PillarType } from '../types';
import { getPillarDescription } from '../logic/decisionEngine';

import meenaImg from '../assets/images/meena_portrait_1787872810731.jpg';
import bikashImg from '../assets/images/bikash_portrait_1787872826471.jpg';
import sunitaImg from '../assets/images/sunita_portrait_1787872838649.jpg';
import rameshImg from '../assets/images/ramesh_portrait_1787872852914.jpg';
import dileswarImg from '../assets/images/dileswar_portrait_1787872876830.jpg';

const PERSONA_AVATARS: Record<string, string> = {
  'hh-meena-ganjam': meenaImg,
  'hh-bikash-kalahandi': bikashImg,
  'hh-sunita-mayurbhanj': sunitaImg,
  'hh-ramesh-koraput': rameshImg,
  'hh-dileswar-balangir': dileswarImg,
};

interface Screen02HouseholdProps {
  household: HouseholdData;
  onNext: () => void;
  onOpenSyntheticInfo: () => void;
  onUpdateContextCheckIn?: (newAnswer: string) => void;
}

export const Screen02Household: React.FC<Screen02HouseholdProps> = ({
  household,
  onNext,
  onOpenSyntheticInfo,
  onUpdateContextCheckIn,
}) => {
  const [selectedPillar, setSelectedPillar] = useState<PillarType | null>(null);
  const [showTimingModal, setShowTimingModal] = useState<boolean>(false);
  const [showSourcesDrawer, setShowSourcesDrawer] = useState<boolean>(false);
  const [showCheckInModal, setShowCheckInModal] = useState<boolean>(false);
  const [selectedCheckInAnswer, setSelectedCheckInAnswer] = useState<string>(
    household.contextualCheckIn.selectedAnswer
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    household.defaultFocusMonth || household.cashFlowTimeline[0]?.month || 'SEP'
  );

  // Persona switching reset: ensure no stale modal, answer, or focus month
  useEffect(() => {
    setSelectedPillar(null);
    setShowTimingModal(false);
    setShowSourcesDrawer(false);
    setShowCheckInModal(false);
    setSelectedCheckInAnswer(household.contextualCheckIn.selectedAnswer);
    setSelectedMonth(household.defaultFocusMonth || household.cashFlowTimeline[0]?.month || 'SEP');
  }, [household.id]);

  const pillars: { key: PillarType; title: string; value: number; weight: string }[] = [
    { key: 'SPEND', title: 'Spend', value: household.financialHealth.spend, weight: 'Cash Management' },
    { key: 'SAVE', title: 'Save', value: household.financialHealth.save, weight: 'Savings Buffer' },
    { key: 'BORROW', title: 'Borrow', value: household.financialHealth.borrow, weight: 'Debt Pressure' },
    { key: 'PLAN', title: 'Plan', value: household.financialHealth.plan, weight: 'Forward Horizon' },
  ];

  const handleCheckInOptionSelect = (option: string) => {
    setSelectedCheckInAnswer(option);
    if (onUpdateContextCheckIn) {
      onUpdateContextCheckIn(option);
    }
  };

  const currentMonthData = 
    household.cashFlowTimeline.find((m) => m.month === selectedMonth) || 
    household.cashFlowTimeline[0];

  const avatarSrc = PERSONA_AVATARS[household.id] || meenaImg;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
      
      {/* Household Header Banner with small circular realistic portrait beside bold name */}
      <motion.div 
        key={`header-${household.id}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 mb-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3.5 mb-1.5">
            <img
              src={avatarSrc}
              alt={`${household.name} portrait`}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-stone-100 shadow-xs ring-1 ring-stone-200/80 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
                {household.name}
              </h1>
              <span className="text-xs font-mono font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
                {household.location}
              </span>
              <span className="text-xs font-medium text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {household.householdType}
              </span>
            </div>
          </div>
          <p className="text-xs text-stone-500 font-normal">
            Unified Household View · Merging institutional loan ledgers, SHG registers, and regional migration/livelihood calendar.
          </p>
        </div>

        {/* Synthetic Demo pill & Data freshness */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={onOpenSyntheticInfo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-amber-700" />
            <span>REPRESENTATIVE / SYNTHETIC DEMO</span>
          </button>
        </div>
      </motion.div>

      {/* ================= ROW 1: Multi-Dimensional Assessment + Seasonal Context & Cash Flow Trajectory (EQUAL HEIGHT) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
        
        {/* LEFT CARD: Financial Health Profile (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs relative flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-900 uppercase tracking-wider block">
                    Multidimensional Assessment
                  </span>
                  <h2 className="text-lg font-serif font-bold text-stone-900">Financial Health Profile</h2>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold border border-stone-200">
                  Not a credit score
                </span>
              </div>

              <p className="text-xs text-stone-500 mb-5 leading-relaxed">
                Measures 4 core behavioral dimensions. Click any indicator to inspect contributing observed vs derived signals.
              </p>

              {/* 4 Pillar Indicators with breakdown anchored directly beneath the selected dimension */}
              <div className="space-y-3">
                {pillars.map((pillar) => {
                  const info = getPillarDescription(pillar.key, pillar.value);
                  const isSelected = selectedPillar === pillar.key;

                  return (
                    <div key={pillar.key} className="space-y-2">
                      <button
                        id={`btn-pillar-${pillar.key.toLowerCase()}`}
                        onClick={() => setSelectedPillar(isSelected ? null : pillar.key)}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-700/30'
                            : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100/60 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-stone-900">{pillar.title}</span>
                            <span className="text-[11px] text-stone-500 font-medium">({pillar.weight})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-stone-900">
                              {pillar.value.toFixed(2)}
                            </span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                              info.band === 'High' ? 'bg-emerald-100 text-emerald-900' :
                              info.band === 'Medium' ? 'bg-amber-100 text-amber-900' : 'bg-red-100 text-red-900'
                            }`}>
                              {info.band}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-1.5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              pillar.key === 'BORROW'
                                ? pillar.value > 0.6 ? 'bg-amber-600' : 'bg-emerald-700'
                                : pillar.value > 0.5 ? 'bg-emerald-700' : 'bg-amber-600'
                            }`}
                            style={{ width: `${Math.min(100, Math.max(8, pillar.value * 100))}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-stone-500">
                          <span>{info.label}</span>
                          <span className="text-emerald-900 font-medium font-mono">{info.metricLabel}</span>
                        </div>
                      </button>

                      {/* Selected Pillar Explanatory Drawer anchored directly beneath this clicked pillar */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 rounded-xl bg-emerald-900 text-white text-xs border border-emerald-800 shadow-sm">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-mono font-bold text-emerald-300 uppercase">
                                  {pillar.title} Dimension Breakdown
                                </div>
                                <button
                                  onClick={() => setSelectedPillar(null)}
                                  className="text-emerald-300 hover:text-white p-1 cursor-pointer"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-stone-200 mb-2 leading-relaxed">
                                {getPillarDescription(pillar.key, household.financialHealth[pillar.key.toLowerCase() as keyof typeof household.financialHealth]).interpretation}
                              </p>
                              <div className="text-[11px] font-mono text-emerald-200 border-t border-emerald-800/80 pt-2 flex items-center justify-between">
                                <span>Derived from observed SHG/MFI records</span>
                                <button 
                                  onClick={() => setShowSourcesDrawer(true)}
                                  className="underline cursor-pointer hover:text-white text-emerald-200"
                                >
                                  View source trail →
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: Seasonal Context & Cash Flow Trajectory (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
            <div>
              {/* Section Heading */}
              <div className="mb-3">
                <span className="text-[11px] font-mono font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
                  Seasonal Context & Cash-Flow Trajectory
                </span>
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  Household Livelihood Horizon
                </h2>
              </div>

              {/* Current State Area - Clear vertical spacing & horizontal row alignment */}
              <div className="mt-3 mb-5 p-3 rounded-xl bg-stone-50/80 border border-stone-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-stone-600 uppercase">Current State:</span>
                  <span className="inline-flex items-center gap-1.5 text-amber-900 bg-amber-100/80 border border-amber-300 px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
                    <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{household.seasonalContext}</span>
                  </span>
                </div>

                <button
                  id="btn-timing-mismatch-banner"
                  onClick={() => setShowTimingModal(true)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    household.timingProof.badgeType === 'danger'
                      ? 'bg-red-50 border border-red-200 text-red-900 hover:bg-red-100'
                      : household.timingProof.badgeType === 'success'
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                      : 'bg-amber-50 border border-amber-200 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${
                    household.timingProof.badgeType === 'danger' ? 'text-red-700' :
                    household.timingProof.badgeType === 'success' ? 'text-emerald-700' : 'text-amber-700'
                  }`} />
                  <span>{household.timingProof.badgeText}</span>
                </button>
              </div>

              {/* Time-based Cash Flow Chart / Timeline */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-stone-500 font-mono mb-2">
                  <span>Monthly Cash Flow vs EMI Obligation (₹{household.emi.toLocaleString('en-IN')})</span>
                  <span className="font-semibold text-stone-700">{household.horizonSubtitle}</span>
                </div>

                {/* Dynamic Monthly Visual Grid driven by persona-specific timeline */}
                <div 
                  role="group"
                  aria-label="Monthly cash flow timeline"
                  className="grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${household.cashFlowTimeline.length}, minmax(0, 1fr))` }}
                >
                  {household.cashFlowTimeline.map((monthData) => {
                    const isSelected = selectedMonth === monthData.month;
                    const tagType = monthData.tagType || (monthData.isLeanPeriod ? 'warning' : 'neutral');

                    return (
                      <button
                        type="button"
                        key={monthData.month}
                        id={`btn-month-${monthData.month.toLowerCase()}`}
                        aria-pressed={isSelected}
                        onClick={() => setSelectedMonth(monthData.month)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedMonth(monthData.month);
                          }
                        }}
                        className={`p-2.5 rounded-xl border flex flex-col justify-between text-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-50/80 ring-2 ring-emerald-700/40 shadow-xs'
                            : monthData.tagType === 'danger'
                            ? 'border-red-300 bg-red-50/40 hover:bg-red-50/80 hover:border-red-400'
                            : monthData.tagType === 'success'
                            ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/80 hover:border-emerald-400'
                            : monthData.isLeanPeriod
                            ? 'border-amber-200 bg-amber-50/30 hover:bg-amber-50/70 hover:border-amber-300'
                            : 'border-stone-200 bg-stone-50/40 hover:bg-stone-100 hover:border-stone-300'
                        }`}
                      >
                        <div className={`font-mono text-xs ${isSelected ? 'font-bold text-emerald-950' : 'font-semibold text-stone-800'}`}>
                          {monthData.month}
                        </div>
                        
                        {/* Bar Heights representing relative inflow & expense */}
                        <div className="my-2 h-16 flex items-end justify-center gap-1">
                          {/* Inflow bar */}
                          <div
                            className={`w-3.5 rounded-t-sm transition-all duration-500 ${
                              monthData.tagType === 'success' || monthData.isRecoveryWindow 
                                ? 'bg-emerald-700' 
                                : monthData.tagType === 'danger'
                                ? 'bg-red-600'
                                : monthData.isLeanPeriod 
                                ? 'bg-amber-600' 
                                : 'bg-teal-700'
                            }`}
                            style={{ height: `${Math.min(100, Math.max(15, (monthData.expectedInflow / 26000) * 100))}%` }}
                            title={`Expected Inflow: ₹${monthData.expectedInflow.toLocaleString('en-IN')}`}
                          />
                          {/* Expense bar */}
                          <div
                            className="w-2 bg-stone-300 rounded-t-sm"
                            style={{ height: `${Math.min(100, Math.max(15, (monthData.householdExpense / 26000) * 100))}%` }}
                            title={`Household Expense: ₹${monthData.householdExpense.toLocaleString('en-IN')}`}
                          />
                        </div>

                        <div className="text-[10px] font-mono text-stone-600 font-semibold">
                          ₹{(monthData.expectedInflow / 1000).toFixed(1)}k
                        </div>

                        {/* Tag status */}
                        <div className="mt-1">
                          <span className={`text-[9px] font-mono font-bold px-1 py-0.5 rounded block truncate ${
                            tagType === 'danger' ? 'bg-red-100 text-red-900' :
                            tagType === 'success' ? 'bg-emerald-100 text-emerald-900' :
                            tagType === 'warning' ? 'bg-amber-100 text-amber-900' :
                            'bg-stone-100 text-stone-600'
                          }`}>
                            {monthData.tagLabel || (monthData.isLeanPeriod ? 'Lean' : 'Steady')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Click-to-inspect instruction hint */}
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 mb-4 px-1">
                <span>Click any month box above to inspect persona-specific cash flow dynamics</span>
                <span className="text-emerald-800 font-semibold">Active: {currentMonthData.month}</span>
              </div>

              {/* Focus Month Panel */}
              <div 
                id="focus-month-panel"
                className="mb-4 p-4 rounded-xl bg-stone-50 border border-stone-200 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-200/80">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider bg-stone-200 px-2 py-0.5 rounded">
                      FOCUS MONTH
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-stone-900">
                      {currentMonthData.monthFull || currentMonthData.month} — {currentMonthData.contextualDescription}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                    <span className="text-[11px] font-mono text-stone-500">Confidence:</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      currentMonthData.confidence === 'High' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' :
                      currentMonthData.confidence === 'Medium' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                      'bg-red-100 text-red-900 border border-red-200'
                    }`}>
                      {currentMonthData.confidence}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
                    <div className="font-mono font-bold text-[11px] text-emerald-900 uppercase mb-1 flex items-center justify-between">
                      <span>Cash Inflow Dynamics</span>
                      <span className="text-stone-500 font-normal">₹{currentMonthData.expectedInflow.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-stone-700 leading-relaxed">
                      {currentMonthData.inflowDynamics}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-stone-200 shadow-2xs">
                    <div className="font-mono font-bold text-[11px] text-amber-900 uppercase mb-1 flex items-center justify-between">
                      <span>Repayment Obligation Impact</span>
                      <span className="text-stone-500 font-normal">EMI: ₹{currentMonthData.repaymentObligation.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-stone-700 leading-relaxed">
                      {currentMonthData.repaymentImpact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mismatch Deep-Dive Box */}
              <div className="bg-stone-900 text-white rounded-xl p-4 border border-stone-800 mb-3">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    household.timingProof.badgeType === 'danger' ? 'bg-red-900/80 text-red-300' :
                    household.timingProof.badgeType === 'success' ? 'bg-emerald-900/80 text-emerald-300' :
                    'bg-amber-900/80 text-amber-300'
                  }`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-bold text-sm text-stone-100">
                        {household.timingProof.flaggedTitle}
                      </h3>
                      <button
                        onClick={() => setShowTimingModal(true)}
                        className="text-xs text-emerald-300 hover:text-emerald-200 underline font-mono cursor-pointer"
                      >
                        Inspect proof →
                      </button>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      <strong>Observed:</strong> {household.timingProof.observedText}
                    </p>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      <strong>Inferred:</strong> {household.timingProof.inferredText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Insight Callout */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <div className="text-xs font-mono font-bold text-emerald-900 uppercase mb-0.5">
                  {household.centralInsight.headline}
                </div>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  {household.centralInsight.text}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ================= ROW 2: Data Quality & Provenance (Left) + Contextual Check-In (Right) - EQUAL HEIGHT SIDE-BY-SIDE ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 items-stretch">
        
        {/* Data Quality & Governance Indicators */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase text-stone-600">
                Data Quality & Provenance
              </span>
              <button
                onClick={() => setShowSourcesDrawer(true)}
                className="text-xs font-medium text-emerald-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Show sources</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-center">
                <div className="text-[10px] font-mono text-stone-500 uppercase">Completeness</div>
                <div className="text-lg font-bold font-mono text-emerald-900">
                  {(household.dataCompleteness * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] text-emerald-800 font-medium">
                  {household.dataCompleteness >= 0.75 ? 'High coverage' : 'Check required'}
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-center">
                <div className="text-[10px] font-mono text-stone-500 uppercase">Inference</div>
                <div className="text-lg font-bold font-mono text-amber-800">
                  {household.seasonalConfidence}
                </div>
                <div className="text-[10px] text-amber-800 font-medium truncate">
                  {household.district} context
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-center">
                <div className="text-[10px] font-mono text-stone-500 uppercase">Profile Status</div>
                <div className="text-sm font-bold font-mono text-stone-900 mt-1">
                  Reviewable
                </div>
                <div className="text-[10px] text-stone-500">Human review</div>
              </div>
            </div>
          </div>
          
          <p className="text-[11px] text-stone-500 leading-normal pt-2 border-t border-stone-200/60">
            Confidence reflects data coverage and seasonal predictability, distinct from score magnitude. Inferred livelihood context is never treated as guaranteed fact.
          </p>
        </div>

        {/* Contextual Check-In Interactive Snippet */}
        <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-900 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono font-bold uppercase">
                <MessageSquare className="w-4 h-4" />
                <span>Contextual Check-In</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded border border-emerald-800">
                Self-Reported Signal
              </span>
            </div>

            <p className="text-xs text-stone-300 mb-3 leading-relaxed">
              "{household.contextualCheckIn.question}"
            </p>

            <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800/80 mb-3">
              <div className="text-[11px] font-mono text-emerald-300 font-semibold mb-1">Household Response:</div>
              <div className="text-xs font-medium text-white">{selectedCheckInAnswer}</div>
              <div className="text-[11px] text-emerald-200/80 mt-1.5 italic">
                Signal: {household.contextualCheckIn.signalInterpretation}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-emerald-900/80">
            <span className="text-[10px] text-emerald-400 font-mono">
              {household.contextualCheckIn.verifiedByOfficer ? '✓ Officer field-verified' : 'Pending loan officer confirmation'}
            </span>
            <button
              onClick={() => setShowCheckInModal(true)}
              className="text-xs font-semibold text-emerald-300 hover:text-white underline cursor-pointer"
            >
              Change response (Test)
            </button>
          </div>
        </div>

      </div>

      {/* ================= ROW 3: "Context is Connected" Panel (Full width completely below) ================= */}
      <div className="bg-emerald-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md mb-8">
        <div>
          <div className="text-xs font-mono uppercase text-emerald-300 font-bold mb-1">
            Context is Connected
          </div>
          <div className="text-lg font-serif font-bold">
            Ready to review suitable action recommendation?
          </div>
        </div>

        <button
          id="btn-review-sanket-decision"
          onClick={onNext}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer shrink-0"
        >
          <span>Review SANKET recommendation</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Timing Modal / Evidence Detail Modal */}
      <AnimatePresence>
        {showTimingModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-700" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {household.name} — Timing & Evidence Detail
                  </h3>
                </div>
                <button
                  onClick={() => setShowTimingModal(false)}
                  className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                {household.timingProof.modalPoints.map((pt, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      pt.type === 'observed' ? 'bg-stone-50 border-stone-200' :
                      pt.type === 'inferred' ? 'bg-amber-50 border-amber-200' :
                      'bg-emerald-50 border-emerald-200'
                    }`}
                  >
                    <div className={`font-mono font-bold uppercase mb-1 ${
                      pt.type === 'observed' ? 'text-stone-900' :
                      pt.type === 'inferred' ? 'text-amber-900' :
                      'text-emerald-900'
                    }`}>
                      {pt.title}
                    </div>
                    <p className="leading-relaxed">{pt.description}</p>
                    {pt.statusNote && (
                      <p className="mt-1 text-[11px] font-semibold text-amber-800">{pt.statusNote}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setShowTimingModal(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  Close Detail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sources Drawer / Source Provenance Trail */}
      <AnimatePresence>
        {showSourcesDrawer && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {household.name} — Source Provenance Trail
                  </h3>
                </div>
                <button
                  onClick={() => setShowSourcesDrawer(false)}
                  className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-700 max-h-[60vh] overflow-y-auto pr-1">
                {household.sourceRecords.map((rec) => (
                  <div 
                    key={rec.id}
                    className={`p-3 rounded-lg border ${
                      rec.isSyntheticLayer 
                        ? 'bg-amber-50 border-amber-200 text-amber-950' 
                        : 'bg-stone-50 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono font-bold text-[10px] uppercase px-1.5 py-0.5 rounded ${
                        rec.isSyntheticLayer ? 'bg-amber-200/80 text-amber-900' : 'bg-stone-200 text-stone-800'
                      }`}>
                        {rec.sourceType}
                      </span>
                      <span className="font-bold text-stone-900 text-xs">
                        {rec.title}
                      </span>
                    </div>
                    <p className="leading-relaxed">{rec.details}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setShowSourcesDrawer(false)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  Close Trail
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contextual Check-In Option Switcher Modal */}
      <AnimatePresence>
        {showCheckInModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Interactive Contextual Check-In
                  </h3>
                </div>
                <button
                  onClick={() => setShowCheckInModal(false)}
                  className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                Test how different self-reported contextual signals are ingested by SANKET without becoming arbitrary automated rejection reasons:
              </p>

              <div className="space-y-2">
                {household.contextualCheckIn.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      handleCheckInOptionSelect(opt);
                      setShowCheckInModal(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-colors cursor-pointer ${
                      selectedCheckInAnswer === opt
                        ? 'border-emerald-800 bg-emerald-50 font-bold text-emerald-950'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

