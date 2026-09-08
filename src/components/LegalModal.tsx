import React from 'react';
import { X, ShieldAlert, FileText, Mail, ExternalLink } from 'lucide-react';

interface LegalModalProps {
  page: 'privacy' | 'disclaimer' | 'contact' | null;
  onClose: () => void;
  onSwitchPage: (page: 'privacy' | 'disclaimer' | 'contact') => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ page, onClose, onSwitchPage }) => {
  if (!page) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="legal-modal-content"
        className="w-full sm:max-w-lg max-h-[88vh] bg-[#0c0e1a] border-t sm:border border-purple-900/40 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            {page === 'privacy' && <FileText className="w-5 h-5 text-purple-400" />}
            {page === 'disclaimer' && <ShieldAlert className="w-5 h-5 text-amber-400" />}
            {page === 'contact' && <Mail className="w-5 h-5 text-cyan-400" />}
            <h2 className="font-gaming text-lg font-bold text-white uppercase tracking-wide">
              {page === 'privacy' && 'Privacy Policy'}
              {page === 'disclaimer' && 'Legal Disclaimer'}
              {page === 'contact' && 'Contact Support'}
            </h2>
          </div>
          <button
            id="close-legal-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-3 bg-slate-950 border-b border-slate-800 text-xs font-semibold text-center">
          <button
            onClick={() => onSwitchPage('disclaimer')}
            className={`py-2.5 transition-colors border-b-2 ${
              page === 'disclaimer' 
                ? 'border-purple-500 text-purple-300 bg-purple-950/20' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Disclaimer
          </button>
          <button
            onClick={() => onSwitchPage('privacy')}
            className={`py-2.5 transition-colors border-b-2 ${
              page === 'privacy' 
                ? 'border-purple-500 text-purple-300 bg-purple-950/20' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onSwitchPage('contact')}
            className={`py-2.5 transition-colors border-b-2 ${
              page === 'contact' 
                ? 'border-purple-500 text-purple-300 bg-purple-950/20' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[60vh]">
          {page === 'disclaimer' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">1. Independence & Non-Affiliation</h3>
              <p>
                AllMods is an independent directory and catalog resource. AllMods is <strong>NOT</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with Niantic, Scopely, Toca Boca, olzhass, or any of their respective subsidiaries or affiliates.
              </p>
              <h3 className="text-sm font-bold text-white">2. Trademarks & Intellectual Property</h3>
              <p>
                All product names, logos, brands, trademarks, and registered trademarks featured or referred to within the AllMods website are the property of their respective trademark holders. These trademark holders do not sponsor or endorse AllMods or any of our modified game listings.
              </p>
              <h3 className="text-sm font-bold text-white">3. Informational & Educational Use</h3>
              <p>
                Information, screenshots, and game descriptions are provided for educational and discovery purposes only under fair use principles. Users are solely responsible for ensuring compliance with local regulations and terms of service of each game.
              </p>
              <div className="pt-2">
                <a
                  href="disclaimer.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-purple-400 hover:underline font-semibold"
                >
                  <span>Open standalone disclaimer.html</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {page === 'privacy' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white">1. Information Collection</h3>
              <p>
                AllMods respects your privacy. We do not require personal registration or gather sensitive identifying data (such as passwords, credit card numbers, or physical addresses) to browse our mobile game catalog.
              </p>
              <h3 className="text-sm font-bold text-white">2. Local Storage & Cookies</h3>
              <p>
                We use browser standard localStorage to retain user UI preferences (such as previously clicked game IDs or dark mode settings). This data remains locally on your device.
              </p>
              <h3 className="text-sm font-bold text-white">3. Third-Party Links & Verification</h3>
              <p>
                When tapping download buttons, you may be redirected to third-party verification networks. We encourage you to review the individual privacy policies of any third-party providers you visit.
              </p>
              <div className="pt-2">
                <a
                  href="privacy.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-purple-400 hover:underline font-semibold"
                >
                  <span>Open standalone privacy.html</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {page === 'contact' && (
            <div className="space-y-3">
              <p>
                Have feedback, questions, or update requests for our team? Reach out through our official communication channels below:
              </p>
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-white">Email:</span>
                  <span className="text-purple-300">support@allmods.net</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Response time: Usually within 24-48 business hours.
                </div>
              </div>
              <p className="text-[11px] text-slate-400">
                For copyright, trademark, or DMCA inquiries, please include specific URLs and ownership proof in your email subject line.
              </p>
              <div className="pt-2">
                <a
                  href="contact.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-purple-400 hover:underline font-semibold"
                >
                  <span>Open standalone contact.html</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
