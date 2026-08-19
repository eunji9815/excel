import { ScenarioInput } from "@/lib/metrics";
import { fieldGroups, fieldSpecs } from "@/lib/fields";

interface Props {
  scenario: ScenarioInput;
  onChange: (next: ScenarioInput) => void;
  onRemove: () => void;
  removable: boolean;
}

export default function ScenarioForm({ scenario, onChange, onRemove, removable }: Props) {
  function updateField(key: keyof ScenarioInput, value: number) {
    onChange({ ...scenario, [key]: value });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <input
          value={scenario.name}
          onChange={(e) => onChange({ ...scenario, name: e.target.value })}
          className="w-full rounded-md border border-transparent bg-transparent px-1 text-lg font-semibold hover:border-slate-200 focus:border-slate-300 focus:outline-none"
        />
        {removable && (
          <button
            onClick={onRemove}
            className="shrink-0 rounded-md px-2 py-1 text-sm text-slate-400 hover:bg-rose-50 hover:text-rose-600"
          >
            삭제
          </button>
        )}
      </div>

      <div className="space-y-4">
        {fieldGroups.map((group) => (
          <div key={group}>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              {group}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {fieldSpecs
                .filter((f) => f.group === group)
                .map((field) => (
                  <label key={field.key} className="block text-sm">
                    <span className="mb-1 block text-slate-600">{field.label}</span>
                    <div className="flex items-center rounded-md border border-slate-300 focus-within:border-slate-500">
                      <input
                        type="number"
                        step={field.step ?? 1}
                        value={scenario[field.key]}
                        onChange={(e) => updateField(field.key, Number(e.target.value))}
                        className="w-full rounded-l-md px-2 py-1.5 outline-none"
                      />
                      <span className="pr-2 text-xs text-slate-400">{field.unit}</span>
                    </div>
                  </label>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
