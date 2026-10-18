import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Screen01Problem } from './components/Screen01Problem';
import { Screen02Household } from './components/Screen02Household';
import { Screen03Decision } from './components/Screen03Decision';
import { Screen04Architecture } from './components/Screen04Architecture';
import { Screen05About } from './components/Screen05About';
import { BorrowerViewModal } from './components/BorrowerViewModal';
import { ContextModal } from './components/ContextModal';
import { SyntheticInfoModal } from './components/SyntheticInfoModal';
import { MEENA_HERO_HOUSEHOLD, ALL_SYNTHETIC_HOUSEHOLDS } from './data/syntheticData';
import { HouseholdData, OfficerDecisionRecord } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { HeartHandshake, Eye, ArrowLeft, ArrowRight, Compass } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [selectedHousehold, setSelectedHousehold] = useState<HouseholdData>(MEENA_HERO_HOUSEHOLD);
  const [officerDecision, setOfficerDecision] = useState<OfficerDecisionRecord>({
    decision: 'pending',
  });
  
  const [isBorrowerViewOpen, setIsBorrowerViewOpen] = useState<boolean>(false);
  const [isContextModalOpen, setIsContextModalOpen] = useState<boolean>(false);
  const [isSyntheticInfoOpen, setIsSyntheticInfoOpen] = useState<boolean>(false);

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleResetDemo = () => {
    setCurrentScreen(1);
    setSelectedHousehold(MEENA_HERO_HOUSEHOLD);
    setOfficerDecision({ decision: 'pending' });
  };

  const handleUpdateCheckIn = (newAnswer: string) => {
    setSelectedHousehold((prev) => ({
      ...prev,
      contextualCheckIn: {
        ...prev.contextualCheckIn,
        selectedAnswer: newAnswer,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Persistent Guided Navigation TopBar */}
      <TopBar
        currentScreen={currentScreen}
        onSelectScreen={(screenNum) => setCurrentScreen(screenNum)}
        selectedHousehold={selectedHousehold}
        onSelectHousehold={(hh) => {
          setSelectedHousehold(hh);
          setOfficerDecision({ decision: 'pending' });
        }}
        onResetDemo={handleResetDemo}
        onOpenSyntheticInfo={() => setIsSyntheticInfoOpen(true)}
      />

      {/* Main Content Area with Smooth Screen Transitions */}
      <main className="flex-1 w-full max-w-7xl mx-auto pb-16">
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <Screen01Problem
                selectedHousehold={selectedHousehold}
                onNext={() => setCurrentScreen(2)}
                onOpenContextModal={() => setIsContextModalOpen(true)}
              />
            </motion.div>
          )}

          {currentScreen === 2 && (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <Screen02Household
                household={selectedHousehold}
                onNext={() => setCurrentScreen(3)}
                onOpenSyntheticInfo={() => setIsSyntheticInfoOpen(true)}
                onUpdateContextCheckIn={handleUpdateCheckIn}
              />
            </motion.div>
          )}

          {currentScreen === 3 && (
            <motion.div
              key="screen-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <Screen03Decision
                household={selectedHousehold}
                onNext={() => setCurrentScreen(4)}
                officerDecision={officerDecision}
                onUpdateOfficerDecision={setOfficerDecision}
                onSelectHousehold={setSelectedHousehold}
              />
            </motion.div>
          )}

          {currentScreen === 4 && (
            <motion.div
              key="screen-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <Screen04Architecture
                onRestartToScreen1={handleResetDemo}
                onNextToAbout={() => setCurrentScreen(5)}
              />
            </motion.div>
          )}

          {currentScreen === 5 && (
            <motion.div
              key="screen-5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              <Screen05About
                onGoToDashboard={() => setCurrentScreen(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Quick Action Bar */}
      <footer className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 bg-stone-900/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-stone-700 shadow-xl flex items-center gap-3 text-xs">
        {currentScreen > 1 && (
          <button
            id="btn-nav-prev"
            onClick={() => setCurrentScreen((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-1 text-stone-300 hover:text-white px-2 py-1 rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>
        )}

        <div className="text-[11px] font-mono text-stone-400 border-x border-stone-700 px-3">
          {currentScreen === 5 ? 'About SANKET' : `Step 0${currentScreen} / 05`}
        </div>

        {/* Borrower View Toggle Button */}
        <button
          id="btn-toggle-borrower-view"
          onClick={() => setIsBorrowerViewOpen(true)}
          className="flex items-center gap-1.5 text-teal-300 hover:text-teal-100 bg-teal-950/80 px-3 py-1 rounded-full border border-teal-800 hover:bg-teal-900 transition-colors font-medium cursor-pointer"
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Borrower View</span>
        </button>

        {currentScreen < 5 ? (
          <button
            id="btn-nav-next"
            onClick={() => setCurrentScreen((prev) => Math.min(5, prev + 1))}
            className="flex items-center gap-1 text-emerald-300 hover:text-white px-2 py-1 rounded-full hover:bg-stone-800 transition-colors font-bold cursor-pointer"
          >
            <span>{currentScreen === 4 ? 'About SANKET' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            id="btn-nav-return-dashboard"
            onClick={() => setCurrentScreen(1)}
            className="flex items-center gap-1 text-emerald-300 hover:text-white px-2 py-1 rounded-full hover:bg-stone-800 transition-colors font-bold cursor-pointer"
          >
            <span>Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>

      {/* Auxiliary Modals */}
      <BorrowerViewModal
        isOpen={isBorrowerViewOpen}
        onClose={() => setIsBorrowerViewOpen(false)}
        household={selectedHousehold}
      />

      <ContextModal
        isOpen={isContextModalOpen}
        onClose={() => setIsContextModalOpen(false)}
      />

      <SyntheticInfoModal
        isOpen={isSyntheticInfoOpen}
        onClose={() => setIsSyntheticInfoOpen(false)}
      />

    </div>
  );
}
