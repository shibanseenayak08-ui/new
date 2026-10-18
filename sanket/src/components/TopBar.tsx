import React from 'react';
import { 
  Building2, 
  Users, 
  Compass, 
  RotateCcw, 
  Info, 
  ChevronRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { SanketLogo } from './SanketLogo';
import { HouseholdData } from '../types';
import { ALL_SYNTHETIC_HOUSEHOLDS } from '../data/syntheticData';

interface TopBarProps {
  currentScreen: number;
  onSelectScreen: (screen: number) => void;
  selectedHousehold: HouseholdData;
  onSelectHousehold: (household: HouseholdData) => void;
  onResetDemo: () => void;
  onOpenSyntheticInfo: () => void;
  onToggleBorrowerView?: () => void;
  isBorrowerView?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onSelectScreen,
  selectedHousehold,
  onSelectHousehold,
  onResetDemo,
  onOpenSyntheticInfo,
  onToggleBorrowerView,
  isBorrowerView = false,
}) => {
  const steps = [
    { num: 1, label: 'The Problem', sub: 'Fragmented Data' },
    { num: 2, label: 'Household Profile', sub: 'Context & Timing' },
    { num: 3, label: 'SANKET Decision', sub: 'Suitable Action' },
    { num: 4, label: 'How It Works', sub: 'Governed Architecture' },
    { num: 5, label: 'About', sub: 'The Idea & Story' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 px-3 lg:px-6 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Brand & North Star */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => onSelectScreen(1)}>
            <div className="w-8 h-8 rounded-lg bg-emerald-950 flex items-center justify-center shadow-xs border border-emerald-800/80 shrink-0 p-1 text-emerald-300">
              <SanketLogo className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-extrabold text-xl tracking-tight text-emerald-950">SANKET</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold tracking-wider">
                  Phase 2 MVP
                </span>
              </div>
              <p className="text-[10px] text-stone-500 font-medium tracking-wide leading-tight">
                Rural Financial Health<br />Intelligence Layer
              </p>
            </div>
          </div>

          {/* Mobile Step Badge */}
          <div className="md:hidden flex items-center gap-1.5">
            <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
              {currentScreen === 5 ? 'About' : `0${currentScreen} / 05`}
            </span>
          </div>
        </div>

        {/* Guided 5-Screen Stepper */}
        <nav aria-label="Prototype Progress" className="hidden md:flex items-center gap-1 lg:gap-1.5">
          {steps.map((step) => {
            const isActive = currentScreen === step.num;
            const isCompleted = currentScreen > step.num;

            return (
              <button
                key={step.num}
                id={`nav-step-${step.num}`}
                onClick={() => onSelectScreen(step.num)}
                className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-900 text-white shadow-xs ring-1 ring-emerald-800'
                    : isCompleted
                    ? 'bg-emerald-50/80 text-emerald-950 hover:bg-emerald-100/70'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100/60'
                }`}
              >
                <span
                  className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-colors ${
                    isActive
                      ? 'bg-emerald-400 text-emerald-950'
                      : isCompleted
                      ? 'bg-emerald-800 text-emerald-100'
                      : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'
                  }`}
                >
                  0{step.num}
                </span>
                <div className="text-left">
                  <div className="text-xs font-semibold leading-tight">{step.label}</div>
                </div>
                {step.num < steps.length && (
                  <ChevronRight
                    className={`w-3 h-3 ml-0.5 opacity-40 ${
                      isActive ? 'text-white' : 'text-stone-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility & Household Selector */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          
          {/* Quick Household Switcher for Jury Testing */}
          <div className="relative">
            <label htmlFor="household-selector" className="sr-only">Select Household</label>
            <select
              id="household-selector"
              value={selectedHousehold.id}
              onChange={(e) => {
                const found = ALL_SYNTHETIC_HOUSEHOLDS.find((h) => h.id === e.target.value);
                if (found) onSelectHousehold(found);
              }}
              className="text-xs font-medium bg-stone-50 border border-stone-300 text-stone-800 rounded-md py-1.5 pl-2.5 pr-7 focus:outline-hidden focus:ring-1 focus:ring-emerald-700 cursor-pointer shadow-2xs hover:bg-stone-100 transition-colors"
            >
              {ALL_SYNTHETIC_HOUSEHOLDS.map((hh) => (
                <option key={hh.id} value={hh.id}>
                  {hh.name} ({hh.district}) — {hh.recommendation}
                </option>
              ))}
            </select>
          </div>

          {/* Synthetic Demo Badge with click info */}
          <button
            id="btn-synthetic-badge"
            onClick={onOpenSyntheticInfo}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium bg-amber-50 border border-amber-200/80 text-amber-900 hover:bg-amber-100/70 transition-colors"
            title="Click to view synthetic data disclosure"
          >
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="hidden sm:inline">Synthetic Demo</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Reset button */}
          <button
            id="btn-reset-demo"
            onClick={onResetDemo}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
            title="Reset prototype state to Meena Hero scenario"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
