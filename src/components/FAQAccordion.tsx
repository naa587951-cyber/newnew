import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/games';

export const FAQAccordion: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleFAQ = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter(i => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <section 
      id="faq" 
      className="py-8 px-4 border-t border-purple-950/30"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-gaming text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Everything you need to know about AllMods and downloading game mods.
          </p>
        </div>

        <div className="space-y-2.5">
          {faqs.map((item, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-900/90 border-purple-500/40 shadow-lg shadow-purple-950/20' 
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-slate-100 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-3 leading-snug">{item.question}</span>
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-slate-800 text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-400 bg-purple-950/60' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40 animate-fade-in">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
