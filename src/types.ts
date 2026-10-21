export interface LoveMemory {
  id: string;
  partnerName: string;
  headerTagline: string;
  milestoneNote: string;
  memoryTitle: string;
  memorySubtitle: string;
  memoryPhotoUrl: string;
  memoryPhotoAlt?: string;
  dateBadge: string;
  memoryDateBadge?: string;
  memorySecretNote: string;
  footerSignoff: string;
  themeColor: string;
  senderName: string;
  letterParagraphs: string[];
  letterQuote: string;
  letterDateNotice: string;
  letterSignoff: string;
  reasonsToLove?: ReasonToLove[];
}

export interface ReasonToLove {
  id: number;
  numberStr: string;
  title: string;
  description: string;
  whisper: string;
  iconType: string;
  tag: string;
}

export interface PresetMemory {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  dateBadge: string;
  secretNote: string;
  photoUrl: string;
}
