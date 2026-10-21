import React, { useState, useEffect, useRef } from 'react';
import { Heart, ChevronLeft, ChevronRight, Upload, Camera } from 'lucide-react';
import { romanticAudio } from '../utils/audio';

interface PhotoMemory {
  id: number;
  title: string;
  caption: string;
  dateStr: string;
  imageSrc: string;
  alt: string;
}

// 4 clean, real, emotional couple memories
const INITIAL_FAVOURITES: PhotoMemory[] = [
  {
    id: 1,
    title: 'The Road Trip',
    caption: "The day the car died and we didn't care",
    dateStr: 'Summer 2024 • Somewhere along Highway 1',
    imageSrc: '/assets/favourite_1.jpg',
    alt: 'Romantic aesthetic couple photo',
  },
  {
    id: 2,
    title: 'Dinner Laughter',
    caption: 'That laughing fit at dinner over absolutely nothing',
    dateStr: 'November 28 • The Little Corner Bistro',
    imageSrc: '/assets/favourite_2.jpg',
    alt: 'Couple smiling warmly and hugging during a romantic moment',
  },
  {
    id: 3,
    title: 'Morning Sun',
    caption: 'Quiet morning coffee, wild curls, and silly jokes',
    dateStr: 'April 14 • Our sunny kitchen floor',
    imageSrc: '/assets/favourite_3.jpg',
    alt: 'Happy couple embracing warmly in gentle sunlight',
  },
  {
    id: 4,
    title: 'Sunset Shoreline',
    caption: 'When you held my hand and we watched the tide roll in',
    dateStr: 'August 22 • Pacific Coast Beach',
    imageSrc: '/assets/favourite_4.jpg',
    alt: 'Couple holding hands during romantic evening sunset',
  },
];

export const FavouriteUsSection: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoMemory[]>(INITIAL_FAVOURITES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({});
  const [likeHeartBurst, setLikeHeartBurst] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentPhoto = photos[currentIndex] || photos[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
    romanticAudio.playScratchShimmer();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    romanticAudio.playScratchShimmer();
  };

  const handleSelectIndex = (idx: number) => {
    if (idx === currentIndex) return;
    setCurrentIndex(idx);
    romanticAudio.playScratchShimmer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext(); // swiped left -> next
      } else {
        handlePrev(); // swiped right -> prev
      }
    }
    setTouchStartX(null);
  };

  const handleHeartClick = () => {
    setIsLiked((prev) => ({
      ...prev,
      [currentPhoto.id]: !prev[currentPhoto.id],
    }));
    setLikeHeartBurst(true);
    romanticAudio.playScratchShimmer();
    setTimeout(() => setLikeHeartBurst(false), 900);
  };

  const handleUploadCustomPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const updated = [...photos];
          updated[currentIndex] = {
            ...updated[currentIndex],
            imageSrc: reader.result as string,
            caption: 'Our favourite little moment together',
            dateStr: 'Captured with love',
          };
          setPhotos(updated);
          romanticAudio.playRevealFanfare();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photos.length]);

  return (
    <section id="favourites-section" className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 my-20 sm:my-28">
      {/* SECTION HEADING MATCHING SCREENSHOT */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B0F3E] tracking-tight mb-2 select-none">
          A few of my favourite us
        </h2>
      </div>

      {/* THE POLAROID GALLERY STAGE */}
      <div className="relative mx-auto max-w-[420px] w-full">
        {/* POLAROID FRAME MATCHING SCREENSHOT */}
        <div className="relative bg-white rounded-3xl sm:rounded-[36px] p-3.5 sm:p-5 pb-6 sm:pb-8 shadow-[0_20px_60px_-15px_rgba(219,39,119,0.2)] border border-pink-100 select-none transition-all">
          {/* DIAGONAL WASHI TAPE ON TOP LEFT & RIGHT */}
          <div
            className="absolute -top-3 left-4 sm:left-10 w-16 sm:w-24 h-6 sm:h-7 shadow-xs opacity-85 rotate-[-4deg] pointer-events-none rounded-xs z-30"
            style={{
              backgroundColor: '#F9A8D4',
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 16px)',
            }}
          />
          <div
            className="absolute -top-3 right-4 sm:right-10 w-16 sm:w-24 h-6 sm:h-7 shadow-xs opacity-85 rotate-[4deg] pointer-events-none rounded-xs z-30"
            style={{
              backgroundColor: '#F9A8D4',
              backgroundImage:
                'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.4) 8px, rgba(255,255,255,0.4) 16px)',
            }}
          />

          {/* PHOTO CONTAINER */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-inner group bg-stone-900 select-none"
          >
            <img
              key={currentPhoto.id}
              src={currentPhoto.imageSrc}
              alt={currentPhoto.alt}
              referrerPolicy="no-referrer"
              onClick={handleHeartClick}
              className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-103 cursor-pointer"
            />

            {/* Soft Warm Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />

            {/* Quick upload your own photo button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute top-3.5 left-3.5 bg-white/80 hover:bg-white text-rose-800 p-2 rounded-full shadow-sm backdrop-blur-md transition-all cursor-pointer opacity-80 hover:opacity-100 z-20"
              title="Change this photo to your own"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadCustomPhoto}
              className="hidden"
            />

            {/* LEFT / RIGHT CAROUSEL ARROW BUTTONS MATCHING SCREENSHOT */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md text-rose-900 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 text-rose-900" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md text-rose-900 flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 text-rose-900" />
            </button>

            {/* Gentle heart burst animation */}
            {likeHeartBurst && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-ping">
                <span className="text-6xl filter drop-shadow-lg">💖</span>
              </div>
            )}
          </div>

          {/* POLAROID HANDWRITTEN CAPTION */}
          <div className="pt-4 text-center px-2">
            <p className="font-script text-2xl sm:text-[27px] text-[#781B34] font-normal leading-snug">
              {currentPhoto.caption}
            </p>
            <p className="text-[12px] font-sans text-rose-400/90 mt-1 font-medium tracking-wide">
              {currentPhoto.dateStr}
            </p>
          </div>
        </div>

        {/* CLEAN 4-THUMBNAIL STRIP BELOW POLAROID */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mt-6 px-2">
          {photos.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectIndex(idx)}
              className={`relative w-14 sm:w-16 aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xs shrink-0 ${
                idx === currentIndex
                  ? 'ring-3 ring-[#BE185D] ring-offset-2 scale-108 shadow-md opacity-100'
                  : 'opacity-60 hover:opacity-95 hover:scale-105 ring-1 ring-pink-200/80'
              }`}
              title={`View ${item.title}`}
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
