import React, { useState } from 'react';
import { X, Briefcase, CheckCircle2, UploadCloud, FileText } from 'lucide-react';
import { dataService } from '../../services/dataService';
import { analyticsService } from '../../services/analyticsService';
import { Vacancy } from '../../types';

interface ApplicationModalProps {
  vacancy: Vacancy | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ vacancy, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    ghanaDigitalAddress: '',
    coverLetter: '',
  });

  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !vacancy) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      dataService.submitApplication({
        vacancyId: vacancy.id,
        jobTitle: vacancy.title,
        applicantName: formData.applicantName,
        email: formData.email,
        phone: formData.phone,
        ghanaDigitalAddress: formData.ghanaDigitalAddress,
        coverLetter: formData.coverLetter,
        resumeFileName: resumeFileName || 'Applicant_Curriculum_Vitae.pdf',
      });

      analyticsService.trackEvent('career_application_submit', '/careers', {
        vacancyId: vacancy.id,
        jobTitle: vacancy.title,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#58C1EB]/10 rounded text-[#58C1EB] border border-[#58C1EB]/25">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Apply: {vacancy.title}
              </h3>
              <p className="text-xs text-slate-400">
                {vacancy.department} · {vacancy.location}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Application Received
              </h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for applying to Aviance Ghana Limited. Our Human Resources and Ground Operations recruitment team will review your profile against operational safety standards.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#204696] text-white border border-[#58C1EB]/40 font-semibold text-xs rounded-lg hover:bg-[#183878] transition-colors"
                >
                  Return to Careers
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  placeholder="e.g. Samuel Kofi Mensah"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="samuel.mensah@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+233 24 123 4567"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ghana Digital Address (GPS)
                </label>
                <input
                  type="text"
                  value={formData.ghanaDigitalAddress}
                  onChange={(e) => setFormData({ ...formData, ghanaDigitalAddress: e.target.value })}
                  placeholder="e.g. GA-182-9901"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] font-mono"
                />
              </div>

              {/* Resume Upload Simulation */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Curriculum Vitae / Resume (PDF or DOCX) *
                </label>
                <label className="border-2 border-dashed border-slate-700 hover:border-[#58C1EB] rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {resumeFileName ? (
                    <div className="flex items-center gap-2 text-[#58C1EB] text-xs font-mono">
                      <FileText className="w-4 h-4" />
                      <span>{resumeFileName}</span>
                    </div>
                  ) : (
                    <div className="text-center">
                      <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <span className="text-xs text-slate-300 font-medium">Click to select file</span>
                      <span className="text-[11px] text-slate-500 block">PDF or DOCX under 10MB</span>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Brief Statement of Suitability & Availability
                </label>
                <textarea
                  rows={3}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Summarize your relevant ground handling experience, licenses, or notice period..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#58C1EB] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#204696] text-white border border-[#58C1EB]/40 font-semibold text-xs rounded-lg hover:bg-[#183878] transition-colors shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
