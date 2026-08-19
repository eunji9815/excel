"use client";

import { useState } from "react";
import { ScenarioInput, createEmptyScenario } from "@/lib/metrics";
import ScenarioForm from "@/components/ScenarioForm";
import ComparisonTable from "@/components/ComparisonTable";

export default function Home() {
  const [scenarios, setScenarios] = useState<ScenarioInput[]>([
    createEmptyScenario("현재 상태"),
  ]);

  function updateScenario(id: string, next: ScenarioInput) {
    setScenarios((prev) => prev.map((s) => (s.id === id ? next : s)));
  }

  function removeScenario(id: string) {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  }

  function addScenario() {
    setScenarios((prev) => [
      ...prev,
      createEmptyScenario(`시나리오 ${prev.length + 1}`),
    ]);
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">마케팅 지표 계산기</h1>
        <p className="mt-1 text-sm text-slate-500">
          ROAS · CAC · LTV · 손익분기점을 계산하고 시나리오를 비교합니다. 지표 정의와 계산
          근거는{" "}
          <a
            href="https://github.com/lofiblue77-crypto/excel/blob/main/docs/metrics-definition.md"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-slate-700"
          >
            지표 정의서
          </a>
          를 참고하세요.
        </p>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <ScenarioForm
            key={scenario.id}
            scenario={scenario}
            onChange={(next) => updateScenario(scenario.id, next)}
            onRemove={() => removeScenario(scenario.id)}
            removable={scenarios.length > 1}
          />
        ))}
        <button
          onClick={addScenario}
          className="flex min-h-[200px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-500"
        >
          + 시나리오 추가
        </button>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">시나리오 비교</h2>
        <ComparisonTable scenarios={scenarios} />
      </section>
    </main>
  );
}
