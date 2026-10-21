import React, { useState } from 'react';
import { X, Check, Copy, Upload, Sparkles, Heart } from 'lucide-react';
import { LoveMemory } from '../types';
import { PRESET_MEMORIES } from '../data/memories';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: LoveMemory;
  onSave: (updated: LoveMemory) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  memory,
  onSave,
}) => {
  const [formData, setFormData] = useState<LoveMemory>({ ...memory });
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      const originalOverflow = document.body.style.overflow;
      const originalOverscroll = document.body.style.overscrollBehavior;

      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.overscrollBehavior = originalOverscroll;
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePresetSelect = (presetId: string) => {
    const preset = PRESET_MEMORIES.find((p) => p.id === presetId);
    if (!preset) return;
    setFormData((prev) => ({
      ...prev,
      memoryTitle: preset.title,
      memorySubtitle: preset.subtitle,
      dateBadge: preset.dateBadge,
      memorySecretNote: preset.secretNote,
      memoryPhotoUrl: preset.photoUrl,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({
            ...prev,
            memoryPhotoUrl: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const shareableSlug = formData.partnerName.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'our-love';
  const customUrl = `https://yourlovepage.com/${shareableSlug}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(customUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-hidden overscroll-none"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-8 max-h-[86vh] sm:max-h-[88vh] overflow-y-auto romantic-scrollbar shadow-2xl border border-pink-100 my-auto relative overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-100 rounded-xl text-rose-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Personalize Your Love Page</h3>
              <p className="text-xs text-slate-500">Customize the note, names, and memories for your partner</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shareable Link Strip */}
        <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200/60 mb-6 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider block">
              Your Custom URL
            </span>
            <span className="text-xs font-mono text-rose-900 truncate block">
              {customUrl}
            </span>
          </div>
          <button
            onClick={copyUrl}
            className="px-3 py-1.5 bg-white hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 transition-all flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Partner's Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Partner's Name
            </label>
            <input
              type="text"
              value={formData.partnerName}
              onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
              placeholder="e.g. Maya"
            />
          </div>

          {/* Milestone Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Milestone / Handwritten Intro
            </label>
            <input
              type="text"
              value={formData.milestoneNote}
              onChange={(e) => setFormData({ ...formData, milestoneNote: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
              placeholder="Four years in November. I couldn't wait, so I made you this."
            />
          </div>

          {/* Quick Memory Preset Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Choose a Romantic Memory Preset
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_MEMORIES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handlePresetSelect(preset.id)}
                  className="p-2.5 rounded-xl border border-pink-200 hover:border-rose-400 bg-pink-50/40 text-left transition-all hover:bg-pink-50 cursor-pointer"
                >
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    {preset.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    {preset.dateBadge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Scratch Card Heading */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Scratch Card Heading
            </label>
            <input
              type="text"
              value={formData.memoryTitle}
              onChange={(e) => setFormData({ ...formData, memoryTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
              placeholder="Scratch to see my favourite night"
            />
          </div>

          {/* Scratch Card Subtitle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Memory Subtitle
            </label>
            <input
              type="text"
              value={formData.memorySubtitle}
              onChange={(e) => setFormData({ ...formData, memorySubtitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
              placeholder="Your birthday, the paper crown, and you still won at Catan."
            />
          </div>

          {/* Secret Note revealed under photo */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Secret Revealed Message (under scratch layer)
            </label>
            <textarea
              rows={3}
              value={formData.memorySecretNote}
              onChange={(e) => setFormData({ ...formData, memorySecretNote: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all resize-none"
              placeholder="Write a sweet heartfelt message revealed after scratching..."
            />
          </div>

          {/* Memory Photo Upload or URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Memory Photo (Upload or keep romantic illustration)
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-3.5 py-2 bg-pink-100 hover:bg-pink-200 text-rose-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Our Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-slate-400">or use current preset image</span>
            </div>
          </div>

          {/* LOVE LETTER SECTION CUSTOMIZATION */}
          <div className="pt-4 border-t border-pink-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-3 flex items-center gap-1.5">
              <span>✉️ Love Letter & Wax Seal</span>
            </h4>

            {/* Sender Name */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Sender Name (for Wax Seal Initial & Sign-off)
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
                placeholder="e.g. Yash"
              />
            </div>

            {/* Letter Quote */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Featured Love Quote (Blockquote)
              </label>
              <input
                type="text"
                value={formData.letterQuote}
                onChange={(e) => setFormData({ ...formData, letterQuote: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
                placeholder="In this lifetime and all the lifetimes that may come..."
              />
            </div>

            {/* Date Notice */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date / Meeting Request (P.S.)
              </label>
              <input
                type="text"
                value={formData.letterDateNotice}
                onChange={(e) => setFormData({ ...formData, letterDateNotice: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
                placeholder="Forever & Always"
              />
            </div>

            {/* Letter Sign-off */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Letter Sign-off
              </label>
              <input
                type="text"
                value={formData.letterSignoff}
                onChange={(e) => setFormData({ ...formData, letterSignoff: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
                placeholder="With all my love"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Save & Apply</span>
          </button>
        </div>
      </div>
    </div>
  );
};
