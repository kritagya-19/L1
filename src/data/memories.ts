import { LoveMemory, PresetMemory } from '../types';

// High-fidelity romantic SVG scenes rendered as safe data URIs
// Preset 1: The Birthday Paper Crown memory from the screenshot
const birthdayPaperCrownIllustration = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <radialGradient id="warmLight" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#FFEED9" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#FFB38A" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#3A1224" stop-opacity="0.95"/>
    </radialGradient>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2D0B1C"/>
      <stop offset="50%" stop-color="#4A182F"/>
      <stop offset="100%" stop-color="#19040D"/>
    </linearGradient>
    <linearGradient id="goldCrown" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFE57F"/>
      <stop offset="50%" stop-color="#FFD54F"/>
      <stop offset="100%" stop-color="#FFC107"/>
    </linearGradient>
  </defs>

  <!-- Background room glow -->
  <rect width="600" height="800" fill="url(#bgGrad)"/>
  <circle cx="300" cy="350" r="280" fill="url(#warmLight)"/>

  <!-- Bokeh fairy lights in background -->
  <g opacity="0.45">
    <circle cx="120" cy="180" r="22" fill="#FFE082"/>
    <circle cx="210" cy="120" r="14" fill="#FFCC80"/>
    <circle cx="480" cy="160" r="28" fill="#FFE082"/>
    <circle cx="420" cy="240" r="16" fill="#FFAB91"/>
    <circle cx="80" cy="320" r="18" fill="#FFE082"/>
    <circle cx="530" cy="340" r="24" fill="#FFE082"/>
  </g>

  <!-- Candle & Table at the bottom -->
  <path d="M 50 680 Q 300 660 550 680 L 550 800 L 50 800 Z" fill="#240713"/>
  <ellipse cx="300" cy="685" rx="240" ry="24" fill="#380C20" opacity="0.7"/>

  <!-- Romantic Catan Board Game tiles & wooden roads on table -->
  <g transform="translate(180, 680) scale(0.65)" opacity="0.85">
    <!-- Hexagons -->
    <polygon points="100,20 140,43 140,89 100,112 60,89 60,43" fill="#D4A373" stroke="#8D5B4C" stroke-width="2"/>
    <polygon points="140,43 180,66 180,112 140,135 100,112 100,66" fill="#84A98C" stroke="#52796F" stroke-width="2"/>
    <polygon points="60,43 100,66 100,112 60,135 20,112 20,66" fill="#CCD5AE" stroke="#8A9A5B" stroke-width="2"/>
    <!-- Small red wooden settlement & road -->
    <rect x="92" y="58" width="16" height="14" fill="#E63946" rx="2"/>
    <polygon points="100,48 112,58 88,58" fill="#E63946"/>
    <line x1="108" y1="68" x2="135" y2="85" stroke="#E63946" stroke-width="5" stroke-linecap="round"/>
    <line x1="135" y1="85" x2="165" y2="70" stroke="#E63946" stroke-width="5" stroke-linecap="round"/>
  </g>

  <!-- Cozy Couple Silhouette & Memory Scene -->
  <!-- Maya smiling with her Paper Crown -->
  <g transform="translate(190, 240)">
    <!-- Silhouettes in warm amber backlight -->
    <!-- Maya's Hair & Head -->
    <path d="M 80 180 C 60 140 65 90 100 60 C 135 30 170 50 185 85 C 200 120 195 180 170 210 C 140 250 80 230 80 180 Z" fill="#3D1225"/>
    <path d="M 60 130 C 50 180 60 260 95 320 L 175 320 C 190 260 210 180 190 130 Z" fill="#340E1F"/>

    <!-- Maya's facial silhouette highlighting laughter -->
    <path d="M 140 90 Q 155 95 160 110 Q 165 125 150 135 Q 165 145 155 160 Q 140 170 125 168" fill="none" stroke="#FFCC80" stroke-width="2.5" opacity="0.65"/>
    
    <!-- THE GOLD PAPER CROWN (tilted, playful!) -->
    <g transform="translate(85, 30) rotate(-12)">
      <polygon points="10,40 25,12 40,32 55,8 70,32 85,12 100,40" fill="url(#goldCrown)" filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.4))"/>
      <rect x="10" y="38" width="90" height="12" fill="#FFA000" rx="3"/>
      <!-- Tiny jewels on crown -->
      <circle cx="25" cy="44" r="3" fill="#E91E63"/>
      <circle cx="55" cy="44" r="3" fill="#00BCD4"/>
      <circle cx="85" cy="44" r="3" fill="#E91E63"/>
      <!-- Sparkle on crown tip -->
      <path d="M 55 -2 L 57 4 L 63 6 L 57 8 L 55 14 L 53 8 L 47 6 L 53 4 Z" fill="#FFF9C4"/>
    </g>

    <!-- Partner smiling beside her, hand resting on her shoulder -->
    <path d="M 190 170 C 195 130 215 95 245 80 C 275 65 310 90 315 130 C 320 170 300 240 270 320 L 200 320 Z" fill="#230915" opacity="0.95"/>
    <path d="M 240 120 Q 248 128 245 140 Q 235 152 225 150" fill="none" stroke="#FFAB91" stroke-width="2" opacity="0.45"/>
  </g>

  <!-- Birthday Cake with glowing candle in center table -->
  <g transform="translate(370, 610)">
    <!-- Small cake stand & cake -->
    <ellipse cx="40" cy="50" rx="36" ry="10" fill="#E0E0E0" opacity="0.6"/>
    <rect x="14" y="24" width="52" height="26" fill="#F8BBD0" rx="4"/>
    <ellipse cx="40" cy="24" rx="26" ry="7" fill="#F48FB1"/>
    <!-- Candle flame glow -->
    <rect x="38" y="10" width="4" height="14" fill="#FFF9C4"/>
    <ellipse cx="40" cy="6" rx="5" ry="9" fill="#FFEB3B"/>
    <ellipse cx="40" cy="4" rx="3" ry="5" fill="#FF5722"/>
    <circle cx="40" cy="6" r="28" fill="#FFE082" opacity="0.35"/>
  </g>

  <!-- Warm caption banner at top of photo -->
  <rect x="20" y="20" width="560" height="40" rx="8" fill="rgba(0,0,0,0.3)"/>
  <text x="300" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#FFD1DC" letter-spacing="2" text-anchor="middle">
    NOVEMBER 14 • YOUR BIRTHDAY MEMORY
  </text>
</svg>
`)}`;

// Preset 2: Golden Hour Beach Sunset
const sunsetBeachIllustration = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7B1FA2"/>
      <stop offset="35%" stop-color="#E91E63"/>
      <stop offset="65%" stop-color="#FF9800"/>
      <stop offset="85%" stop-color="#FFEB3B"/>
      <stop offset="100%" stop-color="#FFE082"/>
    </linearGradient>
    <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E65100"/>
      <stop offset="30%" stop-color="#BF360C"/>
      <stop offset="100%" stop-color="#3E2723"/>
    </linearGradient>
  </defs>

  <rect width="600" height="520" fill="url(#skyGrad)"/>
  <ellipse cx="300" cy="480" rx="90" ry="90" fill="#FFFDE7"/>
  <rect y="500" width="600" height="300" fill="url(#seaGrad)"/>

  <!-- Ocean reflections -->
  <ellipse cx="300" cy="530" rx="140" ry="6" fill="#FFF59D" opacity="0.8"/>
  <ellipse cx="300" cy="560" rx="190" ry="7" fill="#FFE082" opacity="0.6"/>
  <ellipse cx="300" cy="610" rx="240" ry="8" fill="#FFB74D" opacity="0.5"/>

  <!-- Couple holding hands silhouette walking on shoreline -->
  <g transform="translate(230, 420)" fill="#210515">
    <!-- Person 1 -->
    <circle cx="45" cy="50" r="14"/>
    <path d="M 32 64 C 28 85 24 130 30 180 L 44 260 L 52 260 L 46 180 Z"/>
    <!-- Person 2 leaning head on shoulder -->
    <circle cx="75" cy="56" r="13"/>
    <path d="M 64 68 C 68 85 75 130 78 180 L 72 260 L 80 260 L 88 180 Z"/>
    <!-- Intertwined arms / holding hands -->
    <path d="M 44 95 Q 60 115 62 140" stroke="#210515" stroke-width="9" stroke-linecap="round"/>
  </g>

  <!-- Date label -->
  <rect x="20" y="20" width="560" height="40" rx="8" fill="rgba(0,0,0,0.3)"/>
  <text x="300" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#FFF3E0" letter-spacing="2" text-anchor="middle">
    AUGUST 22 • THE DAY YOU HELD MY HAND
  </text>
</svg>
`)}`;

// Preset 3: Rainy Coffee Date
const rainyCafeIllustration = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <linearGradient id="rainSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1A237E"/>
      <stop offset="60%" stop-color="#283593"/>
      <stop offset="100%" stop-color="#0D1B2A"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="50%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#FFE082" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#FFB300" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="600" height="800" fill="url(#rainSky)"/>
  <circle cx="300" cy="220" r="260" fill="url(#lampGlow)"/>

  <!-- Steaming mugs on wooden table -->
  <ellipse cx="300" cy="650" rx="250" ry="40" fill="#4E342E"/>
  <!-- Mug 1 -->
  <rect x="240" y="580" width="45" height="50" rx="6" fill="#F8BBD0"/>
  <path d="M 240 595 C 225 595 225 615 240 615" fill="none" stroke="#F8BBD0" stroke-width="4"/>
  <!-- Mug 2 -->
  <rect x="315" y="580" width="45" height="50" rx="6" fill="#B3E5FC"/>
  <path d="M 360 595 C 375 595 375 615 360 615" fill="none" stroke="#B3E5FC" stroke-width="4"/>
  <!-- Steam hearts -->
  <path d="M 262 560 Q 255 540 262 525" stroke="#FFE082" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 338 560 Q 345 540 338 525" stroke="#FFE082" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- Couple looking through rainy glass window -->
  <g transform="translate(180, 260)" fill="#11071A">
    <ellipse cx="70" cy="120" rx="35" ry="45"/>
    <ellipse cx="170" cy="115" rx="38" ry="48"/>
    <rect x="35" y="160" width="70" height="140" rx="20"/>
    <rect x="135" y="155" width="75" height="145" rx="20"/>
  </g>

  <!-- Rain droplets on glass -->
  <g stroke="#90CAF9" stroke-width="1.8" opacity="0.6" stroke-linecap="round">
    <line x1="80" y1="120" x2="70" y2="155"/>
    <line x1="160" y1="80" x2="150" y2="115"/>
    <line x1="260" y1="140" x2="250" y2="185"/>
    <line x1="420" y1="100" x2="410" y2="140"/>
    <line x1="500" y1="180" x2="490" y2="225"/>
    <line x1="340" y1="90" x2="330" y2="135"/>
  </g>

  <rect x="20" y="20" width="560" height="40" rx="8" fill="rgba(0,0,0,0.3)"/>
  <text x="300" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#E0F7FA" letter-spacing="2" text-anchor="middle">
    OCTOBER 03 • GETTING LOST IN THE RAIN
  </text>
</svg>
`)}`;

export const INITIAL_LOVE_MEMORY: LoveMemory = {
  id: 'memory-1',
  partnerName: 'Maya',
  headerTagline: 'A LITTLE LOVE NOTE',
  milestoneNote: "Four years in November. I couldn't wait, so I made you this.",
  memoryTitle: 'Scratch to see my favourite night',
  memorySubtitle: "Your birthday, the paper crown, and you still won at Catan.",
  memoryPhotoUrl: birthdayPaperCrownIllustration,
  memoryPhotoAlt: 'Maya laughing wearing a paper crown at Catan night',
  dateBadge: 'November 14 • 11:42 PM',
  memorySecretNote: 'You are a truly wonderful and powerful person. You carry such beautiful, divine feminine energy. There is something so powerful, graceful, and divine about you that I deeply admire.',
  footerSignoff: 'With all my love',
  themeColor: '#BE185D',
  senderName: 'With all my love',
  letterParagraphs: [
    'You are a truly wonderful and powerful person. You carry such beautiful, divine feminine energy. Whenever I talk to you or even think of you, you remind me of Goddess Durga. There is something so powerful, graceful, and divine about you that I deeply admire.',
    'I admire your hard work, your dedication, and the way you study so sincerely to build the life you dream of. I admire your strength, determination, and above all, your caring heart. The more I get to know you, the more I find myself admiring you.',
    'I want to spend my entire life with you. I want to see you grow, achieve your dreams, and become everything you aspire to be. I want to see you happy, smiling, and living the beautiful life you deserve.',
    "I want to stand beside you through life's struggles, be someone you can lean on when things get difficult, and celebrate your victories as if they were my own. I want to be your companion through your sorrows and your partner in your happiness, sharing life's burdens and making its beautiful moments even more meaningful.",
    'And if there truly are thousands, hundreds of thousands, or even millions of lifetimes, I wish to find you in every single one of them. I want to choose you again and again, in every lifetime, wherever our paths may cross.'
  ],
  letterQuote: 'In this lifetime and all the lifetimes that may come, I want to walk beside you, support your dreams, and love you through every season of life.',
  letterDateNotice: '',
  letterSignoff: 'With all my love',
  reasonsToLove: [
    {
      id: 1,
      numberStr: '01.',
      title: 'Reading the last page of a book first',
      description: "You say it's because you can't bear not knowing if everyone turns out okay. I think it's because you have too much gentle heart for suspense.",
      whisper: 'I watched you do this on our third date in that tiny bookstore. That was the exact second I knew I was in trouble.',
      iconType: 'book',
      tag: 'Your sweet habit',
    },
    {
      id: 2,
      numberStr: '02.',
      title: 'Making me morning coffee without asking',
      description: 'You know the exact splash of oat milk, and you always slide the mug to the right side of my laptop with a tiny folded napkin.',
      whisper: "Most mornings I'm already awake, just quietly listening to your soft footsteps padding into the kitchen.",
      iconType: 'coffee',
      tag: 'Every morning',
    },
    {
      id: 3,
      numberStr: '03.',
      title: 'Your sleepy, uncoordinated morning laugh',
      description: 'Before you have had your tea, your jokes make almost no sense, but the sound of your laugh in the morning sun is my favorite melody on earth.',
      whisper: 'Your curls are always wild on the left side, and you still refuse to believe it until I show you.',
      iconType: 'sparkle',
      tag: 'Pure joy',
    },
    {
      id: 4,
      numberStr: '04.',
      title: 'Slipping cold hands into my coat pocket',
      description: 'Every single winter walk. You never ask; you just reach in and find my fingers already waiting there to warm yours.',
      whisper: 'I never wear gloves on purpose, just so my hands stay warm enough for yours.',
      iconType: 'heart',
      tag: 'Our little ritual',
    },
    {
      id: 5,
      numberStr: '05.',
      title: 'How fiercely you celebrate small joys',
      description: 'Whether you won at Catan wearing a paper crown or finally kept a houseplant thriving for six months—your genuine proud smile lights up the room.',
      whisper: 'That silly paper crown from your birthday is still safely tucked inside my nightstand drawer.',
      iconType: 'crown',
      tag: 'Your bright light',
    },
    {
      id: 6,
      numberStr: '06.',
      title: 'Choosing us, through the quiet & the storm',
      description: "Real love isn't just golden hours; it's holding my hand when life gets heavy, forgiving easily, and reminding me that home is wherever you are.",
      whisper: 'Loving you is the easiest, most natural choice I have ever made. I would choose you in every lifetime.',
      iconType: 'infinity',
      tag: 'Always & forever',
    },
  ],
};

export const PRESET_MEMORIES: PresetMemory[] = [
  {
    id: 'birthday',
    name: '👑 Birthday Paper Crown (Favorite Night)',
    title: 'Scratch to see my favourite night',
    subtitle: "Your birthday, the paper crown, and you still won at Catan.",
    dateBadge: 'November 14 • 11:42 PM',
    secretNote: 'You laughed so hard your paper crown tilted, yet you still managed to win Catan. I fell in love with you all over again that night.',
    photoUrl: birthdayPaperCrownIllustration,
  },
  {
    id: 'sunset',
    name: '🌅 Sunset Shoreline (First Hand Hold)',
    title: 'Scratch to see when my heart stopped',
    subtitle: 'The sun was sinking into the ocean, and you slipped your hand into mine.',
    dateBadge: 'August 22 • 7:15 PM',
    secretNote: 'My heart was pounding so loud I was sure the whole beach could hear it. Best moment of that summer.',
    photoUrl: sunsetBeachIllustration,
  },
  {
    id: 'rainy',
    name: '☕ Rainy Cafe Window (Our Cozy Haven)',
    title: 'Scratch to see our rainy escape',
    subtitle: 'Soaked from the storm, sharing warm peppermint mochas and endless talks.',
    dateBadge: 'October 03 • 4:20 PM',
    secretNote: 'The rain poured outside for hours, but inside that tiny corner booth, we built our own little world.',
    photoUrl: rainyCafeIllustration,
  },
];
