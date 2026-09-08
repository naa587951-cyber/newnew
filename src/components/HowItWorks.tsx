import React from 'react';
import { Gamepad2, Download, CheckCircle2, ChevronRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: "01",
      title: "Choose a Game",
      desc: "Browse our verified catalog of popular mobile mods and select your preferred game.",
      icon: Gamepad2,
      color: "from-purple-500 to-indigo-500",
      accent: "text-purple-400"
    },
    {
      step: "02",
      title: "Tap Download",
      desc: "Press the download button to access the secure high-speed verified content locker.",
      icon: Download,
      color: "from-indigo-500 to-cyan-500",
      accent: "text-indigo-400"
    },
    {
      step: "03",
      title: "Follow Instructions",
      desc: "Complete the brief human verification on the next page to unlock and install your mod.",
      icon: CheckCircle2,
      color: "from-cyan-500 to-emerald-500",
      accent: "text-emerald-400"
    }
  ];

  return (
    <section 
      id="how-it-works" 
      className="py-8 px-4 border-t border-purple-950/30 relative"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold tracking-wider text-purple-400 uppercase bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
            Simple 3-Step Process
          </span>
          <h2 className="font-gaming text-2xl font-bold text-white mt-2">
            How It Works
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Getting your favorite mods takes less than two minutes.
          </p>
        </div>

        <div className="space-y-3">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                id={`how-step-${index + 1}`}
                className="relative flex items-start gap-3.5 p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 to-[#12162a]/90 border border-slate-800/80 shadow-md"
              >
                {/* Step badge & icon */}
                <div className={`w-11 h-11 shrink-0 rounded-xl bg-gradient-to-tr ${s.color} p-[1px] shadow-md`}>
                  <div className="w-full h-full bg-[#0a0c16] rounded-[11px] flex items-center justify-center">
                    <Icon className={`w-5 h-5 ${s.accent}`} />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold font-mono text-purple-400/80">STEP {s.step}</span>
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
