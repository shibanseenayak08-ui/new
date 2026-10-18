import React from 'react';
import { Info, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SyntheticInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SyntheticInfoModal: React.FC<SyntheticInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-stone-200"
      >
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2 text-amber-900">
            <Info className="w-5 h-5 text-amber-700" />
            <h2 className="font-serif font-bold text-lg text-stone-900">
              Synthetic Demonstration Disclosure
            </h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-stone-700 leading-relaxed mb-6">
          <p className="font-medium text-stone-900">
            This prototype operates strictly on representative, synthetic data created for the APRU 2026 Hackathon jury evaluation.
          </p>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 space-y-1.5">
            <div className="font-mono font-bold uppercase text-[11px]">Strict Prototype Boundaries:</div>
            <ul className="list-disc list-inside space-y-1 text-[11px]">
              <li>No real individual or borrower PII is stored, ingested, or simulated.</li>
              <li>Values reflect authentic migration corridors (e.g. Ganjam textile labor).</li>
              <li>No live core banking or Account Aggregator API connections are claimed.</li>
              <li>All recommendations are advisory and require human officer validation.</li>
            </ul>
          </div>

          <p className="text-stone-500 text-[11px]">
            In Phase 3, this demonstration layer will be backed by consented, tokenized identity rails and authorized FSP institutional connectors.
          </p>
        </div>

        <div className="flex justify-end pt-4 border-t border-stone-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800"
          >
            Understood
          </button>
        </div>
      </motion.div>
    </div>
  );
};
