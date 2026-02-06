export interface ServiceItem {
  id: string;
  number: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  subServices: string[];
}

export interface TeamMember {
  id: string;
  nameKey: string;
  titleKey: string;
  bioKey: string;
  image: string;
  featured: boolean;
  credentials: string[];
  expertise: string[];
}

export interface BlogPost {
  slug: string;
  titleKey: string;
  excerptKey: string;
  category: string;
  date: string;
  readingTime: number;
}

export interface Stat {
  value: number;
  suffix?: string;
  labelKey: string;
}
