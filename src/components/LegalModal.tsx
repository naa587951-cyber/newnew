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
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="legal-modal-content"
        className="w-full sm:max-w-lg max-h-[85vh] bg-white border-t sm:border border-gray-200 rounded-t-2xl sm:rounded-2xl shadow-xl flex flex-col overflow-hidden text-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            {page === 'privacy' && <FileText className="w-5 h-5 text-emerald-600" />}
            {page === 'disclaimer' && <ShieldAlert className="w-5 h-5 text-amber-600" />}
            {page === 'contact' && <Mail className="w-5 h-5 text-blue-600" />}
            <h2 className="text-base font-bold text-gray-900">
              {page === 'privacy' && 'Privacy Policy'}
              {page === 'disclaimer' && 'Legal Disclaimer'}
              {page === 'contact' && 'Contact Support'}
            </h2>
          </div>
          <button
            id="close-legal-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-center">
          <button
            onClick={() => onSwitchPage('disclaimer')}
            className={`py-2.5 transition-colors border-b-2 ${
              page === 'disclaimer'
                ? 'border-emerald-600 text-emerald-700 bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Disclaimer
          </button>
          <button
            onClick={() => onSwitchPage('privacy')}
            className={`py-2.5 transition-colors border-b-2 ${
              page === 'privacy'
                ? 'border-emerald-600 text-emerald-700 bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => onSwitchPage('contact')}
            className={`py-2.5 transition-colors border-b-2 ${
              page === 'contact'
                ? 'border-emerald-600 text-emerald-700 bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Contact
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
          {page === 'disclaimer' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 text-xs">
                <strong>Non-Affiliation Notice:</strong> AllMods is an independent catalog and is not affiliated, endorsed, or associated with Google LLC, Niantic, Scopely, Toca Boca, olzhass, or any of the original publishers.
              </div>
              <h4 className="font-bold text-gray-900">1. Intellectual Property & Trademarks</h4>
              <p>
                All trademarks, logos, brand names, character artwork, and game titles displayed on this site are the property of their respective owners. Their mention on this platform is solely for reference, commentary, and identification purposes.
              </p>
              <h4 className="font-bold text-gray-900">2. Informational Catalog Nature</h4>
              <p>
                AllMods acts strictly as an informational index and web portal. We do not host copyrighted game binaries on our private servers. Game download links may redirect through third-party distribution channels and verification gateways.
              </p>
              <h4 className="font-bold text-gray-900">3. User Responsibility</h4>
              <p>
                Users are solely responsible for reviewing the terms of service of the individual game developers and ensuring compliance with applicable regional software regulations.
              </p>
            </div>
          )}

          {page === 'privacy' && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900">1. Information We Collect</h4>
              <p>
                AllMods respects user privacy. We do not collect personal names, email addresses, phone numbers, or passwords unless voluntarily submitted through our contact form.
              </p>
              <h4 className="font-bold text-gray-900">2. Local Storage & Client State</h4>
              <p>
                We use browser localStorage exclusively to preserve your chosen preferences (such as selected game clicks) to enhance your browsing session across page reloads.
              </p>
              <h4 className="font-bold text-gray-900">3. Third-Party Verification Services</h4>
              <p>
                When you click a download button, you may be redirected to an external content locker or verification gateway. Third-party providers operate under their own independent privacy policies.
              </p>
            </div>
          )}

          {page === 'contact' && (
            <div className="space-y-3">
              <p>
                Have questions about game listings, DMCA takedown requests, or partnership inquiries? Reach out to our catalog moderation team:
              </p>
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 space-y-1 text-xs">
                <p><strong>Support Email:</strong> <span className="text-emerald-700">support@allmods.site</span></p>
                <p><strong>Response Time:</strong> 24–48 business hours</p>
                <p><strong>DMCA Requests:</strong> dmca@allmods.site</p>
              </div>
              <p className="text-xs text-gray-500">
                Please include the exact game title and link in your message for expedited inquiry handling.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
