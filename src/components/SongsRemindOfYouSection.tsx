import React, { useState } from 'react';
import { Heart, Play, Pause, SkipBack, SkipForward, Music, Plus, Disc, Volume2, Sparkles, X } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface LoveSong {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: string;
  memoryNote: string;
  vinylColor: string;
}

const DEFAULT_PLAYLIST: LoveSong[] = [
  {
    id: 'song-1',
    title: 'Until I Found You',
    artist: 'Stephen Sanchez',
    youtubeId: 'iGskhOXVg2U',
    duration: '2:57',
    memoryNote: 'Playing softly in the car the night we drove along the coastline and neither of us wanted the road to end.',
    vinylColor: '#BE185D',
  },
  {
    id: 'song-2',
    title: 'Lover',
    artist: 'Taylor Swift',
    youtubeId: '-BjZmE2gtdo',
    duration: '3:41',
    memoryNote: 'Dancing barefoot in the kitchen at 1 AM while waiting for the pasta water to boil, laughing until we cried.',
    vinylColor: '#E11D48',
  },
  {
    id: 'song-3',
    title: 'Golden Hour',
    artist: 'JVKE',
    youtubeId: 'PEM0Vs8jf1w',
    duration: '3:29',
    memoryNote: 'The warm sunset glowing across your cheeks on the beach. In that exact minute, the whole universe disappeared.',
    vinylColor: '#D97706',
  },
  {
    id: 'song-4',
    title: 'Mystery of Love',
    artist: 'Sufjan Stevens',
    youtubeId: 'Kz39-59uu7Q',
    duration: '4:08',
    memoryNote: 'Our quiet Sunday mornings wrapped in knit blankets while rain tapped gently against the window glass.',
    vinylColor: '#7C3AED',
  },
];

interface SongsRemindOfYouProps {
  partnerName: string;
}

export const SongsRemindOfYouSection: React.FC<SongsRemindOfYouProps> = ({ partnerName }) => {
  const [playlist, setPlaylist] = useState<LoveSong[]>(DEFAULT_PLAYLIST);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customArtist, setCustomArtist] = useState('');
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');
  const [customNote, setCustomNote] = useState('');

  React.useEffect(() => {
    if (showCustomModal) {
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
  }, [showCustomModal]);

  const currentSong = playlist[currentSongIndex] || playlist[0];

  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    romanticAudio.playScratchShimmer();
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    romanticAudio.playScratchShimmer();
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
    romanticAudio.playScratchShimmer();
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    romanticAudio.playScratchShimmer();
  };

  const handleAddCustomSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customYoutubeUrl.trim()) return;

    let ytId = customYoutubeUrl.trim();
    const match = customYoutubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match && match[1]) {
      ytId = match[1];
    }

    const newSong: LoveSong = {
      id: `custom-${Date.now()}`,
      title: customTitle.trim(),
      artist: customArtist.trim() || 'Our Melody',
      youtubeId: ytId,
      duration: 'Special',
      memoryNote: customNote.trim() || 'A song dedicated with all my heart.',
      vinylColor: '#BE185D',
    };

    setPlaylist([newSong, ...playlist]);
    setCurrentSongIndex(0);
    setIsPlaying(true);
    setShowCustomModal(false);
    setCustomTitle('');
    setCustomArtist('');
    setCustomYoutubeUrl('');
    setCustomNote('');
    romanticAudio.playRevealFanfare();
  };

  return (
    <section id="songs-section" className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 my-20 sm:my-28">
      {/* SECTION HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-love font-normal text-[#8B0F3E] tracking-tight mb-3">
          Songs That Remind Me of You
        </h2>

        <p className="text-sm sm:text-base text-[#6E2E41] max-w-md mx-auto leading-relaxed">
          Every lyric had a melody, but they only started making sense the moment I met {partnerName}.
        </p>

        {/* Delicate divider with heart: — ♡ — */}
        <div className="flex items-center justify-center gap-4 my-5 text-[#FDA4AF]" aria-hidden="true">
          <div className="w-16 h-px bg-pink-200" />
          <Heart className="w-3.5 h-3.5 text-[#F43F5E] fill-none stroke-[1.8]" />
          <div className="w-16 h-px bg-pink-200" />
        </div>
      </div>

      {/* LUXURY WARM STATIONERY TURNTABLE CARD */}
      <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-[#FDF8F6] text-[#4A1525] p-4 sm:p-8 md:p-10 shadow-[0_24px_70px_-15px_rgba(219,39,119,0.14)] border border-pink-200/90">
        {/* Ambient Subtle Warm Rose Aura Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-pink-200/35 blur-3xl pointer-events-none" />

        {/* Top Operational Ribbon */}
        <div className="relative z-10 flex flex-wrap items-center justify-between pb-6 mb-8 border-b border-pink-200/80 gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#BE185D]" />
            </span>
            <span className="text-xs font-semibold tracking-widest text-[#8B0F3E] uppercase font-sans">
              SIDE A • {partnerName.toUpperCase()}’S BESPOKE MIXTAPE
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowCustomModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-rose-50 border border-pink-200/90 text-xs font-semibold text-[#8B0F3E] transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 text-rose-600" />
              <span>Dedicate a Song</span>
            </button>
          </div>
        </div>

        {/* STAGE: YOUTUBE MEDIA SCREEN & ROTATING VINYL TURNTABLE */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-10">
          {/* THE YOUTUBE MEDIA SCREEN (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(139,15,62,0.18)] border-2 border-pink-200/80 bg-stone-900 group">
              {/* YouTube IFrame Embed */}
              <iframe
                key={currentSong.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${currentSong.youtubeId}?autoplay=${isPlaying ? 1 : 0}&modestbranding=1&rel=0`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </div>

            {/* Handwritten Memory Note Box */}
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white border border-pink-200/80 shadow-xs">
              <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                <Music className="w-3.5 h-3.5 text-rose-500" />
                <span>Memory Behind This Melody</span>
              </div>
              <p className="font-script text-xl sm:text-2xl md:text-3xl text-[#7A1135] leading-snug">
                "{currentSong.memoryNote}"
              </p>
            </div>
          </div>

          {/* THE CLASSIC VINYL TURNTABLE DECK (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative bg-white/60 p-4 sm:p-6 rounded-3xl border border-pink-200/70 shadow-xs">
            <div className="relative w-56 sm:w-64 md:w-72 aspect-square flex items-center justify-center">
              {/* Turntable Wooden Platter Rim */}
              <div className="absolute inset-0 rounded-full border-4 border-pink-200/60 shadow-inner" />

              {/* ROTATING VINYL RECORD */}
              <div
                onClick={togglePlay}
                className="relative w-[92%] h-[92%] rounded-full cursor-pointer select-none transition-transform"
                style={{
                  background: 'radial-gradient(circle, #2C1820 0%, #1A0D13 45%, #0F050B 100%)',
                  boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.12), 0 12px 32px rgba(110,13,44,0.3)',
                  animation: isPlaying ? 'spinVinyl 8s linear infinite' : 'none',
                }}
                title={isPlaying ? 'Click to Pause' : 'Click to Play'}
              >
                {/* Vinyl Grooves Sheen */}
                <div
                  className="absolute inset-2 rounded-full border border-white/5 pointer-events-none"
                  style={{
                    backgroundImage:
                      'repeating-radial-gradient(circle, transparent, transparent 4px, rgba(255,255,255,0.04) 4px, rgba(255,255,255,0.04) 6px)',
                  }}
                />

                {/* Light Reflections */}
                <div
                  className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
                  style={{
                    background:
                      'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.2) 45deg, transparent 90deg, rgba(255,255,255,0.2) 135deg, transparent 180deg, rgba(255,255,255,0.2) 225deg, transparent 270deg, rgba(255,255,255,0.2) 315deg, transparent 360deg)',
                  }}
                />

                {/* Center Record Label */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full shadow-md flex flex-col items-center justify-center p-2 text-center border-2 border-white/40 select-none"
                  style={{ backgroundColor: currentSong.vinylColor }}
                >
                  <span className="text-[8px] font-mono tracking-widest text-white/80 uppercase">
                    LOVE VINYL
                  </span>
                  <p className="text-[11px] font-bold text-white truncate max-w-[76px] leading-tight mt-0.5">
                    {currentSong.title}
                  </p>
                  <p className="text-[9px] text-white/90 font-script truncate max-w-[76px]">
                    for {partnerName}
                  </p>

                  {/* Center Spindle Hole */}
                  <div className="w-3.5 h-3.5 rounded-full bg-stone-900 border border-white/40 mt-0.5 shadow-inner" />
                </div>
              </div>

              {/* TONEARM / NEEDLE ARM */}
              <div
                className="absolute -top-3 -right-2 z-20 pointer-events-none transition-transform duration-700 ease-out origin-top-right"
                style={{
                  transform: isPlaying ? 'rotate(26deg)' : 'rotate(0deg)',
                }}
              >
                {/* Arm base */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-b from-stone-300 to-stone-500 shadow-md border border-stone-200 relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                {/* Arm rod */}
                <div className="w-1.5 h-32 bg-gradient-to-r from-stone-300 via-stone-100 to-stone-400 mx-auto -mt-1 shadow-xs origin-top">
                  {/* Cartridge head */}
                  <div className="w-4 h-7 bg-stone-800 border border-stone-400/60 rounded-xs absolute bottom-0 -left-1.5 shadow-md flex items-end justify-center pb-1">
                    <div className="w-1 h-1.5 bg-rose-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contemporary Playback Controls */}
            <div className="mt-5 flex items-center justify-between w-full max-w-[290px] px-4 py-2.5 rounded-2xl bg-white border border-pink-200/80 shadow-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-full hover:bg-rose-50 text-rose-800 transition-colors cursor-pointer active:scale-95"
                  title="Previous song"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-[#8B0F3E] hover:bg-[#700A31] text-white flex items-center justify-center transition-transform active:scale-90 shadow-md cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 rounded-full hover:bg-rose-50 text-rose-800 transition-colors cursor-pointer active:scale-95"
                  title="Next song"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Equalizer */}
              <div className="text-right pl-2">
                <div className="flex items-center justify-end gap-1 mb-1">
                  {[35, 80, 50, 95, 60].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#BE185D] rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${h}%` : '25%',
                        animation: isPlaying
                          ? `equalize 0.8s ease-in-out infinite alternate ${i * 0.14}s`
                          : 'none',
                      }}
                    />
                  ))}
                </div>
                <p className="text-[11px] font-bold text-[#8B0F3E] truncate max-w-[110px]">
                  {currentSong.title}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ELEGANT TIMELINE TRACKLIST */}
        <div className="relative z-10 pt-6 border-t border-pink-200/80">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold tracking-wider text-[#8B0F3E] uppercase font-sans flex items-center gap-2">
              <Disc className="w-4 h-4 text-rose-600" />
              <span>Select A Track From Our Journey</span>
            </p>
            <span className="text-xs text-rose-800/70 font-medium">
              {currentSongIndex + 1} of {playlist.length} tracks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {playlist.map((song, index) => {
              const isActive = index === currentSongIndex;

              return (
                <button
                  key={song.id}
                  onClick={() => handleSelectSong(index)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white border-2 border-[#BE185D] shadow-md shadow-pink-200/50 scale-[1.02] ring-2 ring-pink-100'
                      : 'bg-white/80 hover:bg-white border border-pink-200/70 hover:border-pink-300 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-[#BE185D]' : 'text-rose-400'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-[11px] text-rose-900/60 font-medium">
                      {song.duration}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[#7E1136] truncate mb-0.5">
                    {song.title}
                  </h4>
                  <p className="text-xs text-rose-800/70 truncate">{song.artist}</p>

                  {/* Active playing indicator badge */}
                  {isActive && (
                    <div className="mt-2.5 pt-2 border-t border-pink-100 flex items-center justify-between text-[11px] text-[#BE185D] font-semibold">
                      <span className="flex items-center gap-1">
                        <Volume2 className="w-3 h-3 animate-pulse" />
                        Now Playing
                      </span>
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-0.5 h-full bg-[#BE185D] animate-pulse" />
                        <span className="w-0.5 h-2 bg-[#BE185D] animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <span className="w-0.5 h-3 bg-[#BE185D] animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DEDICATE A CUSTOM SONG MODAL */}
      {showCustomModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-hidden overscroll-none animate-fade-in"
          onClick={() => setShowCustomModal(false)}
        >
          <div
            className="bg-[#FFFDFB] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-pink-200 text-slate-800 animate-scale-up my-auto max-h-[88vh] overflow-y-auto romantic-scrollbar overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-pink-200/80 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-100/80 rounded-2xl text-rose-700">
                  <Disc className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#8B0F3E]">Dedicate a Song</h3>
                  <p className="text-xs text-rose-900/60 font-medium">Add any YouTube melody to our love playlist</p>
                </div>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-1.5 rounded-full hover:bg-rose-100/60 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomSong} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6E2E41] mb-1">
                  Song Title
                </label>
                <input
                  type="text"
                  required
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Yellow, Perfect, or Our First Dance"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E2E41] mb-1">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={customArtist}
                  onChange={(e) => setCustomArtist(e.target.value)}
                  placeholder="e.g. Coldplay, Ed Sheeran"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E2E41] mb-1">
                  YouTube Link or Video ID
                </label>
                <input
                  type="text"
                  required
                  value={customYoutubeUrl}
                  onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E2E41] mb-1">
                  Memory Note Behind This Song
                </label>
                <textarea
                  rows={3}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Tell her why this specific melody makes you think of her..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 text-sm outline-none resize-none transition-all"
                />
              </div>

              <div className="pt-3 border-t border-pink-200/80 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#BE185D] hover:bg-[#9D174D] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  Add to Our Mixtape 🎵
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Keyframe animation for spinning vinyl and equalizer */}
      <style>{`
        @keyframes spinVinyl {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes equalize {
          0% {
            height: 25%;
          }
          100% {
            height: 100%;
          }
        }
      `}</style>
    </section>
  );
};
