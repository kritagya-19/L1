import React, { useState } from 'react';
import { ContourBackground } from './components/ContourBackground';
import { ScratchCard } from './components/ScratchCard';
import { LoadingScreen } from './components/LoadingScreen';
import { HeartConfetti } from './components/HeartConfetti';
import { PersonalizeModal } from './components/PersonalizeModal';
import { INITIAL_LOVE_MEMORY } from './data/memories';
import { LoveMemory } from './types';

import { LoveLetterEnvelope } from './components/LoveLetterEnvelope';
import { ReasonsToLoveSection } from './components/ReasonsToLoveSection';
import { SpinningWheelSection } from './components/SpinningWheelSection';
import { SongsRemindOfYouSection } from './components/SongsRemindOfYouSection';
import { AlternateUniverseSection } from './components/AlternateUniverseSection';
import { FavouriteUsSection } from './components/FavouriteUsSection';
import { PetalParticles } from './components/PetalParticles';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [memory, setMemory] = useState<LoveMemory>(INITIAL_LOVE_MEMORY);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  // Trigger heart confetti shower
  const triggerCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3800);
  };

  return (
    <div className="min-h-screen relative font-sans-love selection:bg-rose-200 selection:text-rose-900 pb-16">
      {/* Dynamic Animated Contour & Floating Heart Background */}
      <ContourBackground />

      {/* Aesthetic Floating Pink Flower Petals */}
      <PetalParticles />

      {/* Confetti Canvas */}
      <HeartConfetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen
          partnerName={memory.partnerName}
          onFinish={() => {
            setIsLoading(false);
          }}
        />
      )}

      <main className="relative z-10 pt-12 sm:pt-20 pb-20">
        {/* SECTION 1: HERO LOVE NOTE (MATCHING SCREENSHOT 1) */}
        <section id="top" className="text-center px-4 max-w-4xl mx-auto mb-16 sm:mb-24">
          {/* Tagline: "A LITTLE LOVE NOTE" */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#9C1B48] uppercase mb-2 select-none">
            {memory.headerTagline}
          </p>

          {/* Large Hero Name: "Maya" */}
          <h1 className="font-serif-love text-4xl sm:text-6xl md:text-8xl font-normal text-[#8B0F3E] tracking-tight mb-4 select-none drop-shadow-xs break-words">
            {memory.partnerName}
          </h1>

          {/* Delicate divider with small heart: — ♥ — */}
          <div className="flex items-center justify-center gap-4 my-4 text-[#FDA4AF]" aria-hidden="true">
            <div className="w-16 sm:w-24 h-px bg-pink-300/80" />
            <div className="w-2.5 h-2.5 text-[#E11D48] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="#E11D48" className="w-3.5 h-3.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="w-16 sm:w-24 h-px bg-pink-300/80" />
          </div>

          {/* Cursive Subtitle: "Four years in November. I couldn't wait, so I made you this." */}
          <p className="font-script text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#7E1B38] font-normal leading-relaxed max-w-2xl mx-auto px-4 mt-2">
            {memory.milestoneNote}
          </p>
        </section>

        {/* SECTION 2: THE SCRATCH TO REVEAL CARD (MATCHING SCREENSHOT 1 & 2) */}
        <section id="scratch-section" className="relative z-10 mb-20 sm:mb-28">
          <ScratchCard
            title={memory.memoryTitle}
            subtitle={memory.memorySubtitle}
            photoUrl={memory.memoryPhotoUrl}
            dateBadge={memory.dateBadge}
            secretNote={memory.memorySecretNote}
            isRevealed={isRevealed}
            setIsRevealed={setIsRevealed}
            onReveal={triggerCelebration}
          />
        </section>

        {/* SECTION 3: THE LOVE LETTER ENVELOPE (MATCHING SCREENSHOT 3, 4 & 5) */}
        <section id="letter-section" className="relative z-10 mb-20 sm:mb-28">
          <div className="text-center mb-2">
            <p className="text-xs font-semibold tracking-widest text-[#9C1B48] uppercase">
              A LETTER FROM MY HEART
            </p>
          </div>
          <LoveLetterEnvelope
            partnerName={memory.partnerName}
            senderName={memory.senderName}
            letterParagraphs={memory.letterParagraphs}
            letterQuote={memory.letterQuote}
            letterDateNotice={memory.letterDateNotice}
            letterSignoff={memory.letterSignoff}
            onOpenLetter={triggerCelebration}
          />
        </section>

        {/* SECTION 4: 6 THINGS I LOVE MOST ABOUT YOU */}
        <ReasonsToLoveSection
          partnerName={memory.partnerName}
          reasons={memory.reasonsToLove || []}
        />

        {/* SECTION 5: SPIN FOR YOUR GIFT */}
        <SpinningWheelSection
          partnerName={memory.partnerName}
          senderName={memory.senderName}
          onWinPrize={triggerCelebration}
        />

        {/* SECTION 6: SONGS THAT REMIND ME OF YOU */}
        <SongsRemindOfYouSection
          partnerName={memory.partnerName}
        />

        {/* SECTION 7: ALTERNATE UNIVERSES OF US (LEGO & BEYOND) */}
        <AlternateUniverseSection />

        {/* SECTION 8: A FEW OF MY FAVOURITE US (LAST SECTION) */}
        <FavouriteUsSection />
      </main>

      {/* Personalize Modal */}
      <PersonalizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        memory={memory}
        onSave={(updated) => {
          setMemory(updated);
          setIsRevealed(false); // Reset scratch state for newly customized note
        }}
      />
    </div>
  );
}
