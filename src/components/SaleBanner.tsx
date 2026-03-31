"use client";

import { useEffect, useState } from "react";

function getTimeLeft(targetDate: Date) {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState(() =>
    getTimeLeft(new Date("2026-04-02T00:00:00"))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(new Date("2026-04-02T00:00:00")));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-neutral-900 text-white w-full">
      <div className="max-w-7xl mx-auto py-3 px-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
              aria-hidden="true"
            >
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
            <span className="font-semibold tracking-wide text-sm">Holiday Sale</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hrs" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Sec" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="min-w-[2.5rem] rounded bg-white/20 px-2 py-1 text-center font-mono text-lg font-bold">
                    {pad(unit.value)}
                  </span>
                  <span className="mt-0.5 text-[10px] tracking-wider uppercase opacity-80">
                    {unit.label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="mb-4 text-lg font-bold opacity-50">:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
