import { ScenarioInput } from "./metrics";

export interface FieldSpec {
  key: keyof Omit<ScenarioInput, "id" | "name">;
  label: string;
  unit: string;
  group: "ROAS" | "CAC" | "LTV" | "손익분기점";
  step?: number;
}

export const fieldSpecs: FieldSpec[] = [
  { key: "adSpend", label: "광고비", unit: "원", group: "ROAS", step: 100000 },
  { key: "adRevenue", label: "광고로 발생한 매출", unit: "원", group: "ROAS", step: 100000 },
  { key: "grossMarginPct", label: "매출총이익률", unit: "%", group: "ROAS", step: 1 },
  { key: "acquisitionCost", label: "총 고객 획득 비용", unit: "원", group: "CAC", step: 100000 },
  { key: "newCustomers", label: "신규 고객 수", unit: "명", group: "CAC", step: 1 },
  { key: "avgOrderValue", label: "평균 객단가", unit: "원", group: "LTV", step: 1000 },
  { key: "purchaseFrequencyPerYear", label: "연간 구매 빈도", unit: "회/년", group: "LTV", step: 0.5 },
  { key: "retentionYears", label: "고객 유지 기간", unit: "년", group: "LTV", step: 0.5 },
  { key: "fixedCost", label: "고정비", unit: "원", group: "손익분기점", step: 100000 },
  { key: "pricePerUnit", label: "판매 단가", unit: "원", group: "손익분기점", step: 1000 },
  { key: "variableCostPerUnit", label: "단위당 변동비", unit: "원", group: "손익분기점", step: 1000 },
];

export const fieldGroups: FieldSpec["group"][] = ["ROAS", "CAC", "LTV", "손익분기점"];
