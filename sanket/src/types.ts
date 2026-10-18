export type PillarType = 'SPEND' | 'SAVE' | 'BORROW' | 'PLAN';

export interface FinancialHealthPillars {
  spend: number;
  save: number;
  borrow: number;
  plan: number;
}

export type ActionType =
  | 'LEND DIFFERENTLY'
  | 'EXTEND CREDIT'
  | 'RECOMMEND PROTECTION'
  | 'CHECK IN'
  | 'WAIT';

export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type SignalStatus = 'Observed' | 'Inferred' | 'Derived from observed inputs' | 'Observed + Inferred' | 'Observed + Derived';

export interface EvidenceSignalData {
  id: string;
  number: string;
  title: string;
  description: string;
  source: string;
  freshness: string;
  status: SignalStatus;
  confidence: ConfidenceLevel;
  details: {
    observedInputs: string[];
    inferredInputs?: string[];
    notes: string;
  };
}

export interface MonthlyCashFlow {
  month: string;
  monthFull: string;
  liquidity: number;
  expectedInflow: number;
  householdExpense: number;
  repaymentObligation: number;
  netBuffer: number;
  isLeanPeriod: boolean;
  isRecoveryWindow: boolean;
  tagLabel?: string;
  tagType?: 'danger' | 'success' | 'warning' | 'neutral';
  contextualDescription: string;
  confidence: ConfidenceLevel;
  inflowDynamics: string;
  repaymentImpact: string;
}

export interface SourceRecord {
  id: string;
  sourceType: string;
  title: string;
  details: string;
  isSyntheticLayer?: boolean;
}

export interface TimingProofPoint {
  title: string;
  description: string;
  statusNote?: string;
  type: 'observed' | 'inferred' | 'action';
}

export interface TimingProof {
  flaggedTitle: string;
  badgeText: string;
  badgeType?: 'danger' | 'warning' | 'info' | 'success';
  observedText: string;
  inferredText: string;
  modalPoints: TimingProofPoint[];
}

export interface ContextualCheckIn {
  question: string;
  selectedAnswer: string;
  options: string[];
  signalInterpretation: string;
  verifiedByOfficer: boolean;
  timestamp: string;
}

export interface HouseholdData {
  id: string;
  name: string;
  location: string;
  district: string;
  state: string;
  householdType: string;
  synthetic: boolean;
  mfiRepaymentMonth: string;
  emi: number;
  outstandingBalance: number;
  activeLoanCount: number;
  seasonalContext: string;
  recoveryWindow: string;
  seasonalConfidence: ConfidenceLevel;
  householdConfirmedRemittance: boolean;
  financialHealth: FinancialHealthPillars;
  dataCompleteness: number; // 0.0 to 1.0
  recommendation: ActionType;
  verificationRequired: boolean;
  scenarioDelta6WeeksAvailable: boolean;
  suggestedActionDetail: {
    headline: string;
    timeline: string;
    structure: string;
    reasoning: string;
  };
  evidenceSignals: EvidenceSignalData[];
  cashFlowTimeline: MonthlyCashFlow[];
  contextualCheckIn: ContextualCheckIn;
  narrativeSummary: string;
  horizonSubtitle: string;
  sourceRecords: SourceRecord[];
  timingProof: TimingProof;
  defaultFocusMonth?: string;
  centralInsight: {
    headline: string;
    text: string;
  };
}

export type OfficerDecision = 'pending' | 'accepted' | 'modified' | 'overridden';

export interface OfficerDecisionRecord {
  decision: OfficerDecision;
  timestamp?: string;
  modifiedAction?: string;
  overrideReason?: string;
  officerNotes?: string;
}
