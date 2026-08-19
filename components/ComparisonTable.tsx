import {
  ScenarioInput,
  calculateScenario,
  evaluateLtvCac,
  evaluateRoas,
  formatCurrency,
  formatPercent,
  formatRatio,
} from "@/lib/metrics";
import BenchmarkBadge from "./BenchmarkBadge";

export default function ComparisonTable({ scenarios }: { scenarios: ScenarioInput[] }) {
  const rows = scenarios.map((s) => ({ scenario: s, result: calculateScenario(s) }));

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-slate-500">
            <th className="px-4 py-3 font-medium">지표</th>
            {rows.map(({ scenario }) => (
              <th key={scenario.id} className="px-4 py-3 font-medium">
                {scenario.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="px-4 py-3 text-slate-500">ROAS</td>
            {rows.map(({ scenario, result }) => (
              <td key={scenario.id} className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatPercent(result.roasPct)}</span>
                  <BenchmarkBadge level={evaluateRoas(result.roasPct, result.breakEvenRoasPct)} />
                </div>
                <div className="mt-0.5 text-xs text-slate-400">
                  손익분기 ROAS {formatPercent(result.breakEvenRoasPct)}
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 text-slate-500">CAC</td>
            {rows.map(({ scenario, result }) => (
              <td key={scenario.id} className="px-4 py-3 font-medium">
                {formatCurrency(result.cac)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 text-slate-500">LTV</td>
            {rows.map(({ scenario, result }) => (
              <td key={scenario.id} className="px-4 py-3 font-medium">
                {formatCurrency(result.ltv)}
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 text-slate-500">LTV : CAC</td>
            {rows.map(({ scenario, result }) => (
              <td key={scenario.id} className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{formatRatio(result.ltvToCacRatio)}</span>
                  <BenchmarkBadge level={evaluateLtvCac(result.ltvToCacRatio)} />
                </div>
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 text-slate-500">손익분기 판매량</td>
            {rows.map(({ scenario, result }) => (
              <td key={scenario.id} className="px-4 py-3 font-medium">
                {Math.ceil(result.breakEvenUnits).toLocaleString("ko-KR")}개
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-4 py-3 text-slate-500">손익분기 매출액</td>
            {rows.map(({ scenario, result }) => (
              <td key={scenario.id} className="px-4 py-3 font-medium">
                {formatCurrency(result.breakEvenRevenue)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
