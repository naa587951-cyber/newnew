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
    <section id="faq" className="mt-8 border-t border-gray-200/90 pt-6 pb-4">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-4 h-4 text-emerald-600" />
        <h3 className="font-bold text-base text-gray-900">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-2">
        {faqs.map((item, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div
              key={index}
              id={`faq-item-${index}`}
              className="bg-white border border-gray-200/80 rounded-xl overflow-hidden transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <button
                id={`faq-btn-${index}`}
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-xs sm:text-sm text-gray-900 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="pr-2 leading-snug">{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                  <p className="mt-2">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
