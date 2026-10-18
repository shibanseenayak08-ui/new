import React from 'react';
import { 
  Layers, 
  Database, 
  Cpu, 
  X, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building,
  Users2,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';

interface ContextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContextModal: React.FC<ContextModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-stone-200"
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
          <div className="flex items-center gap-2 text-emerald-900">
            <Layers className="w-5 h-5" />
            <h2 className="font-serif font-bold text-xl text-stone-900">
              How SANKET Assembles Household Context
            </h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-stone-700 leading-relaxed mb-6">
          <p>
            In rural and migration-dependent economies, traditional credit scoring fails because it views the borrower through a single, isolated monthly transaction lens.
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 uppercase mb-1">
                <Building className="w-4 h-4 text-emerald-700" />
                <span>1. Institutional Debt Capture (Observed)</span>
              </div>
              <p className="text-stone-600">
                Pulls existing active loan count, outstanding principal, and historical repayment records from the MFI core banking system.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 uppercase mb-1">
                <Users2 className="w-4 h-4 text-teal-700" />
                <span>2. Community Financial Resilience (Observed)</span>
              </div>
              <p className="text-stone-600">
                Ingests SHG savings regularity and voluntary group corpus balances to evaluate liquid emergency buffers and solidarity discipline.
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="flex items-center gap-2 font-mono font-bold text-stone-900 uppercase mb-1">
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>3. Seasonal / Migration Timing (Inferred + Verified)</span>
              </div>
              <p className="text-stone-600">
                Maps scheduled repayment due dates against regional crop harvest and labor migration corridor calendars (e.g. Ganjam → Surat powerloom cycle).
              </p>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-mono text-[11px]">
            <strong>Result:</strong> SANKET transforms static "Can they pay today?" into forward-looking "When and how can they sustainably repay?"
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
