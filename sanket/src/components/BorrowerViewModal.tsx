import React from 'react';
import { 
  HeartHandshake, 
  Calendar, 
  ShieldCheck, 
  CheckCircle, 
  X, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HouseholdData } from '../types';

interface BorrowerViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  household: HouseholdData;
}

export const BorrowerViewModal: React.FC<BorrowerViewModalProps> = ({
  isOpen,
  onClose,
  household,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-stone-200 overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-900">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif font-bold text-xl text-stone-900">
                  Borrower Financial Health View
                </h2>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200 font-bold">
                  Empowering & Transparent
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Household of {household.name} · {household.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gentle, Jargon-Free Summary Card */}
        <div className="p-5 rounded-xl bg-teal-900 text-white mb-6 shadow-xs">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-mono font-semibold uppercase mb-1">
            <Sparkles className="w-4 h-4" />
            <span>How SANKET Understands Your Cash Flow</span>
          </div>
          <h3 className="font-serif font-bold text-lg text-white mb-2">
            {household.suggestedActionDetail.headline}
          </h3>
          <p className="text-xs text-teal-100 leading-relaxed">
            {household.narrativeSummary}
          </p>
        </div>

        {/* 4 Pillars in Plain Human Language */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700 mb-3">
            Your Household Financial Health Snapshot
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-900 mb-1 flex items-center justify-between">
                <span>Daily Spending & Cash Flow</span>
                <span className="text-teal-800 font-mono text-[11px]">
                  {household.financialHealth.spend >= 0.5 ? 'Stable' : 'Constrained'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                Day-to-day cash flow indicates {household.financialHealth.spend >= 0.5 ? 'adequate off-season stability.' : 'limited reserves during lean period.'}
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-900 mb-1 flex items-center justify-between">
                <span>Savings & Group Reserves</span>
                <span className="text-teal-800 font-mono text-[11px]">
                  {household.financialHealth.save >= 0.5 ? 'Strong Buffer' : 'Low Cushion'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                {household.financialHealth.save >= 0.5 
                  ? 'Consistent group thrift deposits provide reliable trust and cushion.' 
                  : 'Emergency reserve is thin; prioritize building group thrift buffer.'}
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-900 mb-1 flex items-center justify-between">
                <span>Debt Commitments</span>
                <span className="text-amber-800 font-mono text-[11px]">
                  {household.financialHealth.borrow > 0.6 ? 'High Debt Burden' : 'Manageable'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                {household.financialHealth.borrow > 0.6 
                  ? 'Multiple or heavy loan commitments require careful timing alignment.' 
                  : 'Scheduled debt service is well aligned with baseline earnings.'}
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <div className="text-xs font-bold text-stone-900 mb-1 flex items-center justify-between">
                <span>Forward Protection</span>
                <span className="text-teal-800 font-mono text-[11px]">
                  {household.financialHealth.plan >= 0.5 ? 'Prepared' : 'Protection Focus'}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                {household.financialHealth.plan >= 0.5
                  ? 'Strong seasonal foresight and predictable income timelines.'
                  : 'Advised to link with SHG emergency fund or health insurance protection.'}
              </p>
            </div>

          </div>
        </div>

        {/* Suggested Next Step for the Borrower */}
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 mb-6">
          <div className="font-mono font-bold uppercase mb-1 flex items-center gap-1.5 text-emerald-900">
            <CheckCircle className="w-4 h-4 text-emerald-700" />
            <span>Suggested Action With Your Loan Officer:</span>
          </div>
          <p className="text-emerald-900 leading-relaxed">
            {household.suggestedActionDetail.structure}
          </p>
        </div>

        {/* Anti-Surveillance Assurance */}
        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>Zero continuous tracking · Consent-governed data</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 cursor-pointer"
          >
            Close Borrower View
          </button>
        </div>
      </motion.div>
    </div>
  );
};
