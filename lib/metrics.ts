export interface ScenarioInput {
  id: string;
  name: string;
  // ROAS
  adSpend: number;
  adRevenue: number;
  grossMarginPct: number; // 매출총이익률(%), 손익분기 ROAS 계산에 사용
  // CAC
  acquisitionCost: number;
  newCustomers: number;
  // LTV
  avgOrderValue: number;
  purchaseFrequencyPerYear: number;
  retentionYears: number;
  // 손익분기점
  fixedCost: number;
  pricePerUnit: number;
  variableCostPerUnit: number;
}

export interface ScenarioResult {
  roasPct: number;
  breakEvenRoasPct: number;
  cac: number;
  ltv: number;
  ltvToCacRatio: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
}

export function calculateScenario(input: ScenarioInput): ScenarioResult {
  const roasPct = input.adSpend > 0 ? (input.adRevenue / input.adSpend) * 100 : 0;
  const breakEvenRoasPct = input.grossMarginPct > 0 ? 100 / (input.grossMarginPct / 100) : 0;

  const cac = input.newCustomers > 0 ? input.acquisitionCost / input.newCustomers : 0;

  const ltv = input.avgOrderValue * input.purchaseFrequencyPerYear * input.retentionYears;
  const ltvToCacRatio = cac > 0 ? ltv / cac : 0;

  const contributionMargin = input.pricePerUnit - input.variableCostPerUnit;
  const breakEvenUnits = contributionMargin > 0 ? input.fixedCost / contributionMargin : 0;
  const breakEvenRevenue = breakEvenUnits * input.pricePerUnit;

  return {
    roasPct,
    breakEvenRoasPct,
    cac,
    ltv,
    ltvToCacRatio,
    breakEvenUnits,
    breakEvenRevenue,
  };
}

export type BenchmarkLevel = "good" | "warning" | "bad";

// 참고용 일반 공개 벤치마크. docs/metrics-definition.md 참고. 사용자가 조정 가능.
export const defaultBenchmarks = {
  roasGoodPct: 400,
  roasWarningPct: 200,
  ltvCacGoodRatio: 3,
  ltvCacWarningRatio: 1,
};

export function evaluateRoas(roasPct: number, breakEvenRoasPct: number): BenchmarkLevel {
  if (breakEvenRoasPct > 0 && roasPct < breakEvenRoasPct) return "bad";
  if (roasPct >= defaultBenchmarks.roasGoodPct) return "good";
  if (roasPct >= defaultBenchmarks.roasWarningPct) return "warning";
  return "bad";
}

export function evaluateLtvCac(ratio: number): BenchmarkLevel {
  if (ratio >= defaultBenchmarks.ltvCacGoodRatio) return "good";
  if (ratio >= defaultBenchmarks.ltvCacWarningRatio) return "warning";
  return "bad";
}

export function createEmptyScenario(name: string): ScenarioInput {
  return {
    id: crypto.randomUUID(),
    name,
    adSpend: 1000000,
    adRevenue: 3000000,
    grossMarginPct: 30,
    acquisitionCost: 1000000,
    newCustomers: 50,
    avgOrderValue: 50000,
    purchaseFrequencyPerYear: 4,
    retentionYears: 2,
    fixedCost: 5000000,
    pricePerUnit: 30000,
    variableCostPerUnit: 12000,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }).format(Math.round(value)) + "원";
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 }).format(value) + "%";
}

export function formatRatio(value: number): string {
  return new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 }).format(value);
}
