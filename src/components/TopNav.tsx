import React from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface TopNavProps {
  onOpenCustomize: () => void;
  onReplayLoading: () => void;
  isPlayingMusic: boolean;
  setIsPlayingMusic: (playing: boolean) => void;
  onSendLoveHeart: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenCustomize,
  onReplayLoading,
  isPlayingMusic,
  setIsPlayingMusic,
  onSendLoveHeart,
}) => {
  const toggleMusic = () => {
    const nextState = romanticAudio.toggleMusic();
    setIsPlayingMusic(nextState);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-20 w-full border-b border-pink-200/50 bg-[#FFF5F7]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark / Brand title (one line, display face) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('top');
          }}
          className="font-serif-love text-lg sm:text-xl font-bold tracking-tight text-[#8B0F3E] whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="text-rose-500">💌</span>
          <span>yourlovepage</span>
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-rose-900/80">
          <button
            onClick={() => scrollToSection('top')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Love Note
          </button>
          <button
            onClick={() => scrollToSection('scratch-section')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Scratch Card
          </button>
          <button
            onClick={() => scrollToSection('letter-section')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Love Letter
          </button>
          <button
            onClick={() => scrollToSection('reasons-section')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Things I Love
          </button>
          <button
            onClick={() => scrollToSection('wheel-section')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Gift Wheel
          </button>
          <button
            onClick={() => scrollToSection('songs-section')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Our Songs
          </button>
          <button
            onClick={() => scrollToSection('multiverse-section')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Multiverse
          </button>
          <button
            onClick={() => scrollToSection('favourites-section')}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Favourite Us
          </button>
          <button
            onClick={toggleMusic}
            className="flex items-center gap-1.5 hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-rose-600 animate-pulse" />
                <span>Music: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span>Play Song</span>
              </>
            )}
          </button>
          <button
            onClick={onReplayLoading}
            className="hover:text-[#BE185D] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-rose-700/70"
          >
            Replay Intro
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Floating Love Heart Reaction */}
          <button
            onClick={onSendLoveHeart}
            className="p-2 rounded-xl bg-pink-100/80 hover:bg-pink-200/90 text-rose-600 transition-all cursor-pointer active:scale-95"
            title="Send love heart"
            aria-label="Send love reaction"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse-subtle" />
          </button>

          <button
            onClick={onOpenCustomize}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#BE185D] hover:bg-[#9D174D] rounded-xl shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customize Note</span>
          </button>
        </div>
      </div>
    </header>
  );
};
