export type Sector = 'الصحة' | 'التقنية' | 'التعليم' | 'المدن الذكية' | 'التقنية الغذائية' | 'الخدمات اللوجستية' | 'الصناعة';

export type Stage = 'Incubation' | 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B' | 'Growth';

export interface Startup {
  id: string;
  name: string;
  nameAr?: string;
  sector: Sector;
  stage: Stage;
  description: string;
  fullDescription?: string;
  services?: string[];
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  location?: {
    building: string;
    floor: string;
    coordinates: [number, number];
  };
  founded?: string;
  employees?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}
