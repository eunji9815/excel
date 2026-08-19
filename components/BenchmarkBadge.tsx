import { BenchmarkLevel } from "@/lib/metrics";

const styles: Record<BenchmarkLevel, string> = {
  good: "bg-emerald-100 text-emerald-800",
  warning: "bg-amber-100 text-amber-800",
  bad: "bg-rose-100 text-rose-800",
};

const labels: Record<BenchmarkLevel, string> = {
  good: "양호",
  warning: "보통",
  bad: "위험",
};

export default function BenchmarkBadge({ level }: { level: BenchmarkLevel }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${styles[level]}`}>
      {labels[level]}
    </span>
  );
}
