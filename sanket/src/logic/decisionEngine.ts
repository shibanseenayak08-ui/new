import { ActionType, ConfidenceLevel, HouseholdData, MonthlyCashFlow } from '../types';

export interface ScenarioResult {
  scenarioName: 'NORMAL' | 'DELAYED_6W' | 'LOWER_INFLOW';
  repaymentMonth: string;
  emiAmount: number;
  projectedSeptemberBuffer: number;
  projectedOctoberBuffer: number;
  projectedNovemberBuffer: number;
  timingRiskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedAction: ActionType;
  confidence: ConfidenceLevel;
  explanation: string;
  modifiedTimeline: MonthlyCashFlow[];
}

/**
 * Deterministic Delta Logic for Scenario Stress Testing
 * Example: What if repayment moves +6 weeks (shifting from September to October/November)?
 */
export function calculateScenarioDelta(
  household: HouseholdData,
  scenario: 'NORMAL' | 'DELAYED_6W' | 'LOWER_INFLOW'
): ScenarioResult {
  if (scenario === 'NORMAL') {
    const sepBuffer = household.cashFlowTimeline.find((m) => m.month === 'SEP')?.netBuffer || 0;
    const octBuffer = household.cashFlowTimeline.find((m) => m.month === 'OCT')?.netBuffer || 0;
    const novBuffer = household.cashFlowTimeline.find((m) => m.month === 'NOV')?.netBuffer || 0;

    return {
      scenarioName: 'NORMAL',
      repaymentMonth: household.mfiRepaymentMonth,
      emiAmount: household.emi,
      projectedSeptemberBuffer: sepBuffer,
      projectedOctoberBuffer: octBuffer,
      projectedNovemberBuffer: novBuffer,
      timingRiskLevel: household.id === 'hh-meena-ganjam' ? 'HIGH' : 'LOW',
      recommendedAction: household.recommendation,
      confidence: household.seasonalConfidence,
      explanation: household.narrativeSummary,
      modifiedTimeline: household.cashFlowTimeline,
    };
  }

  if (scenario === 'DELAYED_6W') {
    // Shift EMI obligation from September to October/November (after remittance arrival)
    const modifiedTimeline: MonthlyCashFlow[] = household.cashFlowTimeline.map((item) => {
      if (item.month === 'SEP') {
        // Obligation shifted out of September lean month!
        const newExpense = item.householdExpense;
        const newBuffer = item.expectedInflow - newExpense;
        return {
          ...item,
          repaymentObligation: 0,
          netBuffer: newBuffer,
        };
      }
      if (item.month === 'OCT') {
        // Absorbs regular obligation + shifted payment smoothly in October post-remittance surge
        const newRepayment = household.emi;
        const newBuffer = item.expectedInflow - item.householdExpense - newRepayment;
        return {
          ...item,
          repaymentObligation: newRepayment,
          netBuffer: newBuffer,
        };
      }
      return item;
    });

    const sepBuffer = modifiedTimeline.find((m) => m.month === 'SEP')?.netBuffer || 0;
    const octBuffer = modifiedTimeline.find((m) => m.month === 'OCT')?.netBuffer || 0;
    const novBuffer = modifiedTimeline.find((m) => m.month === 'NOV')?.netBuffer || 0;

    return {
      scenarioName: 'DELAYED_6W',
      repaymentMonth: 'Late October (+6 weeks post-remittance)',
      emiAmount: household.emi,
      projectedSeptemberBuffer: sepBuffer,
      projectedOctoberBuffer: octBuffer,
      projectedNovemberBuffer: novBuffer,
      timingRiskLevel: 'LOW',
      recommendedAction: 'LEND DIFFERENTLY',
      confidence: 'High',
      explanation:
        `By aligning the repayment installment (+6 weeks) to the post-remittance window in late October, the ${household.name} household averts seasonal default risk and maintains a healthy liquidity surplus.`,
      modifiedTimeline,
    };
  }

  // LOWER_INFLOW scenario (e.g. 30% reduction in seasonal remittance)
  const modifiedTimeline: MonthlyCashFlow[] = household.cashFlowTimeline.map((item) => {
    if (item.month === 'OCT' || item.month === 'NOV') {
      const reducedInflow = Math.round(item.expectedInflow * 0.7);
      const newBuffer = reducedInflow - item.householdExpense - item.repaymentObligation;
      return {
        ...item,
        expectedInflow: reducedInflow,
        netBuffer: newBuffer,
      };
    }
    return item;
  });

  const sepBuffer = modifiedTimeline.find((m) => m.month === 'SEP')?.netBuffer || 0;
  const octBuffer = modifiedTimeline.find((m) => m.month === 'OCT')?.netBuffer || 0;
  const novBuffer = modifiedTimeline.find((m) => m.month === 'NOV')?.netBuffer || 0;

  return {
    scenarioName: 'LOWER_INFLOW',
    repaymentMonth: household.mfiRepaymentMonth,
    emiAmount: household.emi,
    projectedSeptemberBuffer: sepBuffer,
    projectedOctoberBuffer: octBuffer,
    projectedNovemberBuffer: novBuffer,
    timingRiskLevel: 'HIGH',
    recommendedAction: 'LEND DIFFERENTLY',
    confidence: 'Medium',
    explanation:
      `If seasonal inflow is 30% lower than regional baseline, the buffer for ${household.name} compresses significantly. Exposure should be capped to a smaller, bounded loan ticket with micro-installments.`,
    modifiedTimeline,
  };
}

/**
 * Deterministic explanation builder based on 4-pillar scores + seasonal timing
 */
export function generateDeterministicRuleSummary(household: HouseholdData): {
  coreWhy: string[];
  recommendedApproach: string;
} {
  const why: string[] = [];

  if (household.financialHealth.borrow > 0.6) {
    why.push('– Elevated debt burden and borrowing pressure');
  } else {
    why.push('+ Manageable debt concentration and clean repayment history');
  }

  if (household.seasonalContext === 'Lean Month') {
    why.push('– Current liquidity pressure in seasonal lean window');
  }

  if (household.recoveryWindow.includes('October') || household.recoveryWindow.includes('November')) {
    why.push('+ Predictable seasonal/remittance inflow in upcoming recovery window');
    why.push('+ Strong expected future cash flow upon corridor transit');
  }

  if (household.financialHealth.save < 0.3) {
    why.push('– Thin emergency savings buffer to absorb unpredicted shocks');
  }

  return {
    coreWhy: why,
    recommendedApproach: household.suggestedActionDetail.structure,
  };
}

/**
 * Get human-readable description for financial health pillar
 */
export function getPillarDescription(pillar: 'SPEND' | 'SAVE' | 'BORROW' | 'PLAN', value: number): {
  label: string;
  band: 'Low' | 'Medium' | 'High';
  interpretation: string;
  metricLabel: string;
} {
  switch (pillar) {
    case 'SPEND':
      return {
        label: 'Daily Cash Management',
        band: value > 0.6 ? 'High' : value > 0.4 ? 'Medium' : 'Low',
        interpretation:
          value > 0.5
            ? 'Smooth day-to-day expenditure without sudden distress spikes.'
            : 'Moderate day-to-day cash management tension during off-season.',
        metricLabel: `${(value * 100).toFixed(0)}% stability index`,
      };
    case 'SAVE':
      return {
        label: 'Savings Trajectory & Buffer',
        band: value > 0.6 ? 'High' : value > 0.4 ? 'Medium' : 'Low',
        interpretation:
          value > 0.5
            ? 'Consistent voluntary SHG savings habit with healthy liquid reserves.'
            : 'Modest emergency buffer; vulnerable if shocks occur concurrently.',
        metricLabel: `${(value * 100).toFixed(0)}% reserve ratio`,
      };
    case 'BORROW':
      return {
        label: 'Debt-Service & Obligation Pressure',
        band: value > 0.6 ? 'High' : value > 0.4 ? 'Medium' : 'Low',
        interpretation:
          value > 0.6
            ? 'Elevated debt-service ratio (44%) requires careful installment timing.'
            : 'Low debt concentration; sustainable leverage capacity.',
        metricLabel: `${(value * 100).toFixed(0)}% debt pressure`,
      };
    case 'PLAN':
      return {
        label: 'Forward Planning & Lived Alignment',
        band: value > 0.6 ? 'High' : value > 0.4 ? 'Medium' : 'Low',
        interpretation:
          value > 0.5
            ? 'Active forward planning with clear multi-month financial awareness.'
            : 'Short-term horizon planning typical of migration-dependent households.',
        metricLabel: `${(value * 100).toFixed(0)}% forward horizon`,
      };
  }
}
