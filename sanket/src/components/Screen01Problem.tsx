import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Calendar, 
  Users2, 
  Building, 
  AlertTriangle,
  AlertCircle,
  Database,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HouseholdData } from '../types';

interface Screen01ProblemProps {
  selectedHousehold: HouseholdData;
  onNext: () => void;
  onOpenContextModal: () => void;
}

interface PersonaAppraisalDetail {
  mfi: {
    badge: string;
    title: string;
    statusQuoDesc: string;
    sanketDesc: string;
    drawer: {
      status: string;
      description: string;
      bullets: { label: string; value: string }[];
    };
  };
  shg: {
    badge: string;
    title: string;
    statusQuoDesc: string;
    sanketDesc: string;
    drawer: {
      status: string;
      description: string;
      bullets: { label: string; value: string }[];
    };
  };
  migration: {
    badge: string;
    title: string;
    statusQuoDesc: string;
    sanketDesc: string;
    drawer: {
      status: string;
      description: string;
      bullets: { label: string; value: string }[];
    };
  };
  conventional: {
    question: string;
    description: string;
    result: string;
  };
  sanket: {
    question: string;
    description: string;
    result: string;
  };
}

const PERSONA_PROBLEM_DATA: Record<string, PersonaAppraisalDetail> = {
  'hh-meena-ganjam': {
    mfi: {
      badge: 'Observed',
      title: 'MFI Ledger',
      statusQuoDesc: 'Active JLG micro-loan with ₹18,000 outstanding balance, 18-month clean track record, and ₹4,200 EMI due 15 September.',
      sanketDesc: 'Contextualizes ₹18,000 isolated loan ledger within seasonal remittance transit timing and household liquid buffers.',
      drawer: {
        status: 'Status: Observed Data',
        description: 'Directly recorded in institutional core banking/microfinance databases.',
        bullets: [
          { label: 'Repayment history', value: '18 months continuous on-time JLG payments.' },
          { label: 'Current balance', value: '₹18,000 outstanding principal across 2 active loans.' },
          { label: 'Scheduled obligation', value: '₹4,200 due on 15 September 2026.' },
          { label: 'Limitation in Status Quo', value: 'Shows only the balance, not whether September is a lean agricultural period.' }
        ]
      }
    },
    shg: {
      badge: 'Observed',
      title: 'SHG Registers',
      statusQuoDesc: 'Maa Tarini SHG voluntary corpus of ₹3,800, 92% meeting attendance, and uninterrupted ₹150/month thrift deposits.',
      sanketDesc: 'Incorporates ₹3,800 informal SHG community savings and peer solidarity directly into the household financial profile.',
      drawer: {
        status: 'Status: Observed Data',
        description: 'Captured through Mission Shakti SHG register exports & group ledgers.',
        bullets: [
          { label: 'Cumulative group savings', value: '₹3,800 voluntary corpus.' },
          { label: 'Monthly discipline', value: 'Uninterrupted ₹150/month contributions.' },
          { label: 'Group solidarity index', value: 'High meeting attendance (92%).' },
          { label: 'Limitation in Status Quo', value: 'Siloed in village registers, disconnected from bank underwriting.' }
        ]
      }
    },
    migration: {
      badge: 'Inferred Pattern',
      title: 'Seasonal / Migration Timing',
      statusQuoDesc: 'Ganjam → Surat powerloom textile corridor: lean June–September followed by expected ₹18,000–₹22,000 pre-Diwali remittance.',
      sanketDesc: 'Adds seasonal migration and remittance timing so financial decisions reflect when liquidity actually arrives.',
      drawer: {
        status: 'Status: Inferred Pattern (Not Yet Confirmed)',
        description: 'Derived from 3-year historical Ganjam → Surat textile corridor patterns.',
        bullets: [
          { label: 'Corridor timeline', value: 'June–September lean period; powerloom settlement in mid-October.' },
          { label: 'Remittance expectation', value: 'Predictable seasonal surge of ₹18,000–₹22,000 before Diwali.' },
          { label: 'Confidence level', value: 'Medium (requires household/field confirmation before final execution).' },
          { label: 'SANKET value', value: 'Bridges the invisible timing gap so lenders do not penalize seasonal workers.' }
        ]
      }
    },
    conventional: {
      question: '"Will this borrower repay next month?"',
      description: 'Assumes linear monthly income. When September cash is low (₹4,100), standard scoring treats the household as high credit risk — ignoring that a planned October remittance will arrive in 4 weeks.',
      result: 'Rigid rejection or ill-timed loan default'
    },
    sanket: {
      question: '"What financial action is most suitable right now?"',
      description: 'Connects MFI + SHG + seasonal calendar to reveal that low September liquidity is transient. Recommends LEND DIFFERENTLY with repayment aligned to expected recovery.',
      result: 'Sustainable credit with 0% penalty risk'
    }
  },
  'hh-bikash-kalahandi': {
    mfi: {
      badge: 'Observed',
      title: 'MFI Ledger',
      statusQuoDesc: 'Single active Agri-Kisan loan of ₹12,000 with 24 months zero delayed installments and ₹3,500 EMI due 20 October.',
      sanketDesc: 'Confirms manageable debt-service ratio (24%) and pristine 24-month repayment record ready for credit expansion.',
      drawer: {
        status: 'Status: Observed Institutional Data',
        description: 'Recorded in Agri-Kisan and cooperative agricultural credit ledgers.',
        bullets: [
          { label: 'Repayment history', value: '24 months track record with zero delayed installments.' },
          { label: 'Current balance', value: '₹12,000 single active micro-loan.' },
          { label: 'Scheduled obligation', value: '₹3,500 monthly installment due 20 October.' },
          { label: 'Limitation in Status Quo', value: 'Evaluates past track record without factoring in forward agricultural harvest surges.' }
        ]
      }
    },
    shg: {
      badge: 'Observed',
      title: 'SHG Registers',
      statusQuoDesc: 'Maa Mangala SHG (Junagarh) savings corpus of ₹11,200 with 100% meeting attendance and strong peer backing.',
      sanketDesc: 'Integrates strong ₹11,200 village savings and peer backing as substantial liquid buffer collateral.',
      drawer: {
        status: 'Status: Observed Village Level Data',
        description: 'Maintained via Kalahandi Gram Panchayat SHG federation records.',
        bullets: [
          { label: 'Cumulative group savings', value: '₹11,200 verified savings corpus (>1.8 months essential expenses).' },
          { label: 'Monthly discipline', value: 'Consistent quarterly growth in SHG corpus.' },
          { label: 'Group solidarity index', value: '100% meeting attendance with active joint liability.' },
          { label: 'Limitation in Status Quo', value: 'Ignored by commercial bank scoring models during agricultural appraisals.' }
        ]
      }
    },
    migration: {
      badge: 'Observed Pattern',
      title: 'Seasonal / Migration Timing',
      statusQuoDesc: 'Kalahandi Kharif paddy & pulse harvest with Mandi intake windows scheduled Oct 15–Nov 10 (₹26,000 cash realization).',
      sanketDesc: 'Synchronizes loan repayment with ₹26,000 Kharif harvest cash flow surge in October/November.',
      drawer: {
        status: 'Status: Observed Agricultural Cycle',
        description: 'Derived from Kalahandi Agriculture Dept crop maturation tracking & Mandi calendars.',
        bullets: [
          { label: 'Crop cycle timeline', value: 'Kharif early harvest & primary Mandi intake windows Oct 15–Nov 10.' },
          { label: 'Harvest inflow expectation', value: 'Inflow surges to ₹26,000 from first paddy harvests and mandi sales.' },
          { label: 'Confidence level', value: 'High (84% data completeness with verified harvest calendar).' },
          { label: 'SANKET value', value: 'Affirms harvest-synchronized repayment capacity with DTI below 28%.' }
        ]
      }
    },
    conventional: {
      question: '"Does this borrower meet baseline credit scorecard thresholds?"',
      description: 'Scores the borrower favorably on past repayments, but applies rigid loan caps and standard generic terms without aligning to crop sales cycles.',
      result: 'Standard approval without seasonal optimization'
    },
    sanket: {
      question: '"How can repayment schedule match the harvest cash cycle?"',
      description: 'Verifies robust timing synchrony between October harvest and scheduled EMI installments. High data completeness (84%) and resilient savings justify immediate credit extension.',
      result: 'EXTEND CREDIT (standard ₹25,000 facility with harvest alignment)'
    }
  },
  'hh-sunita-mayurbhanj': {
    mfi: {
      badge: 'Observed',
      title: 'MFI Ledger',
      statusQuoDesc: '2 active micro-enterprise loans totaling ₹16,800 with concurrent ₹3,200 monthly EMI due 10 September.',
      sanketDesc: 'Identifies that ₹3,200 EMI severely overburdens household following sudden hospitalization and climate shock.',
      drawer: {
        status: 'Status: Observed Data',
        description: 'Recorded in JLG microfinance group collection sheets.',
        bullets: [
          { label: 'Repayment history', value: '2 existing loans with concurrent EMIs totaling ₹3,200.' },
          { label: 'Current balance', value: '₹16,800 aggregate debt burden.' },
          { label: 'Scheduled obligation', value: '₹3,200 due 10 September against available bank liquidity of only ₹450.' },
          { label: 'Limitation in Status Quo', value: 'Treats emergency health and climate shocks as structural borrower delinquency.' }
        ]
      }
    },
    shg: {
      badge: 'Observed',
      title: 'SHG Registers',
      statusQuoDesc: 'Banadurga SHG (Baripada): ₹450 available balance following emergency ₹1,500 medical withdrawal last week.',
      sanketDesc: 'Reflects depleted savings buffer (₹450 remaining) following emergency medical withdrawal for hospitalization.',
      drawer: {
        status: 'Status: Observed Data',
        description: 'Captured through Mayurbhanj tribal SHG group meeting logs.',
        bullets: [
          { label: 'Available bank balance', value: '₹450 (critically depleted).' },
          { label: 'Emergency withdrawal', value: '₹1,500 medical withdrawal recorded for acute family hospitalization.' },
          { label: 'Savings health score', value: 'Save: 0.22 (zero liquid non-group savings cushion).' },
          { label: 'Limitation in Status Quo', value: 'FSP systems cannot see internal SHG emergency assistance loans.' }
        ]
      }
    },
    migration: {
      badge: 'Climate Pattern',
      title: 'Seasonal / Migration Timing',
      statusQuoDesc: 'Mayurbhanj flash flooding disrupted Sal leaf & Mahua collection by ~60%; projected September deficit of -₹3,650.',
      sanketDesc: 'Maps compounding climate and health shock vulnerability, revealing acute liquidity deficit in September.',
      drawer: {
        status: 'Status: Environmental & Climate Pattern',
        description: 'Derived from Mayurbhanj Disaster Dept flood advisories and NTFP seasonal calendars.',
        bullets: [
          { label: 'Climate timeline', value: 'Heavy monsoon and riverine inundation disrupted minor forest produce collection by ~60%.' },
          { label: 'Shock buffer expectation', value: 'Net projected monthly cash deficit of -₹3,650 in September.' },
          { label: 'Confidence level', value: 'High (disaster advisory + verified medical emergency).' },
          { label: 'SANKET value', value: 'Prevents over-indebtedness by recommending insurance/buffer protection instead of more high-cost debt.' }
        ]
      }
    },
    conventional: {
      question: '"Is this borrower showing signs of delinquency?"',
      description: 'Sees an imminent repayment failure and critically low cash balance (₹450). Automated credit rules downgrade credit score and trigger aggressive recovery calls.',
      result: 'Punitive collection fees and borrower distress'
    },
    sanket: {
      question: '"What protection or restructuring prevents catastrophic asset sale?"',
      description: 'Detects climate shock + health shock collision. Advises against fresh debt burden and recommends micro-health insurance coverage and temporary repayment pause.',
      result: 'RECOMMEND PROTECTION (shock cover & emergency relief)'
    }
  },
  'hh-ramesh-koraput': {
    mfi: {
      badge: 'Partial Data',
      title: 'MFI Ledger',
      statusQuoDesc: 'Agro-Forestry Loan of ₹8,500 with ₹2,800 EMI due 18 September; stale institutional record (> 60 days).',
      sanketDesc: 'Contextualizes stale 60-day records as remote agency documentation lag rather than borrower non-compliance.',
      drawer: {
        status: 'Status: Partial / Inferred Data',
        description: 'Recorded with field data gaps from remote hilly agency areas.',
        bullets: [
          { label: 'Repayment history', value: '1 active agro-forestry loan (balance ₹8,500); stale record (> 60 days).' },
          { label: 'Current balance', value: '₹8,500 active loan balance.' },
          { label: 'Scheduled obligation', value: '₹2,800 EMI due 18 September against bank balance of ₹1,100.' },
          { label: 'Limitation in Status Quo', value: 'Rejection due to \'Insufficient bureau footprint\' or missing documentation.' }
        ]
      }
    },
    shg: {
      badge: 'Observed',
      title: 'SHG Registers',
      statusQuoDesc: 'Dongar Devi SHG (Semiliguda): ₹4,200 group savings; missing August register entry due to earner illness.',
      sanketDesc: 'Surfaces ₹4,200 active SHG savings while flagging missing August entry for targeted officer verification.',
      drawer: {
        status: 'Status: Observed Village Level Data',
        description: 'Maintained via Dongar Devi SHG (Semiliguda) registers.',
        bullets: [
          { label: 'Cumulative group savings', value: '₹4,200 village corpus.' },
          { label: 'Data gap note', value: 'Missing August meeting record due to temporary primary earner illness.' },
          { label: 'Group solidarity index', value: '94% peer verification score.' },
          { label: 'Limitation in Status Quo', value: 'Disconnected paper passbooks unavailable to central bureau algorithms.' }
        ]
      }
    },
    migration: {
      badge: 'Agro Pattern',
      title: 'Seasonal / Migration Timing',
      statusQuoDesc: 'Koraput Coffee Farmers Producer Co.: cherry harvest begins mid-November yielding projected ₹18,000 advance.',
      sanketDesc: 'Indicates high-value harvest liquidity window arriving in mid-November from cooperative coffee cherry sales.',
      drawer: {
        status: 'Status: Agro-Ecological Timeline',
        description: 'Derived from Koraput coffee blossoming and harvest maturation cycles.',
        bullets: [
          { label: 'Crop timeline', value: 'Monsoon shade management; organic coffee cherry harvest begins mid-November.' },
          { label: 'Inflow expectation', value: 'Cooperative procurement advance of ₹18,000 expected in November.' },
          { label: 'Confidence level', value: 'Low-Medium (46% data completeness requires field officer check-in).' },
          { label: 'SANKET value', value: 'Flags that algorithmic auto-rejection would miss a highly viable farming household.' }
        ]
      }
    },
    conventional: {
      question: '"Does the applicant have complete documentation?"',
      description: 'Digital scorecards penalize 46% data completeness and automatically decline the loan application due to unverified gaps.',
      result: 'Algorithmic exclusion of viable tribal farmers'
    },
    sanket: {
      question: '"What specific information needs verification by a loan officer?"',
      description: 'Identifies that data gaps are administrative rather than credit risks. Generates an interactive field check-in prompt for the field agent.',
      result: 'CHECK IN (assisted field verification before automated decision)'
    }
  },
  'hh-dileswar-balangir': {
    mfi: {
      badge: 'Observed',
      title: 'MFI Ledger',
      statusQuoDesc: 'Multi-lender records showing 4 concurrent loans totaling ₹38,000 with heavy ₹5,800 monthly EMI burden (78% DTI).',
      sanketDesc: 'Reveals hidden cumulative debt stack (4 active loans, 78% DTI) across multiple institutions before adding further credit distress.',
      drawer: {
        status: 'Status: Multi-Source Observed Stack',
        description: 'Aggregated across multiple MFI and NBFC institutional ledgers.',
        bullets: [
          { label: 'Repayment history', value: '4 active micro-loans with rising leverage ratio.' },
          { label: 'Current balance', value: '₹38,000 aggregate outstanding debt burden.' },
          { label: 'Scheduled obligation', value: '₹5,800 combined monthly EMI consuming 78% of monthly income.' },
          { label: 'Limitation in Status Quo', value: 'Individual lenders only evaluate their own tranche without seeing total leverage.' }
        ]
      }
    },
    shg: {
      badge: 'Observed',
      title: 'SHG Registers',
      statusQuoDesc: 'Balangir SHG cluster: depleted savings corpus of ₹800 (down from ₹3,000) and strained peer relations.',
      sanketDesc: 'Shows depleted savings buffer (₹800 remaining) and reliance on high-interest informal advances.',
      drawer: {
        status: 'Status: Observed Data',
        description: 'Captured from Balangir SHG cluster registers.',
        bullets: [
          { label: 'Cumulative group savings', value: '₹800 (depleted from ₹3,000).' },
          { label: 'Monthly discipline', value: 'Irregular contributions due to heavy debt service.' },
          { label: 'Group solidarity index', value: 'Strained peer relations due to overdue intra-group borrowing.' },
          { label: 'Limitation in Status Quo', value: 'FSPs miss that borrower is borrowing from SHG to pay MFI installments.' }
        ]
      }
    },
    migration: {
      badge: 'Inferred Pattern',
      title: 'Seasonal / Migration Timing',
      statusQuoDesc: 'Balangir brick kiln migration corridor (Nov–May); contractor advance already mortgaged against future seasonal labor.',
      sanketDesc: 'Maps brick kiln contractor advance cycles, revealing extreme debt saturation during the monsoon off-season.',
      drawer: {
        status: 'Status: Labor Migration & Debt Cycle',
        description: 'Derived from Balangir brick kiln migration corridors.',
        bullets: [
          { label: 'Migration timeline', value: 'Monsoon shutdown at home; departure for brick kilns in November for contractor advances.' },
          { label: 'Inflow expectation', value: 'Contractor advance already mortgaged against future seasonal labor; no net recovery in 90 days.' },
          { label: 'Confidence level', value: 'High (corridor labor tracking & multi-lender data).' },
          { label: 'SANKET value', value: 'Protects both borrower and lender by stopping predatory over-indebtedness spirals.' }
        ]
      }
    },
    conventional: {
      question: '"Does this borrower qualify for a new loan limit?"',
      description: 'Seeing on-time past payments on individual single-lender books, competing MFIs offer aggressive top-up loans without cross-ledger visibility.',
      result: 'Severe over-indebtedness and coercive debt cycle'
    },
    sanket: {
      question: '"Is this household facing structural debt saturation?"',
      description: 'Aggregates multi-source debt obligations to expose that 78% of income is consumed by debt service. Recommends pausing fresh credit and restructuring.',
      result: 'WAIT (pause credit & prioritize debt stabilization)'
    }
  }
};

// Aliases for legacy/alternate ID formats
PERSONA_PROBLEM_DATA['hh-meena-001'] = PERSONA_PROBLEM_DATA['hh-meena-ganjam'];
PERSONA_PROBLEM_DATA['hh-bikash-002'] = PERSONA_PROBLEM_DATA['hh-bikash-kalahandi'];
PERSONA_PROBLEM_DATA['hh-sunita-003'] = PERSONA_PROBLEM_DATA['hh-sunita-mayurbhanj'];
PERSONA_PROBLEM_DATA['hh-ramesh-004'] = PERSONA_PROBLEM_DATA['hh-ramesh-koraput'];
PERSONA_PROBLEM_DATA['hh-dileswar-005'] = PERSONA_PROBLEM_DATA['hh-dileswar-balangir'];

const getPersonaProblemData = (household: HouseholdData): PersonaAppraisalDetail => {
  if (PERSONA_PROBLEM_DATA[household.id]) {
    return PERSONA_PROBLEM_DATA[household.id];
  }
  const nameKey = household.name.toLowerCase();
  for (const [key, value] of Object.entries(PERSONA_PROBLEM_DATA)) {
    if (key.toLowerCase().includes(nameKey)) {
      return value;
    }
  }
  return PERSONA_PROBLEM_DATA['hh-meena-ganjam'];
};

export const Screen01Problem: React.FC<Screen01ProblemProps> = ({ 
  selectedHousehold, 
  onNext, 
  onOpenContextModal 
}) => {
  const [selectedSource, setSelectedSource] = useState<'MFI' | 'SHG' | 'MIGRATION' | null>(null);
  const [appraisalView, setAppraisalView] = useState<'STATUS_QUO' | 'SANKET'>('STATUS_QUO');

  const activePersonaData = getPersonaProblemData(selectedHousehold);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
      
      {/* 1. INVISIBLE DATA PROBLEM: Header Eyebrow & Problem Statement */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <span className="inline-block text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200/80 mb-4">
          The Invisible Data Problem
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight mb-4">
          The data exists. <br />
          <span className="text-emerald-900 underline decoration-emerald-400 decoration-wavy decoration-1 underline-offset-8">
            The context doesn't.
          </span>
        </h1>
        <div className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto space-y-1">
          <p className="font-normal text-stone-600">
            Traditional lending looks at the past: loan history, repayment track records, etc.
          </p>
          <p className="font-bold text-stone-900">
            Sanket helps FSPs and rural households decide the next best financial action to build lasting financial health.
          </p>
        </div>
      </motion.div>

      {/* 2. FINVERSE ALIGNMENT: Three Structural Gaps Between Financial Data and Health */}
      <motion.section 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="mb-10"
        aria-labelledby="heading-finverse-alignment"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-3 border-b border-stone-200">
          <div>
            <span className="inline-block text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200/80 mb-2">
              FINVERSE ALIGNMENT
            </span>
            <h2 id="heading-finverse-alignment" className="text-2xl md:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              Three Structural Gaps Between Financial Data and Health
            </h2>
          </div>
          <div className="text-xs md:text-sm font-mono text-stone-500 font-medium md:text-right shrink-0">
            From fragmented data to contextual action →
          </div>
        </div>

        {/* 3 Challenge Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CHALLENGE 01 */}
          <div 
            id="card-challenge-01"
            className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
          >
            <div>
              {/* Top Row: Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider border border-stone-300 text-stone-700 bg-stone-50/80">
                  CHALLENGE 01
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  DATA SILOS
                </span>
              </div>

              {/* Main Title */}
              <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug mb-3">
                Fragmented &amp; Disconnected Systems
              </h3>

              {/* CURRENT GAP */}
              <div className="mb-4">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  CURRENT GAP
                </div>
                <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 text-xs text-stone-700 leading-relaxed font-sans">
                  MFI loan ledgers, SHG passbooks (Mission Shakti), and NGO/migration data sit in isolated silos. Lenders see partial debt but miss community savings and migration realities.
                </div>
              </div>
            </div>

            {/* SANKET RESPONSE */}
            <div className="pt-2 border-t border-stone-100 mt-1">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>SANKET RESPONSE</span>
              </div>
              <div className="bg-emerald-50/90 rounded-xl p-3.5 border border-emerald-200/90 text-xs text-emerald-950 leading-relaxed font-sans font-medium">
                A lightweight, consent-governed unified household data layer that resolves borrower identity and consolidates sources into one privacy-safe profile.
              </div>
            </div>
          </div>

          {/* CHALLENGE 02 */}
          <div 
            id="card-challenge-02"
            className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
          >
            <div>
              {/* Top Row: Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider border border-stone-300 text-stone-700 bg-stone-50/80">
                  CHALLENGE 02
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  TEMPORAL CONTEXT
                </span>
              </div>

              {/* Main Title */}
              <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug mb-3">
                Missing Contextual &amp; Subjective Data
              </h3>

              {/* CURRENT GAP */}
              <div className="mb-4">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  CURRENT GAP
                </div>
                <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 text-xs text-stone-700 leading-relaxed font-sans">
                  Standard financial records lack seasonal wage calendars, agricultural lean periods, and remittance timing, treating volatile rural cash-flows as monthly salaries.
                </div>
              </div>
            </div>

            {/* SANKET RESPONSE */}
            <div className="pt-2 border-t border-stone-100 mt-1">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>SANKET RESPONSE</span>
              </div>
              <div className="bg-emerald-50/90 rounded-xl p-3.5 border border-emerald-200/90 text-xs text-emerald-950 leading-relaxed font-sans font-medium">
                Seasonal cash-flow intelligence and corridor-level remittance timing models that surface temporal liquidity mismatches before credit disbursement.
              </div>
            </div>
          </div>

          {/* CHALLENGE 03 */}
          <div 
            id="card-challenge-03"
            className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
          >
            <div>
              {/* Top Row: Badge & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider border border-stone-300 text-stone-700 bg-stone-50/80">
                  CHALLENGE 03
                </span>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                  MEASUREMENT METRIC
                </span>
              </div>

              {/* Main Title */}
              <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug mb-3">
                Complexity in Measuring Financial Health
              </h3>

              {/* CURRENT GAP */}
              <div className="mb-4">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  CURRENT GAP
                </div>
                <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 text-xs text-stone-700 leading-relaxed font-sans">
                  Financial inclusion is conventionally evaluated via disbursement volume and binary repayment rates rather than household resilience, liquid buffers, and over-indebtedness risk.
                </div>
              </div>
            </div>

            {/* SANKET RESPONSE */}
            <div className="pt-2 border-t border-stone-100 mt-1">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>SANKET RESPONSE</span>
              </div>
              <div className="bg-emerald-50/90 rounded-xl p-3.5 border border-emerald-200/90 text-xs text-emerald-950 leading-relaxed font-sans font-medium">
                Spend / Save / Borrow / Plan diagnostic framework + Seasonal Context + scenario trajectory logic that guides FSPs toward financial health improvement.
              </div>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 3. FROM FRAGMENTED APPRAISAL TO CONTEXTUAL DECISION MAKING */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-500" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-emerald-800 shrink-0" />
              <h2 className="text-sm md:text-base font-bold text-stone-900 font-serif tracking-tight">
                From Fragmented Appraisal to Contextual Decision-Making
              </h2>
            </div>
            {/* Persona Indicator */}
            <div className="mt-1 pl-7.5">
              <span className="inline-flex items-center text-xs font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Profile: {selectedHousehold.name}
              </span>
            </div>
          </div>

          {/* Two-option Segmented Selector */}
          <div 
            id="view-mode-selector"
            role="group"
            aria-label="Appraisal Perspective"
            className="inline-flex items-center p-1 rounded-xl bg-stone-100/90 border border-stone-200 shadow-2xs shrink-0 self-start sm:self-auto"
          >
            <button
              type="button"
              id="btn-select-status-quo"
              onClick={() => setAppraisalView('STATUS_QUO')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                appraisalView === 'STATUS_QUO'
                  ? 'bg-white text-red-700 shadow-xs border border-red-200 font-bold'
                  : 'text-stone-500 hover:text-stone-800 bg-transparent border border-transparent font-medium'
              }`}
            >
              <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${appraisalView === 'STATUS_QUO' ? 'text-red-600' : 'text-stone-400'}`} />
              <span>Status Quo (Fragmented)</span>
            </button>

            <button
              type="button"
              id="btn-select-sanket-layer"
              onClick={() => setAppraisalView('SANKET')}
              className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-150 cursor-pointer ${
                appraisalView === 'SANKET'
                  ? 'bg-white text-emerald-900 shadow-xs border border-emerald-300 font-bold'
                  : 'text-stone-500 hover:text-stone-800 bg-transparent border border-transparent font-medium'
              }`}
            >
              <span>With Sanket Layer</span>
            </button>
          </div>
        </div>

        {/* The 3 Disconnected Streams converging to the FSP Decision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Stream 1: MFI */}
          <button
            id="btn-source-mfi"
            onClick={() => setSelectedSource('MFI')}
            className={`p-5 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer ${
              selectedSource === 'MFI'
                ? 'border-emerald-800 bg-emerald-50/50 shadow-md ring-2 ring-emerald-700/20'
                : 'border-stone-200 bg-stone-50/50 hover:border-stone-400 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-900">
                <Building className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100/80 text-emerald-900 border border-emerald-200">
                {activePersonaData.mfi.badge}
              </span>
            </div>
            <div className="text-base font-bold text-stone-900 mb-1">{activePersonaData.mfi.title}</div>
            <p className="text-xs text-stone-600 mb-3 min-h-[36px] leading-relaxed">
              {appraisalView === 'STATUS_QUO'
                ? activePersonaData.mfi.statusQuoDesc
                : activePersonaData.mfi.sanketDesc}
            </p>
            <div className="text-[11px] font-mono text-emerald-900 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Inspect MFI signal <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Stream 2: SHG */}
          <button
            id="btn-source-shg"
            onClick={() => setSelectedSource('SHG')}
            className={`p-5 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer ${
              selectedSource === 'SHG'
                ? 'border-emerald-800 bg-emerald-50/50 shadow-md ring-2 ring-emerald-700/20'
                : 'border-stone-200 bg-stone-50/50 hover:border-stone-400 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center text-teal-900">
                <Users2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-teal-100/80 text-teal-900 border border-teal-200">
                {activePersonaData.shg.badge}
              </span>
            </div>
            <div className="text-base font-bold text-stone-900 mb-1">{activePersonaData.shg.title}</div>
            <p className="text-xs text-stone-600 mb-3 min-h-[36px] leading-relaxed">
              {appraisalView === 'STATUS_QUO'
                ? activePersonaData.shg.statusQuoDesc
                : activePersonaData.shg.sanketDesc}
            </p>
            <div className="text-[11px] font-mono text-teal-900 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Inspect SHG signal <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Stream 3: Migration / Seasonal Context */}
          <button
            id="btn-source-migration"
            onClick={() => setSelectedSource('MIGRATION')}
            className={`p-5 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer ${
              selectedSource === 'MIGRATION'
                ? 'border-amber-700 bg-amber-50/60 shadow-md ring-2 ring-amber-700/20'
                : 'border-amber-200 bg-amber-50/30 hover:border-amber-400 hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center text-amber-900">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                {activePersonaData.migration.badge}
              </span>
            </div>
            <div className="text-base font-bold text-stone-900 mb-1">{activePersonaData.migration.title}</div>
            <p className="text-xs text-stone-600 mb-3 min-h-[36px] leading-relaxed">
              {appraisalView === 'STATUS_QUO'
                ? activePersonaData.migration.statusQuoDesc
                : activePersonaData.migration.sanketDesc}
            </p>
            <div className="text-[11px] font-mono text-amber-900 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Inspect timing signal <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Before / After Impact Card */}
        <div className="bg-stone-900 text-white rounded-xl p-6 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Left: Status Quo Friction */}
            <div className="border-b md:border-b-0 md:border-r border-stone-700 pb-4 md:pb-0 md:pr-6">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-semibold mb-2 uppercase">
                <AlertTriangle className="w-4 h-4" />
                Conventional FSP Decision Process
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-100 mb-2">
                {activePersonaData.conventional.question}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                {activePersonaData.conventional.description}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-red-300 font-mono bg-red-950/80 px-2.5 py-1 rounded border border-red-800/60">
                <span>Result:</span> {activePersonaData.conventional.result}
              </div>
            </div>

            {/* Right: SANKET Intelligence Paradigm */}
            <div className="md:pl-6">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-2 uppercase">
                <Sparkles className="w-4 h-4" />
                SANKET Intelligence Layer
              </div>
              <h3 className="text-lg font-serif font-bold text-emerald-200 mb-2">
                {activePersonaData.sanket.question}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed mb-3">
                {activePersonaData.sanket.description}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-mono bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/60">
                <span>Result:</span> {activePersonaData.sanket.result}
              </div>
            </div>

          </div>
        </div>

      </motion.div>

      {/* 4. THE MISSING INGREDIENT IS CONTEXT: Reveal Moment Callout */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-emerald-900 text-emerald-50 rounded-2xl p-6 md:p-8 text-center border border-emerald-800 shadow-md mb-8"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold mb-2">
          The Missing Ingredient is Context
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
          SANKET connects the context before the decision is made.
        </h2>
        <p className="text-sm text-emerald-100 max-w-2xl mx-auto mb-6 leading-relaxed">
          Not another credit score. A transparent, governed intelligence layer that informs human FSP loan officers about timing, resilience, and suitable action.
        </p>

        {/* Primary and Secondary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-see-sanket-action"
            onClick={onNext}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>See SANKET in action</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            id="btn-how-context-assembled"
            onClick={onOpenContextModal}
            className="text-xs text-emerald-200 hover:text-white underline underline-offset-4 font-medium transition-colors cursor-pointer py-2"
          >
            How the context is assembled →
          </button>
        </div>
      </motion.div>

      {/* Footer Micro-copy */}
      <div className="text-center text-xs font-mono text-stone-500 tracking-wide">
        Designed for FSP decision-makers serving migration-dependent households in Odisha.
      </div>

      {/* Interactive Source Details Drawer */}
      <AnimatePresence>
        {selectedSource && (
          <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    {selectedSource === 'MFI' && `${selectedHousehold.name} — MFI Ledger Source Details`}
                    {selectedSource === 'SHG' && `${selectedHousehold.name} — SHG Register Source Details`}
                    {selectedSource === 'MIGRATION' && `${selectedHousehold.name} — Seasonal Context Stream`}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSource(null)}
                  className="text-stone-400 hover:text-stone-700 p-1 rounded-md cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm text-stone-700">
                {selectedSource === 'MFI' && (
                  <>
                    <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="text-xs font-mono text-emerald-900 font-bold uppercase mb-1">
                        {activePersonaData.mfi.drawer.status}
                      </div>
                      <p className="text-xs text-stone-700">{activePersonaData.mfi.drawer.description}</p>
                    </div>
                    <ul className="space-y-1.5 text-xs list-disc list-inside text-stone-600 pl-1">
                      {activePersonaData.mfi.drawer.bullets.map((b, idx) => (
                        <li key={idx}><strong>{b.label}:</strong> {b.value}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedSource === 'SHG' && (
                  <>
                    <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                      <div className="text-xs font-mono text-teal-900 font-bold uppercase mb-1">
                        {activePersonaData.shg.drawer.status}
                      </div>
                      <p className="text-xs text-stone-700">{activePersonaData.shg.drawer.description}</p>
                    </div>
                    <ul className="space-y-1.5 text-xs list-disc list-inside text-stone-600 pl-1">
                      {activePersonaData.shg.drawer.bullets.map((b, idx) => (
                        <li key={idx}><strong>{b.label}:</strong> {b.value}</li>
                      ))}
                    </ul>
                  </>
                )}

                {selectedSource === 'MIGRATION' && (
                  <>
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="text-xs font-mono text-amber-900 font-bold uppercase mb-1">
                        {activePersonaData.migration.drawer.status}
                      </div>
                      <p className="text-xs text-stone-700">{activePersonaData.migration.drawer.description}</p>
                    </div>
                    <ul className="space-y-1.5 text-xs list-disc list-inside text-stone-600 pl-1">
                      {activePersonaData.migration.drawer.bullets.map((b, idx) => (
                        <li key={idx}><strong>{b.label}:</strong> {b.value}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setSelectedSource(null)}
                  className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
                >
                  Close Provenance View
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
